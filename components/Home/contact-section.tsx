"use client";

import type React from "react";
import { useState, useRef, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowRight,
  Mail,
  MapPin,
  Phone,
  MessageCircle,
  Send,
  CheckCircle,
  AlertCircle,
  ExternalLink,
} from "lucide-react";

// Social/Community links data
const socialLinks = [
  {
    name: "Telegram",
    icon: "💬",
    url: "https://t.me/ironik",
    color: "from-blue-400 to-cyan-400",
    bgColor: "from-blue-500/20 to-cyan-500/20",
    members: "50K+",
  },
  {
    name: "Discord",
    icon: "🎮",
    url: "https://discord.gg/ironik",
    color: "from-indigo-400 to-purple-400",
    bgColor: "from-indigo-500/20 to-purple-500/20",
    members: "25K+",
  },
  {
    name: "X (Twitter)",
    icon: "🐦",
    url: "https://x.com/ironik",
    color: "from-gray-400 to-blue-400",
    bgColor: "from-gray-500/20 to-blue-500/20",
    members: "75K+",
  },
  {
    name: "Medium",
    icon: "📝",
    url: "https://medium.com/@ironik",
    color: "from-green-400 to-emerald-400",
    bgColor: "from-green-500/20 to-emerald-500/20",
    members: "15K+",
  },
  {
    name: "YouTube",
    icon: "📺",
    url: "https://youtube.com/@ironik",
    color: "from-red-400 to-pink-400",
    bgColor: "from-red-500/20 to-pink-500/20",
    members: "30K+",
  },
  {
    name: "LinkedIn",
    icon: "💼",
    url: "https://linkedin.com/company/ironik",
    color: "from-blue-400 to-blue-600",
    bgColor: "from-blue-500/20 to-blue-600/20",
    members: "10K+",
  },
];

// Contact information
const contactInfo = {
  address: "123 Blockchain Ave, Cryptonia, CY 2048",
  phone: "+1 (555) 123-IRON",
  email: "contact@ironik.io",
  supportEmail: "support@ironik.io",
  businessHours: "24/7 Support Available",
};

// Subject options for the dropdown
const subjectOptions = [
  { value: "general", label: "General Inquiry" },
  { value: "partnership", label: "Partnership" },
  { value: "support", label: "Technical Support" },
  { value: "token", label: "Token Purchase" },
  { value: "media", label: "Media & Press" },
  { value: "business", label: "Business Development" },
];

// Floating particles component
function FloatingParticle({
  delay,
  size,
  color,
}: {
  delay: number;
  size: number;
  color: string;
}) {
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
  );
}

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
    <div className="fixed top-6 right-6 z-50 animate-in slide-in-from-right duration-300">
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

