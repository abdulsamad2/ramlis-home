import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getProductById, getCategoryById, getProductsByCategory } from '@/lib/database';
import ProductCard from '@/components/ProductCard';
import ProductActions from '@/components/ProductActions';
import { ArrowLeft, Star, Truck, Shield, RotateCcw, Check } from 'lucide-react';
import { cn, truncateTitle } from '@/lib/utils';

interface ProductPageProps {
  params: Promise<{
    productId: string;
  }>;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { productId } = await params;
  const product = getProductById(productId);
  
  if (!product) {
    return {
      title: 'Product Not Found | Ramlis Home - Premium Kitchen Products',
      description: 'The product you are looking for could not be found.',
    };
  }

  return {
    title: `${product.name} | Ramlis Home - Premium Kitchen Products`,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [
        {
          url: product.image,
          width: 800,
          height: 600,
          alt: product.name,
        },
      ],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { productId } = await params;
  const product = getProductById(productId);
  
  if (!product) {
    notFound();
  }

  const category = getCategoryById(product.category);
  const allCategoryProducts = getProductsByCategory(product.category);
  const relatedProducts = allCategoryProducts
    .filter(p => p.id !== product.id)
    .slice(0, 4);

  const discountPercentage = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
      <div className="min-h-screen bg-slate-50/50 pb-20">
        {/* Breadcrumb - Clean & Simple */}
      <nav className="bg-white border-b border-slate-100">
        <div className="container-width py-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <span className="text-slate-300">/</span>
            <Link href="/products" className="hover:text-primary transition-colors">Shop</Link>
            <span className="text-slate-300">/</span>
            <span className="font-medium text-foreground truncate max-w-[200px]">{product.name}</span>
          </div>
        </div>
      </nav>

      <main className="container-width pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Gallery Section */}
          <div className="space-y-4">
            <div className="relative aspect-square bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 group">
              <Image
                src={product.image || '/placeholder-product.jpg'}
                alt={product.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                priority
              />
              
              {/* Floating Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.isOnSale && (
                  <span className="bg-destructive text-white text-sm font-bold px-3 py-1.5 rounded-full shadow-lg backdrop-blur-md">
                    Save {discountPercentage}%
                  </span>
                )}
                {product.isPopular && (
                  <span className="bg-amber-500 text-white text-sm font-bold px-3 py-1.5 rounded-full shadow-lg">
                    Best Seller
                  </span>
                )}
              </div>
            </div>
            {/* Tiled thumbnails could go here if we had more images */}
          </div>

          {/* Product Details Section */}
          <div className="flex flex-col">
            <div className="mb-auto">
              <Link
                href={`/products?category=${product.category}`}
                className="text-sm font-medium text-primary mb-2 inline-block uppercase tracking-wider"
              >
                {category?.name}
              </Link>
              
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-heading text-slate-900 mb-4 leading-tight">
                {truncateTitle(product.name, 80)}
              </h1>

              {/* Rating Row */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "w-5 h-5",
                        i < Math.floor(product.rating) ? "text-amber-400 fill-current" : "text-slate-200"
                      )}
                    />
                  ))}
                </div>
                <span className="text-sm font-medium text-muted-foreground underline decoration-dashed underline-offset-4 cursor-pointer hover:text-primary transition-colors">
                  {product.reviews} verified reviews
                </span>
              </div>

              {/* Price Block */}
              <div className="p-6 rounded-2xl bg-slate-100/50 border border-slate-200/60 mb-8 backdrop-blur-sm">
                 <div className="flex items-end gap-3 mb-2">
                  <span className="text-4xl font-bold text-slate-900">
                    ${product.price.toFixed(2)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-xl text-muted-foreground line-through mb-1.5">
                      ${product.originalPrice.toFixed(2)}
                    </span>
                  )}
                 </div>
                 {product.isOnSale && (
                   <p className="text-sm text-destructive font-medium flex items-center gap-1.5">
                     <Check className="w-4 h-4" />
                     Lowest price in 30 days
                   </p>
                 )}
              </div>

              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                {product.description}
              </p>

              {/* Action Buttons */}
              <ProductActions product={product} />

              {/* Trust Badges */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-8 border-t border-slate-200">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-full bg-green-100 text-green-700">
                    <Truck className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-slate-900">Fast Delivery</span>
                    <span className="text-xs text-muted-foreground">Free over $75</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-full bg-blue-100 text-blue-700">
                    <Shield className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-slate-900">2-Year Warranty</span>
                    <span className="text-xs text-muted-foreground">Included free</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-full bg-orange-100 text-orange-700">
                    <RotateCcw className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-slate-900">Free Returns</span>
                    <span className="text-xs text-muted-foreground">30-day window</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="mt-24 py-16 bg-white border-t border-slate-100">
          <div className="container-width">
            <h2 className="text-2xl md:text-3xl font-bold font-heading mb-8">
              Others also bought
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}