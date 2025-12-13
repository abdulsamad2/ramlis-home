'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/lib/user-context';
import { 
  User, 
  Package, 
  Heart, 
  Settings, 
  CreditCard, 
  MapPin, 
  Shield,
  Bell,
  Calendar,
  Mail,
  Phone,
  Edit3,
  LogOut,
  Loader2
} from 'lucide-react';

export default function AccountPage() {
  const { user, isAuthenticated, isLoading, logout } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto text-blue-600" />
          <p className="mt-2 text-gray-600">Loading your account...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return null; // This will redirect to login
  }

  const accountStats = [
    { label: 'Total Orders', value: '0', icon: Package, color: 'blue' },
    { label: 'Wishlist Items', value: '0', icon: Heart, color: 'red' },
    { label: 'Account Age', value: '1 day', icon: Calendar, color: 'green' },
    { label: 'Saved Addresses', value: '0', icon: MapPin, color: 'purple' }
  ];

  const quickActions = [
    { label: 'My Orders', icon: Package, href: '/account/orders', description: 'View your order history' },
    { label: 'Wishlist', icon: Heart, href: '/wishlist', description: 'Saved items for later' },
    { label: 'Addresses', icon: MapPin, href: '/account/addresses', description: 'Manage shipping addresses' },
    { label: 'Payment Methods', icon: CreditCard, href: '/account/payment', description: 'Saved cards and payments' },
    { label: 'Account Settings', icon: Settings, href: '/account/settings', description: 'Update your preferences' },
    { label: 'Privacy & Security', icon: Shield, href: '/account/security', description: 'Manage your security settings' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                {user.firstName.charAt(0)}{user.lastName.charAt(0)}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Welcome back, {user.firstName}!
                </h1>
                <p className="text-gray-600">
                  Manage your account and track your orders
                </p>
              </div>
            </div>
            <button 
              onClick={logout}
              className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut className="h-4 w-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Account Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {accountStats.map((stat) => {
                const IconComponent = stat.icon;
                return (
                  <div key={stat.label} className="bg-white rounded-xl p-6 border border-gray-200">
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 bg-${stat.color}-100 rounded-lg flex items-center justify-center`}>
                        <IconComponent className={`h-5 w-5 text-${stat.color}-600`} />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                        <p className="text-sm text-gray-600">{stat.label}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {quickActions.map((action) => {
                  const IconComponent = action.icon;
                  return (
                    <a
                      key={action.label}
                      href={action.href}
                      className="flex items-center space-x-4 p-4 border border-gray-200 rounded-xl hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 group"
                    >
                      <div className="w-12 h-12 bg-gray-100 group-hover:bg-blue-100 rounded-lg flex items-center justify-center">
                        <IconComponent className="h-6 w-6 text-gray-600 group-hover:text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 group-hover:text-blue-600">
                          {action.label}
                        </h3>
                        <p className="text-sm text-gray-600">{action.description}</p>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Activity</h2>
              <div className="text-center py-8">
                <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No recent activity</p>
                <p className="text-sm text-gray-500 mt-1">Your orders and activities will appear here</p>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Profile Information */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Profile Information</h3>
                <button className="text-blue-600 hover:text-blue-700">
                  <Edit3 className="h-4 w-4" />
                </button>
              </div>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <User className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="font-medium text-gray-900">{user.firstName} {user.lastName}</p>
                    <p className="text-sm text-gray-600">Full Name</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="font-medium text-gray-900">{user.email}</p>
                    <p className="text-sm text-gray-600">
                      Email {user.emailVerified ? '(Verified)' : '(Not Verified)'}
                    </p>
                  </div>
                </div>
                {user.phone && (
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="font-medium text-gray-900">{user.phone}</p>
                      <p className="text-sm text-gray-600">Phone Number</p>
                    </div>
                  </div>
                )}
                {user.dateOfBirth && (
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="font-medium text-gray-900">
                        {new Date(user.dateOfBirth).toLocaleDateString()}
                      </p>
                      <p className="text-sm text-gray-600">Date of Birth</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Account Security */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Security</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Shield className="h-5 w-5 text-green-500" />
                    <span className="text-sm text-gray-600">Two-Factor Authentication</span>
                  </div>
                  <span className="text-sm text-red-600">Disabled</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Bell className="h-5 w-5 text-blue-500" />
                    <span className="text-sm text-gray-600">Email Notifications</span>
                  </div>
                  <span className="text-sm text-green-600">Enabled</span>
                </div>
              </div>
              <button className="w-full mt-4 px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 border border-blue-200 hover:border-blue-300 rounded-lg transition-colors">
                Manage Security Settings
              </button>
            </div>

            {/* Support */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Need Help?</h3>
              <div className="space-y-3">
                <a href="/contact" className="block text-sm text-blue-600 hover:text-blue-700">
                  Contact Support
                </a>
                <a href="/help" className="block text-sm text-blue-600 hover:text-blue-700">
                  Help Center
                </a>
                <a href="/privacy" className="block text-sm text-blue-600 hover:text-blue-700">
                  Privacy Policy
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}