import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { cn } from "@/lib/utils";
import { CartProvider } from "@/lib/cart-context";
import { WishlistProvider } from "@/lib/wishlist-context";
import { UserProvider } from "@/lib/user-context";
import { ToastProvider } from "@/lib/toast-context";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-heading" });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: {
    template: "%s | RAMLISHOME™ - Premium Kitchen Products",
    default: "RAMLISHOME™ - Premium Kitchen Products & Appliances"
  },
  description: "Explore premium kitchen tools and home goods at RAMLISHOME™. From reusable air fryer liners to artisan essentials — designed for everyday durability.",
  keywords: ["kitchen products", "cookware", "kitchen appliances", "home essentials", "premium kitchen", "cooking equipment"],
  authors: [{ name: "RAMLISHOME" }],
  creator: "RAMLISHOME",
  publisher: "RAMLISHOME",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
    siteName: "RAMLISHOME™",
    title: "RAMLISHOME™ - Premium Kitchen Products & Appliances",
    description: "Explore premium kitchen tools and home goods at RAMLISHOME™. From reusable air fryer liners to artisan essentials — designed for everyday durability.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "RAMLISHOME - Premium Kitchen Products",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@ramlishome",
    creator: "@ramlishome",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "google-site-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased flex flex-col",
          inter.variable,
          outfit.variable
        )}
      >
        <UserProvider>
          <ToastProvider>
            <CartProvider>
              <WishlistProvider>
                <Header />
                <main className="flex-grow">{children}</main>
                <Footer />
              </WishlistProvider>
            </CartProvider>
          </ToastProvider>
        </UserProvider>
      </body>
    </html>
  );
}
