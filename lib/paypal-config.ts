export const PAYPAL_CONFIG = {
  clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || '',
  clientSecret: process.env.PAYPAL_CLIENT_SECRET || '',
  mode: (process.env.NEXT_PUBLIC_PAYPAL_MODE as 'sandbox' | 'live') || 'sandbox',
  email: process.env.NEXT_PUBLIC_PAYPAL_EMAIL || 'Ramile79emile@gmail.com',
};

export const getPayPalOptions = () => ({
  clientId: PAYPAL_CONFIG.clientId,
  currency: 'USD',
  intent: 'capture',
});
