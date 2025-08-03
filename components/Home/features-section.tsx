"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Shield, Zap, Layers, Globe, Gem, Users, Lock, TrendingUp, Cpu, Network, Sparkles } from "lucide-react"

// Enhanced feature data with better contrast colors
const features = [
  {
    id: 1,
    title: "Secure & Audited Smart Contracts",
    description: "Military-grade security with multi-layer audits by leading blockchain security firms.",
    icon: Shield,
    gradient: "from-emerald-300 to-green-300",
    bgGradient: "from-emerald-500/30 to-green-500/30",
    glowColor: "shadow-emerald-500/50",
    borderColor: "border-emerald-400/60",
    size: "large",
    badge: "Verified",
    badgeColor: "bg-emerald-400/20 text-emerald-200 border-emerald-300/50",
    pattern: "dots",
  },
  {
    id: 2,
    title: "Lightning Fast",
    description: "Sub-second transaction speeds with minimal gas fees across all networks.",
    icon: Zap,
    gradient: "from-yellow-300 to-amber-300",
    bgGradient: "from-yellow-500/30 to-amber-500/30",
    glowColor: "shadow-yellow-500/50",
    borderColor: "border-yellow-400/60",
    size: "medium",
    badge: "New",
    badgeColor: "bg-yellow-400/20 text-yellow-200 border-yellow-300/50",
    pattern: "lightning",
  },
  {
    id: 3,
    title: "DeFi Integration Ready",
    description: "Seamlessly connect with major DeFi protocols and yield farming platforms.",
    icon: Layers,
    gradient: "from-purple-300 to-pink-300",
    bgGradient: "from-purple-500/30 to-pink-500/30",
    glowColor: "shadow-purple-500/50",
    borderColor: "border-purple-400/60",
    size: "medium",
    pattern: "waves",
  },
  {
    id: 4,
    title: "Multi-Chain Compatibility",
    description: "Deploy across Ethereum, BSC, Polygon, and 15+ other blockchain networks.",
    icon: Globe,
    gradient: "from-cyan-300 to-blue-300",
    bgGradient: "from-cyan-500/30 to-blue-500/30",
    glowColor: "shadow-cyan-500/50",
    borderColor: "border-cyan-400/60",
    size: "large",
    pattern: "network",
  },
  {
    id: 5,
    title: "Real Product Backing",
    description: "Every token backed by tangible assets and real-world utility.",
    icon: Gem,
    gradient: "from-indigo-300 to-violet-300",
    bgGradient: "from-indigo-500/30 to-violet-500/30",
    glowColor: "shadow-indigo-500/50",
    borderColor: "border-indigo-400/60",
    size: "medium",
    badge: "Most Loved",
    badgeColor: "bg-indigo-400/20 text-indigo-200 border-indigo-300/50",
    pattern: "gems",
  },
  {
    id: 6,
    title: "Community Governance",
    description: "Decentralized decision-making with transparent voting mechanisms.",
    icon: Users,
    gradient: "from-teal-300 to-emerald-300",
    bgGradient: "from-teal-500/30 to-emerald-500/30",
    glowColor: "shadow-teal-500/50",
    borderColor: "border-teal-400/60",
    size: "small",
    pattern: "circles",
  },
  {
    id: 7,
    title: "Advanced Analytics",
    description: "Real-time insights and performance tracking for all your investments.",
    icon: TrendingUp,
    gradient: "from-rose-300 to-pink-300",
    bgGradient: "from-rose-500/30 to-pink-500/30",
    glowColor: "shadow-rose-500/50",
    borderColor: "border-rose-400/60",
    size: "small",
    pattern: "charts",
  },
  {
    id: 8,
    title: "AI-Powered Security",
    description: "Machine learning algorithms detect and prevent suspicious activities.",
    icon: Cpu,
    gradient: "from-violet-300 to-purple-300",
    bgGradient: "from-violet-500/30 to-purple-500/30",
    glowColor: "shadow-violet-500/50",
    borderColor: "border-violet-400/60",
    size: "medium",
    pattern: "circuit",
  },
]

