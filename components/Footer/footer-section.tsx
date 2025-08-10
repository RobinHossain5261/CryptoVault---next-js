"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
} from "lucide-react";
import Link from "next/link";

// Navigation links data
const navigationLinks = {
  quickLinks: [
    { name: "Features", href: "#features", icon: Zap },
    { name: "Roadmap", href: "#roadmap", icon: Map },
    { name: "FAQ", href: "#faq", icon: MessageCircle },
    { name: "Blog", href: "#blog", icon: BookOpen },
    { name: "Contact", href: "#contact", icon: Phone },
  ],
  tokenInfo: [
    {
      name: "Whitepaper",
      href: "#",
      icon: FileText,
      external: true,
    },
    { name: "Tokenomics", href: "#", icon: Coins },
    {
      name: "Report",
      href: "#",
      icon: Shield,
      external: true,
    },
    { name: "Join Presale", href: "#", icon: Users },
  ],
};

// Legal links
const legalLinks = [
  { name: "Privacy Policy", href: "#" },
  { name: "Terms of Use", href: "#" },
];

// Toast notification component
function Toast({
  message,
  type,
  isVisible,
  onClose,
}: {
  message: string;
  type: "success" | "error";
  isVisible: boolean;
  onClose: () => void;
}) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

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
        <button
          onClick={onClose}
          className="ml-2 text-gray-400 hover:text-white transition-colors"
        >
          ×
        </button>
      </div>
    </div>
  );
}

// Newsletter subscription component
function NewsletterSubscription() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
    isVisible: boolean;
  }>({
    message: "",
    type: "success",
    isVisible: false,
  });

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      setError("Email is required");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setToast({
        message:
          "🎉 Successfully subscribed! Welcome to the CryptoVault community.",
        type: "success",
        isVisible: true,
      });

      setEmail("");
    } catch (error) {
      setToast({
        message: "Failed to subscribe. Please try again.",
        type: "error",
        isVisible: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (error) {
      setError("");
    }
  };

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
          <p className="text-gray-400 text-base leading-relaxed">
            Subscribe for the latest updates, token announcements, and exclusive
            insights from the CryptoVault ecosystem.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={handleEmailChange}
              className={`bg-gray-800/50 text-white border-2 transition-all duration-300 focus:bg-gray-800/70 ${
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
            className="relative group w-full bg-blue-600  hover:bg-purple-700 text-white border-0 shadow-2xl shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-500 overflow-hidden"
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
      </div>
    </>
  );
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
      <div className="space-y-2 md:space-y-4">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent">
          CryptoVault
        </h2>

        <p className="text-gray-400 text-base leading-relaxed">
          CryptoVault is a blockchain-powered platform built to redefine
          financial accessibility through decentralized innovation, empowering
          users with cutting-edge DeFi solutions.
        </p>
      </div>
    </div>
  );
}

// Navigation links component
function NavigationLinks({
  title,
  links,
  isVisible,
  delay = 0,
}: {
  title: string;
  links: any[];
  isVisible: boolean;
  delay?: number;
}) {
  return (
    <div
      className={`space-y-2 md:space-y-4 transition-all duration-1000 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <h3 className="text-xl font-bold text-white">{title}</h3>
      <ul className="space-y-3">
        {links.map((link) => {
          const IconComponent = link.icon;
          return (
            <li key={link.name}>
              <Link
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                className="group flex items-center gap-3 text-gray-400 hover:text-white transition-all duration-300 hover:translate-x-1"
              >
                <IconComponent className="w-4 h-4 text-gray-500 group-hover:text-purple-400 transition-colors duration-300" />
                <span className="text-sm font-medium">{link.name}</span>
                {link.external && (
                  <ExternalLink className="w-3 h-3 text-gray-600 group-hover:text-gray-400 transition-colors duration-300" />
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default function FooterSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

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

  return (
    <footer
      ref={sectionRef}
      className="relative bg-black border-t border-gray-800/50 overflow-hidden"
    >
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
          <div className="grid grid-cols-12 gap-6  sm:gap-8 xl:gap-12">
            {/* Column 1: Brand Overview */}
            <div className="col-span-12 sm:col-span-6 lg:col-span-4">
              <BrandSection isVisible={isVisible} />
            </div>

            {/* Column 2: Quick Links */}
            <div className="col-span-12 sm:col-span-6 lg:col-span-2">
              <NavigationLinks
                title="Quick Links"
                links={navigationLinks.quickLinks}
                isVisible={isVisible}
                delay={200}
              />
            </div>

            {/* Column 3: Token Info */}
            <div className="col-span-12 sm:col-span-6 lg:col-span-2">
              <NavigationLinks
                title="Token Info"
                links={navigationLinks.tokenInfo}
                isVisible={isVisible}
                delay={400}
              />
            </div>

            {/* Column 4: Newsletter */}
            <div
              className={`col-span-12 sm:col-span-6 lg:col-span-4 transition-all duration-1000 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
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
          <div className="flex flex-col-reverse md:flex-row justify-between items-center gap-4 md:space-y-0">
            {/* Copyright */}
            <div className="flex items-center gap-4">
              <p className="text-gray-400 text-sm">
                © 2025{" "}
                <span className="text-white font-semibold">CryptoVault</span>.
                All rights reserved.
              </p>
            </div>

            {/* Legal links */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-6">
              {legalLinks.map((link, index) => (
                <div key={link.name} className="flex items-center gap-3 sm:gap-6">
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white text-sm transition-colors duration-300 hover:underline underline-offset-4"
                  >
                    {link.name}
                  </Link>
                  {index < legalLinks.length - 1 && (
                    <div className="w-px h-3 bg-gray-600" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom glow effects */}
      <div className="absolute bottom-0 left-1/4 w-96 h-32 bg-gradient-to-t from-purple-600/10 to-transparent blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-32 bg-gradient-to-t from-blue-600/10 to-transparent blur-3xl" />
    </footer>
  );
}
