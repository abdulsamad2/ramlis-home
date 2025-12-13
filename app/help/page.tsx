import { Metadata } from 'next';
import { HelpCircle, Search, MessageCircle, Phone, Mail, Clock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Help Center | Ramli\'s Home',
  description: 'Find answers to frequently asked questions and get help with your orders.',
};

export default function HelpPage() {
  const faqs = [
    {
      category: 'Orders & Payment',
      questions: [
        {
          q: 'How do I track my order?',
          a: 'Once your order ships, you\'ll receive an email with a tracking number. You can also check your order status by logging into your account and visiting the "My Orders" section.'
        },
        {
          q: 'What payment methods do you accept?',
          a: 'We accept all major credit cards (Visa, Mastercard, American Express, Discover), PayPal, Apple Pay, Google Pay, and Shop Pay.'
        },
        {
          q: 'Can I modify or cancel my order?',
          a: 'You can modify or cancel your order within 1 hour of placing it, as long as it hasn\'t been processed for shipping. Contact customer service immediately for assistance.'
        },
        {
          q: 'Why was my payment declined?',
          a: 'Payment declines can happen for various reasons including insufficient funds, incorrect billing information, or security holds. Please check with your bank or try a different payment method.'
        }
      ]
    },
    {
      category: 'Shipping & Delivery',
      questions: [
        {
          q: 'How long does shipping take?',
          a: 'Standard shipping takes 5-7 business days, Express shipping takes 2-3 business days, and Next Day delivery is available for orders placed before 2 PM.'
        },
        {
          q: 'Do you ship internationally?',
          a: 'Yes, we ship to select countries worldwide. International orders typically take 7-21 business days and may be subject to customs fees.'
        },
        {
          q: 'What if my package is lost or damaged?',
          a: 'Contact us immediately if your package is lost or arrives damaged. We\'ll work with our shipping partners to resolve the issue and ensure you receive your order.'
        },
        {
          q: 'Can I change my shipping address?',
          a: 'You can change your shipping address within 1 hour of placing your order, provided it hasn\'t been processed. After that, contact customer service for assistance.'
        }
      ]
    },
    {
      category: 'Returns & Refunds',
      questions: [
        {
          q: 'What is your return policy?',
          a: 'We offer a 30-day return policy for all items in original condition. Items must be unused and in their original packaging with all tags attached.'
        },
        {
          q: 'How do I return an item?',
          a: 'Log into your account, select the order you want to return, and follow the return instructions. We\'ll provide a prepaid return label for your convenience.'
        },
        {
          q: 'How long do refunds take?',
          a: 'Refunds are processed within 3-5 business days after we receive your returned item. The refund will appear on your original payment method.'
        },
        {
          q: 'Can I exchange an item instead of returning it?',
          a: 'Yes, we offer exchanges for different sizes or colors (when available). Select the exchange option when initiating your return.'
        }
      ]
    },
    {
      category: 'Account & Privacy',
      questions: [
        {
          q: 'How do I create an account?',
          a: 'Click "Sign Up" in the top right corner of any page, fill in your information, and verify your email address. Creating an account helps you track orders and save your preferences.'
        },
        {
          q: 'I forgot my password. How do I reset it?',
          a: 'Click "Forgot Password" on the login page, enter your email address, and we\'ll send you a password reset link.'
        },
        {
          q: 'How do I update my account information?',
          a: 'Log into your account and go to "Account Settings" where you can update your personal information, addresses, and payment methods.'
        },
        {
          q: 'How is my personal information protected?',
          a: 'We use industry-standard encryption and security measures to protect your data. Read our Privacy Policy for detailed information about how we handle your personal information.'
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50/50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="container-width text-center">
          <div className="inline-flex items-center justify-center p-3 rounded-full bg-white/10 backdrop-blur-sm mb-6">
            <HelpCircle className="h-8 w-8" />
          </div>
          <h1 className="text-3xl md:text-5xl font-bold font-heading mb-6">How can we help you?</h1>
          <p className="text-blue-100 text-lg max-w-2xl mx-auto mb-8">
            Find answers to common questions or get in touch with our support team
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search for answers..."
              className="w-full pl-12 pr-4 py-4 rounded-2xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600"
            />
          </div>
        </div>
      </section>

      {/* Contact Options */}
      <section className="py-16">
        <div className="container-width">
          <h2 className="text-2xl font-bold font-heading text-center mb-12">Get In Touch</h2>
          
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white rounded-2xl p-8 text-center shadow-sm border border-slate-100">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <MessageCircle className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Live Chat</h3>
              <p className="text-slate-600 mb-6">Get instant answers from our support team</p>
              <div className="flex items-center justify-center gap-2 text-sm text-slate-500 mb-4">
                <Clock className="h-4 w-4" />
                <span>24/7 Available</span>
              </div>
              <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors">
                Start Chat
              </button>
            </div>
            
            <div className="bg-white rounded-2xl p-8 text-center shadow-sm border border-slate-100">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <Phone className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Phone Support</h3>
              <p className="text-slate-600 mb-6">Speak directly with our support team</p>
              <div className="flex items-center justify-center gap-2 text-sm text-slate-500 mb-4">
                <Clock className="h-4 w-4" />
                <span>Mon-Fri 8AM-8PM EST</span>
              </div>
              <a href="tel:+15551234567" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors inline-block">
                Call (555) 123-4567
              </a>
            </div>
            
            <div className="bg-white rounded-2xl p-8 text-center shadow-sm border border-slate-100">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <Mail className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Email Support</h3>
              <p className="text-slate-600 mb-6">Send us a detailed message</p>
              <div className="flex items-center justify-center gap-2 text-sm text-slate-500 mb-4">
                <Clock className="h-4 w-4" />
                <span>Response within 24 hours</span>
              </div>
              <a href="mailto:support@ramlishome.com" className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors inline-block">
                Send Email
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="pb-16">
        <div className="container-width max-w-6xl">
          <h2 className="text-3xl font-bold font-heading text-center mb-12">Frequently Asked Questions</h2>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {faqs.map((category, categoryIndex) => (
              <div key={categoryIndex} className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
                <h3 className="text-xl font-semibold mb-6 text-primary">{category.category}</h3>
                
                <div className="space-y-6">
                  {category.questions.map((faq, index) => (
                    <div key={index} className="border-b border-slate-100 pb-6 last:border-b-0 last:pb-0">
                      <h4 className="font-semibold text-slate-900 mb-3">{faq.q}</h4>
                      <p className="text-slate-700 text-sm leading-relaxed">{faq.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Still Need Help */}
      <section className="bg-slate-900 text-white py-20">
        <div className="container-width text-center">
          <h2 className="text-3xl font-bold font-heading mb-4">Still need help?</h2>
          <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
            Can't find what you're looking for? Our customer support team is here to help you with any questions or concerns.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-slate-900 hover:bg-slate-100 px-8 py-3 rounded-xl font-semibold transition-colors">
              Contact Support
            </button>
            <button className="border border-white/20 hover:bg-white/10 px-8 py-3 rounded-xl font-semibold transition-colors">
              Submit Feedback
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}