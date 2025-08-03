"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  ArrowRight,
  Mail,
  ExternalLink,
  CheckCircle,
  AlertCircle,
  FileText,
  Shield,
  Coins,
  Users,
  BookOpen,
  MessageCircle,
  Phone,
  Info,
  Map,
  Zap,
} from "lucide-react"

// Navigation links data
const navigationLinks = {
  quickLinks: [
    { name: "About", href: "#about", icon: Info },
    { name: "Features", href: "#features", icon: Zap },
    { name: "Roadmap", href: "#roadmap", icon: Map },
    { name: "FAQ", href: "#faq", icon: MessageCircle },
    { name: "Blog", href: "#blog", icon: BookOpen },
    { name: "Contact", href: "#contact", icon: Phone },
  ],
  tokenInfo: [
    { name: "Whitepaper", href: "/whitepaper.pdf", icon: FileText, external: true },
    { name: "Tokenomics", href: "#tokenomics", icon: Coins },
    { name: "Audit Report", href: "/audit-report.pdf", icon: Shield, external: true },
    { name: "Purchase Token", href: "#purchase", icon: Coins },
    { name: "Join Presale", href: "#presale", icon: Users },
  ],
}

// Social media links
const socialLinks = [
  {
    name: "Telegram",
    icon: "💬",
    url: "https://t.me/ironik",
    color: "from-blue-400 to-cyan-400",
    hoverColor: "hover:shadow-blue-400/50",
  },
  {
    name: "Discord",
    icon: "🎮",
    url: "https://discord.gg/ironik",
    color: "from-indigo-400 to-purple-400",
    hoverColor: "hover:shadow-purple-400/50",
  },
  {
    name: "X (Twitter)",
    icon: "🐦",
    url: "https://x.com/ironik",
    color: "from-gray-400 to-blue-400",
    hoverColor: "hover:shadow-blue-400/50",
  },
  {
    name: "Medium",
    icon: "📝",
    url: "https://medium.com/@ironik",
    color: "from-green-400 to-emerald-400",
    hoverColor: "hover:shadow-green-400/50",
  },
]

// Legal links
const legalLinks = [
  { name: "Privacy Policy", href: "/privacy" },
  { name: "Terms of Use", href: "/terms" },
  { name: "Cookie Policy", href: "/cookies" },
]

// Toast notification component
function Toast({
  message,
  type,
  isVisible,
  onClose,
}: { message: string; type: "success" | "error"; isVisible: boolean; onClose: () => void }) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose()
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [isVisible, onClose])

  if (!isVisible) return null

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom duration-300">
      <div
        className={`flex items-center space-x-3 px-6 py-4 rounded-2xl backdrop-blur-xl border-2 shadow-2xl ${
          type === "success"
            ? "bg-gradient-to-r from-green-900/80 to-emerald-900/80 border-green-400/50 text-green-200"
            : "bg-gradient-to-r from-red-900/80 to-rose-900/80 border-red-400/50 text-red-200"
        }`}
      >
        {type === "success" ? (
          <CheckCircle className="w-6 h-6 text-green-400" />
        ) : (
          <AlertCircle className="w-6 h-6 text-red-400" />
        )}
        <span className="font-medium">{message}</span>
        <button onClick={onClose} className="ml-2 text-gray-400 hover:text-white transition-colors">
          ×
        </button>
      </div>
    </div>
  )
}

