import { type ClassValue, clsx } from "clsx"
import { loadStripe } from '@stripe/stripe-js'
import { Package, CustomPackage } from '@/types'

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

interface OrderData {
    package?: Package
    customPackage?: CustomPackage
    customerInfo: {
        targetUrl: string
        email: string
        name: string
    }
    serviceType: string
}

// Stripe client-side checkout - works with webhook for order processing
export async function createClientSideCheckout(orderData: OrderData, locale: string = 'en') {
    const { package: pkg, customPackage, customerInfo, serviceType } = orderData
    const packageData = customPackage || pkg

    if (!packageData) {
        throw new Error('No package selected')
    }

    // Load Stripe
    const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)
    if (!stripe) {
        throw new Error('Failed to load Stripe')
    }

    // Get base URL for success/cancel redirects  
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || window.location.origin

    try {
        // Try Next.js API route (works in development, not in static build)
        const response = await fetch('/api/create-checkout-session', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                package: pkg,
                customPackage: customPackage,
                customerInfo: customerInfo,
                serviceType: serviceType,
                locale: locale,
                successUrl: `${baseUrl}/${locale}/success`,
                cancelUrl: `${baseUrl}/${locale}/cancel`,
            }),
        })

        if (response.ok) {
            const data = await response.json()
            const sessionId = data.sessionId || data.session_id

            if (sessionId) {
                // Redirect to Stripe Checkout
                const { error } = await stripe.redirectToCheckout({
                    sessionId: sessionId
                })

                if (error) {
                    throw new Error(error.message || 'Payment failed')
                }
            } else if (data.url) {
                // Direct URL redirect
                window.location.href = data.url
            } else {
                throw new Error('No session ID or URL received from API')
            }
        } else {
            throw new Error(`API route failed with status: ${response.status}`)
        }

    } catch (error) {
        console.error('Payment API failed:', error)

        // For static builds (GitHub Pages), show demo mode
        // The webhook will handle order creation when real payments are processed
        console.warn('API route not available - showing demo mode for static build')
        const orderParams = new URLSearchParams({
            target_url: customerInfo.targetUrl,
            service_type: serviceType,
            package_type: customPackage ? 'custom' : 'preset',
            package_id: customPackage ? 'custom' : (pkg?.id || 'unknown'),
            views: packageData.views.toString(),
            email: customerInfo.email,
            content_name: customerInfo.name,
            price: packageData.price.toString(),
            status: 'demo' // Indicate this is demo mode
        }).toString()

        window.location.href = `${baseUrl}/${locale}/success?${orderParams}`
    }

    return { success: true }
}

