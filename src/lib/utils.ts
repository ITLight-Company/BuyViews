import { type ClassValue, clsx } from "clsx"

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