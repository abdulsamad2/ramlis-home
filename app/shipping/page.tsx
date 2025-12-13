import { Metadata } from 'next';
import { Truck, RotateCcw, Package, Clock, MapPin, CreditCard } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Shipping & Returns | Ramli\'s Home',
  description: 'Learn about our shipping options, delivery times, and return policy.',
};

export default function ShippingReturnsPage() {
  return (
    <div className="min-h-screen bg-slate-50/50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-emerald-600 text-white py-16">
        <div className="container-width">
          <div className="flex items-center gap-4 mb-4">
            <Truck className="h-8 w-8" />
            <h1 className="text-3xl md:text-4xl font-bold font-heading">Shipping & Returns</h1>
          </div>
          <p className="text-green-100 text-lg max-w-2xl">
            Fast, reliable shipping and hassle-free returns for your peace of mind.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container-width max-w-6xl">
          
          {/* Shipping Section */}
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8 md:p-12 mb-12">
            <div className="flex items-center gap-3 mb-8">
              <Truck className="h-8 w-8 text-primary" />
              <h2 className="text-3xl font-bold font-heading">Shipping Information</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {/* Shipping Options */}
              <div>
                <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  Shipping Options
                </h3>
                
                <div className="space-y-4">
                  <div className="border border-slate-200 rounded-xl p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-semibold">Standard Shipping</h4>
                      <span className="text-green-600 font-medium">FREE</span>
                    </div>
                    <p className="text-slate-600 text-sm mb-2">5-7 business days</p>
                    <p className="text-slate-700">Free on orders over $50</p>
                  </div>
                  
                  <div className="border border-slate-200 rounded-xl p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-semibold">Express Shipping</h4>
                      <span className="font-medium">$9.99</span>
                    </div>
                    <p className="text-slate-600 text-sm mb-2">2-3 business days</p>
                    <p className="text-slate-700">Available for most locations</p>
                  </div>
                  
                  <div className="border border-slate-200 rounded-xl p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-semibold">Next Day Delivery</h4>
                      <span className="font-medium">$19.99</span>
                    </div>
                    <p className="text-slate-600 text-sm mb-2">1 business day</p>
                    <p className="text-slate-700">Order by 2 PM for next day delivery</p>
                  </div>
                </div>
              </div>

              {/* Shipping Zones */}
              <div>
                <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  Shipping Zones
                </h3>
                
                <div className="space-y-4">
                  <div className="border border-slate-200 rounded-xl p-4">
                    <h4 className="font-semibold mb-2">Domestic (US)</h4>
                    <p className="text-slate-700">All 50 states including Alaska and Hawaii</p>
                    <p className="text-sm text-slate-600 mt-1">Standard rates apply</p>
                  </div>
                  
                  <div className="border border-slate-200 rounded-xl p-4">
                    <h4 className="font-semibold mb-2">Canada</h4>
                    <p className="text-slate-700">All provinces and territories</p>
                    <p className="text-sm text-slate-600 mt-1">Additional customs fees may apply</p>
                  </div>
                  
                  <div className="border border-slate-200 rounded-xl p-4">
                    <h4 className="font-semibold mb-2">International</h4>
                    <p className="text-slate-700">Select countries worldwide</p>
                    <p className="text-sm text-slate-600 mt-1">7-21 business days, customs fees may apply</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Processing Time */}
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-3 flex items-center gap-2">
                <Package className="h-5 w-5" />
                Processing Time
              </h3>
              <p className="text-blue-800">
                Orders placed before 2 PM EST (Monday-Friday) ship the same day. 
                Orders placed after 2 PM or on weekends ship the next business day.
              </p>
            </div>
          </div>

          {/* Returns Section */}
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8 md:p-12">
            <div className="flex items-center gap-3 mb-8">
              <RotateCcw className="h-8 w-8 text-primary" />
              <h2 className="text-3xl font-bold font-heading">Returns & Exchanges</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              {/* Return Policy */}
              <div>
                <h3 className="text-xl font-semibold mb-6">30-Day Return Policy</h3>
                
                <div className="space-y-4 text-slate-700">
                  <p>We want you to be completely satisfied with your purchase. If you're not happy with your order, you can return it within 30 days of delivery for a full refund or exchange.</p>
                  
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                      <p>Items must be in original condition with all packaging</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                      <p>Items must be unused and in resellable condition</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                      <p>Original receipt or order confirmation required</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Return Process */}
              <div>
                <h3 className="text-xl font-semibold mb-6">How to Return</h3>
                
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm flex-shrink-0">1</div>
                    <div>
                      <h4 className="font-medium mb-1">Start Your Return</h4>
                      <p className="text-slate-600 text-sm">Log into your account and select the order you want to return</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm flex-shrink-0">2</div>
                    <div>
                      <h4 className="font-medium mb-1">Print Return Label</h4>
                      <p className="text-slate-600 text-sm">We'll email you a prepaid return shipping label</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm flex-shrink-0">3</div>
                    <div>
                      <h4 className="font-medium mb-1">Pack & Ship</h4>
                      <p className="text-slate-600 text-sm">Pack your items securely and drop off at any UPS location</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm flex-shrink-0">4</div>
                    <div>
                      <h4 className="font-medium mb-1">Get Your Refund</h4>
                      <p className="text-slate-600 text-sm">Refund processed within 3-5 business days of receipt</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Refund Information */}
            <div className="border-t border-slate-200 pt-8">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <CreditCard className="h-8 w-8 text-green-600" />
                  </div>
                  <h4 className="font-semibold mb-2">Refund Method</h4>
                  <p className="text-slate-600 text-sm">Refunds are processed to your original payment method</p>
                </div>
                
                <div className="text-center">
                  <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Clock className="h-8 w-8 text-blue-600" />
                  </div>
                  <h4 className="font-semibold mb-2">Processing Time</h4>
                  <p className="text-slate-600 text-sm">3-5 business days after we receive your return</p>
                </div>
                
                <div className="text-center">
                  <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Package className="h-8 w-8 text-purple-600" />
                  </div>
                  <h4 className="font-semibold mb-2">Free Returns</h4>
                  <p className="text-slate-600 text-sm">We cover return shipping costs for defective items</p>
                </div>
              </div>
            </div>

            {/* Special Cases */}
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 mt-8">
              <h3 className="text-lg font-semibold text-amber-900 mb-3">Special Circumstances</h3>
              <div className="text-amber-800 space-y-2">
                <p><strong>Damaged Items:</strong> Contact us within 48 hours of delivery with photos</p>
                <p><strong>Wrong Item:</strong> We'll arrange immediate replacement at no cost to you</p>
                <p><strong>Large Items:</strong> Special return arrangements may apply for oversized products</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}