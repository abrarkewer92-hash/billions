"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"

interface WalletConnectorProps {
  onConnect: (address: string) => void
}

const DEMO_WALLETS = [
  { name: "MetaMask", icon: "/metamask.svg", address: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb" },
  { name: "Coinbase", icon: "/coinbase.svg", address: "0x8ba1f109551bD432803012645Ac136ddd64DBA72" },
]

export default function WalletConnector({ onConnect }: WalletConnectorProps) {
  return (
    <div className="space-y-3">
      {DEMO_WALLETS.map((wallet) => (
        <Button
          key={wallet.name}
          variant="outline"
          onClick={() => onConnect(wallet.address)}
          className="w-full border-[#2a2a3a] bg-[#181827] text-white hover:bg-[#2a2a3a] hover:text-white hover:border-[#3a3a4a] transition-all h-12"
        >
          <Image
            src={wallet.icon}
            alt={wallet.name}
            width={20}
            height={20}
            className="mr-3"
          />
          <span className="text-sm font-medium">Connect {wallet.name}</span>
        </Button>
      ))}
    </div>
  )
}
