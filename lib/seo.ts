import { DefaultSeoProps } from 'next-seo';

const SEO: DefaultSeoProps = {
  titleTemplate: '%s | Ramlis Home - Premium Kitchen Products',
  defaultTitle: 'Ramlis Home - Premium Kitchen Products & Appliances',
  description: 'Discover premium kitchen products, appliances, and essentials at Ramlis Home. Quality cookware, modern appliances, and kitchen accessories for your culinary adventures.',
  canonical: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    siteName: 'Ramlis Home',
    title: 'Ramlis Home - Premium Kitchen Products & Appliances',
    description: 'Discover premium kitchen products, appliances, and essentials at Ramlis Home. Quality cookware, modern appliances, and kitchen accessories for your culinary adventures.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Ramlis Home - Premium Kitchen Products',
      },
    ],
  },
  twitter: {
    cardType: 'summary_large_image',
    site: '@ramlishome',
    handle: '@ramlishome',
  },
  additionalMetaTags: [
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1',
    },
    {
      name: 'apple-mobile-web-app-capable',
      content: 'yes',
    },
    {
      name: 'theme-color',
      content: '#7c3aed',
    },
  ],
  additionalLinkTags: [
    {
      rel: 'icon',
      href: '/favicon.ico',
    },
    {
      rel: 'apple-touch-icon',
      href: '/apple-touch-icon.png',
      sizes: '180x180',
    },
    {
      rel: 'manifest',
      href: '/manifest.json',
    },
  ],
};

export default SEO;

// Page-specific SEO configurations
export const productsSEO = {
  title: 'Premium Kitchen Products & Appliances',
  description: 'Browse our extensive collection of premium kitchen products, cookware, appliances, and accessories. Find everything you need for your culinary adventures.',
  openGraph: {
    title: 'Premium Kitchen Products & Appliances | Ramlis Home',
    description: 'Browse our extensive collection of premium kitchen products, cookware, appliances, and accessories.',
    images: [
      {
        url: '/og-products.jpg',
        width: 1200,
        height: 630,
        alt: 'Ramlis Home Kitchen Products',
      },
    ],
  },
};

export const categorySEO = (categoryName: string, categoryDescription?: string) => ({
  title: `${categoryName} Products - Kitchen Essentials`,
  description: categoryDescription || `Discover our premium ${categoryName.toLowerCase()} collection. High-quality kitchen products and essentials for your home.`,
  openGraph: {
    title: `${categoryName} Products | Ramlis Home`,
    description: categoryDescription || `Premium ${categoryName.toLowerCase()} products and kitchen essentials.`,
  },
});

export const productSEO = (product: any) => ({
  title: `${product.name} - Premium Kitchen Product`,
  description: product.description || `${product.name} - High-quality kitchen product available at Ramlis Home. Premium quality and fast shipping.`,
  openGraph: {
    title: `${product.name} | Ramlis Home`,
    description: product.description || `${product.name} - Premium kitchen product`,
    images: [
      {
        url: product.image || '/og-product-default.jpg',
        width: 800,
        height: 600,
        alt: product.name,
      },
    ],
  },
  additionalMetaTags: [
    {
      name: 'product:price:amount',
      content: product.price?.toString() || '0',
    },
    {
      name: 'product:price:currency',
      content: 'USD',
    },
    {
      name: 'product:availability',
      content: 'in stock',
    },
  ],
});

export const dealsSEO = {
  title: 'Hot Deals & Sale Items - Kitchen Products on Sale',
  description: 'Find amazing deals on premium kitchen products. Limited-time offers on cookware, appliances, and kitchen essentials. Save big on quality products.',
  openGraph: {
    title: 'Hot Deals & Sale Items | Ramlis Home',
    description: 'Amazing deals on premium kitchen products. Limited-time offers and big savings.',
    images: [
      {
        url: '/og-deals.jpg',
        width: 1200,
        height: 630,
        alt: 'Ramlis Home Hot Deals',
      },
    ],
  },
};