// Creative background patterns
function BackgroundPattern({ pattern, isHovered }: { pattern: string; isHovered: boolean }) {
  const getPatternSVG = () => {
    switch (pattern) {
      case "dots":
        return (
          <svg className="w-full h-full opacity-10" viewBox="0 0 100 100">
            <defs>
              <pattern id="dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="10" cy="10" r="2" fill="currentColor" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dots)" />
          </svg>
        )
      case "lightning":
        return (
          <svg className="w-full h-full opacity-10" viewBox="0 0 100 100">
            <path
              d="M20,10 L30,30 L25,30 L35,50 L25,40 L30,40 L20,60 L25,45 L20,45 L25,25 L20,25 Z"
              fill="currentColor"
              className={`transition-all duration-500 ${isHovered ? "animate-pulse" : ""}`}
            />
          </svg>
        )
      case "waves":
        return (
          <svg className="w-full h-full opacity-10" viewBox="0 0 100 100">
            <path
              d="M0,50 Q25,30 50,50 T100,50 V100 H0 Z"
              fill="currentColor"
              className={`transition-all duration-500 ${isHovered ? "animate-pulse" : ""}`}
            />
          </svg>
        )
      case "network":
        return (
          <svg className="w-full h-full opacity-10" viewBox="0 0 100 100">
            <g className={`transition-all duration-500 ${isHovered ? "animate-pulse" : ""}`}>
              <circle cx="20" cy="20" r="3" fill="currentColor" />
              <circle cx="80" cy="20" r="3" fill="currentColor" />
              <circle cx="50" cy="50" r="3" fill="currentColor" />
              <circle cx="20" cy="80" r="3" fill="currentColor" />
              <circle cx="80" cy="80" r="3" fill="currentColor" />
              <line x1="20" y1="20" x2="50" y2="50" stroke="currentColor" strokeWidth="1" />
              <line x1="80" y1="20" x2="50" y2="50" stroke="currentColor" strokeWidth="1" />
              <line x1="50" y1="50" x2="20" y2="80" stroke="currentColor" strokeWidth="1" />
              <line x1="50" y1="50" x2="80" y2="80" stroke="currentColor" strokeWidth="1" />
            </g>
          </svg>
        )
      default:
        return null
    }
  }

  return <div className="absolute inset-0 text-white">{getPatternSVG()}</div>
}

// Floating energy orbs
function EnergyOrb({ delay, color, size }: { delay: number; color: string; size: number }) {
  return (
    <div
      className={`absolute rounded-full ${color} animate-pulse blur-sm`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDelay: `${delay}s`,
        animationDuration: `${3 + Math.random() * 3}s`,
      }}
    />
  )
}

