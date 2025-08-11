"use client"

import { useEffect, useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { DollarSign, Calendar, Wallet, TrendingUp, Users, Target, Zap, Shield, Rocket } from "lucide-react"
import { useMounted } from "@/hooks/use-mounted"

// Enhanced Countdown Timer Hook
function useCountdown(targetDate: string) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime()
      const target = new Date(targetDate).getTime()
      const difference = target - now

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        })
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [targetDate])

  return timeLeft
}

// Creative Hexagonal Progress Component
function HexagonalProgress({
  progress,
  size = 280,
}: {
  progress: number
  size?: number
}) {
  const points = []
  const centerX = size / 2
  const centerY = size / 2
  const radius = size / 2 - 40

  // Generate hexagon points
  for (let i = 0; i < 6; i++) {
    const angle = (i * Math.PI) / 3
    const x = centerX + radius * Math.cos(angle)
    const y = centerY + radius * Math.sin(angle)
    points.push(`${x},${y}`)
  }

  const hexagonPath = `M ${points.join(" L ")} Z`

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="transform rotate-90">
        {/* Outer glow effect */}
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="hexGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8b5cf6" />
            <stop offset="33%" stopColor="#3b82f6" />
            <stop offset="66%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#f59e0b" />
          </linearGradient>
          <linearGradient id="bgHexGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(139, 92, 246, 0.1)" />
            <stop offset="100%" stopColor="rgba(59, 130, 246, 0.1)" />
          </linearGradient>
        </defs>

        {/* Background hexagon */}
        <path d={hexagonPath} fill="url(#bgHexGradient)" stroke="rgba(255,255,255,0.1)" strokeWidth="2" />

        {/* Progress hexagon */}
        <path
          d={hexagonPath}
          fill="none"
          stroke="url(#hexGradient)"
          strokeWidth="6"
          strokeDasharray={`${(progress / 100) * 600} 600`}
          strokeLinecap="round"
          filter="url(#glow)"
          className="transition-all duration-2000 ease-out"
        />

        {/* Inner decorative elements */}
        <circle cx={centerX} cy={centerY} r="20" fill="none" stroke="url(#hexGradient)" strokeWidth="2" opacity="0.5" />
        <circle cx={centerX} cy={centerY} r="35" fill="none" stroke="url(#hexGradient)" strokeWidth="1" opacity="0.3" />
      </svg>

      {/* Center content */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-green-400 bg-clip-text text-transparent">
            {progress}%
          </div>
          <div className="text-sm text-gray-400 mt-1">FUNDED</div>
          <div className="w-8 h-0.5 bg-gradient-to-r from-purple-400 to-blue-400 mx-auto mt-2 rounded-full" />
        </div>
      </div>
    </div>
  )
}

