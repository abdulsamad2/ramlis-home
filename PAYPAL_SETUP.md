# PayPal Integration Setup

## PayPal Account Information
- **PayPal Email**: Ramile79emile@gmail.com
- **Account Type**: Personal Account

## Environment Variables

Create a `.env.local` file in the root directory with the following:

```env
# PayPal Configuration
NEXT_PUBLIC_PAYPAL_CLIENT_ID=ATRv-m2K0vwdN5fJTMh1GYPlcFzll_EvLCNnlgtv0WCACGVABRvmhJYM5GlkADHAKTHCWjg5vbIA_dTB
PAYPAL_CLIENT_SECRET=EO9jgvV6OuWWBZ4nxa3UXhZoiahgMybFf7ZQef_5yVUsW2qstGOoWC-us_2Zibll6NaxkK09jsdFilLq
NEXT_PUBLIC_PAYPAL_MODE=sandbox  # Use 'live' for production

# PayPal Business Email
NEXT_PUBLIC_PAYPAL_EMAIL=Ramile79emile@gmail.com
```

## Integration Type

This integration uses **PayPal Hosted Checkout** (redirect method), which is ideal for personal PayPal accounts:
- Customers are redirected to PayPal's secure checkout page
- No complex SDK integration required
- Works perfectly with personal PayPal accounts
- Customers can pay with PayPal balance, cards, or bank accounts

## Getting PayPal Credentials

1. Go to https://developer.paypal.com/
2. Log in with your PayPal account (Ramile79emile@gmail.com)
3. Go to "My Apps & Credentials"
4. Create a new app or use an existing one
5. Copy the Client ID and Secret
6. For testing, use Sandbox mode
7. For live payments, switch to Live mode and get Live credentials

## How It Works

1. Customer clicks "Continue with PayPal" on checkout page
2. They're redirected to PayPal's secure payment page
3. Customer logs in to PayPal and approves payment
4. PayPal redirects back to your success page
5. Payment is executed and confirmed
6. Order is completed and cart is cleared

## Testing

- Use PayPal Sandbox for testing before going live
- Test with sandbox accounts from PayPal Developer Dashboard
- Test the complete flow: checkout → PayPal → success page
- Once ready, switch to live mode with live credentials

## Notes

- This is a personal PayPal account setup
- Hosted checkout works great for personal accounts
- No monthly fees or business account required
- PayPal handles all payment processing securely
- Customers can pay without creating a PayPal account (guest checkout)
