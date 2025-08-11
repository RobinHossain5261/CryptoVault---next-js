"use client";
import type React from "react";
import { useState, useRef, useEffect, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useMounted } from "@/hooks/use-mounted";
import {
  CheckCircle,
  Rocket,
  Clock,
  FileText,
  Shield,
  Coins,
  Smartphone,
  Users,
  Globe,
  Zap,
  TrendingUp,
  Network,
} from "lucide-react";

// Roadmap data with enhanced properties
const roadmapData = [
  {
    id: 1,
    quarter: "Q1 2025",
    title: "Whitepaper Release",
    description:
      "Comprehensive documentation outlining our vision, technology, and tokenomics.",
    icon: FileText,
    status: "completed",
    statusIcon: CheckCircle,
    gradient: "from-emerald-400 to-green-400",
    bgGradient: "from-emerald-500/20 to-green-500/20",
    glowColor: "shadow-emerald-500/50",
    borderColor: "border-emerald-400/60",
    category: "past",
  },
  {
    id: 2,
    quarter: "Q2 2025",
    title: "Smart Contract Audit",
    description:
      "Multi-layer security audits by leading blockchain security firms for maximum protection.",
    icon: Shield,
    status: "completed",
    statusIcon: CheckCircle,
    gradient: "from-blue-400 to-cyan-400",
    bgGradient: "from-blue-500/20 to-cyan-500/20",
    glowColor: "shadow-blue-500/50",
    borderColor: "border-blue-400/60",
    category: "past",
  },
  {
    id: 3,
    quarter: "Q3 2025",
    title: "Token Sale (ICO Phase 1)",
    description:
      "Public token sale launch with early bird bonuses and exclusive access for community members.",
    icon: Coins,
    status: "in-progress",
    statusIcon: Rocket,
    gradient: "from-yellow-400 to-orange-400",
    bgGradient: "from-yellow-500/20 to-orange-500/20",
    glowColor: "shadow-yellow-500/50",
    borderColor: "border-yellow-400/60",
    category: "current",
  },
  {
    id: 4,
    quarter: "Q4 2025",
    title: "Exchange Listing & Mobile App Beta",
    description:
      "Listed on major DEXs and CEXs with beta release of our mobile application.",
    icon: Smartphone,
    status: "upcoming",
    statusIcon: Clock,
    gradient: "from-purple-400 to-pink-400",
    bgGradient: "from-purple-500/20 to-pink-500/20",
    glowColor: "shadow-purple-500/50",
    borderColor: "border-purple-400/60",
    category: "future",
  },
  {
    id: 5,
    quarter: "Q1 2026",
    title: "Launch DAO Governance",
    description:
      "Decentralized autonomous organization with community-driven decision making and voting mechanisms.",
    icon: Users,
    status: "upcoming",
    statusIcon: Clock,
    gradient: "from-indigo-400 to-purple-400",
    bgGradient: "from-indigo-500/20 to-purple-500/20",
    glowColor: "shadow-indigo-500/50",
    borderColor: "border-indigo-400/60",
    category: "future",
  },
  {
    id: 6,
    quarter: "Q2 2026",
    title: "Global Expansion & Partnerships",
    description:
      "Strategic partnerships with major institutions and expansion into new markets worldwide.",
    icon: Globe,
    status: "upcoming",
    statusIcon: Clock,
    gradient: "from-teal-400 to-emerald-400",
    bgGradient: "from-teal-500/20 to-emerald-500/20",
    glowColor: "shadow-teal-500/50",
    borderColor: "border-teal-400/60",
    category: "future",
  },
  {
    id: 7,
    quarter: "Q3 2026",
    title: "Advanced DeFi Features",
    description:
      "Launch of yield farming, liquidity mining, and advanced trading features for maximum returns.",
    icon: TrendingUp,
    status: "upcoming",
    statusIcon: Clock,
    gradient: "from-rose-400 to-pink-400",
    bgGradient: "from-rose-500/20 to-pink-500/20",
    glowColor: "shadow-rose-500/50",
    borderColor: "border-rose-400/60",
    category: "future",
  },
  {
    id: 8,
    quarter: "Q4 2026",
    title: "Multi-Chain Integration",
    description:
      "Cross-chain compatibility with Ethereum, BSC, Polygon, and other major blockchain networks.",
    icon: Network,
    status: "upcoming",
    statusIcon: Clock,
    gradient: "from-violet-400 to-purple-400",
    bgGradient: "from-violet-500/20 to-purple-500/20",
    glowColor: "shadow-violet-500/50",
    borderColor: "border-violet-400/60",
    category: "future",
  },
];