// Enhanced feature card with creative effects
function CreativeFeatureCard({ feature, index }: { feature: any; index: number }) {
  const [isHovered, setIsHovered] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([])
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  const handleClick = (e: React.MouseEvent) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const newRipple = {
      id: Date.now(),
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    }
    setRipples((prev) => [...prev, newRipple])
    setTimeout(() => {
      setRipples((prev) => prev.filter((ripple) => ripple.id !== newRipple.id))
    }, 1000)
  }

  const getGridClasses = () => {
    switch (feature.size) {
      case "large":
        return "col-span-1 lg:col-span-2 row-span-2"
      case "medium":
        return "col-span-1 row-span-1"
      case "small":
        return "col-span-1 row-span-1"
      default:
        return "col-span-1 row-span-1"
    }
  }

  const Icon = feature.icon

  return (
    <div
      className={`group ${getGridClasses()}`}
      style={{
        animationDelay: `${index * 150}ms`,
      }}
    >
      <Card
        ref={cardRef}
        className={`relative h-full bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-xl border-2 transition-all duration-700 overflow-hidden cursor-pointer transform-gpu ${
          feature.borderColor
        } ${isHovered ? `scale-[1.03] ${feature.glowColor} shadow-2xl` : "shadow-lg"}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseMove={handleMouseMove}
        onClick={handleClick}
      >
        {/* Ripple effects */}
        {ripples.map((ripple) => (
          <div
            key={ripple.id}
            className={`absolute bg-gradient-to-r ${feature.gradient} opacity-30 rounded-full animate-ping pointer-events-none`}
            style={{
              left: ripple.x - 25,
              top: ripple.y - 25,
              width: "50px",
              height: "50px",
            }}
          />
        ))}

        {/* Dynamic spotlight effect */}
        {isHovered && (
          <div
            className={`absolute w-96 h-96 bg-gradient-radial ${feature.bgGradient} opacity-20 blur-3xl rounded-full transition-all duration-500 pointer-events-none`}
            style={{
              left: mousePosition.x - 192,
              top: mousePosition.y - 192,
            }}
          />
        )}

        {/* Background pattern */}
        <BackgroundPattern pattern={feature.pattern} isHovered={isHovered} />

        {/* Animated mesh gradient overlay */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${feature.bgGradient} opacity-0 group-hover:opacity-10 transition-all duration-700`}
        />

        {/* Holographic border animation */}
        <div
          className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-1000 transform ${
            isHovered ? "translate-x-0" : "-translate-x-full"
          }`}
          style={{
            background: `linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)`,
          }}
        />

        <CardContent
          className={`relative z-10 p-6 lg:p-8 h-full flex flex-col justify-between ${
            feature.size === "large" ? "lg:p-12" : ""
          }`}
        >
          {/* Header section */}
          <div className="space-y-6">
            {/* Badge with enhanced styling */}
            {feature.badge && (
              <div
                className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-bold border-2 backdrop-blur-sm ${feature.badgeColor} transition-all duration-300 hover:scale-105`}
              >
                <Sparkles className="w-4 h-4 mr-2" />
                {feature.badge}
              </div>
            )}

            {/* Enhanced icon with multiple effects */}
            <div className="relative">
              <div
                className={`inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br ${feature.bgGradient} backdrop-blur-sm border-2 ${feature.borderColor} transition-all duration-500 ${
                  isHovered ? "scale-110 rotate-3 shadow-2xl" : ""
                }`}
              >
                <Icon
                  className={`w-10 h-10 transition-all duration-500 ${
                    isHovered ? "scale-125 rotate-12" : ""
                  } text-white drop-shadow-lg`}
                  style={{
                    filter: isHovered
                      ? `drop-shadow(0 0 12px ${feature.gradient.includes("emerald") ? "#10b981" : feature.gradient.includes("yellow") ? "#f59e0b" : feature.gradient.includes("purple") ? "#8b5cf6" : "#3b82f6"})`
                      : "none",
                  }}
                />
              </div>

              {/* Orbiting particles */}
              {isHovered && (
                <div className="absolute inset-0 animate-spin" style={{ animationDuration: "3s" }}>
                  <div className="absolute -top-2 left-1/2 w-3 h-3 bg-gradient-to-r from-white to-transparent rounded-full transform -translate-x-1/2" />
                  <div className="absolute -bottom-2 left-1/2 w-2 h-2 bg-gradient-to-r from-white/70 to-transparent rounded-full transform -translate-x-1/2" />
                  <div className="absolute top-1/2 -left-2 w-2.5 h-2.5 bg-gradient-to-r from-white/80 to-transparent rounded-full transform -translate-y-1/2" />
                  <div className="absolute top-1/2 -right-2 w-2 h-2 bg-gradient-to-r from-white/60 to-transparent rounded-full transform -translate-y-1/2" />
                </div>
              )}
            </div>

            {/* Enhanced title with better contrast */}
            <h3
              className={`font-bold transition-all duration-500 leading-tight ${
                feature.size === "large" ? "text-2xl lg:text-4xl" : "text-xl lg:text-2xl"
              } ${
                isHovered
                  ? `bg-gradient-to-r ${feature.gradient} bg-clip-text text-transparent drop-shadow-lg`
                  : "text-white drop-shadow-md"
              }`}
            >
              {feature.title}
            </h3>
          </div>

          {/* Enhanced description with better readability */}
          <div className="mt-6">
            <p
              className={`leading-relaxed transition-all duration-300 font-medium ${
                feature.size === "large" ? "text-lg lg:text-xl" : "text-base lg:text-lg"
              } ${isHovered ? "text-gray-200" : "text-gray-300"} drop-shadow-sm`}
            >
              {feature.description}
            </p>
          </div>

          {/* Enhanced interactive elements for large cards */}
          {feature.size === "large" && (
            <div className="mt-8 flex items-center space-x-6">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse shadow-lg shadow-emerald-400/50" />
                <span className="text-base font-semibold text-gray-200">Active</span>
              </div>
              <div className="flex items-center space-x-3">
                <Network className="w-5 h-5 text-cyan-400 drop-shadow-lg" />
                <span className="text-base font-semibold text-gray-200">Connected</span>
              </div>
              <div className="flex items-center space-x-3">
                <Lock className="w-5 h-5 text-yellow-400 drop-shadow-lg" />
                <span className="text-base font-semibold text-gray-200">Secured</span>
              </div>
            </div>
          )}

          {/* Enhanced hover reveal elements */}
          {isHovered && (
            <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-500">
              <div
                className={`w-12 h-12 bg-gradient-to-r ${feature.gradient} rounded-full flex items-center justify-center shadow-lg backdrop-blur-sm`}
              >
                <div className="w-3 h-3 bg-white rounded-full animate-pulse" />
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default function FeaturesSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="relative py-20 lg:py-32 bg-black overflow-hidden">
      {/* Enhanced layered backgrounds */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20" />
        <div className="absolute inset-0 bg-gradient-to-tl from-emerald-900/10 via-transparent to-pink-900/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-900/30 to-transparent" />
      </div>

      {/* Enhanced grid pattern */}
      <div className="absolute inset-0 opacity-30">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(139, 92, 246, 0.2) 1px, transparent 1px),
              linear-gradient(90deg, rgba(139, 92, 246, 0.2) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Enhanced floating energy orbs */}
      <div className="absolute inset-0">
        {[...Array(40)].map((_, i) => (
          <EnergyOrb
            key={i}
            delay={i * 0.2}
            color={
              [
                "bg-purple-400/30",
                "bg-blue-400/30",
                "bg-emerald-400/30",
                "bg-yellow-400/30",
                "bg-pink-400/30",
                "bg-cyan-400/30",
              ][Math.floor(Math.random() * 6)]
            }
            size={Math.random() * 12 + 4}
          />
        ))}
      </div>

      {/* Enhanced scanning beams */}
      <div className="absolute inset-0">
        <div
          className="absolute w-full h-px bg-gradient-to-r from-transparent via-purple-400/50 to-transparent animate-pulse"
          style={{ top: "15%", animationDelay: "0s", animationDuration: "8s" }}
        />
        <div
          className="absolute w-full h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent animate-pulse"
          style={{ top: "45%", animationDelay: "4s", animationDuration: "8s" }}
        />
        <div
          className="absolute w-full h-px bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent animate-pulse"
          style={{ top: "75%", animationDelay: "2s", animationDuration: "8s" }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-6 lg:px-12">
        {/* Enhanced section header */}
        <div
          className={`text-center mb-20 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="inline-flex items-center space-x-4 mb-8">
            <div className="w-16 h-px bg-gradient-to-r from-transparent to-purple-400" />
            <span className="text-purple-300 text-base font-bold tracking-wider uppercase bg-purple-900/20 px-4 py-2 rounded-full border border-purple-400/30">
              Core Platform Features
            </span>
            <div className="w-16 h-px bg-gradient-to-l from-transparent to-cyan-400" />
          </div>

          <h2 className="text-5xl lg:text-7xl font-bold mb-8 leading-tight">
            <span className="bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent drop-shadow-lg">
              Why Choose
            </span>
            <br />
            <span className="text-white drop-shadow-lg">Our Platform</span>
          </h2>

          <p className="text-xl lg:text-2xl text-gray-300 max-w-4xl mx-auto font-medium leading-relaxed">
            Built with cutting-edge technology and designed for the future of decentralized finance
          </p>
        </div>

        {/* Enhanced bento grid */}
        <div
          className={`grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          {features.map((feature, index) => (
            <CreativeFeatureCard key={feature.id} feature={feature} index={index} />
          ))}
        </div>

        {/* Enhanced bottom CTA */}
        <div
          className={`text-center mt-20 transition-all duration-1000 delay-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="inline-flex items-center space-x-6 px-10 py-6 bg-gradient-to-r from-gray-900/70 to-black/70 backdrop-blur-xl border-2 border-gray-600/50 rounded-2xl shadow-2xl">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse shadow-lg shadow-emerald-400/50" />
              <span className="text-gray-200 text-base font-semibold">All Features Active</span>
            </div>
            <div className="w-px h-6 bg-gray-500" />
            <div className="flex items-center space-x-3">
              <Lock className="w-5 h-5 text-cyan-400 drop-shadow-lg" />
              <span className="text-gray-200 text-base font-semibold">Enterprise Grade Security</span>
            </div>
            <div className="w-px h-6 bg-gray-500" />
            <div className="flex items-center space-x-3">
              <Sparkles className="w-5 h-5 text-yellow-400 drop-shadow-lg" />
              <span className="text-gray-200 text-base font-semibold">Premium Experience</span>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced bottom glow effects */}
      <div className="absolute bottom-0 left-1/6 w-96 h-40 bg-gradient-to-t from-purple-600/20 to-transparent blur-3xl" />
      <div className="absolute bottom-0 right-1/6 w-96 h-40 bg-gradient-to-t from-cyan-600/20 to-transparent blur-3xl" />
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-96 h-40 bg-gradient-to-t from-emerald-600/15 to-transparent blur-3xl" />

      {/* Custom CSS for enhanced effects */}
      <style jsx>{`
        .bg-gradient-radial {
          background: radial-gradient(circle, var(--tw-gradient-stops));
        }
      `}</style>
    </section>
  )
}
