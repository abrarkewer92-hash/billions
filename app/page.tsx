"use client"
import AirdropChecker from "@/components/airdrop-checker"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <AirdropChecker />
      <Footer />
    </main>
  )
}
