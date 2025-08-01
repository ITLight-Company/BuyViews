import { NextRequest, NextResponse } from 'next/server'

const backendHost = 'https://phplaravel-1489755-5679434.cloudwaysapps.com/api'

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        console.log('Test backend request:', body)

        // Test YouTube endpoint
        const testData = {
            email: "test@example.com",
            video_name: "Test Video",
            video_link: "https://youtube.com/watch?v=test123", 
            views_to_do: 50
        }

        console.log('Testing backend endpoint:', `${backendHost}/task/youtube-views`)
        console.log('Test data:', testData)

        const response = await fetch(`${backendHost}/task/youtube-views`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(testData)
        })

        console.log('Backend response status:', response.status)
        console.log('Backend response headers:', Object.fromEntries(response.headers.entries()))

        const responseText = await response.text()
        console.log('Backend response text:', responseText)

        let result
        try {
            result = JSON.parse(responseText)
        } catch (e) {
            result = { raw_response: responseText }
        }

        return NextResponse.json({
            success: response.ok,
            status: response.status,
            headers: Object.fromEntries(response.headers.entries()),
            data: result
        })

    } catch (error) {
        console.error('Test backend error:', error)
        return NextResponse.json({
            error: 'Test failed',
            details: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 })
    }
}
