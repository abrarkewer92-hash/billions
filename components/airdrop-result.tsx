"use client"

import Image from "next/image"

interface AirdropResultProps {
  result: {
    amount: number
    tier: string
    percentage: number
    description: string
    eligible?: boolean
  }
}

export default function AirdropResult({ result }: AirdropResultProps) {
  const isEligible = result.eligible !== false

  const getColorClass = (tier: string) => {
    switch (tier) {
      case "TIER_1":
        return "from-blue-500 to-blue-600"
      case "TIER_2":
        return "from-purple-500 to-purple-600"
      case "TIER_3":
        return "from-green-500 to-emerald-600"
      case "NOT_ELIGIBLE":
        return "from-red-500 to-red-600"
      default:
        return "from-slate-500 to-slate-600"
    }
  }

  const getTierLabel = (tier: string) => {
    switch (tier) {
      case "TIER_1":
        return "Early Supporter"
      case "TIER_2":
        return "Active Member"
      case "TIER_3":
        return "Community Champion"
      case "NOT_ELIGIBLE":
        return "Not Eligible"
      default:
        return "Airdrop Eligible"
    }
  }

  if (!isEligible) {
    return (
      <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
        {/* Not Eligible Badge */}
        <div className="flex items-center justify-center gap-2 p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
          <svg className="w-5 h-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            ></path>
          </svg>
          <span className="text-sm font-semibold text-red-400">Address Not Eligible</span>
        </div>

        {/* Not Eligible Display */}
        <div className="bg-gradient-to-r from-red-500 to-red-600 p-6 rounded-lg text-center relative overflow-hidden">
          {/* Background Coin Animation - Dimmed */}
          <div className="absolute inset-0 flex items-center justify-center opacity-10">
            <div className="relative w-32 h-32 animate-spin-slow">
              <Image
                src="/65187528ea7612a0d29eb451_coin-full@2-optimized.png"
                alt="TEA Coin"
                width={128}
                height={128}
                className="drop-shadow-[0_0_30px_rgba(255,255,255,0.5)] grayscale"
              />
            </div>
          </div>
          <div className="relative z-10">
            <p className="text-sm font-medium text-white/90 mb-2">{getTierLabel(result.tier)}</p>
            <div className="flex items-center justify-center gap-3 mb-1">
              <div className="relative w-12 h-12 opacity-50 grayscale">
                <Image
                  src="/65187528ea7612a0d29eb451_coin-full@2-optimized.png"
                  alt="TEA Coin"
                  width={48}
                  height={48}
                  className="drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]"
                />
              </div>
              <p className="text-5xl font-bold text-white">0</p>
            </div>
            <p className="text-sm text-white/80">TEA Tokens</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-[#181827] border border-[#2a2a3a] rounded-lg p-3">
            <p className="text-xs text-[#a0a0a0] mb-1">Distribution</p>
            <p className="text-lg font-bold text-red-400">{result.percentage}%</p>
          </div>
          <div className="bg-[#181827] border border-[#2a2a3a] rounded-lg p-3">
            <p className="text-xs text-[#a0a0a0] mb-1">Status</p>
            <p className="text-sm font-semibold text-red-400">Not Eligible</p>
          </div>
        </div>

        {/* Description */}
        <div className="bg-[#181827]/50 border border-[#2a2a3a]/50 rounded-lg p-4">
          <p className="text-xs text-[#a0a0a0] leading-relaxed">{result.description}</p>
        </div>

        {/* Info */}
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 text-center">
          <p className="text-xs text-red-300">
            This wallet address does not meet the eligibility criteria for the TEA Airdrop. Eligibility is determined by on-chain activity and community participation.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Success Badge */}
      <div className="flex items-center justify-center gap-2 p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
        <svg className="w-5 h-5 text-[#98FF99]" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clipRule="evenodd"
          ></path>
        </svg>
        <span className="text-sm font-semibold text-[#98FF99]">Eligible Allocation Confirmed!</span>
      </div>

      {/* Amount Display */}
      <div className={`bg-gradient-to-r ${getColorClass(result.tier)} p-6 rounded-lg text-center relative overflow-hidden`}>
        {/* Background Coin Animation */}
        <div className="absolute inset-0 flex items-center justify-center opacity-20">
          <div className="relative w-32 h-32 animate-spin-slow">
            <Image
              src="/65187528ea7612a0d29eb451_coin-full@2-optimized.png"
              alt="TEA Coin"
              width={128}
              height={128}
              className="drop-shadow-[0_0_30px_rgba(255,255,255,0.5)]"
            />
          </div>
        </div>
        <div className="relative z-10">
          <p className="text-sm font-medium text-white/90 mb-2">{getTierLabel(result.tier)}</p>
          <div className="flex items-center justify-center gap-3 mb-1">
            <div className="relative w-12 h-12 animate-float">
              <Image
                src="/65187528ea7612a0d29eb451_coin-full@2-optimized.png"
                alt="TEA Coin"
                width={48}
                height={48}
                className="drop-shadow-[0_0_15px_rgba(255,255,255,0.8)] animate-pulse-glow"
              />
            </div>
            <p className="text-5xl font-bold text-white">{result.amount.toLocaleString()}</p>
          </div>
          <p className="text-sm text-white/80">TEA Tokens</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-[#181827] border border-[#2a2a3a] rounded-lg p-3">
          <p className="text-xs text-[#a0a0a0] mb-1">Rarity</p>
          <p className="text-lg font-bold text-[#98FF99]">{result.percentage}%</p>
        </div>
        <div className="bg-[#181827] border border-[#2a2a3a] rounded-lg p-3">
          <p className="text-xs text-[#a0a0a0] mb-1">Status</p>
          <p className="text-sm font-semibold text-white">Eligible</p>
        </div>
      </div>

      {/* Description */}
      <div className="bg-[#181827]/50 border border-[#2a2a3a]/50 rounded-lg p-4">
        <p className="text-xs text-[#a0a0a0] leading-relaxed">{result.description}</p>
      </div>

      {/* Claim Info */}
      <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-3 text-center">
        <p className="text-xs text-amber-300">
          ✓ Your allocation has been verified on the official TEA Airdrop. Claim details coming soon.
        </p>
      </div>
    </div>
  )
}
