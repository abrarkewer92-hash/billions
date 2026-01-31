"use client"

import type { AirdropAllocation } from "./airdrop-checker"
import { Copy, CheckCircle2 } from "lucide-react"
import { useState, useEffect } from "react"
import Image from "next/image"

interface AllocationDisplayProps {
  allocation: AirdropAllocation
}

export default function AllocationDisplay({ allocation }: AllocationDisplayProps) {
  const [copied, setCopied] = useState(false)
  const [animatedAmount, setAnimatedAmount] = useState(0)
  const [isAnimating, setIsAnimating] = useState(true)
  const [animatedBreakdown, setAnimatedBreakdown] = useState<number[]>([])

  const copyToClipboard = () => {
    navigator.clipboard.writeText(allocation.address)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Counter animation for total amount
  useEffect(() => {
    const duration = 2000 // 2 seconds
    const steps = 60
    const increment = allocation.totalAmount / steps
    const stepDuration = duration / steps
    let currentStep = 0

    const timer = setInterval(() => {
      currentStep++
      if (currentStep <= steps) {
        setAnimatedAmount(Math.min(increment * currentStep, allocation.totalAmount))
      } else {
        setAnimatedAmount(allocation.totalAmount)
        setIsAnimating(false)
        clearInterval(timer)
      }
    }, stepDuration)

    return () => clearInterval(timer)
  }, [allocation.totalAmount])

  // Counter animation for breakdown amounts
  useEffect(() => {
    const duration = 1500 // 1.5 seconds
    const steps = 60
    const initialValues = allocation.breakdown.map(() => 0)
    setAnimatedBreakdown(initialValues)

    const timers: NodeJS.Timeout[] = []

    allocation.breakdown.forEach((item, idx) => {
      // Add staggered delay for each item
      const delay = idx * 100 // 100ms delay between each item
      
      const timer = setTimeout(() => {
        const increment = item.amount / steps
        const stepDuration = duration / steps
        let currentStep = 0

        const intervalTimer = setInterval(() => {
          currentStep++
          setAnimatedBreakdown((prev) => {
            const newValues = [...prev]
            if (currentStep <= steps) {
              newValues[idx] = Math.min(increment * currentStep, item.amount)
            } else {
              newValues[idx] = item.amount
              clearInterval(intervalTimer)
            }
            return newValues
          })
        }, stepDuration)

        timers.push(intervalTimer)
      }, delay)

      timers.push(timer)
    })

    return () => {
      timers.forEach((timer) => {
        clearTimeout(timer)
        clearInterval(timer)
      })
    }
  }, [allocation.breakdown])

  const totalBonus = allocation.bonuses.reduce((sum, b) => sum + b.amount, 0)

  return (
    <div className="space-y-8 md:space-y-12">
      <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl md:rounded-3xl p-6 md:p-8 lg:p-12 text-white shadow-2xl">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          {/* Left: Total Amount */}
          <div>
            <p className="text-blue-100 text-xs md:text-sm font-semibold mb-2 md:mb-3 uppercase tracking-wide">Total Allocation</p>
            <div className="space-y-2 md:space-y-3">
              <div className="flex items-baseline gap-2 md:gap-3 animate-fade-in-up flex-wrap">
                <div className="flex items-baseline gap-1 md:gap-2">
                  <Image
                    src="/smile.svg"
                    alt="Coin icon"
                    width={24}
                    height={24}
                    className="inline-block opacity-100 w-5 h-5 md:w-6 md:h-6"
                    style={{ color: "transparent" }}
                  />
                  <span className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold transition-all duration-300 animate-fade-in">
                    {Math.floor(animatedAmount).toLocaleString()}
                  </span>
                </div>
                <span className="text-xl sm:text-2xl md:text-3xl text-blue-100 animate-fade-in-delay">{allocation.tokenSymbol}</span>
              </div>
              <p className="text-blue-100 text-base md:text-lg">
                ≈ ${(allocation.totalAmount * 0.1).toLocaleString(undefined, { maximumFractionDigits: 2 })} USD
              </p>
            </div>

            <div className="mt-6 md:mt-8 flex items-center gap-2 md:gap-3">
              {allocation.isEligible ? (
                <>
                  <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6 text-green-300" />
                  <span className="text-green-100 font-bold text-base md:text-lg">Fully Eligible</span>
                </>
              ) : (
                <>
                  <div className="w-5 h-5 md:w-6 md:h-6 rounded-full border-2 border-yellow-300 flex items-center justify-center">
                    <span className="text-yellow-300 font-bold text-xs md:text-sm">!</span>
                  </div>
                  <span className="text-yellow-100 font-bold text-base md:text-lg">Partially Eligible</span>
                </>
              )}
            </div>
          </div>

          {/* Right: Details */}
          <div className="space-y-4 md:space-y-6">
            {/* Address */}
            <div>
              <p className="text-blue-100 text-xs md:text-sm font-semibold mb-2 uppercase tracking-wide">Your Address</p>
              <div
                className="flex items-center gap-2 md:gap-3 bg-white/10 backdrop-blur-sm rounded-lg md:rounded-xl p-3 md:p-4 group cursor-pointer hover:bg-white/20 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-blue-500/20"
                onClick={copyToClipboard}
              >
                <code className="text-xs md:text-sm text-white font-mono flex-1 truncate transition-all duration-300 relative">
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute inset-0">{allocation.address}</span>
                  <span className="opacity-100 group-hover:opacity-0 transition-opacity duration-300">••••••••••••••••••••••••••••••••••••••••</span>
                </code>
                <button className="p-1 md:p-1.5 hover:bg-white/20 rounded transition-all duration-300 hover:scale-110 active:scale-95 flex-shrink-0">
                  {copied ? (
                    <CheckCircle2 size={18} className="md:w-5 md:h-5 text-green-300" />
                  ) : (
                    <Copy size={18} className="md:w-5 md:h-5 text-white" />
                  )}
                </button>
              </div>
            </div>

            {/* Coming Soon */}
            <div>
              <p className="text-blue-100 text-xs md:text-sm font-semibold mb-2 uppercase tracking-wide">Claim Status</p>
              <div className="flex items-center gap-2">
                <p className="text-white font-bold text-base md:text-lg animate-pulse-glow">Coming Soon</p>
                <span className="inline-block w-2 h-2 bg-green-400 rounded-full animate-ping"></span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-black mb-4 md:mb-6">Allocation Breakdown</h2>
        <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
          {allocation.breakdown.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl md:rounded-2xl border border-gray-200 p-4 md:p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between mb-3 md:mb-4">
                <div className="flex-1 min-w-0">
                  <p className="text-gray-600 text-xs md:text-sm font-semibold mb-1 truncate">{item.category}</p>
                  <div className="flex items-baseline gap-1 md:gap-2">
                    <Image
                      src="/download.svg"
                      alt="Coin icon"
                      width={20}
                      height={20}
                      className="inline-block opacity-100 w-4 h-4 md:w-5 md:h-5 flex-shrink-0"
                      style={{ color: "transparent" }}
                    />
                    <p className="text-2xl md:text-3xl font-bold text-gray-900">
                      {animatedBreakdown[idx] !== undefined
                        ? Math.floor(animatedBreakdown[idx]).toLocaleString()
                        : item.amount.toLocaleString()}
                    </p>
                  </div>
                </div>
                <div className="text-right flex-shrink-0 ml-2">
                  <p className="text-blue-600 font-bold text-base md:text-lg">{item.percentage}%</p>
                  <p className="text-gray-500 text-xs">of total</p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden mb-4">
                <div
                  className="h-full bg-gradient-to-r from-blue-600 to-blue-500 rounded-full transition-all duration-500"
                  style={{ width: `${item.percentage}%` }}
                />
              </div>

              {/* Multiplier Badge */}
              {item.multiplier > 1 && (
                <div className="inline-block px-4 py-1.5 rounded-full bg-green-50 border border-green-200 text-green-700 text-xs font-bold">
                  {item.multiplier}x Multiplier
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {allocation.bonuses.length > 0 && (
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-black mb-4 md:mb-6">Bonuses Applied</h2>
          <div className="space-y-3 md:space-y-4">
            {allocation.bonuses.map((bonus, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between bg-green-50 rounded-lg md:rounded-xl border border-green-200 p-4 md:p-5"
              >
                <div className="flex items-center gap-2 md:gap-4 flex-1 min-w-0">
                  <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-green-600 flex-shrink-0" />
                  <span className="text-gray-900 font-semibold text-sm md:text-lg truncate">{bonus.label}</span>
                </div>
                <span className="text-green-600 font-bold text-lg md:text-xl flex-shrink-0 ml-2">+{bonus.amount.toLocaleString()}</span>
              </div>
            ))}
            <div className="flex items-center justify-between bg-blue-50 rounded-lg md:rounded-xl border border-blue-200 p-4 md:p-5">
              <span className="text-gray-900 font-bold text-base md:text-lg">Total Bonuses</span>
              <span className="text-blue-600 font-bold text-lg md:text-xl">+{totalBonus.toLocaleString()}</span>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-3 md:gap-4 pt-4 md:pt-6">
        <button className="flex-1 px-6 md:px-8 py-3 md:py-4 rounded-lg md:rounded-xl bg-blue-600 text-white font-bold text-base md:text-lg hover:bg-blue-700 transition-colors duration-300 shadow-lg">
          Claim Airdrop
        </button>
        <button className="flex-1 px-6 md:px-8 py-3 md:py-4 rounded-lg md:rounded-xl border-2 border-blue-600 text-blue-600 font-bold text-base md:text-lg hover:bg-blue-50 transition-colors duration-300">
          View Details
        </button>
      </div>
    </div>
  )
}
