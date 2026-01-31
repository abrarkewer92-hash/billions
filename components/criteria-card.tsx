"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

interface CriteriaCardProps {
  category: {
    name: string
    color: string
    bgColor: string
    icon: string
    criteria: string[]
  }
  categoryKey: string
  selectedCriteria: string[]
  onSelect: (criterion: string) => void
}

export default function CriteriaCard({ category, categoryKey, selectedCriteria, onSelect }: CriteriaCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const isAllSelected = category.criteria.length > 0 && category.criteria.every((c) => selectedCriteria.includes(c))

  return (
    <div className="group relative">
      {/* Glow effect */}
      <div
        className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${category.color} opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-20`}
      />

      <div
        className={`relative rounded-2xl border border-gray-700/50 group-hover:border-gray-600 bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-sm overflow-hidden transition-all duration-300`}
      >
        {/* Header */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full p-6 flex items-center justify-between hover:bg-gray-800/30 transition-colors"
        >
          <div className="flex items-center gap-4">
            {/* Category Icon Badge */}
            <div
              className={`flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br ${category.color} text-white text-xl flex-shrink-0 shadow-lg`}
            >
              {category.icon}
            </div>
            <div className="text-left">
              <h3 className="text-lg font-bold text-white">{category.name}</h3>
              <p className="text-sm text-gray-400">
                {selectedCriteria.length} of {category.criteria.length} selected
              </p>
            </div>
          </div>
          <ChevronDown
            size={24}
            className={`text-gray-400 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
          />
        </button>

        {/* Expanded Content */}
        {isExpanded && (
          <div className="border-t border-gray-700/30 px-6 py-4 bg-gray-900/20">
            <div className="space-y-3">
              {category.criteria.map((criterion, idx) => {
                const isSelected = selectedCriteria.includes(criterion)
                return (
                  <label key={idx} className="flex items-start gap-3 cursor-pointer group/item">
                    <div className="relative mt-1">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => onSelect(criterion)}
                        className="w-5 h-5 rounded-lg border border-gray-600 bg-gray-800 checked:bg-gradient-to-r checked:border-transparent checked:from-pink-500 checked:to-blue-600 cursor-pointer transition-all"
                      />
                      {isSelected && (
                        <svg
                          className="absolute inset-0 w-5 h-5 text-white pointer-events-none"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    <span
                      className={`text-sm leading-relaxed transition-colors group-hover/item:text-white ${isSelected ? "text-white font-medium" : "text-gray-400"}`}
                    >
                      {criterion}
                    </span>
                  </label>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
