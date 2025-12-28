"use client";

import Link from "next/link";
import { XCircle, ArrowLeft, ShoppingCart } from "lucide-react";

export default function CheckoutCancelPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
        <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <XCircle className="w-8 h-8 text-amber-600" />
        </div>
        
        <h1 className="text-2xl font-bold text-slate-900 mb-4">
          Payment Cancelled
        </h1>
        
        <p className="text-slate-600 mb-8">
          Your payment was cancelled. No charges were made to your account. Your items are still in your cart.
        </p>

        <div className="space-y-3">
          <Link 
            href="/checkout"
            className="w-full bg-primary hover:bg-blue-600 text-white py-3 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            Return to Checkout
          </Link>
          
          <Link 
            href="/cart"
            className="w-full bg-slate-100 hover:bg-slate-200 text-slate-900 py-3 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2"
          >
            <ShoppingCart className="w-5 h-5" />
            View Cart
          </Link>
          
          <Link 
            href="/"
            className="w-full text-slate-600 hover:text-slate-900 py-2 font-medium transition-colors block"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
