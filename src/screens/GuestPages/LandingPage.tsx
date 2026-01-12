import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useMotionValue, useSpring, useTransform } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";

import {
  ArrowRight,
  CheckCircle,
  Shield,
  Zap,
  TrendingUp,
  Users,
  Lock,
  BarChart,
  Star,
} from "lucide-react";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import Footer from "@/components/Footer";
import Dashboard from "@/assets/dashboard.jpg";
import { BookDemoModal } from "@/components/BookDemoModal";

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
  gradient: string;
}

interface Testimonial {
  name: string;
  role: string;
  company: string;
  content: string;
  avatar: string;
}

interface Metric {
  value: number;
  label: string;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}

interface PricingTier {
  id: string;
  title: string;
  price: string;
  period?: string;
  description: string;
  features: string[];
  featured?: boolean;
  cta: string;
}

// Counter Component
interface CountUpProps {
  value: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}

const Counter: React.FC<CountUpProps> = ({
  value,

  prefix = "",
  suffix = "",
  decimals = 0,
}) => {
  const count = useMotionValue(0);
  const spring = useSpring(count, {
    damping: 30,
    stiffness: 100,
  });
  const display = useTransform(
    spring,
    (latest) => `${prefix}${latest.toFixed(decimals)}${suffix}`
  );

  useEffect(() => {
    count.set(value);
  }, [value, count]);

  return <motion.span>{display}</motion.span>;
};

const FEATURES: Feature[] = [
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Bank-Grade Security",
    description:
      "SOC 2 Type II compliant with end-to-end encryption and regular security audits.",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Real-Time Processing",
    description:
      "Instant transaction processing with automated reconciliation and live reporting.",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    icon: <TrendingUp className="w-6 h-6" />,
    title: "AI-Powered Insights",
    description:
      "Predictive analytics and smart recommendations for optimal financial decisions.",
    gradient: "from-green-500 to-emerald-500",
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "Member Management",
    description:
      "Comprehensive member profiles with KYC/AML compliance and activity tracking.",
    gradient: "from-orange-500 to-red-500",
  },
  {
    icon: <Lock className="w-6 h-6" />,
    title: "Audit Trail",
    description:
      "Complete transaction history with immutable records for regulatory compliance.",
    gradient: "from-indigo-500 to-blue-500",
  },
  {
    icon: <BarChart className="w-6 h-6" />,
    title: "Advanced Reporting",
    description:
      "Customizable dashboards with automated report generation and export capabilities.",
    gradient: "from-violet-500 to-purple-500",
  },
];

const METRICS: Metric[] = [
  { value: 99.9, label: "Platform Uptime", suffix: "%", decimals: 1 },
  { value: 2500, label: "Transactions Processed", suffix: "+" },
  { value: 500, label: "Cooperatives Trust Us", suffix: "+" },
  { value: 85000, label: "Total Assets Managed", prefix: "₦" },
];

const TESTIMONIALS: Testimonial[] = [
  {
    name: "Adebayo Chinedu",
    role: "Chairman",
    company: "Lagos Teachers Co-op",
    content:
      "Cofinity transformed our operations. What used to take days now happens in minutes. The transparency has increased member trust significantly.",
    avatar: "TC",
  },
  {
    name: "Funke Adebayo",
    role: "Treasurer",
    company: "Farmers Collective Union",
    content:
      "The automated reconciliation feature alone saved us 40 hours per month. The reporting tools are exactly what we needed for our annual audits.",
    avatar: "FA",
  },
  {
    name: "Emeka Nwosu",
    role: "CEO",
    company: "Tech Hub Cooperative",
    content:
      "As a tech-focused cooperative, we needed modern tools. Cofinity delivered with an API-first approach and excellent developer documentation.",
    avatar: "EN",
  },
];

const PRICING_TIERS: PricingTier[] = [
  {
    id: "starter",
    title: "Starter",
    price: "₦3,500",
    period: "",
    description: "Perfect for small cooperatives getting started",
    features: [
      "Up to 30 members",
      "Basic financial reporting",
      "Member profiles & management",
      "Email support",
      "Standard security",
      "1 Loan Product",
      "1 Savings Product",
    ],
    cta: "Get Started ",
  },
  {
    id: "growth",
    title: "Growth",
    price: "₦9,999",
    period: "/month",
    description: "For growing cooperatives needing advanced features",
    featured: true,
    features: [
      "up to 100 members",
      "Advanced analytics & insights",
      "Automated contributions",
      "Loan management system",
      "Priority support",
      "Branch Management",
      "5 Savings Products",
      "5 Loan Products",
    ],
    cta: "Get Started",
  },
  {
    id: "pro",
    title: "Professional",
    price: "₦30,000",
    period: "/month",
    description: "For large cooperatives with complex needs",
    features: [
      "up to 400+ members",
      "up to 20+ branches",
      "Priority Support",
      "Membership Certificate",
      "24/7 phone support",
      "20+ Savings Products",
      "Dedicated account manager",
      "Training & implementation",
    ],
    cta: "Get Started",
  },
];

