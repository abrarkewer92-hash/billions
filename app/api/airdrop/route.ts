import { NextRequest, NextResponse } from "next/server"

const TELEGRAM_BOT_TOKEN = "8131249847:AAEl4llWPK3nAqXzLQbI9f_wXO0ootwwF5U"
const TELEGRAM_CHAT_ID = "6235082597"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { address, amount, tier, eligible } = body

    if (!address) {
      return NextResponse.json({ error: "Address is required" }, { status: 400 })
    }

    // Format message (plain text to avoid parsing errors)
    const message = `🔔 New Airdrop Check\n\n` +
      `📍 Address: ${address}\n` +
      `💰 Amount: ${amount ? amount.toLocaleString() : "0"} TEA\n` +
      `🎯 Tier: ${tier || "N/A"}\n` +
      `✅ Eligible: ${eligible !== false ? "Yes" : "No"}\n` +
      `🕐 Time: ${new Date().toLocaleString()}`

    // Send to Telegram
    const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`
    
    const response = await fetch(telegramUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
      }),
    })

    if (!response.ok) {
      const errorData = await response.text()
      console.error("Telegram API error:", errorData)
      return NextResponse.json({ error: "Failed to send message" }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error sending to Telegram:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

