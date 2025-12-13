'use client';

import { useCart } from '@/lib/cart-context';
import { X, ShoppingBag, Plus, Minus, Trash2 } from 'lucide-react';
import { cn, truncateTitle } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';

export default function CartDrawer() {
  const { state, toggleCart, removeFromCart, updateQuantity, getSubtotal } = useCart();

  // Close drawer on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        toggleCart();
      }
    };

    if (state.isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [state.isOpen, toggleCart]);

  if (!state.isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity"
        onClick={toggleCart}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 transform transition-transform flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold">
              Shopping Cart ({state.items.length})
            </h2>
          </div>
          <button
            onClick={toggleCart}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {state.items.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingBag className="h-16 w-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                Your cart is empty
              </h3>
              <p className="text-slate-600 mb-6">
                Add some items to get started
              </p>
              <Link
                href="/products"
                onClick={toggleCart}
                className="bg-primary hover:bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold transition-colors inline-block"
              >
                Start Shopping
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {state.items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 bg-slate-50 rounded-xl p-4"
                >
                  <div className="relative w-16 h-16 flex-shrink-0">
                    <Image
                      src={item.image || '/placeholder-product.jpg'}
                      alt={item.name}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-slate-900 text-sm line-clamp-2 mb-1" title={item.name}>
                      {truncateTitle(item.name, 35)}
                    </h3>
                    <p className="text-primary font-semibold text-sm">
                      ${item.price.toFixed(2)}
                    </p>
                    
                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 hover:bg-white rounded border border-slate-200 transition-colors"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="font-medium text-sm px-2">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 hover:bg-white rounded border border-slate-200 transition-colors"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                      
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-1 hover:bg-red-50 hover:text-red-600 rounded transition-colors ml-auto"
                      >
                        <Trash2 className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {state.items.length > 0 && (
          <div className="border-t border-slate-200 p-6 space-y-4">
            <div className="flex justify-between items-center text-lg font-semibold">
              <span>Subtotal:</span>
              <span className="text-primary">${getSubtotal().toFixed(2)}</span>
            </div>
            
            <div className="space-y-2">
              <Link
                href="/cart"
                onClick={toggleCart}
                className="w-full bg-slate-100 hover:bg-slate-200 text-slate-900 py-3 rounded-xl font-semibold text-center transition-colors block"
              >
                View Cart
              </Link>
              <Link
                href="/checkout"
                onClick={toggleCart}
                className="w-full bg-primary hover:bg-blue-600 text-white py-3 rounded-xl font-semibold text-center transition-colors block"
              >
                Checkout
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
}