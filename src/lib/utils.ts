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
