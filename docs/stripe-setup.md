# Stripe Setup Guide for BoostifyViews

## 1. Stripe Account Setup

1. **Create Stripe Account**: Go to https://dashboard.stripe.com/register
2. **Verify Your Business**: Complete business verification (required for live payments)
3. **Activate Your Account**: Follow Stripe's activation process

## 2. Dashboard Configuration

### 2.1 Business Settings
1. Go to **Settings** → **Business Settings**
2. Set your business name: "BoostifyViews" 
3. Add business description: "Digital marketing services - YouTube views and website traffic"
4. Set business website: your domain
5. Configure tax settings based on your location

### 2.2 Payment Methods
1. Go to **Settings** → **Payment Methods**
2. Enable credit/debit cards (enabled by default)
3. Optional: Enable additional methods like:
   - PayPal
   - SEPA Direct Debit (for EU)
   - Bank transfers

### 2.3 Customer Portal (Optional)
1. Go to **Settings** → **Customer Portal**
2. Enable customer portal for self-service
3. Configure branding and allowed actions

## 3. Products Setup

### 3.1 YouTube Views Products
Create products for each package tier:

1. Go to **Products** → **Add Product**
2. Create these products:

**Starter Package**
- Name: "YouTube Views - Starter Package"
- Description: "1,000 high-quality YouTube views"
- Price: $4.99 USD

**Growth Package** 
- Name: "YouTube Views - Growth Package" 
- Description: "5,000 high-quality YouTube views"
- Price: $19.99 USD

**Pro Package**
- Name: "YouTube Views - Pro Package"
- Description: "10,000 high-quality YouTube views" 
- Price: $34.99 USD

**Premium Package**
- Name: "YouTube Views - Premium Package"
- Description: "25,000 high-quality YouTube views"
- Price: $74.99 USD

### 3.2 Website Traffic Products
Repeat for website traffic packages with appropriate names and descriptions.

## 4. Webhook Configuration

### 4.1 For Local Development (Testing)

**Install Stripe CLI:**
```bash
# macOS (using Homebrew)
brew install stripe/stripe-cli/stripe

# Or download from: https://github.com/stripe/stripe-cli/releases
```

**Login to Stripe:**
```bash
stripe login
```

**Forward webhooks to local server:**
```bash
# Start webhook forwarding (run this in a separate terminal)
stripe listen --forward-to localhost:3002/api/stripe-webhook
```

**Get webhook secret for local testing:**
- After running `stripe listen`, you'll see a webhook signing secret like `whsec_xxx`
- Copy this secret and add it to your `.env.local` file

### 4.2 For Production Deployment

**Create Webhook Endpoint:**
1. Go to **Developers** → **Webhooks**
2. Click **Add Endpoint**
3. Set endpoint URL: `https://yourdomain.com/api/stripe-webhook`
4. Select events to listen for:
   - `checkout.session.completed`
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`

**Get Webhook Secret:**
1. After creating webhook, click on it
2. Copy the **Signing Secret** (starts with `whsec_`)
3. Add to your environment variables

## 5. Environment Variables

Create `.env.local` file in your project root:

```env
# Stripe Keys
STRIPE_PUBLISHABLE_KEY=pk_test_... (or pk_live_... for production)
STRIPE_SECRET_KEY=sk_test_... (or sk_live_... for production) 
STRIPE_WEBHOOK_SECRET=whsec_...

# App Configuration
NEXT_PUBLIC_BASE_URL=http://localhost:3000 (or your production domain)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_... (same as STRIPE_PUBLISHABLE_KEY)
```

### 5.1 Getting API Keys
1. Go to **Developers** → **API Keys**
2. Copy **Publishable key** (starts with `pk_`)
3. Reveal and copy **Secret key** (starts with `sk_`)

⚠️ **Important**: Use test keys (`pk_test_`, `sk_test_`) for development and live keys (`pk_live_`, `sk_live_`) for production.

## 6. Testing Your Integration

### 6.1 Test Mode
1. Ensure you're using test API keys
2. Use test card numbers:
   - **Success**: 4242 4242 4242 4242
   - **Declined**: 4000 0000 0000 0002
   - **Requires Auth**: 4000 0025 0000 3155

### 6.2 Test Payment Flow
1. Start your development server: `npm run dev`
2. Navigate to your app
3. Select a package and proceed to checkout
4. Use test card numbers to simulate payments
5. Check Stripe dashboard for payment events

## 7. Production Deployment

### 7.1 Switch to Live Mode
1. In Stripe dashboard, toggle from **Test** to **Live** mode
2. Update environment variables with live keys
3. Recreate webhook with production URL
4. Test with small real payments

### 7.2 Security Checklist
- ✅ Use HTTPS in production
- ✅ Validate webhook signatures
- ✅ Never expose secret keys in frontend
- ✅ Implement proper error handling
- ✅ Log payment events for debugging

## 8. Monitoring & Maintenance

### 8.1 Dashboard Monitoring
- Monitor payments in **Payments** section
- Check failed payments and disputes
- Review customer information
- Track revenue analytics

### 8.2 Webhook Monitoring
- Monitor webhook delivery in **Developers** → **Webhooks**
- Check for failed deliveries
- Implement retry logic for failed webhooks

## 9. Advanced Configuration (Optional)

### 9.1 Tax Calculation
1. Go to **Products** → **Tax**
2. Enable automatic tax calculation
3. Configure tax rates for your regions

### 9.2 Subscriptions (Future Feature)
1. Go to **Products** → **Subscriptions**  
2. Create recurring billing products
3. Implement subscription management

### 9.3 Connect Platform (Multi-vendor)
1. Enable Stripe Connect if you plan to work with partners
2. Configure platform fees and payouts

## 10. Support & Documentation

- **Stripe Documentation**: https://stripe.com/docs
- **API Reference**: https://stripe.com/docs/api
- **Testing Guide**: https://stripe.com/docs/testing
- **Webhook Guide**: https://stripe.com/docs/webhooks

## Troubleshooting

### Common Issues:
1. **Webhook not receiving events**: Check endpoint URL and selected events
2. **Test payments not working**: Verify test API keys are being used
3. **CORS errors**: Ensure your domain is properly configured
4. **Signature verification fails**: Check webhook secret matches environment variable

### Getting Help:
- Stripe Support: Available in dashboard
- Community: https://github.com/stripe/stripe-node
- Stack Overflow: Tag questions with `stripe-payments`
