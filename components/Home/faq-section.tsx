"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronDown, MessageCircle, Mail, Phone, HelpCircle, Shield, Coins, Users } from "lucide-react"

// FAQ data organized by categories
const faqData = {
  general: [
    {
      id: 1,
      question: "What is IRONIK and how does it work?",
      answer:
        "IRONIK is a revolutionary cryptocurrency backed by real-world products and assets. Our token operates on a multi-chain infrastructure, providing holders with tangible value through our innovative backing mechanism. Each token represents a stake in our growing ecosystem of verified products and services.",
      icon: HelpCircle,
    },
    {
      id: 2,
      question: "What makes IRONIK different from other cryptocurrencies?",
      answer:
        "Unlike traditional cryptocurrencies, IRONIK is backed by real products and assets, providing intrinsic value. We offer multi-chain compatibility, lightning-fast transactions, and a transparent governance system. Our platform combines DeFi innovation with real-world utility.",
      icon: HelpCircle,
    },
    {
      id: 3,
      question: "When will the token be listed on exchanges?",
      answer:
        "IRONIK will be listed on major decentralized exchanges (DEXs) immediately after the token sale concludes in Q4 2025. We're also in discussions with several tier-1 centralized exchanges for listings in Q1 2026. Early investors will have priority access to trading.",
      icon: HelpCircle,
    },
  ],
  token: [
    {
      id: 4,
      question: "How can I participate in the token sale?",
      answer:
        "You can participate by connecting your Web3 wallet (MetaMask, WalletConnect, etc.) to our platform and purchasing IRONIK tokens directly. The process is simple: connect wallet, choose your investment amount, confirm the transaction, and receive your tokens instantly.",
      icon: Coins,
    },
    {
      id: 5,
      question: "What cryptocurrencies are accepted for purchase?",
      answer:
        "We accept ETH, BNB, USDT, USDC, and BUSD for token purchases. Our smart contract automatically handles the conversion and token distribution. All major stablecoins are supported to provide flexibility for investors worldwide.",
      icon: Coins,
    },
    {
      id: 6,
      question: "Is there a minimum investment amount?",
      answer:
        "The minimum investment is $50 USD equivalent in any accepted cryptocurrency. There's no maximum limit, but large purchases over $100,000 may require additional KYC verification for compliance purposes. Early bird bonuses apply to investments over $1,000.",
      icon: Coins,
    },
    {
      id: 7,
      question: "What are the token distribution and vesting schedules?",
      answer:
        "40% of tokens are allocated for public sale, 25% for team and advisors (24-month vesting), 20% for ecosystem development, 10% for partnerships, and 5% for marketing. Public sale tokens are immediately transferable after purchase.",
      icon: Coins,
    },
  ],
  security: [
    {
      id: 8,
      question: "Is the smart contract audited and secure?",
      answer:
        "Yes, our smart contracts have been audited by CertiK, ConsenSys Diligence, and Trail of Bits - three leading blockchain security firms. All audit reports are publicly available on our website. We've implemented multi-signature wallets and time-locked functions for maximum security.",
      icon: Shield,
    },
    {
      id: 9,
      question: "How do you ensure the safety of investor funds?",
      answer:
        "We use industry-standard security practices including multi-signature wallets, time-locked smart contracts, and cold storage for treasury funds. Our platform undergoes regular security assessments, and we maintain comprehensive insurance coverage for digital assets.",
      icon: Shield,
    },
    {
      id: 10,
      question: "What happens if I lose access to my wallet?",
      answer:
        "Unfortunately, cryptocurrency transactions are irreversible and we cannot recover lost private keys. We strongly recommend using hardware wallets, backing up your seed phrases securely, and never sharing your private keys. Consider using multi-signature wallets for large investments.",
      icon: Shield,
    },
  ],
  support: [
    {
      id: 11,
      question: "How can I contact the support team?",
      answer:
        "Our support team is available 24/7 through multiple channels: Telegram (@IRONIKSupport), Discord, email (support@ironik.io), and live chat on our website. For urgent issues, use our priority support line available to token holders.",
      icon: Users,
    },
    {
      id: 12,
      question: "Where can I find the latest project updates?",
      answer:
        "Follow us on Twitter (@IRONIKOfficial), join our Telegram community (50,000+ members), subscribe to our newsletter, and check our blog for weekly development updates. We also host monthly AMA sessions with the founding team.",
      icon: Users,
    },
    {
      id: 13,
      question: "Do you offer investor education and resources?",
      answer:
        "Yes! We provide comprehensive guides, video tutorials, webinars, and a knowledge base covering cryptocurrency basics, DeFi strategies, and platform usage. Our education portal is free for all community members and regularly updated.",
      icon: Users,
    },
  ],
}

