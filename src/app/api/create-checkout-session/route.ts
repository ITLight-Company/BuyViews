import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { package: pkg, customPackage, customerInfo, serviceType, locale } = body

        // Validate required data
        if (!customerInfo?.email || !customerInfo?.targetUrl || !customerInfo?.name) {
            return NextResponse.json(
                { error: 'Missing required customer information' },
                { status: 400 }
            )
        }

        // Use provided locale or default to 'en'
        const currentLocale = locale || 'en'

        // Determine if it's a preset package or custom package
        const isCustom = !!customPackage
        const packageData = isCustom ? customPackage : pkg

        if (!packageData) {
            return NextResponse.json(
                { error: 'No package selected' },
                { status: 400 }
            )
        }

        // Create line items
        const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [
            {
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: `${serviceType === 'youtube' ? 'YouTube Views' : 'Website Traffic'} - ${isCustom ? 'Custom Package' : packageData.name}`,
                        description: `${packageData.views.toLocaleString()} ${serviceType === 'youtube' ? 'views' : 'visitors'} for your ${serviceType === 'youtube' ? 'YouTube video' : 'website'}`,
                        metadata: {
                            service_type: serviceType,
                            package_id: isCustom ? 'custom' : packageData.id,
                            views: packageData.views.toString(),
                        }
                    },
                    unit_amount: Math.round(packageData.price * 100), // Convert to cents
                },
                quantity: 1,
            },
        ]

        // Create Stripe checkout session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/${currentLocale}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/${currentLocale}/cancel`,
            customer_email: customerInfo.email,
            metadata: {
                target_url: customerInfo.targetUrl,
                service_type: serviceType,
                package_type: isCustom ? 'custom' : 'preset',
                package_id: isCustom ? 'custom' : packageData.id,
                views: packageData.views.toString(),
                email: customerInfo.email,
                content_name: customerInfo.name,
            },
            billing_address_collection: 'auto',
            payment_intent_data: {
                description: `${serviceType === 'youtube' ? 'YouTube Views' : 'Website Traffic'} order for ${customerInfo.targetUrl}`,
                metadata: {
                    target_url: customerInfo.targetUrl,
                    service_type: serviceType,
                    email: customerInfo.email,
                    content_name: customerInfo.name,
                },
            },
        })

        return NextResponse.json({
            url: session.url,
            sessionId: session.id
        })
    } catch (error) {
        console.error('Error creating checkout session:', error)
        return NextResponse.json(
            {
                error: 'Failed to create checkout session',
                details: error instanceof Error ? error.message : 'Unknown error'
            },
            { status: 500 }
        )
    }
}
