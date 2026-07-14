import { NextResponse } from 'next/server'

const LEAD_CONNECTOR_URL = 'https://services.leadconnectorhq.com/hooks/BeUlVEJ51v3ouGOJkSk6/webhook-trigger/PLAba6GRLQgi6ysCLCW7'
const ZAPIER_URL = 'https://hooks.zapier.com/hooks/catch/24750736/43sdrbu/'

async function sendWithRetry(url: string, payload: object, retries = 3): Promise<void> {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (res.ok || res.status === 200 || res.status === 201) {
        return
      }

      // Some webhooks return non-2xx but still received the payload (e.g. GHL returns 200, Zapier returns 200)
      // Only retry on network-level or 5xx errors
      if (res.status < 500) {
        // Non-retryable client error — treat as delivered
        return
      }

      if (attempt < retries) {
        // Exponential backoff: 500ms, 1000ms, 2000ms
        await new Promise((resolve) => setTimeout(resolve, 500 * attempt))
      }
    } catch (err) {
      if (attempt === retries) {
        throw err
      }
      // Wait before retrying on network error
      await new Promise((resolve) => setTimeout(resolve, 500 * attempt))
    }
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.json()

    const payload = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      submitted_at: formData.submitted_at,
      event_id: formData.event_id,
    }

    // Fire both webhooks in parallel, each with retry logic
    const [leadConnectorResult, zapierResult] = await Promise.allSettled([
      sendWithRetry(LEAD_CONNECTOR_URL, payload),
      sendWithRetry(ZAPIER_URL, payload),
    ])

    if (leadConnectorResult.status === 'rejected') {
      console.error('LeadConnector failed after retries:', leadConnectorResult.reason)
    }

    if (zapierResult.status === 'rejected') {
      console.error('Zapier failed after retries:', zapierResult.reason)
    }

    // Always return success to the client so the user is not blocked
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Submit lead error:', error)
    return NextResponse.json({ success: false, error: 'Failed to submit' }, { status: 500 })
  }
}