// Category tabs data
const categories = [
  { key: "general", label: "General", icon: HelpCircle, color: "from-purple-400 to-blue-400" },
  { key: "token", label: "Token Sale", icon: Coins, color: "from-yellow-400 to-orange-400" },
  { key: "security", label: "Security", icon: Shield, color: "from-green-400 to-emerald-400" },
  { key: "support", label: "Support", icon: Users, color: "from-pink-400 to-rose-400" },
]

// Floating particles component
function FloatingParticle({ delay, size, color }: { delay: number; size: number; color: string }) {
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

// Enhanced FAQ item component
function FAQItem({
  faq,
  isOpen,
  onToggle,
  index,
}: {
  faq: any
  isOpen: boolean
  onToggle: () => void
  index: number
}) {
  const [isHovered, setIsHovered] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)
  const [contentHeight, setContentHeight] = useState(0)

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight)
    }
  }, [faq.answer, isOpen]) // Recalculate height when isOpen changes

  const Icon = faq.icon

  return (
    <div
      className={`group transition-all duration-500 ${isOpen ? "transform scale-[1.02]" : ""}`}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <Card
        className={`relative bg-[#160e23] from-gray-900/60 to-black/60 backdrop-blur-xl border-2 transition-all duration-500 overflow-hidden cursor-pointer ${
          isOpen
            ? "border-purple-400/60 shadow-2xl shadow-purple-500/25"
            : isHovered
              ? "border-gray-600/60 shadow-lg shadow-gray-500/10"
              : "border-gray-700/30"
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Animated background glow */}
        {(isOpen || isHovered) && (
          <div
            className={`absolute inset-0 bg-gradient-to-r opacity-10 transition-all duration-500 ${
              isOpen ? "from-purple-500/30 to-blue-500/30" : "from-gray-500/20 to-gray-600/20"
            }`}
          />
        )}

        {/* Holographic border effect */}
        <div
          className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 transition-all duration-1000 transform ${
            isHovered ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"
          }`}
        />

        {/* Question header */}
        <div className="relative z-10 p-3 md:p-6 lg:p-8 cursor-pointer" onClick={onToggle}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 md:gap-4 flex-1">
              {/* Icon */}
              <div
                className={`flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-xl transition-all duration-300 ${
                  isOpen
                    ? "bg-gradient-to-r from-purple-500/30 to-blue-500/30 border-2 border-purple-400/50"
                    : "bg-gray-700/30 border-2 border-gray-600/30"
                }`}
              >
                <Icon
                  className={`w-4 h-4 md:w-6 md:h-6 transition-all duration-300 ${isOpen ? "text-purple-300" : "text-gray-400"}`}
                />
              </div>

              {/* Question text */}
              <h3
                className={`text-lg lg:text-xl font-bold transition-all duration-300 leading-tight ${
                  isOpen
                    ? "bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent"
                    : "text-white group-hover:text-gray-100"
                }`}
              >
                {faq.question}
              </h3>
            </div>

            {/* Chevron icon */}
            <div
              className={`flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full transition-all duration-300 ${
                isOpen
                  ? "bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-400/50"
                  : "bg-gray-700/20 border border-gray-600/30 group-hover:bg-gray-600/30"
              }`}
            >
              <ChevronDown
                className={`w-5 h-5 transition-all duration-300 ${
                  isOpen ? "rotate-180 text-purple-300" : "rotate-0 text-gray-400 group-hover:text-gray-300"
                }`}
              />
            </div>
          </div>
        </div>

        {/* Answer content with smooth animation */}
        <div
          className="overflow-hidden transition-all duration-500 ease-in-out"
          style={{
            height: isOpen ? `${contentHeight}px` : "0px",
          }}
        >
          <div ref={contentRef} className="px-6 lg:px-8 pb-6 lg:pb-8">
            <div className="pl-8 md:pl-16 pr-4">
              <div
                className={`w-full h-px bg-gradient-to-r from-purple-400/50 via-blue-400/50 to-transparent mb-6 transition-all duration-500 ${
                  isOpen ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
                }`}
              />
              <p
                className={`text-gray-300 leading-relaxed text-base lg:text-lg transition-all duration-500 ${
                  isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
              >
                {faq.answer}
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}

// Category tab component
function CategoryTab({
  category,
  isActive,
  onClick,
}: {
  category: any
  isActive: boolean
  onClick: () => void
}) {
  const [isHovered, setIsHovered] = useState(false)
  const Icon = category.icon

  return (
    <button
      className={`relative group px-3 md:px-6 py-2 md:py-4 rounded-2xl font-semibold transition-all duration-300 overflow-hidden ${
        isActive
          ? "bg-gradient-to-r from-purple-600/80 to-blue-600/80 text-white shadow-lg shadow-purple-500/25 scale-105"
          : "bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 hover:text-white border border-gray-600/30 hover:border-gray-500/50"
      }`}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background glow effect */}
      {(isActive || isHovered) && (
        <div
          className={`absolute inset-0 bg-gradient-to-r opacity-20 transition-all duration-300 ${
            isActive ? "from-purple-500 to-blue-500" : "from-gray-500 to-gray-600"
          }`}
        />
      )}

      {/* Holographic effect */}
      {isHovered && !isActive && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 translate-x-full group-hover:translate-x-[-100%] transition-transform duration-1000" />
      )}

      <div className="relative z-10 flex items-center space-x-3">
        <Icon
          className={`w-5 h-5 transition-all duration-300 ${isActive ? "text-white" : "text-gray-400 group-hover:text-gray-200"}`}
        />
        <span className="whitespace-nowrap">{category.label}</span>
      </div>

      {/* Active indicator */}
      {isActive && (
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full" />
      )}
    </button>
  )
}

// Contact support CTA component
function ContactSupportCTA() {
  const [isHovered, setIsHovered] = useState(false)

  const contactMethods = [
    { icon: MessageCircle, label: "Live Chat", description: "24/7 instant support" },
    { icon: Mail, label: "Email", description: "support@ironik.io" },
    { icon: Phone, label: "Telegram", description: "@IRONIKSupport" },
  ]

  return (
    <div className="relative mt-16">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-blue-600/15 to-green-600/10 blur-3xl rounded-3xl" />

      <Card className="relative bg-[#160e23] from-gray-900/80 to-black/80 backdrop-blur-xl border-2 border-gray-600/30 hover:border-purple-400/50 transition-all duration-500">
        <CardContent className="p-4 md:p-8 lg:p-12 text-center">
          <div className="space-y-8">
            {/* Header */}
            <div className="space-y-4">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-2xl border-2 border-purple-400/30">
                <HelpCircle className="w-8 h-8 text-purple-300" />
              </div>
              <h3 className="text-2xl lg:text-3xl font-bold text-white">Didn't find your answer?</h3>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                Our support team is here to help you 24/7. Get in touch through your preferred channel.
              </p>
            </div>

            {/* Contact methods */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {contactMethods.map((method, index) => {
                const Icon = method.icon
                return (
                  <div
                    key={index}
                    className="group p-6 bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl border border-gray-600/30 hover:border-purple-400/50 transition-all duration-300 cursor-pointer"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                  >
                    <div className="space-y-4">
                      <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-xl border border-purple-400/30 group-hover:scale-110 transition-transform duration-300">
                        <Icon className="w-6 h-6 text-purple-300" />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-white group-hover:text-purple-200 transition-colors">
                          {method.label}
                        </h4>
                        <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                          {method.description}
                        </p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* CTA Button */}
            <div className="pt-4">
              <Button className="relative group bg-gradient-to-r from-purple-600 via-blue-600 to-green-600 hover:from-purple-700 hover:via-blue-700 hover:to-green-700 text-white border-0 shadow-2xl shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-500 px-4 md:px-8 py-3 md:py-6 text-lg overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform -skew-x-12 translate-x-full group-hover:translate-x-[-100%]" />
                <MessageCircle className="w-5 h-5 mr-2 relative z-10" />
                <span className="relative z-10">Contact Support Team</span>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default function FAQSection() {
  const [activeCategory, setActiveCategory] = useState("general")
  const [openFAQ, setOpenFAQ] = useState<number | null>(1) // First FAQ open by default
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

  const handleFAQToggle = (faqId: number) => {
    setOpenFAQ(openFAQ === faqId ? null : faqId)
  }

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category)
    setOpenFAQ(null) // Close all FAQs when switching categories
  }

  const currentFAQs = faqData[activeCategory as keyof typeof faqData] || []

  // Split FAQs into two columns for desktop view
  const leftColumnFAQs = currentFAQs.filter((_, index) => index % 2 === 0)
  const rightColumnFAQs = currentFAQs.filter((_, index) => index % 2 !== 0)

  return (
    <section ref={sectionRef} className="relative py-20 lg:py-32 bg-black overflow-hidden">
      {/* Enhanced background effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/15 via-black to-blue-900/15" />
        <div className="absolute inset-0 bg-gradient-to-tl from-green-900/10 via-transparent to-pink-900/10" />
      </div>

      {/* Dynamic mesh pattern */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              radial-gradient(circle at 2px 2px, rgba(139, 92, 246, 0.15) 1px, transparent 0)
            `,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
          <FloatingParticle
            key={i}
            delay={i * 0.3}
            size={Math.random() * 8 + 4}
            color={
              ["bg-purple-400", "bg-blue-400", "bg-green-400", "bg-pink-400", "bg-cyan-400"][
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
          style={{ top: "20%", animationDelay: "0s", animationDuration: "6s" }}
        />
        <div
          className="absolute w-full h-px bg-gradient-to-r from-transparent via-blue-400/30 to-transparent animate-pulse"
          style={{ top: "60%", animationDelay: "3s", animationDuration: "6s" }}
        />
        <div
          className="absolute w-full h-px bg-gradient-to-r from-transparent via-green-400/30 to-transparent animate-pulse"
          style={{ top: "80%", animationDelay: "1.5s", animationDuration: "6s" }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 md:px-6 lg:px-12">
        {/* Section header */}
        <div
          className={`text-center mb-8 md:mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="inline-flex items-center space-x-4 mb-8">
            <div className="w-16 h-px bg-gradient-to-r from-transparent to-purple-400" />
            <span className="text-purple-300 text-base font-bold tracking-wider uppercase bg-purple-900/20 px-4 py-2 rounded-full border border-purple-400/30">
            FAQ
            </span>
            <div className="w-16 h-px bg-gradient-to-l from-transparent to-cyan-400" />
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold mb-8 leading-tight">
            <span className="bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent drop-shadow-lg">
              Frequently Asked
            </span>
            <br />
            <span className="text-white drop-shadow-lg">Questions</span>
          </h2>

          <p className="text-xl lg:text-2xl text-gray-300 max-w-4xl mx-auto font-medium leading-relaxed">
            Got questions? We've got answers to help you get started with confidence.
          </p>

          {/* Animated underline */}
          <div className="mt-8 flex justify-center">
            <div className="w-32 h-1 bg-gradient-to-r from-purple-400 via-blue-400 to-green-400 rounded-full animate-pulse" />
          </div>
        </div>

        {/* Category tabs */}
        <div
          className={`flex flex-wrap justify-center gap-4 mb-12 transition-all duration-1000 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {categories.map((category) => (
            <CategoryTab
              key={category.key}
              category={category}
              isActive={activeCategory === category.key}
              onClick={() => handleCategoryChange(category.key)}
            />
          ))}
        </div>

        {/* FAQ Grid */}
        <div
          className={`transition-all duration-1000 delay-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Desktop: 2-column layout */}
          <div className="hidden lg:grid lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              {leftColumnFAQs.map((faq, index) => (
                <FAQItem
                  key={faq.id}
                  faq={faq}
                  isOpen={openFAQ === faq.id}
                  onToggle={() => handleFAQToggle(faq.id)}
                  index={index}
                />
              ))}
            </div>
            <div className="space-y-6">
              {rightColumnFAQs.map((faq, index) => (
                <FAQItem
                  key={faq.id}
                  faq={faq}
                  isOpen={openFAQ === faq.id}
                  onToggle={() => handleFAQToggle(faq.id)}
                  index={index}
                />
              ))}
            </div>
          </div>

          {/* Mobile: Single column */}
          <div className="lg:hidden space-y-6">
            {currentFAQs.map((faq, index) => (
              <FAQItem
                key={faq.id}
                faq={faq}
                isOpen={openFAQ === faq.id}
                onToggle={() => handleFAQToggle(faq.id)}
                index={index}
              />
            ))}
          </div>
        </div>

        {/* Contact Support CTA */}
        <div
          className={`transition-all duration-1000 delay-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <ContactSupportCTA />
        </div>
      </div>

      {/* Bottom glow effects */}
      <div className="absolute bottom-0 left-1/4 w-96 h-40 bg-gradient-to-t from-purple-600/20 to-transparent blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-40 bg-gradient-to-t from-blue-600/20 to-transparent blur-3xl" />
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-96 h-40 bg-gradient-to-t from-green-600/15 to-transparent blur-3xl" />
    </section>
  )
}
