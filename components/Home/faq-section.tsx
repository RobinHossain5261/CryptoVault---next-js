"use client"

import { useState, useRef, useEffect, useMemo } from "react"
import { Card } from "@/components/ui/card"
import { ChevronDown } from "lucide-react"
import { categories, faqData } from "@/public/fakeData/fakeData"
import { useMounted } from "@/hooks/use-mounted"

// Floating particles component
function FloatingParticle({ delay, size, color }: { delay: number; size: number; color: string }) {
  const [style] = useState(() => ({
    left: Math.random() * 100,
    top: Math.random() * 100,
    animationDelay: Math.random() * 4,
    animationDuration: 3 + Math.random() * 4,
  }))
  return (
    <div
      className={`absolute rounded-full ${color} animate-pulse opacity-20`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        left: `${style.left}%`,
        top: `${style.top}%`,
        animationDelay: `${delay + style.animationDelay}s`,
        animationDuration: `${style.animationDuration}s`,
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
          ? "bg-blue-600 text-white shadow-lg shadow-purple-500/25 scale-105"
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

  const mounted = useMounted()
  const particles = useMemo(() => {
    if (!mounted) return []
    const colors = ["bg-purple-400", "bg-blue-400", "bg-green-400", "bg-pink-400", "bg-cyan-400"]
    return Array.from({ length: 30 }).map(() => ({
      size: Math.random() * 8 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
    }))
  }, [mounted])

  return (
    <section id="faq" ref={sectionRef} className="relative py-20 lg:py-32 bg-black overflow-hidden">
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

      {/* Floating particles (client-only to avoid hydration mismatch) */}
      {mounted && (
        <div className="absolute inset-0">
          {particles.map((p, i) => (
            <FloatingParticle key={i} delay={i * 0.3} size={p.size} color={p.color} />
          ))}
        </div>
      )}

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
      </div>

      {/* Bottom glow effects */}
      <div className="absolute bottom-0 left-1/4 w-96 h-40 bg-gradient-to-t from-purple-600/20 to-transparent blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-40 bg-gradient-to-t from-blue-600/20 to-transparent blur-3xl" />
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-96 h-40 bg-gradient-to-t from-green-600/15 to-transparent blur-3xl" />
    </section>
  )
}
