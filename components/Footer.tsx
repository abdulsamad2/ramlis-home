import Link from 'next/link';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white border-t border-slate-800">
      <div className="container-width py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="font-heading font-bold text-xl">RAMLISHOME™</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Explore premium kitchen tools and home goods at RAMLISHOME™. From reusable air fryer liners to artisan essentials — designed for everyday durability.
            </p>
            <div className="flex gap-4 pt-2">
              {[Facebook, Twitter, Instagram].map((Icon, i) => (
                <Link key={i} href="#" className="h-10 w-10 flex items-center justify-center rounded-full bg-slate-800 text-slate-400 hover:bg-primary hover:text-white transition-all">
                  <Icon className="h-5 w-5" />
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading font-bold text-lg mb-6">Explore</h3>
            <ul className="space-y-3">
              {[
                { label: 'Shop All', href: '/products' },
                { label: 'New Arrivals', href: '/products?new=true' },
                { label: 'Featured Deals', href: '/products?on_sale=true' },
                { label: 'About Us', href: '/about' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-slate-400 hover:text-white hover:translate-x-1 transition-all inline-block">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-heading font-bold text-lg mb-6">Support</h3>
            <ul className="space-y-3">
              {[
                { label: 'Help Center', href: '/help' },
                { label: 'Contact Us', href: '/contact' },
                { label: 'Shipping & Returns', href: '/shipping' },
                { label: 'Track Order', href: '/track-order' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-slate-400 hover:text-white hover:translate-x-1 transition-all inline-block">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-heading font-bold text-lg mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-slate-400">
                <MapPin className="h-5 w-5 mt-1 flex-shrink-0 text-primary" />
                <span>SAMARA SHOP SERVICES LLC<br/>7726 Winegard Road<br/>Orlando, FL 32609-7146</span>
              </li>
              <li className="flex items-center gap-3 text-slate-400">
                <Phone className="h-5 w-5 flex-shrink-0 text-primary" />
                <span>+1 (321) 240-4270</span>
              </li>
              <li className="flex items-center gap-3 text-slate-400">
                <Mail className="h-5 w-5 flex-shrink-0 text-primary" />
                <span>sales@petiteplace.net</span>
              </li>
              <li className="text-xs text-slate-500 mt-4">
                LLC Registration: #3213581920
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
          <p>&#169; 2025 RAMLISHOME&#8482;. All rights reserved.</p>
          <div className="flex flex-wrap gap-6 justify-center md:justify-end">
            <Link href="/privacy" className="hover:text-slate-300 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-slate-300 transition-colors">Terms of Service</Link>
            <Link href="/cookies" className="hover:text-slate-300 transition-colors">Cookies Policy</Link>
            <Link href="/shipping" className="hover:text-slate-300 transition-colors">Shipping</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}