import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2025-06-30.basil',
})

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!
const backendHost = 'https://phplaravel-1489755-5679434.cloudwaysapps.com/api'

export async function POST(request: NextRequest) {
    const body = await request.text()
    const signature = request.headers.get('stripe-signature')!

    let event: Stripe.Event

    try {
        event = stripe.webhooks.constructEvent(body, signature, endpointSecret)
    } catch (err) {
        console.error('Webhook signature verification failed:', err)
        return NextResponse.json({ error: 'Webhook signature verification failed' }, { status: 400 })
    }

    // Handle the event
    if (event.type === 'checkout.session.completed') {
        const session = event.data.object as Stripe.Checkout.Session

        try {
            // Extract metadata from the session
            const metadata = session.metadata || {}
            console.log('=== WEBHOOK METADATA DEBUG ===')
            console.log('Full metadata:', metadata)
            console.log('Available keys:', Object.keys(metadata))
            console.log('==============================')

            const { 
                target_url: targetUrl, 
                service_type: serviceType, 
                views, 
                email, 
                content_name: contentName 
            } = metadata

            console.log('Extracted values:', {
                targetUrl,
                serviceType,
                views,
                email,
                contentName
            })

            if (!targetUrl || !serviceType || !views) {
                console.error('Missing required metadata in session:', session.metadata)
                return NextResponse.json({ error: 'Missing required data' }, { status: 400 })
            }

            // Prepare data for new API endpoints
            let backendData: any
            let endpoint: string

            if (serviceType === 'youtube') {
                // For YouTube views endpoint
                backendData = {
                    email: email || session.customer_email,
                    video_name: contentName || `YouTube Video - ${session.id}`,
                    video_link: targetUrl,
                    views_to_do: parseInt(views)
                }
                endpoint = `${backendHost}/task/youtube-views`
            } else {
                // For website visits endpoint
                backendData = {
                    email: email || session.customer_email,
                    site_name: contentName || `Website - ${session.id}`,
                    site_link: targetUrl,
                    visits_to_do: parseInt(views)
                }
                endpoint = `${backendHost}/task/website-visits`
            }

            console.log('Sending to backend:', endpoint, backendData)

            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    // Add authorization header if needed
                    // 'Authorization': `Bearer ${process.env.BACKEND_API_TOKEN}`
                },
                body: JSON.stringify(backendData)
            })

            console.log('Backend response status:', response.status)
            console.log('Backend response headers:', Object.fromEntries(response.headers.entries()))

            if (!response.ok) {
                const errorText = await response.text()
                console.error('Backend API error:', response.status, errorText)
                throw new Error(`Backend API responded with ${response.status}: ${errorText}`)
            }

            const result = await response.json()
            console.log('Successfully created task in backend:', result)

            return NextResponse.json({
                received: true,
                backend_response: result
            })

        } catch (error) {
            console.error('Error processing webhook:', error)
            return NextResponse.json({
                error: 'Failed to process payment',
                details: error instanceof Error ? error.message : 'Unknown error'
            }, { status: 500 })
        }
    }

    // Return a response to acknowledge receipt of the event
    return NextResponse.json({ received: true })
}
