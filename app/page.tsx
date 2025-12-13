'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Truck, Shield, Award, Headphones } from 'lucide-react';
import HeroCarousel from '@/components/HeroCarousel';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/lib/types';

function Feature({ icon: Icon, title, desc }: { icon: any, title: string, desc: string }) {
  return (
    <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 text-primary">
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="font-heading font-semibold text-lg mb-2">{title}</h3>
      <p className="text-muted-foreground text-sm">{desc}</p>
    </div>
  );
}

export default function Home() {
  const [popularProducts, setPopularProducts] = useState<Product[]>([]);
  const [saleProducts, setSaleProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "Premium Kitchen Products & Home Essentials | Ramlis Home";
  }, []);

  useEffect(() => {
    async function loadProducts() {
      try {
        const [popularRes, saleRes] = await Promise.all([
          fetch('/api/products?popular=true'),
          fetch('/api/products?onSale=true')
        ]);
        
        if (popularRes.ok && saleRes.ok) {
          const popularData = await popularRes.json();
          const saleData = await saleRes.json();
          
          setPopularProducts(popularData.slice(0, 8));
          setSaleProducts(saleData.slice(0, 4));
        }
      } catch (error) {
        console.error('Failed to load products:', error);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50/50">
        <HeroCarousel />

      {/* Features Grid */}
      <section className="py-12 bg-white border-b border-slate-100">
        <div className="container-width">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Feature icon={Truck} title="Free Shipping" desc="On all orders over $99" />
            <Feature icon={Shield} title="Secure Payment" desc="100% secure transactions" />
            <Feature icon={Award} title="Premium Quality" desc="Authentic top-tier brands" />
            <Feature icon={Headphones} title="24/7 Support" desc="Expert assistance anytime" />
          </div>
        </div>
      </section>

      {/* Featured Collection */}
      <section className="py-20">
        <div className="container-width">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold font-heading mb-3">Trending Now</h2>
              <p className="text-muted-foreground text-lg">Curated essentials for your modern home.</p>
            </div>
            <Link 
              href="/products" 
              className="group flex items-center gap-2 text-primary font-semibold hover:text-primary/80 transition-colors"
            >
              View All Products
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {Array(8).fill(0).map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gray-200 aspect-square rounded-lg mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {popularProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Promotional Banner */}
      <section className="py-20 bg-slate-900 text-white overflow-hidden relative">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1556910103-1c02745a30bf?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/90 to-transparent" />
        
        <div className="container-width relative z-10">
          <div className="max-w-2xl">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/20 text-primary-foreground text-sm font-semibold mb-6 border border-primary/20">
              Limited Time Offer
            </span>
            <h2 className="text-4xl md:text-5xl font-bold font-heading mb-6 leading-tight">
              Upgrade Your Kitchen <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-foreground to-primary">
                With Professional Gear
              </span>
            </h2>
            <p className="text-lg text-slate-300 mb-8 leading-relaxed max-w-xl">
              Get up to 50% off on selected premium cookware sets. Elevate your culinary skills with the best tools in the industry.
            </p>
            <Link 
              href="/products?on_sale=true"
              className="inline-flex items-center justify-center h-14 px-8 text-lg font-semibold text-slate-900 transition-all bg-white rounded-full hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-white"
            >
              Shop Sale Items
            </Link>
          </div>
        </div>
      </section>

      {/* On Sale Section */}
      <section className="py-20 bg-white">
        <div className="container-width">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">Exclusive Deals</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Don't miss out on these limited-time offers on our best-selling items.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {saleProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
