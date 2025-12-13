import { Metadata } from 'next';
import { Shield, Eye, Database, Mail } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy | Ramli\'s Home',
  description: 'Learn how we collect, use, and protect your personal information at Ramli\'s Home.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-slate-50/50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-16">
        <div className="container-width">
          <div className="flex items-center gap-4 mb-4">
            <Shield className="h-8 w-8" />
            <h1 className="text-3xl md:text-4xl font-bold font-heading">Privacy Policy</h1>
          </div>
          <p className="text-blue-100 text-lg max-w-2xl">
            Your privacy is important to us. Learn how we collect, use, and protect your information.
          </p>
          <p className="text-sm text-blue-200 mt-4">Last updated: December 14, 2025</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container-width max-w-4xl">
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8 md:p-12">
            
            {/* Information We Collect */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <Database className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-bold font-heading">Information We Collect</h2>
              </div>
              
              <div className="space-y-6 text-slate-700">
                <div>
                  <h3 className="font-semibold text-lg text-slate-900 mb-2">Personal Information</h3>
                  <p>When you create an account or make a purchase, we collect:</p>
                  <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
                    <li>Name, email address, and phone number</li>
                    <li>Billing and shipping addresses</li>
                    <li>Payment information (processed securely by our payment providers)</li>
                    <li>Order history and preferences</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold text-lg text-slate-900 mb-2">Automatic Information</h3>
                  <p>We automatically collect certain information when you visit our website:</p>
                  <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
                    <li>IP address and browser information</li>
                    <li>Device type and operating system</li>
                    <li>Pages visited and time spent on our site</li>
                    <li>Referral source and search terms used</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* How We Use Your Information */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <Eye className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-bold font-heading">How We Use Your Information</h2>
              </div>
              
              <div className="text-slate-700 space-y-4">
                <p>We use your information to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Process orders:</strong> Fulfill purchases, handle payments, and provide customer service</li>
                  <li><strong>Improve our service:</strong> Analyze usage patterns to enhance user experience</li>
                  <li><strong>Communicate:</strong> Send order updates, promotional offers, and important notices</li>
                  <li><strong>Security:</strong> Prevent fraud and maintain account security</li>
                  <li><strong>Legal compliance:</strong> Meet regulatory requirements and resolve disputes</li>
                </ul>
              </div>
            </div>

            {/* Information Sharing */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold font-heading mb-6">Information Sharing</h2>
              
              <div className="text-slate-700 space-y-4">
                <p>We do not sell your personal information. We may share information with:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Service providers:</strong> Payment processors, shipping companies, and analytics services</li>
                  <li><strong>Legal requirements:</strong> When required by law or to protect our rights</li>
                  <li><strong>Business transfers:</strong> In case of merger, acquisition, or sale of assets</li>
                </ul>
              </div>
            </div>

            {/* Data Security */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold font-heading mb-6">Data Security</h2>
              
              <div className="text-slate-700 space-y-4">
                <p>We implement industry-standard security measures to protect your information:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>SSL encryption for data transmission</li>
                  <li>Secure database storage with access controls</li>
                  <li>Regular security audits and updates</li>
                  <li>Employee training on data protection</li>
                </ul>
              </div>
            </div>

            {/* Your Rights */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold font-heading mb-6">Your Rights</h2>
              
              <div className="text-slate-700 space-y-4">
                <p>You have the right to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Access:</strong> Request a copy of your personal information</li>
                  <li><strong>Correct:</strong> Update or correct inaccurate information</li>
                  <li><strong>Delete:</strong> Request deletion of your personal information</li>
                  <li><strong>Opt-out:</strong> Unsubscribe from marketing communications</li>
                  <li><strong>Portability:</strong> Request your data in a portable format</li>
                </ul>
              </div>
            </div>

            {/* Cookies */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold font-heading mb-6">Cookies and Tracking</h2>
              
              <div className="text-slate-700 space-y-4">
                <p>We use cookies and similar technologies to improve your browsing experience. See our <a href="/cookies" className="text-primary hover:underline">Cookies Policy</a> for detailed information.</p>
              </div>
            </div>

            {/* Contact */}
            <div className="bg-slate-50 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <Mail className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-bold font-heading">Contact Us</h2>
              </div>
              
              <div className="text-slate-700">
                <p className="mb-4">If you have questions about this Privacy Policy or want to exercise your rights, contact us:</p>
                <div className="space-y-2">
                  <p><strong>Email:</strong> privacy@ramlishome.com</p>
                  <p><strong>Phone:</strong> +1 (555) 123-4567</p>
                  <p><strong>Mail:</strong> Ramli's Home Privacy Team, 123 Kitchen Ave, Culinary City, CC 12345</p>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </section>
    </div>
  );
}