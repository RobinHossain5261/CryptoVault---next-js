"use client"

import type React from "react"
import { useState, useEffect } from "react"

// Enhanced partner data with more creative elements
const partnerLogos = [
  { name: "Binance", logo: "🔶", glow: "from-yellow-400 to-orange-400" },
  { name: "Coinbase", logo: "🔷", glow: "from-blue-400 to-cyan-400" },
  { name: "Kraken", logo: "🟣", glow: "from-purple-400 to-pink-400" },
  { name: "CoinMarketCap", logo: "🟡", glow: "from-yellow-400 to-green-400" },
  { name: "Uniswap", logo: "🦄", glow: "from-pink-400 to-purple-400" },
  { name: "PancakeSwap", logo: "🥞", glow: "from-orange-400 to-yellow-400" },
  { name: "1inch", logo: "🔺", glow: "from-red-400 to-pink-400" },
  { name: "SushiSwap", logo: "🍣", glow: "from-green-400 to-blue-400" },
  { name: "Chainlink", logo: "🔗", glow: "from-blue-400 to-purple-400" },
  { name: "Polygon", logo: "🟪", glow: "from-purple-400 to-indigo-400" },
]

const mediaLogos = [
  { name: "Forbes", logo: "📰", glow: "from-gray-400 to-white" },
  { name: "CoinTelegraph", logo: "📡", glow: "from-cyan-400 to-blue-400" },
  { name: "TechCrunch", logo: "🚀", glow: "from-green-400 to-cyan-400" },
  { name: "Bloomberg", logo: "📊", glow: "from-blue-400 to-purple-400" },
  { name: "Reuters", logo: "📢", glow: "from-red-400 to-orange-400" },
  { name: "CoinDesk", logo: "💰", glow: "from-yellow-400 to-green-400" },
  { name: "Decrypt", logo: "🔓", glow: "from-purple-400 to-pink-400" },
  { name: "The Block", logo: "🧱", glow: "from-orange-400 to-red-400" },
  { name: "Benzinga", logo: "📈", glow: "from-green-400 to-blue-400" },
  { name: "Yahoo Finance", logo: "💹", glow: "from-purple-400 to-blue-400" },
]

const announcements = [
  {
    text: "🔥 Phase 2 Presale Ends Soon!",
    color: "from-red-400 via-orange-400 to-yellow-400",
    bg: "from-red-900/20 to-orange-900/20",
  },
  {
    text: "📈 Token Listed on Major Exchanges",
    color: "from-green-400 via-emerald-400 to-cyan-400",
    bg: "from-green-900/20 to-cyan-900/20",
  },
  {
    text: "🚀 Join Our 50K+ Telegram Community",
    color: "from-purple-400 via-pink-400 to-rose-400",
    bg: "from-purple-900/20 to-pink-900/20",
  },
  {
    text: "⚡ Staking Rewards Up to 25% APY",
    color: "from-yellow-400 via-amber-400 to-orange-400",
    bg: "from-yellow-900/20 to-orange-900/20",
  },
  {
    text: "🎯 Roadmap Phase 3 Completed",
    color: "from-blue-400 via-indigo-400 to-purple-400",
    bg: "from-blue-900/20 to-purple-900/20",
  },
  {
    text: "🔒 Smart Contract Audited by CertiK",
    color: "from-cyan-400 via-teal-400 to-green-400",
    bg: "from-cyan-900/20 to-green-900/20",
  },
  {
    text: "🌟 Featured in Top Crypto Publications",
    color: "from-pink-400 via-rose-400 to-red-400",
    bg: "from-pink-900/20 to-red-900/20",
  },
  {
    text: "💎 Limited Time: Bonus Tokens Available",
    color: "from-indigo-400 via-purple-400 to-pink-400",
    bg: "from-indigo-900/20 to-pink-900/20",
  },
]

// Creative floating orb component
function FloatingOrb({ delay, size, color }: { delay: number; size: number; color: string }) {
  return (
    <div
      className={`absolute rounded-full ${color} animate-pulse opacity-20`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDelay: `${delay}s`,
        animationDuration: `${3 + Math.random() * 4}s`,
      }}
    />
  )
}

