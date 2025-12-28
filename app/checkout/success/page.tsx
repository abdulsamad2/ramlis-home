"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle, Package, ArrowRight, Home } from "lucide-react";
import { useCart } from "@/lib/cart-context";

function CheckoutSuccessContent() {
  const searchParams = useSearchParams();
  const { clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(true);
  const [paymentStatus, setPaymentStatus] = useState<'success' | 'error'>('success');
  const [orderDetails, setOrderDetails] = useState<any>(null);

  useEffect(() => {
    const paymentId = searchParams.get('paymentId');
    const payerId = searchParams.get('PayerID');

    if (paymentId && payerId) {
      executePayment(paymentId, payerId);
    } else {
      setIsProcessing(false);
      clearCart();
    }
  }, [searchParams]);

  const executePayment = async (paymentId: string, payerId: string) => {
    try {
      const response = await fetch('/api/paypal/execute-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ paymentId, payerId }),
      });

      const data = await response.json();

      if (data.success) {
        setPaymentStatus('success');
        setOrderDetails(data.payment);
        clearCart();
      } else {
        setPaymentStatus('error');
      }
    } catch (error) {
      console.error('Error executing payment:', error);
      setPaymentStatus('error');
    } finally {
      setIsProcessing(false);
    }
  };

  if (isProcessing) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-slate-900">Processing your payment...</h2>
          <p className="text-slate-600 mt-2">Please wait while we confirm your order</p>
        </div>
      </div>
    );
  }

  if (paymentStatus === 'error') {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-4">Payment Failed</h1>
          <p className="text-slate-600 mb-6">
            There was an issue processing your payment. Please try again or contact support.
          </p>
          <div className="space-y-3">
            <Link 
              href="/checkout"
              className="w-full bg-primary hover:bg-blue-600 text-white py-3 rounded-xl font-semibold transition-colors block"
            >
              Try Again
            </Link>
            <Link 
              href="/contact"
              className="w-full bg-slate-100 hover:bg-slate-200 text-slate-900 py-3 rounded-xl font-semibold transition-colors block"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-3xl mx-auto px-4 py-16">
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Payment Successful!
          </h1>
          
          <p className="text-lg text-slate-600 mb-8">
            Thank you for your order. We've received your payment and will process your order shortly.
          </p>

          {orderDetails && (
            <div className="bg-slate-50 rounded-xl p-6 mb-8 text-left">
              <h2 className="text-lg font-semibold text-slate-900 mb-4">Order Details</h2>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600">Transaction ID:</span>
                  <span className="font-mono text-slate-900">{orderDetails.id?.substring(0, 20)}...</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Amount Paid:</span>
                  <span className="font-semibold text-slate-900">
                    ${orderDetails.transactions?.[0]?.amount?.total || '0.00'} USD
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Payment Method:</span>
                  <span className="text-slate-900">PayPal</span>
                </div>
              </div>
            </div>
          )}

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
            <div className="flex items-start gap-4">
              <Package className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
              <div className="text-left">
                <h3 className="font-semibold text-blue-900 mb-2">What's Next?</h3>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• You'll receive an order confirmation email shortly</li>
                  <li>• We'll send you tracking information once your order ships</li>
                  <li>• Expected delivery: 5-7 business days</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold transition-colors"
            >
              <Home className="w-5 h-5" />
              Back to Home
            </Link>
            <Link
              href="/products"
              className="inline-flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-900 px-8 py-3 rounded-xl font-semibold transition-colors"
            >
              Continue Shopping
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Processing your payment...</p>
        </div>
      </div>
    }>
      <CheckoutSuccessContent />
    </Suspense>
  );
}
