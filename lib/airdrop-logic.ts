import type { AirdropAllocation } from "@/components/airdrop-checker"

// Mock allocation data based on address hash
function hashAddress(address: string): number {
  const hash = address
    .toLowerCase()
    .split("")
    .reduce((acc, char) => {
      return (acc << 5) - acc + char.charCodeAt(0)
    }, 0)
  return Math.abs(hash)
}

export function calculateAirdropAllocation(address: string): AirdropAllocation {
  const hash = hashAddress(address)

  // Generate deterministic but varied allocation amounts
  // Range: 100 to 5000 BILLIONS
  const baseAmount = 100 + (hash % 4901) // 100 + (0 to 4900) = 100 to 5000
  const isEligible = hash % 3 !== 0 // 66% eligibility rate

  // Create breakdown categories with proportional amounts
  // Ensure breakdown totals approximately equal baseAmount
  const billionsPowerPoints = Math.floor(baseAmount * 0.25)
  const creators = Math.floor(baseAmount * 0.2)
  const discord = Math.floor(baseAmount * 0.2)
  const twitter = Math.floor(baseAmount * 0.18)
  const onchainAssets = Math.floor(baseAmount * 0.17)
  
  // Adjust to ensure breakdown sums to baseAmount
  const breakdownSum = billionsPowerPoints + creators + discord + twitter + onchainAssets
  const adjustment = baseAmount - breakdownSum

  const breakdown = [
    {
      category: "Billions Power Points",
      amount: billionsPowerPoints + (adjustment > 0 ? Math.min(adjustment, 1) : 0),
      percentage: Math.round((billionsPowerPoints / baseAmount) * 100),
      multiplier: 1.5,
    },
    {
      category: "Creators",
      amount: creators,
      percentage: Math.round((creators / baseAmount) * 100),
      multiplier: 1.2,
    },
    {
      category: "Discord",
      amount: discord,
      percentage: Math.round((discord / baseAmount) * 100),
      multiplier: 1.0,
    },
    {
      category: "X (Twitter)",
      amount: twitter,
      percentage: Math.round((twitter / baseAmount) * 100),
      multiplier: 1.3,
    },
    {
      category: "Onchain Assets",
      amount: onchainAssets + (adjustment > 1 ? adjustment - 1 : (adjustment < 0 ? adjustment : 0)),
      percentage: Math.round((onchainAssets / baseAmount) * 100),
      multiplier: 2.0,
    },
  ]

  const baseTotal = breakdown.reduce((sum, item) => sum + item.amount, 0)

  // Calculate bonuses
  const bonuses = [
    { label: "Early Adopter Bonus", amount: Math.floor(baseTotal * 0.1) },
    { label: "Loyalty Multiplier", amount: Math.floor(baseTotal * 0.05) },
  ]

  if (isEligible) {
    bonuses.push({ label: "Eligibility Bonus", amount: Math.floor(baseTotal * 0.15) })
  }

  const totalBonus = bonuses.reduce((sum, b) => sum + b.amount, 0)
  let totalAmount = baseTotal + totalBonus
  
  // Cap maximum at 5000 BILLIONS
  const MAX_AMOUNT = 5000
  totalAmount = Math.min(totalAmount, MAX_AMOUNT)
  
  // Recalculate percentages based on final totalAmount
  const finalBreakdown = breakdown.map((item) => ({
    ...item,
    percentage: Math.round((item.amount / totalAmount) * 100),
  }))

  return {
    address,
    isEligible,
    totalAmount,
    tokenSymbol: "BILLIONS",
    breakdown: finalBreakdown,
    bonuses,
    claimDeadline: "June 15, 2025",
  }
}
