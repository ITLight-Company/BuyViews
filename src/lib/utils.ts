import { type ClassValue, clsx } from "clsx"
import { Package, CustomPackage, ServiceType } from '@/types'

interface CreateDirectOrderParams {
    package?: Package
    customPackage?: CustomPackage
    customerInfo: {
        email: string
        targetUrl: string
        name: string
    }
    serviceType: ServiceType
}

export function cn(...inputs: ClassValue[]) {
    return clsx(inputs)
}

export function formatPrice(price: number, currency: string = "USD"): string {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency,
    }).format(price)
}

export function formatNumber(number: number): string {
    if (number >= 1000000) {
        return (number / 1000000).toFixed(1) + "M"
    } else if (number >= 1000) {
        return (number / 1000).toFixed(1) + "K"
    }
    return number.toString()
}

export function getBaseUrl(): string {
    if (typeof window !== 'undefined') {
        // Client-side
        return window.location.origin + (process.env.NODE_ENV === 'production' ? '/BuyViews' : '')
    }

    // Server-side
    if (process.env.NEXT_PUBLIC_BASE_URL) {
        return process.env.NEXT_PUBLIC_BASE_URL
    }

    // Fallback for production
    if (process.env.NODE_ENV === 'production') {
        return 'https://itlight-company.github.io/BuyViews'
    }

    return 'http://localhost:3000'
}

export function getApiUrl(): string {
    // For static builds, use external backend API
    if (process.env.NEXT_PUBLIC_BACKEND_API_URL) {
        return process.env.NEXT_PUBLIC_BACKEND_API_URL
    }

    // For development, use local API routes
    if (typeof window !== 'undefined') {
        return window.location.origin
    }

    return 'http://localhost:3000'
}

// Function to create Stripe checkout session using client-side Stripe
export async function createStripeCheckout(orderData: CreateDirectOrderParams, locale: string = 'en') {
    const stripeKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY

    if (!stripeKey) {
        throw new Error('Stripe publishable key not configured')
    }

    const { package: pkg, customPackage, customerInfo, serviceType } = orderData
    const packageData = customPackage || pkg

    if (!packageData) {
        throw new Error('No package selected')
    }

    // Import Stripe dynamically
    const { loadStripe } = await import('@stripe/stripe-js')
    const stripe = await loadStripe(stripeKey)

    if (!stripe) {
        throw new Error('Failed to load Stripe')
    }

    // Create checkout session using Stripe API directly
    // Since we can't create session server-side in static build,
    // we'll redirect to a payment page with the order data
    // This is a temporary solution until Laravel backend has create-checkout-session endpoint

    const orderParams = new URLSearchParams({
        service: serviceType,
        package_id: (packageData as Package)?.id || 'custom',
        views: packageData.views.toString(),
        price: packageData.price.toString(),
        email: customerInfo.email,
        target_url: customerInfo.targetUrl,
        content_name: customerInfo.name,
        locale: locale
    })

    // For now, redirect to success page with order details
    // In production, this should create actual Stripe session
    window.location.href = `/${locale}/success?${orderParams.toString()}`

    return { success: true }
}