// Newsletter subscription component
function NewsletterSubscription() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")
  const [toast, setToast] = useState<{ message: string; type: "success" | "error"; isVisible: boolean }>({
    message: "",
    type: "success",
    isVisible: false,
  })

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email.trim()) {
      setError("Email is required")
      return
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address")
      return
    }

    setIsSubmitting(true)
    setError("")

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      setToast({
        message: "🎉 Successfully subscribed! Welcome to the IRONIK community.",
        type: "success",
        isVisible: true,
      })

      setEmail("")
    } catch (error) {
      setToast({
        message: "Failed to subscribe. Please try again.",
        type: "error",
        isVisible: true,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
    if (error) {
      setError("")
    }
  }

  return (
    <>
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={() => setToast((prev) => ({ ...prev, isVisible: false }))}
      />

      <div className="space-y-6">
        <div className="space-y-3">
          <h3 className="text-xl font-bold text-white">Stay Updated</h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            Subscribe for the latest updates, token announcements, and exclusive insights from the IRONIK ecosystem.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={handleEmailChange}
              className={`bg-gray-800/50 border-2 transition-all duration-300 focus:bg-gray-800/70 ${
                error
                  ? "border-red-400/60 focus:border-red-400 shadow-lg shadow-red-500/25"
                  : "border-gray-600/50 focus:border-purple-400/60 focus:shadow-lg focus:shadow-purple-500/25"
              }`}
            />
            {error && (
              <p className="text-red-400 text-sm flex items-center space-x-1">
                <AlertCircle className="w-4 h-4" />
                <span>{error}</span>
              </p>
            )}
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="relative group w-full bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 hover:from-purple-700 hover:via-blue-700 hover:to-cyan-700 text-white border-0 shadow-2xl shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-500 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform -skew-x-12 translate-x-full group-hover:translate-x-[-100%]" />

            {isSubmitting ? (
              <div className="flex items-center space-x-2 relative z-10">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Subscribing...</span>
              </div>
            ) : (
              <div className="flex items-center justify-center space-x-2 relative z-10">
                <Mail className="w-4 h-4" />
                <span>Subscribe</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </div>
            )}
          </Button>
        </form>

        <p className="text-xs text-gray-500 leading-relaxed">
          We respect your privacy. Unsubscribe at any time. No spam, just valuable updates about IRONIK's progress.
        </p>
      </div>
    </>
  )
}

// Brand section component
function BrandSection({ isVisible }: { isVisible: boolean }) {
  return (
    <div
      className={`space-y-6 transition-all duration-1000 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      {/* Logo and brand name */}
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-2xl shadow-purple-500/25">
              <span className="text-white font-bold text-xl">I</span>
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 rounded-xl blur-lg opacity-30 animate-pulse" />
          </div>
          <div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent">
              IRONIK
            </h2>
            <p className="text-xs text-gray-500 uppercase tracking-wider">Blockchain Innovation</p>
          </div>
        </div>

        <p className="text-gray-400 text-sm leading-relaxed">
          IRONIK is a blockchain-powered platform built to redefine financial accessibility through decentralized
          innovation, empowering users with cutting-edge DeFi solutions.
        </p>
      </div>

      {/* Social media links */}
      <div className="space-y-3">
        <h4 className="text-sm font-semibold text-gray-300 uppercase tracking-wider">Join Our Community</h4>
        <div className="flex space-x-3">
          {socialLinks.map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`group relative flex items-center justify-center w-10 h-10 bg-gray-800/50 border border-gray-600/50 rounded-lg transition-all duration-300 hover:scale-110 hover:border-opacity-80 ${social.hoverColor} hover:shadow-lg`}
              title={social.name}
            >
              <span className="text-lg group-hover:scale-110 transition-transform duration-300">{social.icon}</span>
              <div
                className={`absolute inset-0 bg-gradient-to-r ${social.color} opacity-0 group-hover:opacity-20 rounded-lg transition-opacity duration-300`}
              />
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}

// Navigation links component
function NavigationLinks({
  title,
  links,
  isVisible,
  delay = 0,
}: { title: string; links: any[]; isVisible: boolean; delay?: number }) {
  return (
    <div
      className={`space-y-6 transition-all duration-1000 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <h3 className="text-xl font-bold text-white">{title}</h3>
      <ul className="space-y-3">
        {links.map((link) => {
          const IconComponent = link.icon
          return (
            <li key={link.name}>
              <a
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                className="group flex items-center space-x-3 text-gray-400 hover:text-white transition-all duration-300 hover:translate-x-1"
              >
                <IconComponent className="w-4 h-4 text-gray-500 group-hover:text-purple-400 transition-colors duration-300" />
                <span className="text-sm font-medium">{link.name}</span>
                {link.external && (
                  <ExternalLink className="w-3 h-3 text-gray-600 group-hover:text-gray-400 transition-colors duration-300" />
                )}
              </a>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default function FooterSection() {
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
    <footer ref={sectionRef} className="relative bg-black border-t border-gray-800/50 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/20 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/5 via-transparent to-blue-900/5" />
      </div>

      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(139, 92, 246, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(139, 92, 246, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-purple-400 rounded-full animate-pulse opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10">
        {/* Main footer content */}
        <div className="container mx-auto px-6 lg:px-12 py-16 lg:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            {/* Column 1: Brand Overview */}
            <div className="lg:col-span-1">
              <BrandSection isVisible={isVisible} />
            </div>

            {/* Column 2: Quick Links */}
            <div className="lg:col-span-1">
              <NavigationLinks
                title="Quick Links"
                links={navigationLinks.quickLinks}
                isVisible={isVisible}
                delay={200}
              />
            </div>

            {/* Column 3: Token Info */}
            <div className="lg:col-span-1">
              <NavigationLinks title="Token Info" links={navigationLinks.tokenInfo} isVisible={isVisible} delay={400} />
            </div>

            {/* Column 4: Newsletter */}
            <div
              className={`lg:col-span-1 transition-all duration-1000 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: "600ms" }}
            >
              <NewsletterSubscription />
            </div>
          </div>
        </div>

        {/* Divider line */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-400/30 to-transparent h-px" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-400/20 to-transparent h-px blur-sm" />
        </div>

        {/* Bottom bar */}
        <div
          className={`container mx-auto px-6 lg:px-12 py-8 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: "800ms" }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="flex items-center space-x-4">
              <p className="text-gray-400 text-sm">
                © 2025 <span className="text-white font-semibold">IRONIK</span>. All rights reserved.
              </p>
              <div className="hidden md:block w-px h-4 bg-gray-600" />
              <p className="text-gray-500 text-xs">Built with ❤️ for the future of finance</p>
            </div>

            {/* Legal links */}
            <div className="flex items-center space-x-6">
              {legalLinks.map((link, index) => (
                <div key={link.name} className="flex items-center space-x-6">
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white text-sm transition-colors duration-300 hover:underline underline-offset-4"
                  >
                    {link.name}
                  </a>
                  {index < legalLinks.length - 1 && <div className="w-px h-3 bg-gray-600" />}
                </div>
              ))}
            </div>
          </div>

          {/* Additional info bar */}
          <div className="mt-6 pt-6 border-t border-gray-800/50">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0">
              <div className="flex items-center space-x-6 text-xs text-gray-500">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span>Platform Status: Operational</span>
                </div>
                <div className="hidden md:block w-px h-3 bg-gray-700" />
                <span>Last Updated: December 2024</span>
                <div className="hidden md:block w-px h-3 bg-gray-700" />
                <span>Version 2.1.0</span>
              </div>

              <div className="flex items-center space-x-4 text-xs text-gray-500">
                <span>Powered by Blockchain Technology</span>
                <div className="flex items-center space-x-1">
                  <Shield className="w-3 h-3 text-green-400" />
                  <span className="text-green-400">Audited & Secure</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom glow effects */}
      <div className="absolute bottom-0 left-1/4 w-96 h-32 bg-gradient-to-t from-purple-600/10 to-transparent blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-32 bg-gradient-to-t from-blue-600/10 to-transparent blur-3xl" />
    </footer>
  )
}
