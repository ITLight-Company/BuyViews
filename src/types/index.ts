export interface Package {
    id: string
    name: string
    views: number
    price: number
    originalPrice?: number
    popular?: boolean
    features: string[]
}

export interface CustomPackage {
    views: number
    price: number
}

export interface OrderData {
    packageType: 'preset' | 'custom'
    package?: Package
    customPackage?: CustomPackage
    targetUrl: string
    email: string
    name: string
}

export type ServiceType = 'youtube' | 'website'
export type Language = 'en' | 'hi' | 'pl' | 'de'
