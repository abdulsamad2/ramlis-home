'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/lib/types';
import { ShoppingCart, Star, Heart, Check } from 'lucide-react';
import { cn, truncateTitle } from '@/lib/utils';
import { useCart } from '@/lib/cart-context';
import { useWishlist } from '@/lib/wishlist-context';
import { useState } from 'react';
import ProductImageWatermark from './ProductImageWatermark';

interface ProductCardProps {
  product: Product;
  className?: string;
  viewMode?: 'grid' | 'list';
}

export default function ProductCard({ product, className, viewMode = 'grid' }: ProductCardProps) {
  const { addToCart, state } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [isAdding, setIsAdding] = useState(false);
  const [justAdded, setJustAdded] = useState(false);
  
  const discountPercentage = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    setIsAdding(true);
    
    // Add slight delay for better UX
    await new Promise(resolve => setTimeout(resolve, 200));
    
    addToCart(product);
    setIsAdding(false);
    setJustAdded(true);
    
    // Reset the "just added" state after animation
    setTimeout(() => setJustAdded(false), 2000);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const inWishlist = isInWishlist(product.id);

  if (viewMode === 'list') {
    return (
      <div className={cn(
        "group relative bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-200 flex",
        className
      )}>
        {/* Product Image */}
        <div className="relative w-48 h-48 flex-shrink-0">
          <Link href={`/products/${product.id}`} className="block relative w-full h-full overflow-hidden">
            <Image
              src={product.image || '/placeholder-product.jpg'}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="200px"
            />
            <ProductImageWatermark />
          </Link>
          
          {/* Badges */}
          <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
            {product.isOnSale && (
              <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                -{discountPercentage}%
              </span>
            )}
            {product.isPopular && (
              <span className="bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                Popular
              </span>
            )}
          </div>
        </div>

        {/* Product Info */}
        <div className="flex-1 p-6 flex flex-col">
          <div className="flex-1">
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide font-medium mb-1">
                  {product.category.replace('-', ' ')}
                </p>
                <Link href={`/products/${product.id}`}>
                  <h3 className="text-lg font-semibold text-gray-900 hover:text-purple-600 transition-colors mb-2" title={product.name}>
                    {truncateTitle(product.name, 50)}
                  </h3>
                </Link>
              </div>
              
              {/* Wishlist Button */}
              <button 
                onClick={handleToggleWishlist}
                className={cn(
                  "p-2 rounded-full transition-colors",
                  inWishlist ? "text-red-500 bg-red-50" : "text-gray-400 hover:text-red-500 hover:bg-red-50"
                )}
              >
                <Heart className={cn("w-5 h-5", inWishlist && "fill-current")} />
              </button>
            </div>

            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
              {product.description}
            </p>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "w-4 h-4",
                      i < Math.floor(product.rating) ? "fill-current" : "text-gray-300"
                    )}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600">({product.reviews} reviews)</span>
            </div>
          </div>

          {/* Price and Actions */}
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              {product.originalPrice && (
                <span className="text-sm text-gray-500 line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
              <span className="text-2xl font-bold text-purple-600">
                ${product.price.toFixed(2)}
              </span>
            </div>
            
            <button 
              onClick={handleAddToCart}
              disabled={isAdding}
              className={cn(
                "px-6 py-2 rounded-lg font-semibold transition-all flex items-center gap-2 min-w-[120px] justify-center",
                justAdded 
                  ? "bg-green-600 text-white" 
                  : "bg-purple-600 text-white hover:bg-purple-700",
                isAdding && "opacity-75 cursor-not-allowed"
              )}
            >
              {isAdding ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Adding...
                </>
              ) : justAdded ? (
                <>
                  <Check className="w-4 h-4" />
                  Added!
                </>
              ) : (
                <>
                  <ShoppingCart className="w-4 h-4" />
                  Add to Cart
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Grid view (default)
  return (
    <div className={cn(
      "group relative bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-200",
      className
    )}>
      {/* Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
        {product.isOnSale && (
          <span className="bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-sm">
            Save {discountPercentage}%
          </span>
        )}
        {product.isPopular && (
          <span className="bg-orange-500 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-sm">
            Hot
          </span>
        )}
      </div>

      {/* Wishlist Button */}
      <button 
        onClick={handleToggleWishlist}
        className={cn(
          "absolute top-3 right-3 z-10 p-2.5 bg-white/90 backdrop-blur-md rounded-full shadow-sm hover:shadow-md hover:bg-white transition-all opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 duration-300",
          inWishlist ? "text-red-500" : "text-gray-400 hover:text-red-500"
        )}
      >
        <Heart className={cn("w-4 h-4", inWishlist && "fill-current")} />
      </button>

      {/* Product Image */}
      <Link href={`/products/${product.id}`} className="block relative aspect-square overflow-hidden bg-gray-50">
        <Image
          src={product.image || '/placeholder-product.jpg'}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <ProductImageWatermark />
        {/* Quick Add Overlay */}
        <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out bg-gradient-to-t from-black/60 to-transparent">
          <button 
            onClick={handleAddToCart}
            disabled={isAdding}
            className={cn(
              "w-full py-2.5 rounded-lg font-semibold text-sm transition-all shadow-lg flex items-center justify-center gap-2 min-h-[42px]",
              justAdded 
                ? "bg-green-600 text-white" 
                : "bg-white text-gray-900 hover:bg-purple-600 hover:text-white",
              isAdding && "opacity-75 cursor-not-allowed"
            )}
          >
            {isAdding ? (
              <>
                <div className="w-4 h-4 border-2 border-gray-900 border-t-transparent rounded-full animate-spin" />
                Adding...
              </>
            ) : justAdded ? (
              <>
                <Check className="w-4 h-4" />
                Added!
              </>
            ) : (
              <>
                <ShoppingCart className="w-4 h-4" />
                Add to Cart
              </>
            )}
          </button>
        </div>
      </Link>

      {/* Product Info */}
      <div className="p-5">
        <div className="mb-2">
          <p className="text-xs text-gray-500 uppercase tracking-wider font-medium mb-1">
            {product.category.replace('-', ' ')}
          </p>
          <Link href={`/products/${product.id}`}>
            <h3 className="text-xl font-semibold text-slate-900 mb-2 line-clamp-2 hover:text-purple-600 transition-colors" title={product.name}>
              {truncateTitle(product.name, 65)}
            </h3>
          </Link>
        </div>
        
        {/* Rating */}
        <div className="flex items-center gap-1.5 mb-3">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={cn(
                  "w-3.5 h-3.5",
                  i < Math.floor(product.rating) ? "fill-current" : "text-gray-300"
                )}
              />
            ))}
          </div>
          <span className="text-xs text-gray-600 font-medium">({product.reviews})</span>
        </div>

        {/* Price */}
        <div className="flex items-end justify-between mt-auto">
          <div className="flex flex-col">
            {product.originalPrice && (
              <span className="text-xs text-gray-500 line-through mb-0.5">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
            <span className="text-xl font-bold text-purple-600">
              ${product.price.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}