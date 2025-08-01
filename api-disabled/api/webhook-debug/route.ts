import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
    try {
        const body = await request.text()
        const signature = request.headers.get('stripe-signature')

        console.log('=== WEBHOOK DEBUG ===')
        console.log('Received webhook call')
        console.log('Body length:', body.length)
        console.log('Signature present:', !!signature)
        console.log('Headers:', Object.fromEntries(request.headers.entries()))
        console.log('Body preview:', body.substring(0, 200))
        console.log('===================')

        return NextResponse.json({ 
            received: true, 
            debug: {
                bodyLength: body.length,
                hasSignature: !!signature,
                timestamp: new Date().toISOString()
            }
        })

    } catch (error) {
        console.error('Webhook debug error:', error)
        return NextResponse.json({
            error: 'Debug failed',
            details: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 })
    }
}
