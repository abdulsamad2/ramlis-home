'use client';

import { useState } from 'react';
import { Search, Package, Truck, CheckCircle, MapPin, Calendar, Clock } from 'lucide-react';

export default function TrackOrderPage() {
  const [orderNumber, setOrderNumber] = useState('');
  const [email, setEmail] = useState('');
  const [tracking, setTracking] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleTrackOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      if (orderNumber && email) {
        // Mock tracking data
        setTracking({
          orderNumber: orderNumber,
          status: 'in_transit',
          estimatedDelivery: 'Dec 30, 2025',
          currentLocation: 'Orlando Distribution Center',
          timeline: [
            {
              status: 'Order Placed',
              date: 'Dec 25, 2025',
              time: '10:30 AM',
              completed: true,
              description: 'Your order has been confirmed'
            },
            {
              status: 'Processing',
              date: 'Dec 26, 2025',
              time: '2:15 PM',
              completed: true,
              description: 'Order is being prepared for shipment'
            },
            {
              status: 'Shipped',
              date: 'Dec 27, 2025',
              time: '9:00 AM',
              completed: true,
              description: 'Package has been picked up by carrier'
            },
            {
              status: 'In Transit',
              date: 'Dec 27, 2025',
              time: '4:30 PM',
              completed: true,
              description: 'Package is on the way to you'
            },
            {
              status: 'Out for Delivery',
              date: 'Dec 30, 2025',
              time: 'Pending',
              completed: false,
              description: 'Package will be delivered today'
            },
            {
              status: 'Delivered',
              date: 'Dec 30, 2025',
              time: 'Pending',
              completed: false,
              description: 'Package has been delivered'
            }
          ]
        });
      } else {
        setError('Please enter both order number and email address');
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <Package className="h-16 w-16 text-orange-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Track Your Order</h1>
          <p className="text-lg text-gray-600">
            Enter your order details below to track your package
          </p>
        </div>

        {/* Track Order Form */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 mb-8">
          <form onSubmit={handleTrackOrder} className="space-y-6">
            <div>
              <label htmlFor="orderNumber" className="block text-sm font-semibold text-gray-700 mb-2">
                Order Number
              </label>
              <input
                type="text"
                id="orderNumber"
                value={orderNumber}
                onChange={(e) => setOrderNumber(e.target.value)}
                placeholder="e.g., ORD-123456"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@example.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                required
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-orange-600 to-red-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-orange-700 hover:to-red-700 transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Tracking...</span>
                </>
              ) : (
                <>
                  <Search className="h-5 w-5" />
                  <span>Track Order</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Tracking Results */}
        {tracking && (
          <div className="space-y-6">
            {/* Order Status Card */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Order #{tracking.orderNumber}</h2>
                  <p className="text-gray-600 mt-1">Current Status: <span className="font-semibold text-orange-600">In Transit</span></p>
                </div>
                <Truck className="h-12 w-12 text-orange-600" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="flex items-center space-x-3">
                  <Calendar className="h-8 w-8 text-blue-600" />
                  <div>
                    <p className="text-sm text-gray-600">Estimated Delivery</p>
                    <p className="font-semibold text-gray-900">{tracking.estimatedDelivery}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="h-8 w-8 text-green-600" />
                  <div>
                    <p className="text-sm text-gray-600">Current Location</p>
                    <p className="font-semibold text-gray-900">{tracking.currentLocation}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="h-8 w-8 text-purple-600" />
                  <div>
                    <p className="text-sm text-gray-600">Last Update</p>
                    <p className="font-semibold text-gray-900">2 hours ago</p>
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="relative">
                <div className="absolute top-5 left-0 right-0 h-1 bg-gray-200">
                  <div className="h-full bg-gradient-to-r from-orange-600 to-red-600" style={{ width: '66%' }}></div>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Tracking Timeline</h3>
              <div className="space-y-6">
                {tracking.timeline.map((event: any, index: number) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                      event.completed ? 'bg-green-100' : 'bg-gray-100'
                    }`}>
                      {event.completed ? (
                        <CheckCircle className="h-6 w-6 text-green-600" />
                      ) : (
                        <div className="w-3 h-3 rounded-full bg-gray-400"></div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className={`font-semibold ${event.completed ? 'text-gray-900' : 'text-gray-500'}`}>
                          {event.status}
                        </h4>
                        <span className="text-sm text-gray-500">{event.date} {event.time !== 'Pending' && `• ${event.time}`}</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{event.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Help Section */}
            <div className="bg-blue-50 rounded-2xl border border-blue-200 p-6">
              <h4 className="font-semibold text-blue-900 mb-2">Need Help?</h4>
              <p className="text-blue-800 text-sm mb-4">
                If you have any questions about your order, please contact our support team.
              </p>
              <div className="flex flex-wrap gap-3">
                <a href="/contact" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                  Contact Support
                </a>
                <a href="/help" className="px-4 py-2 bg-white text-blue-600 border border-blue-300 rounded-lg hover:bg-blue-50 transition-colors text-sm font-medium">
                  Visit Help Center
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Info Section */}
        {!tracking && (
          <div className="bg-blue-50 rounded-2xl border border-blue-200 p-8">
            <h3 className="text-lg font-semibold text-blue-900 mb-4">How to Track Your Order</h3>
            <ul className="space-y-3 text-blue-800">
              <li className="flex items-start space-x-2">
                <span className="text-blue-600 font-bold">1.</span>
                <span>Enter your order number (found in your confirmation email)</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-blue-600 font-bold">2.</span>
                <span>Enter the email address used for the order</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-blue-600 font-bold">3.</span>
                <span>Click "Track Order" to view your package status</span>
              </li>
            </ul>
            <div className="mt-6 pt-6 border-t border-blue-200">
              <p className="text-sm text-blue-700">
                <strong>Note:</strong> Tracking information may take 24-48 hours to appear after your order is placed.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
