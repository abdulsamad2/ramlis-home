"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { ArrowLeft, CreditCard, Lock, Truck, CheckCircle, AlertCircle, Eye, EyeOff, Package, ShieldCheck, Clock } from "lucide-react";
import { cn, truncateTitle } from "@/lib/utils";
import { useCart } from "@/lib/cart-context";
import { useUser } from "@/lib/user-context";
import { useToast } from "@/lib/toast-context";
import Image from "next/image";

interface FormData {
  // Contact
  email: string;
  
  // Shipping
  firstName: string;
  lastName: string;
  address: string;
  apartment: string;
  city: string;
  country: string;
  state: string;
  zipCode: string;
  phone: string;
  
  // Payment
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardName: string;
  
  // Options
  saveInfo: boolean;
  newsletter: boolean;
  billingDifferent: boolean;
}

interface FormErrors {
  [key: string]: string;
}

export default function CheckoutPage() {
  const { state, getSubtotal, clearCart } = useCart();
  const { user } = useUser();
  const toast = useToast();
  
  const [currentStep, setCurrentStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showCvv, setShowCvv] = useState(false);
  const [showPaymentError, setShowPaymentError] = useState(false);
  
  const [formData, setFormData] = useState<FormData>({
    email: user?.email || '',
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    address: '',
    apartment: '',
    city: '',
    country: 'United States',
    state: '',
    zipCode: '',
    phone: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: '',
    saveInfo: false,
    newsletter: false,
    billingDifferent: false,
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  
  // Redirect if cart is empty
  useEffect(() => {
    if (state.items.length === 0) {
      window.location.href = '/cart';
    }
  }, [state.items]);
  
  const subtotal = getSubtotal();
  const shipping = subtotal > 50 ? 0 : 8.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;
  
  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };
  
  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };
  
  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + (v.length > 2 ? '/' + v.substring(2, 4) : '');
    }
    return v;
  };
  
  const validateStep = (step: number): boolean => {
    const newErrors: FormErrors = {};
    
    if (step === 1) {
      if (!formData.email) newErrors.email = 'Email is required';
      else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    }
    
    if (step === 2) {
      if (!formData.firstName) newErrors.firstName = 'First name is required';
      if (!formData.lastName) newErrors.lastName = 'Last name is required';
      if (!formData.address) newErrors.address = 'Address is required';
      if (!formData.city) newErrors.city = 'City is required';
      if (!formData.state) newErrors.state = 'State is required';
      if (!formData.zipCode) newErrors.zipCode = 'ZIP code is required';
      if (!formData.phone) newErrors.phone = 'Phone number is required';
    }
    
    if (step === 3) {
      if (!formData.cardNumber) newErrors.cardNumber = 'Card number is required';
      else if (formData.cardNumber.replace(/\s/g, '').length < 13) newErrors.cardNumber = 'Card number is invalid';
      if (!formData.expiryDate) newErrors.expiryDate = 'Expiry date is required';
      else if (!/^\d{2}\/\d{2}$/.test(formData.expiryDate)) newErrors.expiryDate = 'Expiry date is invalid';
      if (!formData.cvv) newErrors.cvv = 'CVV is required';
      else if (formData.cvv.length < 3) newErrors.cvv = 'CVV is invalid';
      if (!formData.cardName) newErrors.cardName = 'Name on card is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
    }
  };
  
  const handleBack = () => {
    setCurrentStep(prev => prev - 1);
  };
  
  const handleSubmit = async () => {
    if (!validateStep(3)) return;
    
    setIsProcessing(true);
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Always show payment error as requested
      setShowPaymentError(true);
      
    } catch (error) {
      toast.error('Something went wrong', 'Please try again');
    } finally {
      setIsProcessing(false);
    }
  };
  
  const steps = [
    { id: 1, title: 'Contact', completed: currentStep > 1 },
    { id: 2, title: 'Shipping', completed: currentStep > 2 },
    { id: 3, title: 'Payment', completed: currentStep > 3 },
  ];

  if (showPaymentError) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="w-8 h-8 text-red-600" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-4">Payment Processing Error</h1>
          <p className="text-slate-600 mb-6">
            We're having trouble processing your payment at the moment. This could be due to network issues or temporary system maintenance.
          </p>
          <div className="space-y-3">
            <button 
              onClick={() => setShowPaymentError(false)}
              className="w-full bg-primary hover:bg-blue-600 text-white py-3 rounded-xl font-semibold transition-colors"
            >
              Try Again
            </button>
            <Link 
              href="/contact"
              className="w-full bg-slate-100 hover:bg-slate-200 text-slate-900 py-3 rounded-xl font-semibold transition-colors block"
            >
              Contact Support
            </Link>
            <Link 
              href="/cart"
              className="w-full text-slate-600 hover:text-slate-900 py-2 font-medium transition-colors block"
            >
              Return to Cart
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/cart" className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              <span className="font-medium">Back to cart</span>
            </Link>
            <div className="flex items-center gap-2 text-green-600">
              <Lock className="w-4 h-4" />
              <span className="text-sm font-medium">Secure checkout</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Form */}
          <div className="lg:col-span-7">
            
            {/* Progress Steps */}
            <div className="flex items-center justify-between mb-8">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold",
                    step.completed 
                      ? "bg-green-600 text-white" 
                      : step.id === currentStep 
                        ? "bg-primary text-white" 
                        : "bg-slate-200 text-slate-500"
                  )}>
                    {step.completed ? <CheckCircle className="w-5 h-5" /> : step.id}
                  </div>
                  <span className={cn(
                    "ml-2 text-sm font-medium",
                    step.completed || step.id === currentStep ? "text-slate-900" : "text-slate-500"
                  )}>
                    {step.title}
                  </span>
                  {index < steps.length - 1 && (
                    <div className={cn(
                      "w-12 h-0.5 mx-4",
                      step.completed ? "bg-green-600" : "bg-slate-200"
                    )} />
                  )}
                </div>
              ))}
            </div>

            {/* Step 1: Contact Information */}
            {currentStep === 1 && (
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-6">
                <h2 className="text-xl font-semibold mb-6">Contact information</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Email address</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="you@example.com"
                      className={cn(
                        "w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-all",
                        errors.email 
                          ? "border-red-300 focus:ring-red-200 focus:border-red-500" 
                          : "border-slate-300 focus:ring-primary/20 focus:border-primary"
                      )}
                    />
                    {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="newsletter"
                      checked={formData.newsletter}
                      onChange={(e) => handleInputChange('newsletter', e.target.checked)}
                      className="rounded border-slate-300 text-primary focus:ring-primary"
                    />
                    <label htmlFor="newsletter" className="ml-2 text-sm text-slate-600">
                      Email me with news and offers
                    </label>
                  </div>
                </div>
                <div className="flex justify-end mt-6">
                  <button
                    onClick={handleNext}
                    className="bg-primary hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                  >
                    Continue to shipping
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Shipping Information */}
            {currentStep === 2 && (
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-6">
                <h2 className="text-xl font-semibold mb-6">Shipping information</h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">First name</label>
                      <input
                        type="text"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        className={cn(
                          "w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-all",
                          errors.firstName 
                            ? "border-red-300 focus:ring-red-200 focus:border-red-500" 
                            : "border-slate-300 focus:ring-primary/20 focus:border-primary"
                        )}
                      />
                      {errors.firstName && <p className="text-red-600 text-sm mt-1">{errors.firstName}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Last name</label>
                      <input
                        type="text"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        className={cn(
                          "w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-all",
                          errors.lastName 
                            ? "border-red-300 focus:ring-red-200 focus:border-red-500" 
                            : "border-slate-300 focus:ring-primary/20 focus:border-primary"
                        )}
                      />
                      {errors.lastName && <p className="text-red-600 text-sm mt-1">{errors.lastName}</p>}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Address</label>
                    <input
                      type="text"
                      value={formData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      className={cn(
                        "w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-all",
                        errors.address 
                          ? "border-red-300 focus:ring-red-200 focus:border-red-500" 
                          : "border-slate-300 focus:ring-primary/20 focus:border-primary"
                      )}
                    />
                    {errors.address && <p className="text-red-600 text-sm mt-1">{errors.address}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Apartment, suite, etc. (optional)</label>
                    <input
                      type="text"
                      value={formData.apartment}
                      onChange={(e) => handleInputChange('apartment', e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">City</label>
                      <input
                        type="text"
                        value={formData.city}
                        onChange={(e) => handleInputChange('city', e.target.value)}
                        className={cn(
                          "w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-all",
                          errors.city 
                            ? "border-red-300 focus:ring-red-200 focus:border-red-500" 
                            : "border-slate-300 focus:ring-primary/20 focus:border-primary"
                        )}
                      />
                      {errors.city && <p className="text-red-600 text-sm mt-1">{errors.city}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">State</label>
                      <input
                        type="text"
                        value={formData.state}
                        onChange={(e) => handleInputChange('state', e.target.value)}
                        className={cn(
                          "w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-all",
                          errors.state 
                            ? "border-red-300 focus:ring-red-200 focus:border-red-500" 
                            : "border-slate-300 focus:ring-primary/20 focus:border-primary"
                        )}
                      />
                      {errors.state && <p className="text-red-600 text-sm mt-1">{errors.state}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">ZIP code</label>
                      <input
                        type="text"
                        value={formData.zipCode}
                        onChange={(e) => handleInputChange('zipCode', e.target.value)}
                        className={cn(
                          "w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-all",
                          errors.zipCode 
                            ? "border-red-300 focus:ring-red-200 focus:border-red-500" 
                            : "border-slate-300 focus:ring-primary/20 focus:border-primary"
                        )}
                      />
                      {errors.zipCode && <p className="text-red-600 text-sm mt-1">{errors.zipCode}</p>}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Phone number</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className={cn(
                        "w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-all",
                        errors.phone 
                          ? "border-red-300 focus:ring-red-200 focus:border-red-500" 
                          : "border-slate-300 focus:ring-primary/20 focus:border-primary"
                      )}
                    />
                    {errors.phone && <p className="text-red-600 text-sm mt-1">{errors.phone}</p>}
                  </div>
                </div>
                
                <div className="flex justify-between mt-6">
                  <button
                    onClick={handleBack}
                    className="text-slate-600 hover:text-slate-900 font-medium transition-colors"
                  >
                    Back to contact
                  </button>
                  <button
                    onClick={handleNext}
                    className="bg-primary hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                  >
                    Continue to payment
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Payment Information */}
            {currentStep === 3 && (
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-6">
                <h2 className="text-xl font-semibold mb-6">Payment information</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Card number</label>
                    <div className="relative">
                      <input
                        type="text"
                        value={formData.cardNumber}
                        onChange={(e) => handleInputChange('cardNumber', formatCardNumber(e.target.value))}
                        placeholder="1234 5678 9012 3456"
                        maxLength={19}
                        className={cn(
                          "w-full px-4 py-3 pr-12 rounded-lg border focus:outline-none focus:ring-2 transition-all",
                          errors.cardNumber 
                            ? "border-red-300 focus:ring-red-200 focus:border-red-500" 
                            : "border-slate-300 focus:ring-primary/20 focus:border-primary"
                        )}
                      />
                      <CreditCard className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                    </div>
                    {errors.cardNumber && <p className="text-red-600 text-sm mt-1">{errors.cardNumber}</p>}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Expiry date</label>
                      <input
                        type="text"
                        value={formData.expiryDate}
                        onChange={(e) => handleInputChange('expiryDate', formatExpiryDate(e.target.value))}
                        placeholder="MM/YY"
                        maxLength={5}
                        className={cn(
                          "w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-all",
                          errors.expiryDate 
                            ? "border-red-300 focus:ring-red-200 focus:border-red-500" 
                            : "border-slate-300 focus:ring-primary/20 focus:border-primary"
                        )}
                      />
                      {errors.expiryDate && <p className="text-red-600 text-sm mt-1">{errors.expiryDate}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">CVV</label>
                      <div className="relative">
                        <input
                          type={showCvv ? "text" : "password"}
                          value={formData.cvv}
                          onChange={(e) => handleInputChange('cvv', e.target.value.replace(/\D/g, '').slice(0, 4))}
                          placeholder="123"
                          className={cn(
                            "w-full px-4 py-3 pr-12 rounded-lg border focus:outline-none focus:ring-2 transition-all",
                            errors.cvv 
                              ? "border-red-300 focus:ring-red-200 focus:border-red-500" 
                              : "border-slate-300 focus:ring-primary/20 focus:border-primary"
                          )}
                        />
                        <button
                          type="button"
                          onClick={() => setShowCvv(!showCvv)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                        >
                          {showCvv ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                      {errors.cvv && <p className="text-red-600 text-sm mt-1">{errors.cvv}</p>}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Name on card</label>
                    <input
                      type="text"
                      value={formData.cardName}
                      onChange={(e) => handleInputChange('cardName', e.target.value)}
                      className={cn(
                        "w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-all",
                        errors.cardName 
                          ? "border-red-300 focus:ring-red-200 focus:border-red-500" 
                          : "border-slate-300 focus:ring-primary/20 focus:border-primary"
                      )}
                    />
                    {errors.cardName && <p className="text-red-600 text-sm mt-1">{errors.cardName}</p>}
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="saveInfo"
                      checked={formData.saveInfo}
                      onChange={(e) => handleInputChange('saveInfo', e.target.checked)}
                      className="rounded border-slate-300 text-primary focus:ring-primary"
                    />
                    <label htmlFor="saveInfo" className="ml-2 text-sm text-slate-600">
                      Save payment information for next time
                    </label>
                  </div>
                </div>
                
                <div className="flex justify-between mt-6">
                  <button
                    onClick={handleBack}
                    className="text-slate-600 hover:text-slate-900 font-medium transition-colors"
                  >
                    Back to shipping
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={isProcessing}
                    className={cn(
                      "px-8 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2",
                      isProcessing 
                        ? "bg-slate-400 cursor-not-allowed text-white" 
                        : "bg-primary hover:bg-blue-600 text-white"
                    )}
                  >
                    {isProcessing ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Lock className="w-4 h-4" />
                        Pay ${total.toFixed(2)}
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sticky top-24">
              <h3 className="text-lg font-semibold mb-4">Order summary</h3>
              
              {/* Items */}
              <div className="space-y-4 mb-6">
                {state.items.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="relative w-16 h-16 bg-slate-100 rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={item.image || '/placeholder-product.jpg'}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute -top-2 -right-2 bg-slate-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
                        {item.quantity}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-slate-900 text-sm line-clamp-2" title={item.name}>
                        {truncateTitle(item.name, 40)}
                      </h4>
                      <p className="text-sm text-slate-600">${item.price.toFixed(2)}</p>
                    </div>
                    <div className="text-sm font-medium text-slate-900">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Totals */}
              <div className="space-y-3 py-4 border-t border-slate-200">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Subtotal</span>
                  <span className="text-slate-900">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Shipping</span>
                  <span className="text-slate-900">
                    {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Tax</span>
                  <span className="text-slate-900">${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg font-semibold pt-2 border-t border-slate-200">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
              
              {/* Security Note */}
              <div className="flex items-start gap-3 mt-6 p-4 bg-green-50 rounded-lg">
                <ShieldCheck className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div className="text-sm">
                  <p className="font-medium text-green-900">Secure Payment</p>
                  <p className="text-green-700">Your payment information is encrypted and secure.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
