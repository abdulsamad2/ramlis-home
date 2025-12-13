import { Metadata } from 'next';
import { FileText, Scale, Shield, AlertTriangle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Terms of Service | Ramli\'s Home',
  description: 'Read our terms of service and user agreement for shopping at Ramli\'s Home.',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-slate-50/50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-slate-800 to-slate-900 text-white py-16">
        <div className="container-width">
          <div className="flex items-center gap-4 mb-4">
            <Scale className="h-8 w-8" />
            <h1 className="text-3xl md:text-4xl font-bold font-heading">Terms of Service</h1>
          </div>
          <p className="text-slate-300 text-lg max-w-2xl">
            Please read these terms carefully before using our website and services.
          </p>
          <p className="text-sm text-slate-400 mt-4">Last updated: December 14, 2025</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container-width max-w-4xl">
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8 md:p-12">
            
            {/* Agreement */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <FileText className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-bold font-heading">Agreement to Terms</h2>
              </div>
              
              <div className="text-slate-700 space-y-4">
                <p>By accessing and using Ramli's Home website ("Service"), you accept and agree to be bound by the terms and provision of this agreement.</p>
                <p>If you do not agree to abide by the above, please do not use this service.</p>
              </div>
            </div>

            {/* Use License */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold font-heading mb-6">Use License</h2>
              
              <div className="text-slate-700 space-y-4">
                <p>Permission is granted to temporarily download one copy of the materials on Ramli's Home website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:</p>
                
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Modify or copy the materials</li>
                  <li>Use the materials for any commercial purpose or for any public display</li>
                  <li>Attempt to reverse engineer any software contained on the website</li>
                  <li>Remove any copyright or other proprietary notations from the materials</li>
                </ul>
                
                <p>This license shall automatically terminate if you violate any of these restrictions and may be terminated by Ramli's Home at any time.</p>
              </div>
            </div>

            {/* Account Terms */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold font-heading mb-6">Account Terms</h2>
              
              <div className="text-slate-700 space-y-4">
                <p>When you create an account with us, you must provide information that is accurate, complete, and current at all times.</p>
                
                <p>You are responsible for:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Safeguarding the password and all activities under your account</li>
                  <li>Notifying us immediately of any unauthorized use of your account</li>
                  <li>Ensuring your account information remains accurate and up-to-date</li>
                </ul>
                
                <p>We reserve the right to refuse service, terminate accounts, or cancel orders at our sole discretion.</p>
              </div>
            </div>

            {/* Products and Services */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold font-heading mb-6">Products and Services</h2>
              
              <div className="text-slate-700 space-y-4">
                <p>Certain products or services may be available exclusively online through the website. These products or services may have limited quantities and are subject to return or exchange only according to our Return Policy.</p>
                
                <p>We have made every effort to display as accurately as possible the colors and images of our products. We cannot guarantee that your computer monitor's display will be accurate.</p>
                
                <p>We reserve the right to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Limit the quantities of any products or services</li>
                  <li>Discontinue any product at any time</li>
                  <li>Refuse any order you place with us</li>
                </ul>
              </div>
            </div>

            {/* Pricing and Payment */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold font-heading mb-6">Pricing and Payment</h2>
              
              <div className="text-slate-700 space-y-4">
                <p>All prices are subject to change without notice. We reserve the right to modify or discontinue pricing at any time.</p>
                
                <p>Payment must be received by us before our acceptance of an order. You represent and warrant that:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>The credit card information you supply is true and complete</li>
                  <li>You are duly authorized to use such credit card for the purchase</li>
                  <li>Charges incurred will be honored by your credit card company</li>
                </ul>
              </div>
            </div>

            {/* Shipping and Delivery */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold font-heading mb-6">Shipping and Delivery</h2>
              
              <div className="text-slate-700 space-y-4">
                <p>Delivery times are estimates and cannot be guaranteed. We are not responsible for delays caused by shipping carriers or circumstances beyond our control.</p>
                
                <p>Risk of loss and title for items pass to you upon delivery to the carrier. You are responsible for filing claims with carriers for damaged and/or lost shipments.</p>
              </div>
            </div>

            {/* Prohibited Uses */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <AlertTriangle className="h-6 w-6 text-red-600" />
                <h2 className="text-2xl font-bold font-heading">Prohibited Uses</h2>
              </div>
              
              <div className="text-slate-700 space-y-4">
                <p>You may not use our service:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>For any unlawful purpose or to solicit others to perform unlawful acts</li>
                  <li>To violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances</li>
                  <li>To infringe upon or violate our intellectual property rights or the intellectual property rights of others</li>
                  <li>To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
                  <li>To submit false or misleading information</li>
                  <li>To upload or transmit viruses or any other type of malicious code</li>
                </ul>
              </div>
            </div>

            {/* Disclaimer */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <Shield className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-bold font-heading">Disclaimer</h2>
              </div>
              
              <div className="text-slate-700 space-y-4">
                <p>The information on this website is provided on an 'as is' basis. To the fullest extent permitted by law, this Company:</p>
                
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Excludes all representations and warranties relating to this website and its contents</li>
                  <li>Excludes all liability for damages arising out of or in connection with your use of this website</li>
                </ul>
              </div>
            </div>

            {/* Limitations */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold font-heading mb-6">Limitations</h2>
              
              <div className="text-slate-700 space-y-4">
                <p>In no event shall Ramli's Home or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Ramli's Home website.</p>
              </div>
            </div>

            {/* Governing Law */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold font-heading mb-6">Governing Law</h2>
              
              <div className="text-slate-700 space-y-4">
                <p>These terms and conditions are governed by and construed in accordance with the laws of [Your Jurisdiction] and you irrevocably submit to the exclusive jurisdiction of the courts in that state or location.</p>
              </div>
            </div>

            {/* Changes to Terms */}
            <div className="bg-slate-50 rounded-2xl p-6">
              <h2 className="text-2xl font-bold font-heading mb-4">Changes to Terms</h2>
              
              <div className="text-slate-700 space-y-4">
                <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days notice prior to any new terms taking effect.</p>
                
                <p>By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms.</p>
              </div>
            </div>
            
          </div>
        </div>
      </section>
    </div>
  );
}