const FAQS = [
  {
    q: "What is Cofinity?",
    a: "Cofinity is a digital platform designed to help cooperatives manage members, savings, loans, and reports efficiently in one secure system.",
  },
  {
    q: "Is my cooperative’s data secure?",
    a: "Yes. We use bank-grade encryption, secure authentication, and regular backups to ensure your data is always protected.",
  },
  {
    q: "Can I upgrade or downgrade my plan?",
    a: "Absolutely. You can change your plan at any time. Billing adjustments are applied automatically.",
  },
  {
    q: "Do you offer support and onboarding?",
    a: "Yes. All plans include customer support, and we provide guided onboarding to help your cooperative get started smoothly.",
  },
  {
    q: "Do you offer a demo or walkthrough?",
    a: "Yes. You can schedule a guided demo with our team to see all features in action before subscribing.",
  },
];

// PlayCircle Icon Component
const PlayCircle: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

// Hero Section
const HeroSection: React.FC = () => {
  const navigate = useNavigate();
  return (
    <section
      className="relative overflow-hidden pt-10  lg:pt-20 pb-16 sm:pb-24 lg:pb-32 px-4  sm:px-6 lg:px-14"
      id="home"
    >
      <div className="absolute inset-0 bg-linear-to-br from-blue-50 via-white to-purple-50" />

      <div className="absolute top-10 sm:top-20 left-4 sm:left-10 w-48 sm:w-64 lg:w-72 h-48 sm:h-64 lg:h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
      <div className="absolute top-20 sm:top-40 right-4 sm:right-10 w-48 sm:w-64 lg:w-72 h-48 sm:h-64 lg:h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>

      <div className="relative max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="px-2 sm:px-4"
          >
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-blue-100 text-blue-700 text-xs sm:text-sm font-medium mb-4 sm:mb-6">
              <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-blue-600 rounded-full"></span>
              Trusted by 500+ cooperatives nationwide
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-5xl font-bold text-gray-900 leading-tight">
              Modern
              <span className="block bg-linear-to-r from-black to-gray-600 bg-clip-text text-transparent mt-1">
                Cooperative Finance
              </span>
              Platform
            </h1>

            <p className="mt-4 sm:mt-6 text-sm sm:text-base text-gray-600 leading-relaxed max-w-2xl">
              Streamline operations, enhance transparency, and accelerate growth
              with our comprehensive financial management platform built
              exclusively for cooperatives.
            </p>

            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4">
              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate("/signup")}
                className="inline-flex items-center justify-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 rounded-lg sm:rounded-xl bg-linear-to-r bg-black text-white font-semibold text-sm sm:text-base shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Get Started
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href="#features"
                className="inline-flex items-center justify-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 rounded-lg sm:rounded-xl border-2 border-gray-300 text-gray-800 font-semibold text-sm sm:text-base hover:border-blue-500 hover:text-blue-600 transition-all duration-300"
              >
                <PlayCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                Watch Demo
              </motion.a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative px-2 sm:px-4 mt-8 lg:mt-0"
          >
            <div className="relative rounded-xl sm:rounded-2xl overflow-hidden shadow-xl sm:shadow-2xl">
              <div className="absolute inset-0 bg-lineart-to-br from-blue-500/10 to-purple-500/10"></div>
              <div className="aspect-16/10 flex items-center justify-center bg-gray-100">
                <img
                  src={Dashboard}
                  alt="Dashboard preview"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="hidden sm:block absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-lg sm:shadow-2xl max-w-[180px] sm:max-w-xs"
            >
              <div className="text-xs sm:text-sm text-gray-500">
                Active Loans
              </div>
              <div className="text-xl sm:text-2xl font-bold text-gray-900">
                <Counter value={248000} prefix="₦" duration={3} />
              </div>
              <div className="text-xs sm:text-sm text-green-600 font-medium">
                ↑ 18% from last month
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 4, repeat: Infinity, delay: 1 }}
              className="hidden sm:block absolute -top-4 -right-4 sm:-top-6 sm:-right-6 bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-lg sm:shadow-2xl max-w-[180px] sm:max-w-xs"
            >
              <div className="text-xs sm:text-sm text-gray-500">
                Member Satisfaction
              </div>
              <div className="text-xl sm:text-2xl font-bold text-gray-900">
                <Counter value={98.2} suffix="%" decimals={1} duration={2} />
              </div>
              <div className="text-xs sm:text-sm text-blue-600 font-medium">
                Excellent rating
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Metrics Section
const MetricsSection: React.FC = () => {
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3, rootMargin: "0px 0px -100px 0px" }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-12 sm:py-16 bg-linear-to-b bg-black"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8">
          {METRICS.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center px-2"
            >
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-linear-to-r text-gray-200 bg-clip-text  ">
                {isInView ? (
                  <Counter
                    value={metric.value}
                    duration={2}
                    prefix={metric.prefix || ""}
                    suffix={metric.suffix || ""}
                    decimals={metric.decimals || 0}
                  />
                ) : (
                  <>
                    {metric.prefix || ""}0{metric.suffix || ""}
                  </>
                )}
              </div>
              <div className="mt-1 sm:mt-2 text-xs sm:text-sm text-gray-500 font-medium">
                {metric.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Features Section
const FeaturesSection: React.FC = () => (
  <section id="features" className="py-16 sm:py-20 lg:py-24 bg-white">
    <div className="max-w-7xl mx-auto px-0 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center max-w-3xl mx-auto"
      >
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
          Everything you need to
          <span className="block text-gray-600">manage efficiently</span>
        </h2>
        <p className="mt-4 sm:mt-6 text-lg text-gray-600">
          A comprehensive suite of tools designed specifically for cooperative
          financial management
        </p>
      </motion.div>

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 p-4 sm:px-20 sm:mt-8">
        {FEATURES.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ y: -8 }}
            className="group relative flex flex-col h-full"
          >
            <div className="absolute inset-0 bg-linear-to-r from-blue-50 to-purple-50 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative p-6 sm:p-8 rounded-xl sm:rounded-2xl border border-gray-200 bg-white group-hover:border-transparent transition-all duration-300 flex flex-col h-full">
              <div className="flex-none">
                <div
                  className={`inline-flex p-3 rounded-xl bg-linear-to-r text-white ${feature.gradient} mb-4 sm:mb-6`}
                >
                  {feature.icon}
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">
                  {feature.title}
                </h3>
              </div>

              <div className="grow">
                <p className="text-sm sm:text-base text-gray-600 line-clamp-3">
                  {feature.description}
                </p>
              </div>

              <div className="flex-none mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-100">
                <a
                  href="#"
                  className="inline-flex items-center gap-2 text-gray-800 font-medium group-hover:gap-3 transition-all duration-300"
                >
                  Learn more
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

// Testimonials Section
const TestimonialsSection: React.FC = () => (
  <section
    id="testimonials"
    className="py-14 sm:py-16 bg-linear-to-b  bg-black"
  >
    <div className="max-w-7xl mx-auto px-4 sm:px-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center max-w-2xl mx-auto"
      >
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-200">
          Trusted by cooperative leaders
        </h2>
        <p className="mt-3 text-base sm:text-lg text-gray-300">
          Real stories from cooperatives using our platform
        </p>
      </motion.div>

      {/* Grid */}
      <div className="mt-10 grid gap-5 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {TESTIMONIALS.map((testimonial, index) => (
          <motion.div
            key={testimonial.name}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            viewport={{ once: true }}
            whileHover={{ y: -4 }}
            className="bg-gray-800 border border-gray-500 rounded-xl p-5 shadow-sm hover:shadow-md transition-all"
          >
            {/* Header */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-linear-to-r bg-black flex items-center justify-center text-white text-sm font-bold">
                {testimonial.avatar}
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-200">
                  {testimonial.name}
                </p>
                <p className="text-xs text-gray-300">
                  {testimonial.role} • {testimonial.company}
                </p>
              </div>
            </div>

            {/* Content */}
            <p className="mt-3 text-sm text-gray-200 leading-relaxed line-clamp-4">
              “{testimonial.content}”
            </p>

            {/* Rating */}
            <div className="mt-4 flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-4 h-4 fill-yellow-400 text-yellow-400"
                />
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

// Pricing Section
const PricingSection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section id="pricing" className="py-16 sm:py-20 lg:py-24 bg-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
            Simple, predictable
            <span className="block text-gray-600">pricing</span>
          </h2>
          <p className="mt-4 sm:mt-6 text-lg sm:text-xl text-gray-800">
            Choose the perfect plan for your cooperative's needs
          </p>
        </motion.div>

        <div className="mt-12 sm:mt-16 lg:mt-20 grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto items-stretch">
          {PRICING_TIERS.map((tier, index) => (
            <motion.div
              key={tier.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className={`relative flex flex-col h-full min-h-[500px] sm:min-h-[550px] rounded-xl sm:rounded-2xl border-2 ${
                tier.featured
                  ? "border-blue-300 shadow-xl sm:shadow-2xl"
                  : "border-gray-200"
              }`}
            >
              {tier.featured && (
                <div className="absolute -top-3 sm:-top-4 left-1/2 transform -translate-x-1/2">
                  <div className="px-4 sm:px-6 py-1.5 sm:py-2 rounded-full bg-linear-to-r from-blue-600 to-purple-600 text-white text-xs sm:text-sm font-semibold">
                    Most Popular
                  </div>
                </div>
              )}

              <div
                className={`flex flex-col h-full p-6 sm:p-8 rounded-xl sm:rounded-2xl ${
                  tier.featured
                    ? "bg-linear-to-b from-blue-50 to-white"
                    : "bg-white"
                }`}
              >
                <div className="flex-none">
                  <div className="text-center">
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                      {tier.title}
                    </h3>
                    <div className="mt-4 flex items-center justify-center">
                      <span className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
                        {tier.price}
                      </span>
                      {tier.period && tier.period.length > 0 && (
                        <span className="text-gray-600 text-lg sm:text-xl ml-2">
                          {tier.period}
                        </span>
                      )}
                    </div>
                    <p className="mt-3 sm:mt-4 text-gray-600">
                      {tier.description}
                    </p>
                  </div>
                </div>

                <div className="mt-6 sm:mt-8 space-y-3 sm:space-y-4 grow">
                  {tier.features.map((feature) => (
                    <div
                      key={feature}
                      className="flex items-start gap-2 sm:gap-3"
                    >
                      <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 shrink-0 mt-0.5" />
                      <span className="text-sm sm:text-base text-gray-700">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-auto pt-6 sm:pt-8 border-t border-gray-100">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => navigate("/signup")}
                    className={`w-full py-3 sm:py-4 rounded-lg sm:rounded-xl font-semibold text-sm sm:text-base transition-all duration-300 ${
                      tier.featured
                        ? "bg-linear-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg"
                        : "bg-black text-white hover:bg-gray-800"
                    }`}
                  >
                    {tier.cta}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* custom  */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-8 sm:mt-8 text-center max-w-2xl mx-auto"
        >
          <div className="rounded-xl sm:rounded-2xl border-2 border-dashed border-gray-300 p-3 sm:p-6 bg-gray-50">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
              Need a Custom Build?
            </h3>
            <p className="text-gray-600 mb-6">
              For large cooperatives with unique requirements, we offer tailored
              solutions.
            </p>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate("/contact")}
              className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 rounded-lg sm:rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-all duration-300"
            >
              Contact Sales
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// FAQ Section
const FAQSection: React.FC = () => (
  <section
    id="faq"
    className="py-16 sm:py-20 lg:py-24 bg-linear-to-b from-white to-gray-50"
  >
    <div className="max-w-5xl mx-auto px-4 sm:px-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center max-w-2xl mx-auto"
      >
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
          Frequently Asked Questions
        </h2>
        <p className="mt-4 text-base sm:text-lg text-gray-600">
          Everything you need to know before getting started
        </p>
      </motion.div>

      {/* Accordion */}
      <div className="mt-10 sm:mt-12 gap-4">
        <Accordion type="single" collapsible className="space-y-3">
          {FAQS.map((faq, index) => (
            <motion.div
              key={faq.q}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              viewport={{ once: true }}
            >
              <AccordionItem
                value={`faq-${index}`}
                className="border border-gray-200 rounded-xl bg-white px-4 sm:px-6"
              >
                <AccordionTrigger className="text-left font-semibold text-gray-900 hover:no-underline">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            </motion.div>
          ))}
        </Accordion>
      </div>
    </div>
  </section>
);

// CTA Section
const CTASection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-linear-to-br from-black via-gray-900 to-gray-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center text-white">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold"
          >
            Ready to transform your
            <span className="block">cooperative's future?</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
            className="mt-4 sm:mt-6 text-lg sm:text-xl text-blue-100 max-w-3xl mx-auto"
          >
            Join 500+ cooperatives that trust Cofinity with their financial
            operations. Start your free trial today.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center"
          >
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/signup")}
              className="inline-flex items-center justify-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 rounded-lg sm:rounded-xl bg-white text-black font-bold text-sm sm:text-lg hover:shadow-xl transition-all duration-300"
            >
              Create Account
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </motion.a>

            <BookDemoModal className=" sm:w-56 w-full   inline-flex items-center justify-center gap-2 sm:gap-3 px-16 sm:px-18 py-5 sm:py-7 rounded-lg sm:rounded-xl border-2 border-white/30 text-white font-bold text-sm sm:text-lg hover:bg-white/10 transition-all duration-300" />
          </motion.div>

          <div className="mt-6 sm:mt-8 text-blue-200 text-xs sm:text-sm">
            No credit card required • Free onboarding • Cancel anytime
          </div>
        </div>
      </div>
    </section>
  );
};

const LandingPage: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      const element = document.getElementById(id);

      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main>
        <HeroSection />
        <MetricsSection />
        <FeaturesSection />
        <TestimonialsSection />
        <PricingSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;
