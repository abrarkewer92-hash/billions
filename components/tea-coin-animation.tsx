"use client"

import Image from "next/image"

interface FloatingCoinProps {
  delay: number
  duration: number
  startX: number
  startY: number
  size: number
  index: number
}

function FloatingCoin({ delay, duration, startX, startY, size, index }: FloatingCoinProps) {
  return (
    <div
      className="absolute pointer-events-none"
      style={{
        left: `${startX}%`,
        top: `${startY}%`,
        width: `${size}px`,
        height: `${size}px`,
        animation: `coin-float ${duration}ms ease-in-out infinite`,
        animationDelay: `${delay}ms`,
      }}
    >
      <div className="relative w-full h-full animate-spin-slow">
        <Image
          src="/65187528ea7612a0d29eb451_coin-full@2-optimized.png"
          alt="TEA Coin"
          width={size}
          height={size}
          className="drop-shadow-[0_0_15px_rgba(152,255,153,0.5)] opacity-40"
          style={{
            filter: "drop-shadow(0 0 20px rgba(152, 255, 153, 0.6))",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 to-transparent rounded-full blur-sm"></div>
      </div>
    </div>
  )
}

export default function TeaCoinAnimation() {
  const coins = [
    { delay: 0, duration: 8000, startX: 10, startY: 20, size: 60 },
    { delay: 1000, duration: 10000, startX: 85, startY: 15, size: 80 },
    { delay: 2000, duration: 12000, startX: 15, startY: 70, size: 70 },
    { delay: 1500, duration: 9000, startX: 80, startY: 75, size: 65 },
    { delay: 3000, duration: 11000, startX: 5, startY: 50, size: 55 },
    { delay: 2500, duration: 13000, startX: 90, startY: 60, size: 75 },
  ]

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {coins.map((coin, index) => (
        <FloatingCoin key={index} {...coin} index={index} />
      ))}
    </div>
  )
}