// Animated timeline connector
function TimelineConnector({
  isActive,
  delay,
}: {
  isActive: boolean;
  delay: number;
}) {
  return (
    <div className="relative flex-1 h-1 mx-4">
      {/* Base line */}
      <div className="absolute inset-0 bg-gradient-to-r from-gray-700 to-gray-600 rounded-full" />

      {/* Animated glow line */}
      <div
        className={`absolute inset-0 bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 rounded-full transition-all duration-1000 ${
          isActive ? "opacity-100 shadow-lg shadow-purple-500/50" : "opacity-0"
        }`}
        style={{ animationDelay: `${delay}ms` }}
      />

      {/* Flowing animation */}
      {isActive && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-full animate-pulse" />
      )}
    </div>
  );
}

// Enhanced roadmap milestone card
function RoadmapMilestone({
  milestone,
  index,
  isVisible,
}: {
  milestone: any;
  index: number;
  isVisible: boolean;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const Icon = milestone.icon;
  const StatusIcon = milestone.statusIcon;

  const getStatusColor = () => {
    switch (milestone.status) {
      case "completed":
        return "text-emerald-400";
      case "in-progress":
        return "text-yellow-400";
      case "upcoming":
        return "text-gray-400";
      default:
        return "text-gray-400";
    }
  };

  const getStatusBg = () => {
    switch (milestone.status) {
      case "completed":
        return "bg-emerald-500/20 border-emerald-400/50";
      case "in-progress":
        return "bg-yellow-500/20 border-yellow-400/50";
      case "upcoming":
        return "bg-gray-500/20 border-gray-400/50";
      default:
        return "bg-gray-500/20 border-gray-400/50";
    }
  };

  return (
    <div
      className={`relative transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ animationDelay: `${index * 200}ms` }}
    >
      {/* Timeline dot */}
      <div className="absolute left-1/2 transform -translate-x-1/2 -top-6 z-20">
        <div
          className={`w-4 h-4 rounded-full border-4 border-gray-900 transition-all duration-500 ${
            milestone.status === "completed"
              ? "bg-emerald-400 shadow-lg shadow-emerald-400/50"
              : milestone.status === "in-progress"
              ? "bg-yellow-400 shadow-lg shadow-yellow-400/50 animate-pulse"
              : "bg-gray-600"
          }`}
        />
      </div>

      {/* Card */}
      <Card
        ref={cardRef}
        className={`relative bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-xl border-2 transition-all duration-700 overflow-hidden cursor-pointer ${
          milestone.borderColor
        } ${
          isHovered
            ? `scale-105 ${milestone.glowColor} shadow-2xl`
            : "shadow-lg"
        } ${index % 2 === 0 ? "lg:mt-16" : "lg:mb-16"}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseMove={handleMouseMove}
      >
        {/* Dynamic spotlight effect */}
        {isHovered && (
          <div
            className={`absolute w-96 h-96 bg-gradient-radial ${milestone.bgGradient} opacity-20 blur-3xl rounded-full transition-all duration-500 pointer-events-none`}
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

        {/* Holographic effect */}
        <div
          className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-1000 transform ${
            isHovered ? "translate-x-0" : "-translate-x-full"
          }`}
        />

        <CardContent className="relative z-10 p-6 lg:p-8">
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div className="space-y-2">
              <div
                className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-bold border ${getStatusBg()}`}
              >
                <StatusIcon className={`w-4 h-4 mr-2 ${getStatusColor()}`} />
                {milestone.quarter}
              </div>
              <h3
                className={`text-xl lg:text-2xl font-bold transition-all duration-300 ${
                  isHovered
                    ? `bg-gradient-to-r ${milestone.gradient} bg-clip-text text-transparent`
                    : "text-white"
                }`}
              >
                {milestone.title}
              </h3>
            </div>

            {/* Icon */}
            <div
              className={`flex items-center justify-center w-10 h-10 md:w-16 md:h-16 rounded-lg md:rounded-2xl bg-gradient-to-br ${
                milestone.bgGradient
              } border-2 ${milestone.borderColor} transition-all duration-500 ${
                isHovered ? "scale-110 rotate-3" : ""
              }`}
            >
              <Icon
                className={`w-4 h-4  md:w-8 md:h-8 text-white transition-all duration-300 ${
                  isHovered ? "scale-110" : ""
                }`}
              />
            </div>
          </div>

          {/* Description */}
          <p
            className={`text-gray-300 leading-relaxed transition-all duration-300 ${
              isHovered ? "text-gray-200" : ""
            }`}
          >
            {milestone.description}
          </p>

          {/* Progress indicator for in-progress items */}
          {milestone.status === "in-progress" && (
            <div className="mt-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-yellow-400">
                  In Progress
                </span>
                <span className="text-sm text-gray-400">75%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="bg-gradient-to-r from-yellow-400 to-orange-400 h-2 rounded-full w-3/4 animate-pulse" />
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

// Filter buttons component
function FilterButtons({
  activeFilter,
  setActiveFilter,
}: {
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
}) {
  const filters = [
    { key: "all", label: "All Phases", icon: Zap },
    { key: "past", label: "Completed", icon: CheckCircle },
    { key: "current", label: "In Progress", icon: Rocket },
    { key: "future", label: "Upcoming", icon: Clock },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-4 mb-8 md:mb-16">
      {filters.map((filter) => {
        const Icon = filter.icon;
        return (
          <Button
            key={filter.key}
            onClick={() => setActiveFilter(filter.key)}
            className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
              activeFilter === filter.key
                ? "bg-blue-600 text-white shadow-lg shadow-purple-500/25"
                : "bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 border border-gray-600/50"
            }`}
          >
            <Icon className="w-4 h-4 mr-2" />
            {filter.label}
          </Button>
        );
      })}
    </div>
  );
}

export default function RoadmapSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");
  const sectionRef = useRef<HTMLElement>(null);

  const mounted = useMounted();
  const particles = useMemo(() => {
    if (!mounted) return [];
    const colors = [
      "bg-purple-400/20",
      "bg-blue-400/20",
      "bg-cyan-400/20",
      "bg-pink-400/20",
    ];
    return Array.from({ length: 25 }).map(() => ({
      width: Math.random() * 8 + 4,
      height: Math.random() * 8 + 4,
      left: Math.random() * 100,
      top: Math.random() * 100,
      animationDelay: Math.random() * 3,
      animationDuration: 3 + Math.random() * 4,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));
  }, [mounted]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const filteredMilestones = roadmapData.filter(
    (milestone) => activeFilter === "all" || milestone.category === activeFilter
  );

  return (
    <section
      id="roadmap"
      ref={sectionRef}
      className="relative py-20 lg:py-32 bg-black overflow-hidden"
    >
      {/* Enhanced background effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/15 via-black to-blue-900/15" />
        <div className="absolute inset-0 bg-gradient-to-tl from-cyan-900/10 via-transparent to-pink-900/10" />
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
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      {/* Floating particles (client-only to avoid hydration mismatch) */}
      {mounted && (
        <div className="absolute inset-0">
          {particles.map((p, i) => (
            <div
              key={i}
              className={`absolute rounded-full animate-pulse ${p.color}`}
              style={{
                width: `${p.width}px`,
                height: `${p.height}px`,
                left: `${p.left}%`,
                top: `${p.top}%`,
                animationDelay: `${p.animationDelay}s`,
                animationDuration: `${p.animationDuration}s`,
              }}
            />
          ))}
        </div>
      )}

      <div className="relative z-10 container mx-auto px-4 md:px-6 lg:px-12">
        {/* Section header */}
        <div
          className={`text-center mb-8 md:mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="inline-flex items-center space-x-4 mb-8">
            <div className="w-16 h-px bg-gradient-to-r from-transparent to-purple-400" />
            <span className="text-purple-300 text-sm md:text-base font-bold tracking-wider uppercase bg-purple-900/20 px-4 py-2 rounded-full border border-purple-400/30">
              Roadmap
            </span>
            <div className="w-16 h-px bg-gradient-to-l from-transparent to-cyan-400" />
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold mb-6 md:mb-8 leading-tight">
            <span className="bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent drop-shadow-lg">
              Our Journey
            </span>
            <br />
            <span className="text-white drop-shadow-lg">Ahead</span>
          </h2>

          <p className="text-xl lg:text-2xl text-gray-300 max-w-4xl mx-auto font-medium leading-relaxed mb-8 md:mb-12">
            A transparent plan of our growth, development, and innovation
            milestones
          </p>

          {/* Filter buttons */}
          <FilterButtons
            activeFilter={activeFilter}
            setActiveFilter={setActiveFilter}
          />
        </div>

        {/* Desktop Timeline */}
        <div className="hidden lg:block">
          {/* Timeline line */}
          <div className="relative mb-8">
            <div className="absolute left-0 right-0 top-1/2 transform -translate-y-1/2 h-1 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 rounded-full" />
            <div
              className={`absolute left-0 right-0 top-1/2 transform -translate-y-1/2 h-1 bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 rounded-full transition-all duration-2000 ${
                isVisible
                  ? "opacity-100 shadow-lg shadow-purple-500/30"
                  : "opacity-0"
              }`}
            />

            {/* Flowing animation */}
            {isVisible && (
              <div className="absolute left-0 right-0 top-1/2 transform -translate-y-1/2 h-1 bg-gradient-to-r from-transparent via-white/40 to-transparent rounded-full animate-pulse" />
            )}
          </div>

          {/* Milestones grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 3xl:grid-cols-4 gap-4 xl:gap-8">
            {filteredMilestones.map((milestone, index) => (
              <RoadmapMilestone
                key={milestone.id}
                milestone={milestone}
                index={index}
                isVisible={isVisible}
              />
            ))}
          </div>
        </div>

        {/* Mobile Timeline */}
        <div className="lg:hidden space-y-4 md:space-y-8">
          {filteredMilestones.map((milestone, index) => (
            <div key={milestone.id} className="relative">
              {/* Vertical connector */}
              {index < filteredMilestones.length - 1 && (
                <div className="absolute left-8 top-24 w-1 h-16 bg-gradient-to-b from-purple-500 to-blue-500 rounded-full opacity-50" />
              )}

              <div className="flex items-start gap-6">
                {/* Timeline dot */}
                <div
                  className={`w-4 h-4 rounded-full border-4 border-gray-900 mt-6 transition-all duration-500 ${
                    milestone.status === "completed"
                      ? "bg-emerald-400 shadow-lg shadow-emerald-400/50"
                      : milestone.status === "in-progress"
                      ? "bg-yellow-400 shadow-lg shadow-yellow-400/50 animate-pulse"
                      : "bg-gray-600"
                  }`}
                />

                {/* Card */}
                <div className="flex-1">
                  <RoadmapMilestone
                    milestone={milestone}
                    index={index}
                    isVisible={isVisible}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom glow effects */}
      <div className="absolute bottom-0 left-1/4 w-96 h-32 bg-gradient-to-t from-purple-600/15 to-transparent blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-32 bg-gradient-to-t from-cyan-600/15 to-transparent blur-3xl" />
    </section>
  );
}
