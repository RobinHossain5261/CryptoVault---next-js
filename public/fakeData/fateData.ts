import { TrendingUp, Shield, Zap, Globe } from "lucide-react";
import blog from "@/public/blog.png";
import blog2 from "@/public/blog2.png";
import blog3 from "@/public/blog3.png";
import blog4 from "@/public/blog4.png";
import blog5 from "@/public/blog5.png";
import blog6 from "@/public/blog6.png";

// Blog data with realistic crypto/ICO content
export const blogData = [
  {
    id: 1,
    title: "How Blockchain is Redefining Financial Security",
    excerpt:
      "Explore the revolutionary impact of blockchain technology on traditional financial systems and security protocols.",
    category: "Insights",
    categoryColor: "from-purple-400 to-blue-400",
    categoryBg: "from-purple-500/20 to-blue-500/20",
    image: blog,
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
    image: blog2,
    author: "Michael Rodriguez",
    date: "Dec 26, 2024",
    readTime: "3 min read",
    featured: false,
    icon: TrendingUp,
  },
  {
    id: 3,
    title: "Top 5 Crypto Trends to Watch in 2025",
    excerpt:
      "Discover the emerging trends that will shape the cryptocurrency landscape in the coming year.",
    category: "Update",
    categoryColor: "from-yellow-400 to-orange-400",
    categoryBg: "from-yellow-500/20 to-orange-500/20",
    image: blog3,
    author: "Alex Thompson",
    date: "Dec 24, 2024",
    readTime: "7 min read",
    featured: false,
    icon: Zap,
  },
  {
    id: 4,
    title: "DeFi Integration: Building the Future of Finance",
    excerpt:
      "Learn how our platform integrates with major DeFi protocols to provide seamless financial services.",
    category: "Insights",
    categoryColor: "from-cyan-400 to-blue-400",
    categoryBg: "from-cyan-500/20 to-blue-500/20",
    image: blog4,
    author: "Emma Wilson",
    date: "Dec 22, 2024",
    readTime: "6 min read",
    featured: false,
    icon: Globe,
  },
  {
    id: 5,
    title: "Smart Contract Audit Results: Maximum Security Achieved",
    excerpt:
      "Our comprehensive smart contract audit results are in, showcasing industry-leading security standards.",
    category: "News",
    categoryColor: "from-rose-400 to-pink-400",
    categoryBg: "from-rose-500/20 to-pink-500/20",
    image: blog5,
    author: "David Kim",
    date: "Dec 20, 2024",
    readTime: "4 min read",
    featured: false,
    icon: Shield,
  },
  {
    id: 6,
    title: "Community Milestone: 100K+ Token Holders Reached",
    excerpt:
      "Celebrating our growing community and the incredible support from our token holders worldwide.",
    category: "Update",
    categoryColor: "from-indigo-400 to-purple-400",
    categoryBg: "from-indigo-500/20 to-purple-500/20",
    image: blog6,
    author: "Lisa Park",
    date: "Dec 18, 2024",
    readTime: "2 min read",
    featured: false,
    icon: TrendingUp,
  },
];
