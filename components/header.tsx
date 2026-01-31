import Image from "next/image"

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white">
      {/* Top Banner */}
      <div className="bg-blue-600 text-white text-center py-3 px-4">
        <p className="text-sm md:text-base" style={{ fontFamily: "'Sk-Modernist', sans-serif" }}>
          Billions is excited to announce a total capital funding of $30M to build the first Human and AI Network.{" "}
          <a href="#" className="underline font-semibold hover:text-blue-100 transition-colors">
            Learn more here
          </a>
        </p>
      </div>

      {/* Main Header */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Image src="/billions-logo.png" alt="Billions" width={160} height={40} className="h-10 w-auto" priority />
          </div>

          {/* Download Button */}
          <button className="flex items-center gap-2 px-6 py-2.5 rounded-full border-2 border-black bg-black text-white font-semibold hover:bg-gray-900 transition-colors">
            DOWNLOAD
            <span className="text-lg">→</span>
          </button>
        </div>
      </div>
    </header>
  )
}