// Enhanced contact form component
function ContactForm({ isVisible }: { isVisible: boolean }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
    isVisible: boolean;
  }>({
    message: "",
    type: "success",
    isVisible: false,
  });

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters long";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      setToast({
        message: "Please fix the errors in the form",
        type: "error",
        isVisible: true,
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setToast({
        message: "✅ Message sent successfully! We'll get back to you soon.",
        type: "success",
        isVisible: true,
      });

      // Reset form
      setFormData({ name: "", email: "", subject: "", message: "" });
      setErrors({});
    } catch (error) {
      setToast({
        message: "Failed to send message. Please try again.",
        type: "error",
        isVisible: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
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

      <div
        className={`transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
        }`}
      >
        <Card className="relative bg-[#160e23] backdrop-blur-xl border-2 border-gray-700/30 hover:border-purple-400/50 transition-all duration-500 overflow-hidden">
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

          <CardContent className="relative z-10 p-4 md:p-8">
            <div className="space-y-8">
              {/* Form header */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-xl border border-purple-400/30">
                    <Send className="w-6 h-6 text-purple-300" />
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold text-white">
                      Send us a Message
                    </h3>
                    <p className="text-gray-400">
                      We'll respond within 24 hours
                    </p>
                  </div>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name field */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-300">
                    Full Name *
                  </label>
                  <Input
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className={`bg-gray-800/50 border-2 transition-all duration-300 text-white outline-none ${
                      errors.name
                        ? "border-red-400/60 focus:border-red-400 shadow-lg shadow-red-500/25"
                        : "border-gray-600/50 focus:border-purple-400/60 focus:shadow-lg focus:shadow-purple-500/25"
                    }`}
                  />
                  {errors.name && (
                    <p className="text-red-400 text-sm flex items-center space-x-1">
                      <AlertCircle className="w-4 h-4" />
                      <span>{errors.name}</span>
                    </p>
                  )}
                </div>

                {/* Email field */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-300">
                    Email Address *
                  </label>
                  <Input
                    type="email"
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className={`bg-gray-800/50 border-2 transition-all duration-300 text-white focus:bg-gray-800/70 ${
                      errors.email
                        ? "border-red-400/60 focus:border-red-400 shadow-lg shadow-red-500/25"
                        : "border-gray-600/50 focus:border-purple-400/60 focus:shadow-lg focus:shadow-purple-500/25"
                    }`}
                  />
                  {errors.email && (
                    <p className="text-red-400 text-sm flex items-center space-x-1">
                      <AlertCircle className="w-4 h-4" />
                      <span>{errors.email}</span>
                    </p>
                  )}
                </div>

                {/* Subject field */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-300">
                    Subject
                  </label>
                  <Select
                    value={formData.subject}
                    onValueChange={(value) =>
                      handleInputChange("subject", value)
                    }
                  >
                    <SelectTrigger className="text-white bg-gray-800/50 border-2 border-gray-600/50 focus:border-purple-400/60 focus:shadow-lg focus:shadow-purple-500/25 transition-all duration-300">
                      <SelectValue placeholder="Select a subject" />
                    </SelectTrigger>
                    <SelectContent className="text-gray-200 bg-gray-900 border-gray-600">
                      {subjectOptions.map((option) => (
                        <SelectItem
                          key={option.value}
                          value={option.value}
                          className="focus:bg-gray-800 hover:text-gray-200"
                        >
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Message field */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-300">
                    Message *
                  </label>
                  <Textarea
                    placeholder="Tell us how we can help you..."
                    rows={5}
                    value={formData.message}
                    onChange={(e) =>
                      handleInputChange("message", e.target.value)
                    }
                    className={`text-gray-200 bg-gray-800/50 border-2 transition-all duration-300 focus:bg-gray-800/70 resize-none ${
                      errors.message
                        ? "border-red-400/60 focus:border-red-400 shadow-lg shadow-red-500/25"
                        : "border-gray-600/50 focus:border-purple-400/60 focus:shadow-lg focus:shadow-purple-500/25"
                    }`}
                  />
                  {errors.message && (
                    <p className="text-red-400 text-sm flex items-center space-x-1">
                      <AlertCircle className="w-4 h-4" />
                      <span>{errors.message}</span>
                    </p>
                  )}
                  <p className="text-xs text-gray-500">
                    {formData.message.length}/500 characters
                  </p>
                </div>

                {/* Submit button */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="relative group w-full bg-blue-600 hover:from-purple-700 hover:via-blue-700 hover:to-green-700 text-white border-0 shadow-2xl shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-500 py-6 text-lg overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform -skew-x-12 translate-x-full group-hover:translate-x-[-100%]" />

                  {isSubmitting ? (
                    <div className="flex items-center space-x-2 relative z-10">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Sending Message...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center space-x-2 relative z-10">
                      <Send className="w-5 h-5" />
                      <span>Send Message</span>
                      <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  )}
                </Button>
              </form>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

// Contact information component
function ContactInfo({ isVisible }: { isVisible: boolean }) {
  const [hoveredSocial, setHoveredSocial] = useState<string | null>(null);

  return (
    <div
      className={`space-y-6 transition-all duration-1000 delay-300 ${
        isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
      }`}
    >
      {/* Contact details card */}
      <Card className="relative bg-[#160e23] from-gray-900/60 to-black/60 backdrop-blur-xl border-2 border-gray-700/30 hover:border-cyan-400/50 transition-all duration-500 overflow-hidden">
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

        <CardContent className="relative z-10 p-4 md:p-8">
          <div className="space-y-8">
            {/* Header */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-xl border border-cyan-400/30">
                  <Mail className="w-6 h-6 text-cyan-300" />
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-white">
                    Contact Information
                  </h3>
                  <p className="text-gray-400">Reach out through any channel</p>
                </div>
              </div>
            </div>

            {/* Contact details */}
            <div className="space-y-6">
              {/* Address */}
              <div className="flex items-start space-x-4 group">
                <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg border border-purple-400/30 group-hover:scale-110 transition-transform duration-300">
                  <MapPin className="w-5 h-5 text-purple-300" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white group-hover:text-purple-200 transition-colors">
                    Address
                  </h4>
                  <p className="text-gray-300 group-hover:text-gray-200 transition-colors">
                    {contactInfo.address}
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start space-x-4 group">
                <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-lg border border-green-400/30 group-hover:scale-110 transition-transform duration-300">
                  <Phone className="w-5 h-5 text-green-300" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white group-hover:text-green-200 transition-colors">
                    Phone
                  </h4>
                  <p className="text-gray-300 group-hover:text-gray-200 transition-colors">
                    {contactInfo.phone}
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start space-x-4 group">
                <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-lg border border-blue-400/30 group-hover:scale-110 transition-transform duration-300">
                  <Mail className="w-5 h-5 text-blue-300" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white group-hover:text-blue-200 transition-colors">
                    Email
                  </h4>
                  <p className="text-gray-300 group-hover:text-gray-200 transition-colors">
                    {contactInfo.email}
                  </p>
                  <p className="text-sm text-gray-400">
                    Support: {contactInfo.supportEmail}
                  </p>
                </div>
              </div>

              {/* Business hours */}
              <div className="flex items-start space-x-4 group">
                <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-lg border border-yellow-400/30 group-hover:scale-110 transition-transform duration-300">
                  <MessageCircle className="w-5 h-5 text-yellow-300" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white group-hover:text-yellow-200 transition-colors">
                    Support Hours
                  </h4>
                  <p className="text-gray-300 group-hover:text-gray-200 transition-colors">
                    {contactInfo.businessHours}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Social links card */}
      <Card className="relative bg-[#160e23] from-gray-900/60 to-black/60 backdrop-blur-xl border-2 border-gray-700/30 hover:border-green-400/50 transition-all duration-500 overflow-hidden">
        <CardContent className="relative z-10 p-4 md:p-8">
          <div className="space-y-6">
            {/* Header */}
            <div className="space-y-2">
              <h3 className="text-xl md:text-2xl font-bold text-white">
                Join Our Community
              </h3>
              <p className="text-gray-400">
                Connect with us on social platforms
              </p>
            </div>

            {/* Social links grid */}
            <div className="grid  sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4">
              {socialLinks.map((social, index) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative"
                  onMouseEnter={() => setHoveredSocial(social.name)}
                  onMouseLeave={() => setHoveredSocial(null)}
                >
                  <div
                    className={`relative p-4 bg-gradient-to-br ${
                      social.bgColor
                    } border-2 border-gray-600/30 rounded-xl transition-all duration-300 hover:scale-105 hover:border-opacity-60 ${
                      hoveredSocial === social.name
                        ? `hover:border-${
                            social.color.split("-")[1]
                          }-400/60 hover:shadow-lg`
                        : ""
                    }`}
                    style={{
                      borderColor:
                        hoveredSocial === social.name
                          ? `rgba(${
                              social.color.includes("blue")
                                ? "59, 130, 246"
                                : social.color.includes("purple")
                                ? "139, 92, 246"
                                : social.color.includes("green")
                                ? "16, 185, 129"
                                : social.color.includes("red")
                                ? "239, 68, 68"
                                : "156, 163, 175"
                            }, 0.6)`
                          : undefined,
                    }}
                  >
                    {/* Background glow */}
                    {hoveredSocial === social.name && (
                      <div
                        className={`absolute inset-0 bg-gradient-to-r ${social.bgColor} opacity-20 rounded-xl blur-sm`}
                      />
                    )}

                    <div className="relative z-10 flex items-center space-x-3">
                      <div className="text-2xl">{social.icon}</div>
                      <div className="flex-1 min-w-0">
                        <h4
                          className={`font-semibold transition-colors ${
                            hoveredSocial === social.name
                              ? "text-white"
                              : "text-gray-300"
                          }`}
                        >
                          {social.name}
                        </h4>
                        <p className="text-sm text-gray-400">
                          {social.members} members
                        </p>
                      </div>
                      <ExternalLink
                        className={`w-4 h-4 transition-all duration-300 ${
                          hoveredSocial === social.name
                            ? "text-white translate-x-1"
                            : "text-gray-500"
                        }`}
                      />
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Live chat button */}
      <Button className="w-full relative group bg-blue-600  hover:bg-purple-700  text-white border-0 shadow-2xl shadow-green-500/25 hover:shadow-green-500/40 transition-all duration-500 py-6 text-lg overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform -skew-x-12 translate-x-full group-hover:translate-x-[-100%]" />
        <div className="flex items-center justify-center space-x-2 relative z-10">
          <MessageCircle className="w-5 h-5" />
          <span>Start Live Chat</span>
          <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse" />
        </div>
      </Button>
    </div>
  );
}

export default function ContactSection() {
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
    <section
      ref={sectionRef}
      className="relative py-20 lg:py-32 bg-black overflow-hidden"
    >
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
              linear-gradient(rgba(139, 92, 246, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(139, 92, 246, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
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
              [
                "bg-purple-400",
                "bg-blue-400",
                "bg-green-400",
                "bg-pink-400",
                "bg-cyan-400",
              ][Math.floor(Math.random() * 5)]
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
          style={{
            top: "80%",
            animationDelay: "1.5s",
            animationDuration: "6s",
          }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 md:px-6 lg:px-12">
        {/* Section header */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="inline-flex items-center space-x-4 mb-8">
            <div className="w-16 h-px bg-gradient-to-r from-transparent to-purple-400" />
            <span className="text-purple-300 text-sm md:text-base font-bold tracking-wider uppercase bg-purple-900/20 px-4 py-2 rounded-full border border-purple-400/30">
              Get in Touch
            </span>
            <div className="w-16 h-px bg-gradient-to-l from-transparent to-cyan-400" />
          </div>

          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight">
            <span className="bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent drop-shadow-lg">
              Let's Connect &
            </span>
            <br />
            <span className="text-white drop-shadow-lg">Build Together</span>
          </h2>

          <p className="text-xl lg:text-2xl text-gray-300 max-w-4xl mx-auto font-medium leading-relaxed">
            Have questions or want to connect? We'd love to hear from you and
            explore opportunities together.
          </p>

          {/* Animated pulsing dot grid */}
          <div className="mt-8 flex justify-center">
            <div className="grid grid-cols-5 gap-2">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="w-2 h-2 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full animate-pulse"
                  style={{ animationDelay: `${i * 0.2}s` }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Main content grid */}
        <div className="grid lg:grid-cols-2 gap-6  xl:gap-12">
          {/* Left column - Contact form */}

          <ContactForm isVisible={isVisible} />

          {/* Right column - Contact info */}
          <ContactInfo isVisible={isVisible} />
        </div>

        {/* Bottom CTA */}
        <div
          className={`text-center mt-8 md:mt-16 transition-all duration-1000 delay-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="inline-flex flex-wrap items-center gap-3 md:gap-6 px-5 md:px-10 py-3 md:py-6 bg-[#160e23] backdrop-blur-xl border-2 border-gray-600/50 rounded-2xl shadow-2xl">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50" />
              <span className="text-gray-200 text-base font-semibold">
                Response within 24 hours
              </span>
            </div>
            <div className="w-px h-6 bg-gray-500 hidden lg:block" />
            <div className="flex items-center gap-2 sm:gap-3">
              <MessageCircle className="w-5 h-5 text-blue-400" />
              <span className="text-gray-200 text-base font-semibold">
                24/7 Community Support
              </span>
            </div>
            <div className="w-px h-6 bg-gray-500 hidden lg:block" />
            <div className="flex items-center gap-2 sm:gap-3">
              <Mail className="w-5 h-5 text-purple-400" />
              <span className="text-gray-200 text-base font-semibold">
                Secure Communication
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom glow effects */}
      <div className="absolute bottom-0 left-1/4 w-96 h-40 bg-gradient-to-t from-purple-600/20 to-transparent blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-40 bg-gradient-to-t from-blue-600/20 to-transparent blur-3xl" />
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-96 h-40 bg-gradient-to-t from-green-600/15 to-transparent blur-3xl" />
    </section>
  );
}
