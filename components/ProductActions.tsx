'use client';

import { useState } from 'react';
import { ShoppingCart, Heart, Share2 } from 'lucide-react';
import { useCart } from '@/lib/cart-context';
import { useToast } from '@/lib/toast-context';
import { Product } from '@/lib/types';

interface ProductActionsProps {
  product: Product;
}

export default function ProductActions({ product }: ProductActionsProps) {
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const { addToCart } = useCart();
  const { success, error, info } = useToast();

  const handleAddToCart = async () => {
    setIsAddingToCart(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate loading
      addToCart(product);
      success(`${product.name} added to cart!`);
    } catch (err) {
      error('Failed to add item to cart');
    } finally {
      setIsAddingToCart(false);
    }
  };

  const handleAddToWishlist = () => {
    info('Wishlist feature coming soon!');
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: product.description,
          url: window.location.href,
        });
      } catch (error) {
        // User cancelled or error occurred
      }
    } else {
      // Fallback: copy to clipboard
      try {
        await navigator.clipboard.writeText(window.location.href);
        success('Product link copied to clipboard!');
      } catch (err) {
        error('Failed to share product');
      }
    }
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-10">
      <button 
        onClick={handleAddToCart}
        disabled={isAddingToCart}
        className="flex-1 bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-blue-400 disabled:to-blue-500 text-white h-14 rounded-xl font-bold text-lg shadow-lg shadow-blue-500/20 active:scale-[0.98] transition-all flex items-center justify-center gap-3"
      >
        <ShoppingCart className={`w-5 h-5 ${isAddingToCart ? 'animate-pulse' : ''}`} />
        {isAddingToCart ? 'Adding...' : 'Add to Cart'}
      </button>
      <div className="flex gap-4">
        <button 
          onClick={handleAddToWishlist}
          className="h-14 w-14 flex items-center justify-center rounded-xl border-2 border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50 transition-colors"
        >
          <Heart className="w-6 h-6" />
        </button>
        <button 
          onClick={handleShare}
          className="h-14 w-14 flex items-center justify-center rounded-xl border-2 border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50 transition-colors"
        >
          <Share2 className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}