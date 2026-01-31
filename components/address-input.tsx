"use client"

import type React from "react"

import { useState } from "react"
import { Search } from "lucide-react"

interface AddressInputProps {
  onSubmit: (address: string) => void
  isLoading: boolean
}

export default function AddressInput({ onSubmit, isLoading }: AddressInputProps) {
  const [address, setAddress] = useState("")
  const [error, setError] = useState("")

  const validateAddress = (addr: string): boolean => {
    return /^0x[a-fA-F0-9]{40}$/.test(addr.trim())
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmedAddress = address.trim()

    if (!trimmedAddress) {
      setError("Please enter an address")
      return
    }

    if (!validateAddress(trimmedAddress)) {
      setError("Invalid Ethereum address. Must start with 0x and be 42 characters.")
      return
    }

    setError("")
    onSubmit(trimmedAddress)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="relative max-w-2xl mx-auto">
        <div className="bg-white rounded-xl sm:rounded-2xl border-2 border-gray-200 shadow-lg p-1.5 sm:p-2">
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 p-3 sm:p-4">
            <div className="flex-1 min-w-0">
              <input
                type="text"
                value={address}
                onChange={(e) => {
                  setAddress(e.target.value)
                  setError("")
                }}
                placeholder="0x"
                className="w-full bg-transparent text-gray-900 placeholder-gray-400 outline-none font-mono text-xs sm:text-sm md:text-base"
                disabled={isLoading}
              />
            </div>
            <button
              type="submit"
              disabled={isLoading || !address.trim()}
              className="flex items-center justify-center gap-2 px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 disabled:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300 text-sm sm:text-base w-full sm:w-auto"
            >
              <Search size={16} className="sm:w-[18px] sm:h-[18px]" />
              <span>Check Eligibility</span>
            </button>
          </div>
        </div>
      </div>
      {error && <p className="mt-2 sm:mt-3 text-red-600 text-xs sm:text-sm text-center px-4">{error}</p>}
    </form>
  )
}
