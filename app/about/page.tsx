import Image from "next/image";
import { Building2, Handshake, Globe2, Truck } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-50/50">
      {/* Hero Section */}
      <section className="relative py-20 bg-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://picsum.photos/2070/800?random=2001')] bg-cover bg-center opacity-20" />
        <div className="container-width relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold font-heading mb-6">Our Story</h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Building the future of premium home retail, one partnership at a time.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="container-width">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold font-heading text-slate-900">
                Redefining Home Essentials
              </h2>
              <div className="prose prose-slate text-lg text-muted-foreground">
                <p>
                  At Ramlis Home, we believe that quality is the foundation of a happy home. 
                  Started with a simple mission to provide professional-grade kitchenware to home cooks, 
                  we have grown into a trusted destination for premium home goods.
                </p>
                <p>
                  Our selection is carefully curated to ensure durability, aesthetics, and performance. 
                  We don't just sell products; we sell the experience of a well-equipped home.
                </p>
              </div>
            </div>
            <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="https://picsum.photos/800/400?random=2002"
                alt="Modern kitchen"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Wholesale Vision */}
      <section className="py-20 bg-white border-y border-slate-100">
        <div className="container-width">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-primary font-semibold tracking-wider uppercase text-sm">Future Growth</span>
            <h2 className="text-3xl md:text-4xl font-bold font-heading mt-2 mb-4">
              Expanding Our Horizons
            </h2>
            <p className="text-muted-foreground text-lg">
              We are actively working on securing retail licenses from major global wholesalers to bring you an even wider range of exclusive products at unbeatable prices.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100 text-center hover:shadow-lg transition-all">
              <div className="h-14 w-14 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mx-auto mb-6">
                <Handshake className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold mb-3">Strategic Partnerships</h3>
              <p className="text-muted-foreground">
                Forging strong relationships with top-tier manufacturers and wholesalers.
              </p>
            </div>
            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100 text-center hover:shadow-lg transition-all">
              <div className="h-14 w-14 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto mb-6">
                <Globe2 className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold mb-3">Global Sourcing</h3>
              <p className="text-muted-foreground">
                Identifying and importing unique home goods from around the world.
              </p>
            </div>
            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100 text-center hover:shadow-lg transition-all">
              <div className="h-14 w-14 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center mx-auto mb-6">
                <Truck className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold mb-3">Distribution Network</h3>
              <p className="text-muted-foreground">
                Building a robust supply chain to ensure faster delivery and better stock availability.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats/Company Info */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="container-width">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-slate-800">
            <div className="p-4">
              <div className="text-4xl font-bold text-primary mb-2">2024</div>
              <div className="text-slate-400">Founded</div>
            </div>
            <div className="p-4">
              <div className="text-4xl font-bold text-primary mb-2">1000+</div>
              <div className="text-slate-400">Curated Products</div>
            </div>
            <div className="p-4">
              <div className="text-4xl font-bold text-primary mb-2">50+</div>
              <div className="text-slate-400">Partner Brands</div>
            </div>
            <div className="p-4">
              <div className="text-4xl font-bold text-primary mb-2">24/7</div>
              <div className="text-slate-400">Customer Support</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
