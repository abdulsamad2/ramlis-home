"use client";

import Image from "next/image";
import Link from "next/link";
import { useWishlist } from "@/lib/wishlist-context";
import { useCart } from "@/lib/cart-context";
import { Heart, ShoppingCart, ArrowRight, Trash2 } from "lucide-react";
import { truncateTitle } from "@/lib/utils";

export default function WishlistPage() {
  const { state, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();
  const wishlistItems = state.items;

  const handleAddToCart = (product: any) => {
    addToCart(product);
    removeFromWishlist(product.id);
  };

  return (
    <div className="min-h-screen bg-slate-50/50 py-12">
      <div className="container-width">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold font-heading">My Wishlist</h1>
          {wishlistItems.length > 0 && (
            <button
              onClick={clearWishlist}
              className="text-slate-600 hover:text-red-600 transition-colors text-sm font-medium"
            >
              Clear All
            </button>
          )}
        </div>

        {wishlistItems.length === 0 ? (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-12 h-12 text-pink-400" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Your wishlist is empty</h2>
              <p className="text-slate-600 mb-8">
                Save items you love to your wishlist for later.
              </p>
              <Link 
                href="/products"
                className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary/90 transition-colors"
              >
                Continue Shopping
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlistItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden group hover:shadow-lg transition-all duration-300"
              >
                <div className="relative aspect-square overflow-hidden bg-slate-50">
                  <Image
                    src={item.image || "/placeholder-product.jpg"}
                    alt={item.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <button
                    onClick={() => removeFromWishlist(item.id)}
                    className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-sm hover:bg-white hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="p-4">
                  <Link href={`/products/${item.id}`}>
                    <h3 className="font-semibold text-lg text-slate-900 mb-2 line-clamp-1 hover:text-primary transition-colors" title={item.name}>
                      {truncateTitle(item.name, 45)}
                    </h3>
                  </Link>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xl text-slate-900">
                        ${item.price.toFixed(2)}
                      </span>
                      {item.originalPrice && (
                        <span className="text-sm text-slate-500 line-through">
                          ${item.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => handleAddToCart(item)}
                    className="w-full py-2.5 bg-primary hover:bg-primary/90 text-white rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}