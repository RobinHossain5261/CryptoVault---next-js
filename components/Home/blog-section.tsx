"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Calendar, User, TrendingUp, Shield, Zap, Globe, Clock } from "lucide-react"

// Blog data with realistic crypto/ICO content
const blogData = [
  {
    id: 1,
    title: "How Blockchain is Redefining Financial Security",
    excerpt:
      "Explore the revolutionary impact of blockchain technology on traditional financial systems and security protocols.",
    category: "Insights",
    categoryColor: "from-purple-400 to-blue-400",
    categoryBg: "from-purple-500/20 to-blue-500/20",
    image: "/placeholder.svg?height=240&width=400",
    author: "Sarah Chen",
    date: "Dec 28, 2024",
    readTime: "5 min read",
    featured: true,
    icon: Shield,
  },
  {
    id: 2,
    title: "Phase 2 of Our ICO is Live: What You Need to Know",
    excerpt:
      "Everything you need to know about our Phase 2 token sale, including new features, bonuses, and investment opportunities.",
    category: "News",
    categoryColor: "from-green-400 to-emerald-400",
    categoryBg: "from-green-500/20 to-emerald-500/20",
    image: "/placeholder.svg?height=240&width=400",
    author: "Michael Rodriguez",
    date: "Dec 26, 2024",
    readTime: "3 min read",
    featured: false,
    icon: TrendingUp,
  },
  {
    id: 3,
    title: "Top 5 Crypto Trends to Watch in 2025",
    excerpt: "Discover the emerging trends that will shape the cryptocurrency landscape in the coming year.",
    category: "Update",
    categoryColor: "from-yellow-400 to-orange-400",
    categoryBg: "from-yellow-500/20 to-orange-500/20",
    image: "/placeholder.svg?height=240&width=400",
    author: "Alex Thompson",
    date: "Dec 24, 2024",
    readTime: "7 min read",
    featured: false,
    icon: Zap,
  },
  {
    id: 4,
    title: "DeFi Integration: Building the Future of Finance",
    excerpt: "Learn how our platform integrates with major DeFi protocols to provide seamless financial services.",
    category: "Insights",
    categoryColor: "from-cyan-400 to-blue-400",
    categoryBg: "from-cyan-500/20 to-blue-500/20",
    image: "/placeholder.svg?height=240&width=400",
    author: "Emma Wilson",
    date: "Dec 22, 2024",
    readTime: "6 min read",
    featured: false,
    icon: Globe,
  },
  {
    id: 5,
    title: "Smart Contract Audit Results: Maximum Security Achieved",
    excerpt: "Our comprehensive smart contract audit results are in, showcasing industry-leading security standards.",
    category: "News",
    categoryColor: "from-rose-400 to-pink-400",
    categoryBg: "from-rose-500/20 to-pink-500/20",
    image: "/placeholder.svg?height=240&width=400",
    author: "David Kim",
    date: "Dec 20, 2024",
    readTime: "4 min read",
    featured: false,
    icon: Shield,
  },
  {
    id: 6,
    title: "Community Milestone: 100K+ Token Holders Reached",
    excerpt: "Celebrating our growing community and the incredible support from our token holders worldwide.",
    category: "Update",
    categoryColor: "from-indigo-400 to-purple-400",
    categoryBg: "from-indigo-500/20 to-purple-500/20",
    image: "/placeholder.svg?height=240&width=400",
    author: "Lisa Park",
    date: "Dec 18, 2024",
    readTime: "2 min read",
    featured: false,
    icon: TrendingUp,
  },
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

// Enhanced blog card component
function BlogCard({ blog, index, isVisible }: { blog: any; index: number; isVisible: boolean }) {
  const [isHovered, setIsHovered] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  const Icon = blog.icon

  return (
    <div
      className={`group transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      } ${blog.featured ? "lg:col-span-2 lg:row-span-2" : ""}`}
      style={{ animationDelay: `${index * 200}ms` }}
    >
      <Card
        ref={cardRef}
        className={`relative h-full bg-gradient-to-br from-gray-900/60 to-black/60 backdrop-blur-xl border-2 transition-all duration-700 overflow-hidden cursor-pointer ${
          isHovered
            ? "border-purple-400/60 shadow-2xl shadow-purple-500/25 scale-[1.02] -translate-y-2"
            : "border-gray-700/30 shadow-lg hover:border-gray-600/50"
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseMove={handleMouseMove}
      >
        {/* Dynamic spotlight effect */}
        {isHovered && (
          <div
            className="absolute w-96 h-96 bg-gradient-radial from-purple-500/20 to-transparent opacity-30 blur-3xl rounded-full transition-all duration-500 pointer-events-none"
            style={{
              left: mousePosition.x - 192,
              top: mousePosition.y - 192,
            }}
          />
        )}

        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)`,
              backgroundSize: "24px 24px",
            }}
          />
        </div>

        {/* Holographic border effect */}
        <div
          className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 transition-all duration-1000 transform ${
            isHovered ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"
          }`}
        />

        <CardContent className="relative z-10 p-0 h-full flex flex-col">
          {/* Image section */}
          <div className="relative overflow-hidden">
            <div
              className={`aspect-video bg-gradient-to-br ${blog.categoryBg} transition-all duration-500 ${
                isHovered ? "scale-110" : "scale-100"
              }`}
            >
              <img
                src={blog.image || "/placeholder.svg"}
                alt={blog.title}
                className={`w-full h-full object-cover transition-all duration-500 ${
                  isHovered ? "scale-110 brightness-110" : "scale-100"
                }`}
              />

              {/* Image overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

              {/* Glow effect on hover */}
              {isHovered && (
                <div className={`absolute inset-0 bg-gradient-to-br ${blog.categoryBg} opacity-20 mix-blend-overlay`} />
              )}
            </div>

            {/* Category badge */}
            <div className="absolute top-4 left-4">
              <div
                className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-bold border backdrop-blur-sm transition-all duration-300 ${
                  isHovered
                    ? `bg-gradient-to-r ${blog.categoryBg} border-white/30 text-white shadow-lg`
                    : `bg-black/50 border-gray-600/50 text-gray-300`
                }`}
              >
                <Icon className="w-4 h-4 mr-2" />
                {blog.category}
              </div>
            </div>

            {/* Featured badge */}
            {blog.featured && (
              <div className="absolute top-4 right-4">
                <div className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-bold bg-gradient-to-r from-yellow-500/80 to-orange-500/80 text-white border border-yellow-400/50 backdrop-blur-sm">
                  ⭐ Featured
                </div>
              </div>
            )}

            {/* Read time indicator */}
            <div className="absolute bottom-4 right-4">
              <div className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-black/60 text-gray-300 border border-gray-600/50 backdrop-blur-sm">
                <Clock className="w-3 h-3 mr-1" />
                {blog.readTime}
              </div>
            </div>
          </div>

          {/* Content section */}
          <div className="flex-1 p-6 lg:p-8 flex flex-col justify-between">
            <div className="space-y-4">
              {/* Title */}
              <h3
                className={`font-bold leading-tight transition-all duration-300 ${
                  blog.featured ? "text-2xl lg:text-3xl" : "text-xl lg:text-2xl"
                } ${
                  isHovered
                    ? `bg-gradient-to-r ${blog.categoryColor} bg-clip-text text-transparent`
                    : "text-white group-hover:text-gray-100"
                }`}
              >
                {blog.title}
              </h3>

              {/* Excerpt */}
              <p
                className={`leading-relaxed transition-all duration-300 ${
                  blog.featured ? "text-lg" : "text-base"
                } ${isHovered ? "text-gray-200" : "text-gray-300"}`}
              >
                {blog.excerpt}
              </p>
            </div>

            {/* Footer */}
            <div className="mt-6 space-y-4">
              {/* Author and date */}
              <div className="flex items-center justify-between text-sm text-gray-400">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4" />
                    <span className="font-medium">{blog.author}</span>
                  </div>
                  <div className="w-1 h-1 bg-gray-500 rounded-full" />
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4" />
                    <span>{blog.date}</span>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div
                className={`w-full h-px bg-gradient-to-r transition-all duration-500 ${
                  isHovered
                    ? `${blog.categoryColor.replace("from-", "from-").replace("to-", "to-")}/50 opacity-100`
                    : "from-gray-600/50 to-transparent opacity-50"
                }`}
              />

              {/* Read more button */}
              <div className="flex justify-between items-center">
                <Button
                  variant="ghost"
                  className={`group/btn p-0 h-auto font-semibold transition-all duration-300 ${
                    isHovered
                      ? `bg-gradient-to-r ${blog.categoryColor} bg-clip-text text-transparent`
                      : "text-gray-300 hover:text-white"
                  }`}
                >
                  <span className="mr-2">Read More</span>
                  <ArrowRight
                    className={`w-4 h-4 transition-all duration-300 ${
                      isHovered ? "translate-x-1 text-purple-400" : "group-hover/btn:translate-x-1"
                    }`}
                  />
                </Button>

                {/* Engagement indicator */}
                <div className="flex items-center space-x-2 text-xs text-gray-500">
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    <span>Live</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// View all button component
function ViewAllButton() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className="text-center mt-16">
      <Button
        className="relative group bg-gradient-to-r from-purple-600 via-blue-600 to-green-600 hover:from-purple-700 hover:via-blue-700 hover:to-green-700 text-white border-0 shadow-2xl shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-500 px-8 py-6 text-lg overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform -skew-x-12 translate-x-full group-hover:translate-x-[-100%]" />
        <span className="relative z-10 mr-2">View All Articles</span>
        <ArrowRight
          className={`w-5 h-5 relative z-10 transition-transform duration-300 ${isHovered ? "translate-x-1" : ""}`}
        />
      </Button>
    </div>
  )
}

