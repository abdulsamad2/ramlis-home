# Environment Setup Instructions

## Required Environment Variables

You need to create a `.env.local` file in the root directory of the project with the following configuration:

### Step 1: Create the `.env.local` file

In the root directory (`d:\nextjs\ramlis-home`), create a new file named `.env.local`

### Step 2: Add the following content

```env
# PayPal Configuration
NEXT_PUBLIC_PAYPAL_CLIENT_ID=ATRv-m2K0vwdN5fJTMh1GYPlcFzll_EvLCNnlgtv0WCACGVABRvmhJYM5GlkADHAKTHCWjg5vbIA_dTB
PAYPAL_CLIENT_SECRET=EO9jgvV6OuWWBZ4nxa3UXhZoiahgMybFf7ZQef_5yVUsW2qstGOoWC-us_2Zibll6NaxkK09jsdFilLq
NEXT_PUBLIC_PAYPAL_MODE=sandbox
NEXT_PUBLIC_PAYPAL_EMAIL=Ramile79emile@gmail.com

# Optional: Base URL for your application
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### Step 3: Restart your development server

After creating the `.env.local` file, restart your Next.js development server:

```bash
npm run dev
```

## Important Notes

- **Security**: The `.env.local` file is automatically ignored by git (as specified in `.gitignore`), so your credentials won't be committed to version control.
- **Mode**: Currently set to `sandbox` for testing. Change to `live` when ready for production.
- **Client ID**: This is public and can be exposed in the browser.
- **Client Secret**: This is private and should NEVER be exposed in client-side code. It's only used in server-side API routes.

## Testing PayPal Integration

1. Go to the checkout page after adding items to your cart
2. Proceed through the contact and shipping steps
3. On the payment step, you'll see the PayPal button
4. Click "Continue with PayPal" - you'll be redirected to PayPal's checkout page
5. Log in with your PayPal sandbox test account
6. Approve the payment on PayPal's page
7. You'll be redirected back to the success page
8. Your cart will be cleared and order confirmed

**Note**: This uses PayPal's hosted checkout (redirect method), perfect for personal accounts!

## Switching to Production

When ready to accept real payments:

1. Change `NEXT_PUBLIC_PAYPAL_MODE=sandbox` to `NEXT_PUBLIC_PAYPAL_MODE=live`
2. Replace the sandbox credentials with your live PayPal credentials
3. Test thoroughly before going live
4. Update `NEXT_PUBLIC_BASE_URL` to your production domain

## Troubleshooting

If you encounter issues:

1. Verify all environment variables are set correctly
2. Ensure the development server was restarted after creating `.env.local`
3. Check the browser console for any error messages
4. Verify your PayPal credentials are active in the PayPal Developer Dashboard