// Futuristic Countdown Timer
function FuturisticCountdown({ targetDate }: { targetDate: string }) {
  const timeLeft = useCountdown(targetDate)

  return (
    <div className="relative">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20 blur-xl rounded-2xl" />

      <div className="relative flex flex-wrap gap-3">
        {Object.entries(timeLeft).map(([unit, value], index) => (
          <div key={unit} className="relative group">
            {/* Animated border */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-blue-500 to-green-500 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />

            <div className="relative bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4 hover:border-purple-500/50 transition-all duration-300">
              {/* Digital display effect */}
              <div className="text-center">
                <div className="text-3xl font-mono font-bold text-white relative">
                  <span className="relative z-10">{value.toString().padStart(2, "0")}</span>
                  <div className="absolute inset-0 text-purple-400/20 blur-sm">{value.toString().padStart(2, "0")}</div>
                </div>
                <div className="text-xs text-gray-400 uppercase tracking-widest mt-2 font-semibold">{unit}</div>
              </div>

              {/* Corner accents */}
              <div className="absolute top-1 left-1 w-2 h-2 border-l-2 border-t-2 border-purple-400/50" />
              <div className="absolute top-1 right-1 w-2 h-2 border-r-2 border-t-2 border-blue-400/50" />
              <div className="absolute bottom-1 left-1 w-2 h-2 border-l-2 border-b-2 border-green-400/50" />
              <div className="absolute bottom-1 right-1 w-2 h-2 border-r-2 border-b-2 border-yellow-400/50" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Creative Info Card with Holographic Effect
function HolographicCard({
  icon: Icon,
  label,
  value,
  accent = false,
  delay = 0,
}: {
  icon: any
  label: string
  value: string
  accent?: boolean
  delay?: number
}) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className="relative group"
      style={{ animationDelay: `${delay}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Holographic background effect */}
      <div
        className={`absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-xl blur-md ${
          accent
            ? "from-purple-500/30 via-blue-500/30 to-green-500/30"
            : "from-gray-500/20 via-gray-400/20 to-gray-600/20"
        }`}
      />

      <Card
        className={`relative bg-[#160e23]  backdrop-blur-xl border transition-all duration-500 hover:scale-105 hover:-translate-y-2 ${
          accent
            ? "border-purple-500/30 hover:border-purple-400/60 hover:shadow-lg hover:shadow-purple-500/25"
            : "border-gray-700/30 hover:border-gray-600/60"
        }`}
      >
        <CardContent className="p-6 relative overflow-hidden">
          {/* Animated background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent transform rotate-45 translate-x-full group-hover:translate-x-[-100%] transition-transform duration-1000" />
          </div>

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div
                className={`p-3 rounded-xl transition-all duration-300 ${
                  accent
                    ? "bg-gradient-to-r from-purple-500/20 to-blue-500/20 group-hover:from-purple-500/30 group-hover:to-blue-500/30"
                    : "bg-gray-700/30 group-hover:bg-gray-600/40"
                }`}
              >
                <Icon
                  className={`w-6 h-6 transition-all duration-300 ${
                    accent ? "text-purple-400 group-hover:text-purple-300" : "text-gray-400 group-hover:text-gray-300"
                  }`}
                />
              </div>

              {/* Status indicator */}
              <div className={`w-2 h-2 rounded-full ${accent ? "bg-green-400" : "bg-blue-400"} animate-pulse`} />
            </div>

            <div className="space-y-2">
              <span className="text-gray-400 text-sm font-medium tracking-wide">{label}</span>
              <div
                className={`text-lg md:text-xl font-bold transition-all duration-300 ${
                  accent ? "text-white group-hover:text-purple-200" : "text-gray-200 group-hover:text-white"
                }`}
              >
                {value}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default function TokenSaleSection() {
  const raisedAmount = 42000000
  const targetAmount = 60000000
  const progress = (raisedAmount / targetAmount) * 100

  const mounted = useMounted()
  const orbs = useMemo(() => {
    if (!mounted) return []
    const colors = ["bg-purple-400/30", "bg-blue-400/30", "bg-green-400/30", "bg-yellow-400/30"]
    return Array.from({ length: 20 }).map(() => ({
      width: Math.random() * 8 + 4,
      height: Math.random() * 8 + 4,
      left: Math.random() * 100,
      top: Math.random() * 100,
      animationDelay: Math.random() * 5,
      animationDuration: 3 + Math.random() * 4,
      color: colors[Math.floor(Math.random() * colors.length)],
    }))
  }, [mounted])

  return (
    <section id="sale" className="relative py-20 lg:py-32 bg-black overflow-hidden">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20" />
        <div className="absolute inset-0 bg-gradient-to-tl from-green-900/10 via-transparent to-yellow-900/10" />
      </div>

      {/* Dynamic Grid Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div
          className="absolute inset-0 animate-pulse"
          style={{
            backgroundImage: `
              linear-gradient(rgba(139, 92, 246, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(139, 92, 246, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Floating Energy Orbs (client-only to avoid hydration mismatch) */}
      {mounted && (
        <div className="absolute inset-0">
          {orbs.map((o, i) => (
            <div
              key={i}
              className={`absolute rounded-full animate-pulse ${o.color}`}
              style={{
                width: `${o.width}px`,
                height: `${o.height}px`,
                left: `${o.left}%`,
                top: `${o.top}%`,
                animationDelay: `${o.animationDelay}s`,
                animationDuration: `${o.animationDuration}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* Scanning Lines */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute w-full h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent animate-pulse"
          style={{ top: "20%", animationDelay: "0s" }}
        />
        <div
          className="absolute w-full h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent animate-pulse"
          style={{ top: "60%", animationDelay: "2s" }}
        />
        <div
          className="absolute w-full h-px bg-gradient-to-r from-transparent via-green-500/50 to-transparent animate-pulse"
          style={{ top: "80%", animationDelay: "4s" }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 md:px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-20 items-stretch">
          {/* Left Column - Enhanced Progress */}
          <div className="text-center lg:text-left space-y-8 flex flex-col">
            {/* Header with animated elements */}
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-8 h-8 border-l-2 border-t-2 border-purple-400/50" />
              <div className="absolute -top-4 -right-4 w-8 h-8 border-r-2 border-t-2 border-blue-400/50" />

              <div className="space-y-4 p-6 bg-gradient-to-r from-gray-900/30 to-black/30 backdrop-blur-sm border border-gray-700/30 rounded-2xl">
                <div className="flex items-center space-x-3 justify-center lg:justify-start">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-green-400 text-sm font-semibold tracking-wide">LIVE SALE</span>
                </div>

                <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold">
                  <span className="flex flex-col bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
                    Token Sale
                  </span>
                  <span className="text-white">is Live</span>
                </h2>

                <p className="text-xl text-gray-300">
                  Join our revolutionary token sale and secure your share of the future.
                </p>
              </div>
            </div>

            {/* Enhanced Progress Display */}
            <div className=" flex justify-center lg:justify-start">
              <div className="relative">
                <HexagonalProgress progress={progress} size={270} />

                {/* Orbiting elements */}
                <div className="absolute inset-0 animate-spin" style={{ animationDuration: "20s" }}>
                  <div className="absolute top-4 left-1/2 w-2 h-2 bg-purple-400 rounded-full transform -translate-x-1/2" />
                  <div className="absolute bottom-4 left-1/2 w-2 h-2 bg-blue-400 rounded-full transform -translate-x-1/2" />
                  <div className="absolute left-4 top-1/2 w-2 h-2 bg-green-400 rounded-full transform -translate-y-1/2" />
                  <div className="absolute right-4 top-1/2 w-2 h-2 bg-yellow-400 rounded-full transform -translate-y-1/2" />
                </div>
              </div>
            </div>

            {/* Enhanced Amount Display */}
            <div className="relative p-6 bg-gradient-to-r from-gray-900/50 to-black/50 backdrop-blur-xl border border-gray-700/30 rounded-2xl">
              <div className="text-center lg:text-left space-y-4">
                <div className="text-3xl font-bold">
                  <span className="text-gray-400">Raised: </span>
                  <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                    ${raisedAmount.toLocaleString()}
                  </span>
                  <span className="text-gray-500"> / ${targetAmount.toLocaleString()}</span>
                </div>

                <div className="flex items-center justify-center lg:justify-start space-x-4">
                  <div className="flex items-center space-x-2">
                    <Rocket className="w-4 h-4 text-purple-400" />
                    <span className="text-purple-300 text-sm font-medium">Phase 2 of 3</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Shield className="w-4 h-4 text-green-400" />
                    <span className="text-green-300 text-sm font-medium">Verified</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Countdown */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-white text-center lg:text-left">
                <span className="text-gray-400">Sale Ends In:</span>
              </h3>
              <FuturisticCountdown targetDate="2025-09-15T23:59:59" />
            </div>

            {/* Enhanced CTA */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6 mt-auto">
              <Button className="relative group bg-blue-600 hover:bg-purple-700 border-0 shadow-2xl shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300 px-8 py-6 text-lg overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform -skew-x-12 translate-x-full group-hover:translate-x-[-100%]" />
                <Zap className="w-5 h-5 mr-2 relative z-10" />
                <span className="relative z-10">Buy Tokens Now</span>
              </Button>

              <Button
                variant="outline"
                className="border-gray-600 bg-gray-900/50 hover:bg-border-900/50 hover:bg-purple-700 duration-300 text-white backdrop-blur-sm px-8 py-6 text-lg relative group overflow-hidden"
              >
                <Target className="w-5 h-5 mr-2 relative z-10" />
                <span className="relative z-10">View Details</span>
              </Button>
            </div>
          </div>

          {/* Right Column - Enhanced Sales Information */}
          <div className=" space-y-8 flex flex-col">
            <div className="text-center lg:text-left">
              <h3 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-2">
                Sales Information
              </h3>
              <div className="w-20 h-1 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full mx-auto lg:mx-0" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-6">
              <HolographicCard icon={Target} label="Token Symbol" value="$CryptoVault" accent={true} delay={0} />
              <HolographicCard
                icon={DollarSign}
                label="Token Price"
                value="1 CryptoVault = $0.10"
                accent={true}
                delay={100}
              />
              <HolographicCard icon={TrendingUp} label="Total Supply" value="1,000,000,000" delay={200} />
              <HolographicCard icon={Users} label="Tokens Available" value="600,000,000" delay={300} />
              <HolographicCard icon={Calendar} label="Sale Ends" value="September 15, 2025" delay={400} />
              <HolographicCard icon={Wallet} label="Accepted Payments" value="ETH, BNB, USDT" delay={500} />
            </div>

            {/* Enhanced Stats Panel */}
            <div className="relative mt-12 flex-grow flex flex-col justify-end">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-blue-600/20 to-green-600/20 blur-xl rounded-2xl" />

              <div className="relative p-8 bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-xl border border-gray-700/30 rounded-2xl">
                <div className="flex flex-wrap gap-4 md:gap-8 justify-between text-center">
                  <div className="group">
                    <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent group-hover:from-purple-300 group-hover:to-blue-300 transition-all duration-300">
                      15,420
                    </div>
                    <div className="text-sm text-gray-400 mt-2 group-hover:text-gray-300 transition-colors">
                      Contributors
                    </div>
                    <div className="w-full h-0.5 bg-gradient-to-r from-purple-400/50 to-blue-400/50 mt-2 rounded-full" />
                  </div>

                  <div className="group">
                    <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent group-hover:from-blue-300 group-hover:to-green-300 transition-all duration-300">
                      $2.1M
                    </div>
                    <div className="text-sm text-gray-400 mt-2 group-hover:text-gray-300 transition-colors">
                      Avg. Contribution
                    </div>
                    <div className="w-full h-0.5 bg-gradient-to-r from-blue-400/50 to-green-400/50 mt-2 rounded-full" />
                  </div>

                  <div className="group">
                    <div className="text-3xl font-bold bg-gradient-to-r from-green-400 to-yellow-400 bg-clip-text text-transparent group-hover:from-green-300 group-hover:to-yellow-300 transition-all duration-300">
                      72h
                    </div>
                    <div className="text-sm text-gray-400 mt-2 group-hover:text-gray-300 transition-colors">
                      Time Left
                    </div>
                    <div className="w-full h-0.5 bg-gradient-to-r from-green-400/50 to-yellow-400/50 mt-2 rounded-full" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Bottom Effects */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-purple-600/10 via-blue-600/5 to-transparent" />
      <div className="absolute bottom-0 right-0 w-96 h-32 bg-gradient-to-t from-green-600/10 to-transparent blur-3xl" />
    </section>
  )
}