// Enhanced marquee item with creative effects
function CreativeMarqueeItem({ item, type }: { item: any; type: "partner" | "media" }) {
  const [isHovered, setIsHovered] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  return (
    <div
      className="relative flex items-center mx-6 group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
    >
      {/* Dynamic background that follows mouse */}
      {isHovered && (
        <div
          className={`absolute w-32 h-32 bg-gradient-to-r ${item.glow} opacity-20 blur-3xl rounded-full transition-all duration-300 pointer-events-none`}
          style={{
            left: mousePosition.x - 64,
            top: mousePosition.y - 64,
          }}
        />
      )}

      {/* Main container */}
      <div
        className={`relative flex items-center space-x-4 p-4 rounded-2xl transition-all duration-500 backdrop-blur-sm ${
          isHovered
            ? "bg-gradient-to-r from-gray-800/60 to-gray-900/60 scale-110 shadow-2xl border border-gray-600/50"
            : "bg-gray-900/20 hover:bg-gray-800/30"
        }`}
      >
        {/* Logo container with creative effects */}
        <div className="relative">
          <div
            className={`flex items-center justify-center w-14 h-14 rounded-xl transition-all duration-500 ${
              isHovered
                ? `bg-gradient-to-r ${item.glow.replace("from-", "from-").replace("to-", "to-")}/20 shadow-lg`
                : "bg-gray-800/40"
            }`}
          >
            <span className={`text-2xl transition-all duration-300 ${isHovered ? "scale-125" : ""}`}>{item.logo}</span>
          </div>

          {/* Orbiting elements */}
          {isHovered && (
            <>
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full animate-ping" />
              <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-gradient-to-r from-green-400 to-yellow-400 rounded-full animate-pulse" />
            </>
          )}
        </div>

        {/* Text content */}
        <div className="flex flex-col">
          <span
            className={`font-bold transition-all duration-300 ${
              isHovered ? `bg-gradient-to-r ${item.glow} bg-clip-text text-transparent` : "text-gray-300"
            }`}
          >
            {item.name}
          </span>
          <span className="text-xs text-gray-500 uppercase tracking-wider">
            {type === "partner" ? "Exchange" : "Media"}
          </span>
        </div>

        {/* Holographic edge effect */}
        {isHovered && (
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/5 to-transparent transform rotate-1 transition-all duration-500" />
        )}
      </div>
    </div>
  )
}

