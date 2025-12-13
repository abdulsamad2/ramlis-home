import { Metadata } from 'next';
import { Cookie, Settings, Shield, Info } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Cookies Policy | Ramli\'s Home',
  description: 'Learn about how we use cookies and similar technologies on our website.',
};

export default function CookiesPolicyPage() {
  return (
    <div className="min-h-screen bg-slate-50/50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-amber-600 to-orange-600 text-white py-16">
        <div className="container-width">
          <div className="flex items-center gap-4 mb-4">
            <Cookie className="h-8 w-8" />
            <h1 className="text-3xl md:text-4xl font-bold font-heading">Cookies Policy</h1>
          </div>
          <p className="text-amber-100 text-lg max-w-2xl">
            Learn about how we use cookies and similar technologies to improve your experience.
          </p>
          <p className="text-sm text-amber-200 mt-4">Last updated: December 14, 2025</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container-width max-w-4xl">
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8 md:p-12">
            
            {/* What Are Cookies */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <Info className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-bold font-heading">What Are Cookies?</h2>
              </div>
              
              <div className="text-slate-700 space-y-4">
                <p>Cookies are small text files that are stored on your device when you visit a website. They help us provide you with a better experience by:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Remembering your preferences and settings</li>
                  <li>Keeping you logged in to your account</li>
                  <li>Analyzing how you use our website</li>
                  <li>Showing you relevant content and advertisements</li>
                </ul>
              </div>
            </div>

            {/* Types of Cookies */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold font-heading mb-6">Types of Cookies We Use</h2>
              
              <div className="space-y-8">
                {/* Essential Cookies */}
                <div className="border border-slate-200 rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Shield className="h-5 w-5 text-green-600" />
                    <h3 className="text-xl font-semibold">Essential Cookies</h3>
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm font-medium">Always Active</span>
                  </div>
                  <p className="text-slate-700 mb-3">These cookies are necessary for the website to function properly and cannot be disabled.</p>
                  <div className="text-sm text-slate-600">
                    <p><strong>Purpose:</strong> Authentication, security, cart functionality, form submissions</p>
                    <p><strong>Duration:</strong> Session or up to 30 days</p>
                  </div>
                </div>

                {/* Analytics Cookies */}
                <div className="border border-slate-200 rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Settings className="h-5 w-5 text-blue-600" />
                    <h3 className="text-xl font-semibold">Analytics Cookies</h3>
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm font-medium">Optional</span>
                  </div>
                  <p className="text-slate-700 mb-3">Help us understand how visitors interact with our website by collecting anonymous information.</p>
                  <div className="text-sm text-slate-600">
                    <p><strong>Purpose:</strong> Website performance analysis, user behavior tracking, traffic statistics</p>
                    <p><strong>Duration:</strong> Up to 2 years</p>
                    <p><strong>Third parties:</strong> Google Analytics, Hotjar</p>
                  </div>
                </div>

                {/* Marketing Cookies */}
                <div className="border border-slate-200 rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Cookie className="h-5 w-5 text-purple-600" />
                    <h3 className="text-xl font-semibold">Marketing Cookies</h3>
                    <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-sm font-medium">Optional</span>
                  </div>
                  <p className="text-slate-700 mb-3">Used to track visitors across websites to display relevant advertisements.</p>
                  <div className="text-sm text-slate-600">
                    <p><strong>Purpose:</strong> Personalized advertising, retargeting, social media integration</p>
                    <p><strong>Duration:</strong> Up to 1 year</p>
                    <p><strong>Third parties:</strong> Facebook Pixel, Google Ads, Amazon Associates</p>
                  </div>
                </div>

                {/* Preference Cookies */}
                <div className="border border-slate-200 rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Settings className="h-5 w-5 text-indigo-600" />
                    <h3 className="text-xl font-semibold">Preference Cookies</h3>
                    <span className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full text-sm font-medium">Optional</span>
                  </div>
                  <p className="text-slate-700 mb-3">Remember your choices and preferences to provide a personalized experience.</p>
                  <div className="text-sm text-slate-600">
                    <p><strong>Purpose:</strong> Language settings, theme preferences, recently viewed products</p>
                    <p><strong>Duration:</strong> Up to 1 year</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Managing Cookies */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold font-heading mb-6">Managing Your Cookie Preferences</h2>
              
              <div className="text-slate-700 space-y-6">
                <div>
                  <h3 className="font-semibold text-lg text-slate-900 mb-2">Cookie Settings</h3>
                  <p>You can manage your cookie preferences at any time by clicking the "Cookie Settings" button in our website footer or by visiting this page directly.</p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-lg text-slate-900 mb-2">Browser Settings</h3>
                  <p>You can also control cookies through your browser settings:</p>
                  <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
                    <li><strong>Chrome:</strong> Settings → Privacy and Security → Cookies and other site data</li>
                    <li><strong>Firefox:</strong> Preferences → Privacy & Security → Cookies and Site Data</li>
                    <li><strong>Safari:</strong> Preferences → Privacy → Cookies and website data</li>
                    <li><strong>Edge:</strong> Settings → Cookies and site permissions → Cookies and site data</li>
                  </ul>
                </div>
                
                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                  <p className="text-yellow-800">
                    <strong>Note:</strong> Disabling certain cookies may affect website functionality and your user experience.
                  </p>
                </div>
              </div>
            </div>

            {/* Third-Party Services */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold font-heading mb-6">Third-Party Services</h2>
              
              <div className="text-slate-700 space-y-4">
                <p>We use the following third-party services that may set their own cookies:</p>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="border border-slate-200 rounded-xl p-4">
                    <h4 className="font-semibold mb-2">Google Analytics</h4>
                    <p className="text-sm text-slate-600">Website analytics and performance tracking</p>
                    <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" 
                       className="text-primary hover:underline text-sm">Privacy Policy</a>
                  </div>
                  
                  <div className="border border-slate-200 rounded-xl p-4">
                    <h4 className="font-semibold mb-2">Stripe</h4>
                    <p className="text-sm text-slate-600">Secure payment processing</p>
                    <a href="https://stripe.com/privacy" target="_blank" rel="noopener noreferrer" 
                       className="text-primary hover:underline text-sm">Privacy Policy</a>
                  </div>
                  
                  <div className="border border-slate-200 rounded-xl p-4">
                    <h4 className="font-semibold mb-2">Facebook Pixel</h4>
                    <p className="text-sm text-slate-600">Social media integration and advertising</p>
                    <a href="https://www.facebook.com/privacy/policy" target="_blank" rel="noopener noreferrer" 
                       className="text-primary hover:underline text-sm">Privacy Policy</a>
                  </div>
                  
                  <div className="border border-slate-200 rounded-xl p-4">
                    <h4 className="font-semibold mb-2">Amazon Associates</h4>
                    <p className="text-sm text-slate-600">Affiliate program tracking</p>
                    <a href="https://www.amazon.com/gp/help/customer/display.html?nodeId=468496" target="_blank" rel="noopener noreferrer" 
                       className="text-primary hover:underline text-sm">Privacy Policy</a>
                  </div>
                </div>
              </div>
            </div>

            {/* Cookie Settings Button */}
            <div className="bg-slate-50 rounded-2xl p-6 text-center">
              <h3 className="text-xl font-semibold mb-4">Manage Your Preferences</h3>
              <p className="text-slate-700 mb-6">Update your cookie settings at any time</p>
              <button className="bg-primary hover:bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold transition-colors">
                Cookie Settings
              </button>
            </div>
            
          </div>
        </div>
      </section>
    </div>
  );
}