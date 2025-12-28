import { NextRequest, NextResponse } from 'next/server';

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
    const { amount, items, customerEmail, shippingAddress } = await request.json();

    if (!amount || amount <= 0) {
      return NextResponse.json(
        { error: 'Invalid amount' },
        { status: 400 }
      );
    }

    const accessToken = await getAccessToken();
    
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

    // Calculate breakdown
    const itemSubtotal = items?.reduce((sum: number, item: any) => {
      return sum + (item.price * item.quantity);
    }, 0) || 0;

    const shipping = itemSubtotal > 50 ? 0 : 8.99;
    const tax = itemSubtotal * 0.08;
    const calculatedTotal = itemSubtotal + shipping + tax;

    // Prepare itemized list for PayPal
    const paypalItems = items?.map((item: any) => ({
      name: item.name.substring(0, 127), // PayPal has 127 char limit
      description: item.description?.substring(0, 127) || '',
      quantity: item.quantity.toString(),
      price: item.price.toFixed(2),
      currency: 'USD',
      sku: item.id || '',
    })) || [];

    const paymentData = {
      intent: 'sale',
      payer: {
        payment_method: 'paypal',
      },
      transactions: [
        {
          amount: {
            total: calculatedTotal.toFixed(2),
            currency: 'USD',
            details: {
              subtotal: itemSubtotal.toFixed(2),
              shipping: shipping.toFixed(2),
              tax: tax.toFixed(2),
            },
          },
          description: `Order from RAMLISHOME™`,
          invoice_number: `INV-${Date.now()}`,
          item_list: {
            items: paypalItems,
            shipping_address: shippingAddress ? {
              recipient_name: `${shippingAddress.firstName} ${shippingAddress.lastName}`,
              line1: shippingAddress.address,
              city: shippingAddress.city,
              state: shippingAddress.state,
              postal_code: shippingAddress.zipCode,
              country_code: 'US',
            } : undefined,
          },
          payment_options: {
            allowed_payment_method: 'INSTANT_FUNDING_SOURCE',
          },
        },
      ],
      note_to_payer: 'Thank you for your order from RAMLISHOME™',
      redirect_urls: {
        return_url: `${baseUrl}/checkout/success`,
        cancel_url: `${baseUrl}/checkout/cancel`,
      },
    };

    const response = await fetch(`${PAYPAL_API_BASE}/v1/payments/payment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify(paymentData),
    });

    const payment = await response.json();

    if (!response.ok) {
      console.error('PayPal API Error:', payment);
      return NextResponse.json(
        { error: 'Failed to create PayPal payment', details: payment },
        { status: response.status }
      );
    }

    const approvalUrl = payment.links?.find((link: any) => link.rel === 'approval_url')?.href;

    if (!approvalUrl) {
      return NextResponse.json(
        { error: 'No approval URL returned from PayPal' },
        { status: 500 }
      );
    }

    return NextResponse.json({ 
      paymentId: payment.id,
      approvalUrl,
    });
  } catch (error) {
    console.error('Error creating PayPal payment:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
