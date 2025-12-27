'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { 
  Menu, 
  X, 
  ShoppingCart, 
  User, 
  Heart,
  Home,
  Package,
  Grid3X3,
  Tag,
  Info,
  MessageCircle,
  Bell,
  Phone
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useCart } from '@/lib/cart-context';
import { useWishlist } from '@/lib/wishlist-context';
import { useUser } from '@/lib/user-context';
import CartDrawer from './CartDrawer';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { getItemsCount: getCartCount, toggleCart } = useCart();
  const { getItemsCount: getWishlistCount } = useWishlist();
  const { user, isAuthenticated, logout } = useUser();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => setIsMenuOpen(false);

  const navLinks = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/products', label: 'Products', icon: Package },
    { href: '/categories', label: 'Categories', icon: Grid3X3 },
    { href: '/products?filter=sale', label: 'Hot Deals', icon: Tag, badge: 'Hot' },
    { href: '/about', label: 'About', icon: Info },
    { href: '/contact', label: 'Contact', icon: MessageCircle },
  ];

  return (
    <>
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white text-center py-2.5 text-sm font-medium relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10 flex items-center justify-center gap-4 sm:gap-8">
          <span className="hidden sm:flex items-center gap-2">
            <Bell className="h-4 w-4" />
            🔥 Free shipping on orders over $50
          </span>
          <span className="font-bold animate-pulse">Use code: KITCHEN20 for 20% off!</span>
          <span className="hidden md:flex items-center gap-1">
            <Phone className="h-4 w-4" />
            24/7 Support
          </span>
        </div>
      </div>

      {/* Main Header */}
      <header className={`sticky top-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-xl shadow-2xl border-b border-gray-200' 
          : 'bg-white shadow-lg'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo Section */}
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="group transition-transform hover:scale-105">
                <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                  RAMLISHOME™
                </h1>
              </Link>
            </div>

            {/* Navigation Links - Desktop */}
            <nav className="hidden xl:flex items-center space-x-1">
              {navLinks.map((link) => {
                const IconComponent = link.icon;
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`group relative flex items-center space-x-2 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                      isActive 
                        ? 'text-orange-600 bg-orange-50 shadow-md' 
                        : 'text-gray-700 hover:text-orange-600 hover:bg-orange-50'
                    }`}
                  >
                    <IconComponent className="h-4 w-4 group-hover:scale-110 transition-transform" />
                    <span>{link.label}</span>
                    {link.badge && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full font-bold animate-bounce">
                        {link.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Action Buttons */}
            <div className="flex items-center space-x-2">
              {/* Notifications - Desktop Only */}
              <button className="hidden md:flex relative p-2.5 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200 group">
                <Bell className="h-5 w-5 group-hover:scale-110 transition-transform" />
                <span className="absolute -top-1 -right-1 bg-blue-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center font-bold animate-pulse">
                  5
                </span>
              </button>

              {/* Wishlist */}
              <Link 
                href="/wishlist"
                className="relative p-2.5 text-gray-600 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all duration-200 group"
              >
                <Heart className="h-5 w-5 group-hover:scale-110 transition-transform" />
                {getWishlistCount() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center font-bold">
                    {getWishlistCount()}
                  </span>
                )}
              </Link>

              {/* User Account */}
              <Link 
                href={isAuthenticated ? "/account" : "/account/login"}
                className="hidden sm:flex items-center space-x-2 p-2.5 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-xl transition-all duration-200 group"
              >
                <User className="h-5 w-5 group-hover:scale-110 transition-transform" />
                <span className="hidden lg:block text-sm font-semibold">
                  {isAuthenticated ? (user?.firstName || 'Account') : 'Account'}
                </span>
              </Link>

              {/* Shopping Cart */}
              <button 
                onClick={toggleCart}
                className="relative flex items-center space-x-2 p-2.5 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-xl transition-all duration-200 group shadow-lg hover:shadow-xl"
              >
                <ShoppingCart className="h-5 w-5 group-hover:scale-110 transition-transform" />
                <span className="hidden lg:block text-sm font-semibold">Cart</span>
                {getCartCount() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-yellow-400 text-gray-900 rounded-full text-xs w-6 h-6 flex items-center justify-center font-bold animate-bounce shadow-lg">
                    {getCartCount()}
                  </span>
                )}
              </button>

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`xl:hidden p-2.5 rounded-xl transition-all duration-200 ${
                  isMenuOpen 
                    ? 'bg-orange-100 text-orange-600 shadow-md' 
                    : 'text-gray-600 hover:text-orange-600 hover:bg-orange-50'
                }`}
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className={`xl:hidden transition-all duration-500 ease-in-out ${
            isMenuOpen 
              ? 'max-h-screen opacity-100 pb-6' 
              : 'max-h-0 opacity-0 overflow-hidden'
          }`}>
            <div className="py-6 space-y-6 bg-white border-t border-gray-100">
                            {/* Mobile Navigation Links */}
              <div className="space-y-2">
                {navLinks.map((link) => {
                  const IconComponent = link.icon;
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={closeMenu}
                      className={`relative flex items-center space-x-4 px-4 py-4 rounded-xl transition-all duration-200 mx-1 ${
                        isActive 
                          ? 'text-orange-600 bg-orange-50 shadow-md' 
                          : 'text-gray-700 hover:text-orange-600 hover:bg-orange-50'
                      }`}
                    >
                      <IconComponent className="h-6 w-6" />
                      <span className="font-semibold">{link.label}</span>
                      {link.badge && (
                        <span className="ml-auto bg-red-500 text-white text-xs px-2 py-1 rounded-full font-bold animate-pulse">
                          {link.badge}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>

              {/* Mobile Action Buttons */}
              <div className="flex justify-around items-center pt-6 border-t border-gray-200 mx-4">
                <button 
                  onClick={closeMenu}
                  className="flex flex-col items-center space-y-2 p-4 text-gray-600 hover:text-blue-500 transition-colors group"
                >
                  <div className="relative">
                    <Bell className="h-7 w-7 group-hover:scale-110 transition-transform" />
                    <span className="absolute -top-1 -right-1 bg-blue-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">2</span>
                  </div>
                  <span className="text-xs font-semibold">Alerts</span>
                </button>

                <Link
                  href="/wishlist"
                  onClick={closeMenu}
                  className="flex flex-col items-center space-y-2 p-4 text-gray-600 hover:text-red-500 transition-colors group"
                >
                  <div className="relative">
                    <Heart className="h-7 w-7 group-hover:scale-110 transition-transform" />
                    {getWishlistCount() > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">{getWishlistCount()}</span>
                    )}
                  </div>
                  <span className="text-xs font-semibold">Wishlist</span>
                </Link>

                <Link 
                  href={isAuthenticated ? "/account" : "/account/login"}
                  onClick={closeMenu}
                  className="flex flex-col items-center space-y-2 p-4 text-gray-600 hover:text-purple-500 transition-colors group"
                >
                  <User className="h-7 w-7 group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-semibold">Account</span>
                </Link>

                <button 
                  onClick={() => {
                    toggleCart();
                    closeMenu();
                  }}
                  className="relative flex flex-col items-center space-y-2 p-4 text-gray-600 hover:text-green-500 transition-colors group"
                >
                  <div className="relative">
                    <ShoppingCart className="h-7 w-7 group-hover:scale-110 transition-transform" />
                    {getCartCount() > 0 && (
                      <span className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full text-xs w-6 h-6 flex items-center justify-center font-bold">{getCartCount()}</span>
                    )}
                  </div>
                  <span className="text-xs font-semibold">Cart</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>
      
      <CartDrawer />
    </>
  );
}