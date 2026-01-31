"use client"

interface EligibilityResultProps {
  status: {
    isEligible: boolean
    matchingCategories: number
    selectedCount: number
  }
}

export default function EligibilityResult({ status }: EligibilityResultProps) {
  return (
    <div className="mx-auto max-w-2xl">
      <div
        className={`relative rounded-2xl border-2 overflow-hidden backdrop-blur-sm p-8 ${
          status.isEligible
            ? "border-green-500/50 bg-gradient-to-br from-green-900/20 to-emerald-900/10"
            : "border-gray-600/50 bg-gradient-to-br from-gray-900/20 to-gray-800/10"
        }`}
      >
        {/* Glow effect */}
        <div
          className={`absolute inset-0 rounded-2xl blur-2xl -z-10 ${
            status.isEligible
              ? "bg-gradient-to-r from-green-500/20 to-emerald-500/20"
              : "bg-gradient-to-r from-gray-500/10 to-gray-600/10"
          }`}
        />

        <div className="flex items-start gap-6">
          {/* Icon */}
          <div
            className={`flex-shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center text-2xl ${
              status.isEligible
                ? "bg-gradient-to-br from-green-500 to-emerald-600"
                : "bg-gradient-to-br from-gray-600 to-gray-700"
            }`}
          >
            {status.isEligible ? "✓" : "⚠"}
          </div>

          <div className="flex-1">
            <h3 className={`text-2xl font-bold mb-2 ${status.isEligible ? "text-green-400" : "text-gray-300"}`}>
              {status.isEligible ? "✓ Eligible!" : "Not Fully Eligible"}
            </h3>
            <p className="text-gray-400 mb-4">
              {status.isEligible ? (
                <>
                  You qualify for the airdrop! You match{" "}
                  <strong className="text-white">{status.matchingCategories}</strong> eligibility categor
                  {status.matchingCategories === 1 ? "y" : "ies"} with{" "}
                  <strong className="text-white">{status.selectedCount}</strong> total criteria met.
                </>
              ) : (
                <>
                  You selected <strong className="text-white">{status.selectedCount}</strong> criteria across{" "}
                  <strong className="text-white">{status.matchingCategories}</strong> categor
                  {status.matchingCategories === 1 ? "y" : "ies"}. Meet more criteria to increase your eligibility rank!
                </>
              )}
            </p>

            {status.isEligible && (
              <div className="flex gap-3">
                <button className="px-6 py-2 rounded-lg bg-gradient-to-r from-pink-500 to-pink-600 text-white font-medium hover:from-pink-600 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-pink-500/50">
                  Claim Airdrop
                </button>
                <button className="px-6 py-2 rounded-lg border border-green-500/50 text-green-400 font-medium hover:bg-green-500/10 transition-colors duration-300">
                  Learn More
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-gray-700/30">
          <div>
            <p className="text-gray-500 text-sm mb-1">Matching Categories</p>
            <p className="text-2xl font-bold text-white">{status.matchingCategories}/5</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm mb-1">Criteria Selected</p>
            <p className="text-2xl font-bold text-white">{status.selectedCount}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
