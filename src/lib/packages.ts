import { Package } from '@/types'

export const youtubePackages: Package[] = [
    {
        id: 'yt-starter',
        name: 'Starter',
        views: 1000,
        price: 4.99,
        originalPrice: 9.99,
        features: [
            'Fast delivery',
            'Real viewers',
            '24/7 support',
            'No password required'
        ]
    },
    {
        id: 'yt-growth',
        name: 'Growth',
        views: 5000,
        price: 19.99,
        originalPrice: 39.99,
        popular: true,
        features: [
            'Premium delivery',
            'High retention viewers',
            'Gradual delivery',
            '24/7 support',
            'Refill guarantee'
        ]
    },
    {
        id: 'yt-pro',
        name: 'Professional',
        views: 10000,
        price: 34.99,
        originalPrice: 69.99,
        features: [
            'Express delivery',
            'Premium viewers',
            'Natural delivery pattern',
            'Priority support',
            'Lifetime guarantee'
        ]
    },
    {
        id: 'yt-viral',
        name: 'Viral Boost',
        views: 25000,
        price: 79.99,
        originalPrice: 149.99,
        features: [
            'Ultra-fast delivery',
            'Premium quality viewers',
            'Viral growth pattern',
            'Dedicated manager',
            'Full analytics report'
        ]
    }
]

export const websitePackages: Package[] = [
    {
        id: 'web-basic',
        name: 'Basic Traffic',
        views: 500,
        price: 2.99,
        originalPrice: 5.99,
        features: [
            'Real visitors',
            'Bounce rate optimization',
            'Geographic targeting',
            'Analytics tracking'
        ]
    },
    {
        id: 'web-standard',
        name: 'Standard Traffic',
        views: 2500,
        price: 12.99,
        originalPrice: 24.99,
        popular: true,
        features: [
            'Premium visitors',
            'Extended session time',
            'Multi-page visits',
            'SEO benefits',
            'Weekly reports'
        ]
    },
    {
        id: 'web-premium',
        name: 'Premium Traffic',
        views: 5000,
        price: 22.99,
        originalPrice: 44.99,
        features: [
            'High-quality visitors',
            'Custom user behavior',
            'Advanced targeting',
            'Conversion optimization',
            'Monthly consultation'
        ]
    }
]

export const MINIMUM_CUSTOM_VIEWS = 500
export const MAXIMUM_CUSTOM_VIEWS = 10000
export const PRICE_PER_1000_VIEWS = 5.99
