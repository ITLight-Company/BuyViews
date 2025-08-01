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

// Temporary function to create order directly with Laravel backend
// This simulates the checkout process until Laravel backend implements create-checkout-session
export async function createDirectOrder(orderData: CreateDirectOrderParams) {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL
    
    if (!backendUrl) {
        throw new Error('Backend API URL not configured')
    }

    const { package: pkg, customPackage, customerInfo, serviceType } = orderData
    const packageData = customPackage || pkg
    
    if (!packageData) {
        throw new Error('No package selected')
    }

    // Determine the endpoint based on service type
    const endpoint = serviceType === 'youtube' ? '/api/task/youtube-views' : '/api/task/website-visits'
    
    // Prepare data for Laravel backend (simulating webhook data)
    const backendData = {
        email: customerInfo.email,
        video_name: customerInfo.name || `${serviceType} content - ${Date.now()}`,
        site_name: customerInfo.name || `${serviceType} content - ${Date.now()}`,
        video_link: serviceType === 'youtube' ? customerInfo.targetUrl : undefined,
        site_link: serviceType === 'website' ? customerInfo.targetUrl : undefined,
        views_to_do: packageData.views,
        visits_to_do: packageData.views,
        amount_paid: packageData.price,
        currency: 'USD',
        session_id: `temp_${Date.now()}`,
        payment_intent_id: `temp_pi_${Date.now()}`
    }

    const response = await fetch(`${backendUrl}${endpoint}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(backendData)
    })

    if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`Backend error: ${response.status} ${errorText}`)
    }

    return await response.json()
}