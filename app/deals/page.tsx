import ProductCard from '@/components/ProductCard';
import { getDeals } from '@/lib/data';
import { Tag, Timer, Flame } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function DealsPage() {
  const deals = getDeals();

  return (
    <div className="min-h-screen bg-slate-50/50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-red-600 to-orange-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://picsum.photos/2070/800?random=2003')] bg-cover bg-center opacity-10 mix-blend-overlay" />
        <div className="container-width py-20 relative z-10 text-center">
          <div className="inline-flex items-center justify-center p-3 rounded-full bg-white/10 backdrop-blur-sm mb-6 border border-white/20">
            <Flame className="h-8 w-8 text-yellow-300 animate-pulse" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold font-heading mb-6 tracking-tight">
            Flash Deals & Offers
          </h1>
          <p className="text-xl text-red-50 mb-8 max-w-2xl mx-auto">
            Limited time savings on our most popular items. Grab them before they're gone!
          </p>
          <div className="flex justify-center items-center gap-2 text-lg font-medium bg-black/20 backdrop-blur-sm inline-flex px-6 py-2 rounded-full">
            <Timer className="h-5 w-5" />
            <span>Offers update daily</span>
          </div>
        </div>
      </section>

      {/* Deals Grid */}
      <section className="py-16">
        <div className="container-width">
          <div className="flex items-center gap-3 mb-10">
            <Tag className="h-6 w-6 text-destructive" />
            <h2 className="text-2xl font-bold font-heading text-slate-900">
              Live Discounts
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {deals.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          {deals.length === 0 && (
            <div className="text-center py-20 bg-white rounded-3xl border border-slate-100 shadow-sm">
              <Flame className="h-16 w-16 text-slate-200 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-900 mb-2">
                All deals claimed!
              </h3>
              <p className="text-muted-foreground">
                Check back tomorrow for fresh savings.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="bg-slate-900 text-white py-20">
        <div className="container-width text-center">
          <h2 className="text-3xl font-bold font-heading mb-4">
            Never Miss a Price Drop
          </h2>
          <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
            Join 50,000+ happy customers who get early access to our biggest sales.
          </p>
          <div className="max-w-md mx-auto flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-slate-900"
            />
            <button className="bg-primary hover:bg-blue-600 px-8 py-3 rounded-xl font-bold transition-colors shadow-lg shadow-blue-500/20">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}