import {
  TrendingUp,
  Shield,
  Zap,
  Globe,
  Coins,
  Users,
  HelpCircle,
  Layers,
  Gem,
  Cpu,
} from "lucide-react";
import blog from "@/public/blog.png";
import blog2 from "@/public/blog2.png";
import blog3 from "@/public/blog3.png";
import blog4 from "@/public/blog4.png";
import blog5 from "@/public/blog5.png";
import blog6 from "@/public/blog6.png";
import user1 from "@/public/user1.png";
import user2 from "@/public/user2.png";
import user3 from "@/public/user3.png";
import user4 from "@/public/user4.png";
import user5 from "@/public/user5.png";
import user6 from "@/public/user6.png";

// "Home", "Features", "Roadmap", "FAQ", "Blog", "Contact"
export const headerData = [
  {
    id: 1,
    title: "Home",
    url: "#",
  },
  {
    id: 2,
    title: "Sale",
    url: "#sale",
  },
  {
    id: 3,
    title: "Features",
    url: "#features",
  },
  {
    id: 4,
    title: "Roadmap",
    url: "#roadmap",
  },
  {
    id: 5,
    title: "Faq",
    url: "#faq",
  },
  {
    id: 6,
    title: "Blog",
    url: "#blog",
  },
  {
    id: 7,
    title: "Contact",
    url: "#contact",
  },
];

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
    authorAvatar: user1,
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
    authorAvatar: user2,
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
    authorAvatar: user3,
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
    authorAvatar: user4,
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
    authorAvatar: user5,
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
    authorAvatar: user6,
    featured: false,
    icon: TrendingUp,
  },
];

// FAQ data organized by categories
export const faqData = {
  general: [
    {
      id: 1,
      question: "What is CryptoVault and how does it work?",
      answer:
        "CryptoVault is a revolutionary cryptocurrency backed by real-world products and assets. Our token operates on a multi-chain infrastructure, providing holders with tangible value through our innovative backing mechanism. Each token represents a stake in our growing ecosystem of verified products and services.",
      icon: HelpCircle,
    },
    {
      id: 2,
      question: "What makes CryptoVault different from other cryptocurrencies?",
      answer:
        "Unlike traditional cryptocurrencies, CryptoVault is backed by real products and assets, providing intrinsic value. We offer multi-chain compatibility, lightning-fast transactions, and a transparent governance system. Our platform combines DeFi innovation with real-world utility.",
      icon: HelpCircle,
    },
    {
      id: 3,
      question: "When will the token be listed on exchanges?",
      answer:
        "CryptoVault will be listed on major decentralized exchanges (DEXs) immediately after the token sale concludes in Q4 2025. We're also in discussions with several tier-1 centralized exchanges for listings in Q1 2026. Early investors will have priority access to trading.",
      icon: HelpCircle,
    },
  ],
  token: [
    {
      id: 4,
      question: "How can I participate in the token sale?",
      answer:
        "You can participate by connecting your Web3 wallet (MetaMask, WalletConnect, etc.) to our platform and purchasing CryptoVault tokens directly. The process is simple: connect wallet, choose your investment amount, confirm the transaction, and receive your tokens instantly.",
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
        "Our support team is available 24/7 through multiple channels: Telegram (@CryptoVaultSupport), Discord, email (support@CryptoVault.io), and live chat on our website. For urgent issues, use our priority support line available to token holders.",
      icon: Users,
    },
    {
      id: 12,
      question: "Where can I find the latest project updates?",
      answer:
        "Follow us on Twitter (@CryptoVaultOfficial), join our Telegram community (50,000+ members), subscribe to our newsletter, and check our blog for weekly development updates. We also host monthly AMA sessions with the founding team.",
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
};

// Category tabs data
export const categories = [
  {
    key: "general",
    label: "General",
    icon: HelpCircle,
    color: "from-purple-400 to-blue-400",
  },
  {
    key: "token",
    label: "Token Sale",
    icon: Coins,
    color: "from-yellow-400 to-orange-400",
  },
  {
    key: "security",
    label: "Security",
    icon: Shield,
    color: "from-green-400 to-emerald-400",
  },
  {
    key: "support",
    label: "Support",
    icon: Users,
    color: "from-pink-400 to-rose-400",
  },
];

// Enhanced feature data with better contrast colors
export const features = [
  {
    id: 1,
    title: "Secure & Audited Smart Contracts",
    description:
      "Military-grade security with multi-layer audits by leading blockchain security firms.",
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
    description:
      "Sub-second transaction speeds with minimal gas fees across all networks.",
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
    description:
      "Seamlessly connect with major DeFi protocols and yield farming platforms.",
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
    description:
      "Deploy across Ethereum, BSC, Polygon, and 15+ other blockchain networks.",
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
    description:
      "Every token backed by tangible assets and real-world utility.",
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
    description:
      "Decentralized decision-making with transparent voting mechanisms.",
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
    description:
      "Real-time insights and performance tracking for all your investments.",
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
    description:
      "Machine learning algorithms detect and prevent suspicious activities.",
    icon: Cpu,
    gradient: "from-violet-300 to-purple-300",
    bgGradient: "from-violet-500/30 to-purple-500/30",
    glowColor: "shadow-violet-500/50",
    borderColor: "border-violet-400/60",
    size: "medium",
    pattern: "circuit",
  },
];