export default function BlogSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [visibleBlogs, setVisibleBlogs] = useState(3) // Show 3 blogs initially
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

  const displayedBlogs = blogData.slice(0, visibleBlogs)

  return (
    <section ref={sectionRef} className="relative py-20 lg:py-32 bg-black overflow-hidden">
      {/* Enhanced background effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/15 via-black to-blue-900/15" />
        <div className="absolute inset-0 bg-gradient-to-tl from-green-900/10 via-transparent to-pink-900/10" />
      </div>

      {/* Dynamic grid pattern */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(139, 92, 246, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(139, 92, 246, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0">
        {[...Array(25)].map((_, i) => (
          <FloatingParticle
            key={i}
            delay={i * 0.4}
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
          style={{ top: "25%", animationDelay: "0s", animationDuration: "8s" }}
        />
        <div
          className="absolute w-full h-px bg-gradient-to-r from-transparent via-blue-400/30 to-transparent animate-pulse"
          style={{ top: "50%", animationDelay: "4s", animationDuration: "8s" }}
        />
        <div
          className="absolute w-full h-px bg-gradient-to-r from-transparent via-green-400/30 to-transparent animate-pulse"
          style={{ top: "75%", animationDelay: "2s", animationDuration: "8s" }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-6 lg:px-12">
        {/* Section header */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="inline-flex items-center space-x-4 mb-8">
            <div className="w-16 h-px bg-gradient-to-r from-transparent to-purple-400" />
            <span className="text-purple-300 text-base font-bold tracking-wider uppercase bg-purple-900/20 px-4 py-2 rounded-full border border-purple-400/30">
              📰 From the Blog
            </span>
            <div className="w-16 h-px bg-gradient-to-l from-transparent to-cyan-400" />
          </div>

          <h2 className="text-5xl lg:text-7xl font-bold mb-8 leading-tight">
            <span className="bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent drop-shadow-lg">
              Latest News &
            </span>
            <br />
            <span className="text-white drop-shadow-lg">Insights</span>
          </h2>

          <p className="text-xl lg:text-2xl text-gray-300 max-w-4xl mx-auto font-medium leading-relaxed">
            Stay informed with the latest updates from the crypto world and our platform developments.
          </p>

          {/* Animated horizontal glow bar */}
          <div className="mt-8 flex justify-center">
            <div className="relative w-64 h-1 bg-gray-800 rounded-full overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-blue-400 to-green-400 rounded-full animate-pulse" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent rounded-full animate-pulse" />
            </div>
          </div>
        </div>

        {/* Blog grid */}
        <div
          className={`transition-all duration-1000 delay-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Desktop: 3-column grid with featured post spanning 2 columns */}
          <div className="hidden lg:grid lg:grid-cols-3 gap-8 auto-rows-fr">
            {displayedBlogs.map((blog, index) => (
              <BlogCard key={blog.id} blog={blog} index={index} isVisible={isVisible} />
            ))}
          </div>

          {/* Mobile: Single column */}
          <div className="lg:hidden space-y-8">
            {displayedBlogs.map((blog, index) => (
              <BlogCard key={blog.id} blog={blog} index={index} isVisible={isVisible} />
            ))}
          </div>
        </div>

        {/* View all button */}
        <div
          className={`transition-all duration-1000 delay-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <ViewAllButton />
        </div>

        {/* Bottom stats */}
        <div
          className={`text-center mt-16 transition-all duration-1000 delay-1200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="inline-flex items-center space-x-8 px-10 py-6 bg-gradient-to-r from-gray-900/70 to-black/70 backdrop-blur-xl border-2 border-gray-600/50 rounded-2xl shadow-2xl">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50" />
              <div className="text-left">
                <div className="text-2xl font-bold text-white">50+</div>
                <div className="text-sm text-gray-400">Articles</div>
              </div>
            </div>
            <div className="w-px h-12 bg-gray-600" />
            <div className="flex items-center space-x-3">
              <TrendingUp className="w-6 h-6 text-blue-400" />
              <div className="text-left">
                <div className="text-2xl font-bold text-white">25K+</div>
                <div className="text-sm text-gray-400">Monthly Readers</div>
              </div>
            </div>
            <div className="w-px h-12 bg-gray-600" />
            <div className="flex items-center space-x-3">
              <Zap className="w-6 h-6 text-yellow-400" />
              <div className="text-left">
                <div className="text-2xl font-bold text-white">Weekly</div>
                <div className="text-sm text-gray-400">Updates</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom glow effects */}
      <div className="absolute bottom-0 left-1/4 w-96 h-40 bg-gradient-to-t from-purple-600/20 to-transparent blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-40 bg-gradient-to-t from-blue-600/20 to-transparent blur-3xl" />
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-96 h-40 bg-gradient-to-t from-green-600/15 to-transparent blur-3xl" />

      {/* Custom CSS */}
      <style jsx>{`
        .bg-gradient-radial {
          background: radial-gradient(circle, var(--tw-gradient-stops));
        }
      `}</style>
    </section>
  )
}