// Creative announcement with advanced effects
function CreativeAnnouncement({ announcement }: { announcement: any }) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), Math.random() * 2000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className={`relative mx-6 group transition-all duration-1000 ${isVisible ? "opacity-100" : "opacity-0"}`}>
      {/* Background glow effect */}
      <div
        className={`absolute inset-0 bg-gradient-to-r ${announcement.bg} blur-xl rounded-full scale-150 opacity-0 group-hover:opacity-100 transition-all duration-500`}
      />

      {/* Main announcement container */}
      <div
        className={`relative px-8 py-4 bg-gradient-to-r ${announcement.bg} backdrop-blur-sm border border-gray-700/30 rounded-full hover:border-gray-500/50 transition-all duration-500 group-hover:scale-105`}
      >
        {/* Animated border */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 animate-pulse" />

        {/* Text content */}
        <span
          className={`relative font-bold text-lg bg-gradient-to-r ${announcement.color} bg-clip-text text-transparent group-hover:drop-shadow-lg transition-all duration-300`}
        >
          {announcement.text}
        </span>

        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden rounded-full">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-1 h-1 bg-gradient-to-r ${announcement.color.split(" ")[1]} rounded-full opacity-0 group-hover:opacity-100 animate-ping`}
              style={{
                left: `${20 + i * 30}%`,
                top: `${20 + i * 20}%`,
                animationDelay: `${i * 0.5}s`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

// Enhanced marquee row with creative effects
function CreativeMarqueeRow({
  children,
  direction = "left",
  speed = "normal",
  waveEffect = false,
}: {
  children: React.ReactNode
  direction?: "left" | "right"
  speed?: "slow" | "normal" | "fast"
  waveEffect?: boolean
}) {
  const speedDuration = {
    slow: "60s",
    normal: "40s",
    fast: "25s",
  }[speed]

  return (
    <div className="relative overflow-hidden">
      {/* Wave distortion effect */}
      {waveEffect && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/5 to-transparent animate-pulse" />
      )}

      <div
        className="flex whitespace-nowrap hover:pause"
        style={{
          animation: `marquee-${direction} ${speedDuration} linear infinite`,
          width: "200%",
        }}
      >
        <div className="flex items-center">{children}</div>
        <div className="flex items-center">{children}</div>
      </div>
    </div>
  )
}

export default function MarqueeSection() {
  return (
    <section className="relative py-20 bg-black overflow-hidden">
      {/* Creative background layers */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-black to-blue-900/10" />
        <div className="absolute inset-0 bg-gradient-to-tl from-green-900/5 via-transparent to-pink-900/5" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-900/20 to-transparent" />
      </div>

      {/* Dynamic mesh gradient */}
      <div className="absolute inset-0 opacity-30">
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(circle at 20% 50%, rgba(139, 92, 246, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 40% 80%, rgba(16, 185, 129, 0.1) 0%, transparent 50%)
            `,
          }}
        />
      </div>

      {/* Floating orbs */}
      <div className="absolute inset-0">
        {[...Array(25)].map((_, i) => (
          <FloatingOrb
            key={i}
            delay={i * 0.5}
            size={Math.random() * 20 + 10}
            color={
              ["bg-purple-400", "bg-blue-400", "bg-green-400", "bg-yellow-400", "bg-pink-400"][
                Math.floor(Math.random() * 5)
              ]
            }
          />
        ))}
      </div>

      {/* Scanning lines */}
      <div className="absolute inset-0">
        <div
          className="absolute w-full h-px bg-gradient-to-r from-transparent via-purple-400/30 to-transparent animate-pulse"
          style={{ top: "25%", animationDelay: "0s", animationDuration: "4s" }}
        />
        <div
          className="absolute w-full h-px bg-gradient-to-r from-transparent via-blue-400/30 to-transparent animate-pulse"
          style={{ top: "50%", animationDelay: "2s", animationDuration: "4s" }}
        />
        <div
          className="absolute w-full h-px bg-gradient-to-r from-transparent via-green-400/30 to-transparent animate-pulse"
          style={{ top: "75%", animationDelay: "1s", animationDuration: "4s" }}
        />
      </div>

      {/* Creative border effects */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-400/50 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-400/50 to-transparent" />

      <div className="relative z-10 space-y-16">
        {/* Row 1: Partners with wave effect */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/5 via-blue-600/10 to-purple-600/5 blur-3xl" />
          <CreativeMarqueeRow direction="left" speed="normal" waveEffect={true}>
            {[...partnerLogos, ...partnerLogos].map((partner, index) => (
              <CreativeMarqueeItem key={`partner-${index}`} item={partner} type="partner" />
            ))}
          </CreativeMarqueeRow>
        </div>

        {/* Row 2: Announcements with creative effects */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-green-600/5 via-yellow-600/10 to-pink-600/5 blur-3xl" />
          <CreativeMarqueeRow direction="right" speed="slow">
            {[...announcements, ...announcements].map((announcement, index) => (
              <CreativeAnnouncement key={`announcement-${index}`} announcement={announcement} />
            ))}
          </CreativeMarqueeRow>
        </div>

        {/* Row 3: Media with enhanced effects */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-purple-600/10 to-cyan-600/5 blur-3xl" />
          <CreativeMarqueeRow direction="left" speed="fast" waveEffect={true}>
            {[...mediaLogos, ...mediaLogos].map((media, index) => (
              <CreativeMarqueeItem key={`media-${index}`} item={media} type="media" />
            ))}
          </CreativeMarqueeRow>
        </div>
      </div>

      {/* Bottom creative effects */}
      <div className="absolute bottom-0 left-1/4 w-96 h-32 bg-gradient-to-t from-purple-600/10 to-transparent blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-32 bg-gradient-to-t from-blue-600/10 to-transparent blur-3xl" />

      {/* Enhanced CSS animations */}
      <style jsx>{`
        @keyframes marquee-left {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-100%); }
        }

        @keyframes marquee-right {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(0%); }
        }

        .hover\\:pause:hover {
          animation-play-state: paused;
        }

        /* Creative glow effects */
        @keyframes glow-pulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }

        .animate-glow {
          animation: glow-pulse 2s ease-in-out infinite;
        }
      `}</style>
    </section>
  )
}
