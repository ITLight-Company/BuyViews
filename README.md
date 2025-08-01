# BoostifyViews - YouTube Views & Website Traffic Platform

A modern, multilingual e-commerce platform for purchasing YouTube views and website traffic. Built with Next.js 15, TypeScript, Tailwind CSS, and integrated with Stripe for secure payments.

## 🚀 Features

### Core Functionality
- **YouTube Views Packages**: Predefined packages for boosting YouTube video views
- **Website Traffic Packages**: Custom traffic solutions for websites
- **Custom Package Builder**: Interactive slider to create custom packages with minimum limits
- **Secure Payments**: Integrated with Stripe for safe and secure transactions
- **Backend Integration**: Automatic task creation in Laravel backend after successful payment
- **Order Management**: Complete order flow from selection to payment confirmation

### Payment Integration
- **Stripe Checkout**: Secure payment processing with Stripe
- **Webhook Handler**: Automatic backend task creation via webhook
- **Laravel Backend**: Integration with CloudWays hosted Laravel API
- **Task Management**: Automatic creation of view/traffic delivery tasks

### Multilingual Support
- **English** (EN) - Default language
- **Polish** (PL) - Polski
- **German** (DE) - Deutsch  
- **Hindi** (HI) - हिंदी

### SEO Optimized
- **Server-Side Rendering** with Next.js App Router
- **Meta Tags** optimization for all pages
- **Structured Data** implementation
- **Multilingual SEO** with proper hreflang tags
- **Mobile-First** responsive design
- **Performance** optimized with lazy loading and code splitting

### Modern UI/UX
- **Responsive Design** that works on all devices
- **Smooth Animations** with Framer Motion
- **Modern Components** built with Radix UI
- **Accessibility** compliant (WCAG 2.1 AA)

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI + Custom components
- **Animations**: Framer Motion
- **Forms**: React Hook Form + Zod validation
- **Payments**: Stripe
- **Internationalization**: next-intl
- **Icons**: Lucide React

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Stripe account for payments

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up environment variables**
   Update `.env.local` with your Stripe keys:
   ```env
   STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
   NEXT_PUBLIC_BASE_URL=http://localhost:3000
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 💳 Payment Integration

The app is integrated with Stripe for secure payments. Configure your Stripe keys in `.env.local` to enable payment processing.

## 🌍 Internationalization

Supports English, Polish, German, and Hindi with next-intl for seamless language switching.

## 📱 Mobile Optimization

Fully responsive design optimized for all devices with touch-friendly interfaces.

## 🔧 Stripe Webhook Configuration

### 1. Set up Stripe Webhook in Dashboard

1. Go to [Stripe Dashboard](https://dashboard.stripe.com/webhooks)
2. Click "Add endpoint"
3. Set endpoint URL to: `https://yourdomain.com/api/stripe-webhook`
4. Select events to listen for:
   - `checkout.session.completed`
5. Copy the webhook signing secret

### 2. Update Environment Variables

Add these to your `.env.local`:

```bash
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
BACKEND_API_HOST=https://phplaravel-1489755-5679434.cloudwaysapps.com/api
BACKEND_API_TOKEN=your_api_token_here
```

### 3. Laravel Backend Endpoints

The webhook sends POST requests to:
- **YouTube Views**: `POST /api/watch-videos`
- **Website Traffic**: `POST /api/visit-sites`

Expected payload:
```json
{
  "target_url": "https://example.com",
  "service_type": "youtube|website", 
  "views": 1000,
  "email": "customer@email.com",
  "payment_intent_id": "pi_xxx",
  "session_id": "cs_xxx",
  "amount_paid": 29.99,
  "currency": "usd",
  "status": "pending"
}
```

### 4. Testing Webhooks Locally

Use Stripe CLI for local testing:
```bash
stripe listen --forward-to localhost:3000/api/stripe-webhook
```

This will provide a test webhook secret starting with `whsec_`.

Built with ❤️ using Next.js, TypeScript, and modern web technologies.
