import { NextRequest, NextResponse } from 'next/server';
import { createOrder, addOrderItem } from '@/lib/database';

const PAYPAL_API_BASE = process.env.NEXT_PUBLIC_PAYPAL_MODE === 'live' 
  ? 'https://api-m.paypal.com' 
  : 'https://api-m.sandbox.paypal.com';

async function getAccessToken() {
  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error('PayPal credentials not configured');
  }

  const auth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
  
  const response = await fetch(`${PAYPAL_API_BASE}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  });

  const data = await response.json();
  return data.access_token;
}

export async function POST(request: NextRequest) {
  try {
    const { paymentId, payerId } = await request.json();

    if (!paymentId || !payerId) {
      return NextResponse.json(
        { error: 'Payment ID and Payer ID are required' },
        { status: 400 }
      );
    }

    const accessToken = await getAccessToken();

    const response = await fetch(
      `${PAYPAL_API_BASE}/v1/payments/payment/${paymentId}/execute`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ payer_id: payerId }),
      }
    );

    const executionResult = await response.json();

    if (!response.ok) {
      console.error('PayPal Execute Error:', executionResult);
      return NextResponse.json(
        { error: 'Failed to execute PayPal payment', details: executionResult },
        { status: response.status }
      );
    }

    // Save order to database
    try {
      const transaction = executionResult.transactions?.[0];
      const payer = executionResult.payer?.payer_info;
      const shippingAddress = transaction?.item_list?.shipping_address;
      
      const orderNumber = `ORD-${Date.now()}`;
      const totalAmount = parseFloat(transaction?.amount?.total || '0');
      
      // Create shipping address string
      const shippingAddressStr = shippingAddress 
        ? `${shippingAddress.recipient_name}\n${shippingAddress.line1}\n${shippingAddress.city}, ${shippingAddress.state} ${shippingAddress.postal_code}\n${shippingAddress.country_code}`
        : '';

      // Create order
      const orderId = createOrder({
        orderNumber,
        totalAmount,
        status: 'paid',
        shippingAddress: shippingAddressStr,
        customerEmail: payer?.email,
        customerName: `${payer?.first_name || ''} ${payer?.last_name || ''}`.trim(),
        paymentMethod: 'PayPal',
      });

      // Add order items
      const items = transaction?.item_list?.items || [];
      for (const item of items) {
        addOrderItem({
          orderId,
          productId: item.sku || item.name,
          quantity: parseInt(item.quantity || '1'),
          price: parseFloat(item.price || '0'),
        });
      }

      console.log(`Order ${orderNumber} created successfully in database`);
    } catch (dbError) {
      console.error('Error saving order to database:', dbError);
      // Don't fail the payment if database save fails
    }

    return NextResponse.json({
      success: true,
      payment: executionResult,
    });
  } catch (error) {
    console.error('Error executing PayPal payment:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
