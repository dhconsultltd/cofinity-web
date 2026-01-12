import React from "react";
import { motion } from "framer-motion";
import {
  Shield,
  Users,
  TrendingUp,
  Lock,
  Target,
  Globe,
  HeartHandshake,
  BarChart3,
  Clock,
  CheckCircle,
  Award,
  Zap,
} from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Dashboard from "@/assets/dashboard.jpg";
import { useNavigate } from "react-router-dom";
import { BookDemoModal } from "@/components/BookDemoModal";

const AboutUs: React.FC = () => {
  const navigate = useNavigate();

  return (
    <main className="bg-white text-gray-900 overflow-hidden">
      <Navigation />

      {/* hero */}
      <section className="relative">
        <div className="absolute inset-0 bg-linear-to-br from-indigo-50 via-white to-blue-50" />

        <div className="relative max-w-6xl mx-auto px-6 pt-28 pb-32 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-6xl font-bold tracking-tight"
          >
            Built for Cooperatives.
            <span className="block text-gray-600">Designed for Trust.</span>
          </motion.h1>

          <p className="mt-6 max-w-3xl mx-auto text-lg text-gray-600">
            Cofinity is a modern financial platform helping cooperatives manage
            savings, loans, members, and growth — all in one secure system.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative mt-20 flex justify-center"
          >
            <div className="absolute -inset-10 bg-indigo-200/30 blur-3xl rounded-full" />

            <div className="relative max-w-5xl w-full rounded-3xl border border-gray-200 bg-white shadow-[0_25px_70px_-15px_rgba(0,0,0,0.15)] overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-3 border-b bg-gray-50">
                <span className="h-3 w-3 rounded-full bg-red-400" />
                <span className="h-3 w-3 rounded-full bg-yellow-400" />
                <span className="h-3 w-3 rounded-full bg-green-400" />
              </div>

              <motion.img
                src={Dashboard}
                alt="Cofinity dashboard preview"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4 }}
                className="w-full object-cover"
              />

              <div className="absolute inset-0 bg-linear-to-tr from-white/10 to-transparent pointer-events-none" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Our Story */}
      <section className="max-w-7xl mx-auto px-6 py-28 grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="text-3xl font-semibold">Our Story</h2>
          <p className="mt-6 text-gray-600 leading-relaxed">
            Founded in 2020, Cofinity emerged from a simple observation: while
            cooperatives form the financial backbone of communities across
            Africa and emerging economies, most still rely on manual ledgers,
            spreadsheets, and fragmented tools. This digital gap limits their
            growth and member trust.
          </p>
          <p className="mt-4 text-gray-600 leading-relaxed">
            Our founders, with decades of experience in fintech and cooperative
            management, envisioned a platform built specifically for
            cooperatives—not adapted from banking software. After two years of
            research and development with cooperative leaders, Cofinity was
            born.
          </p>
          <div className="mt-8 p-6 bg-linear-to-r from-indigo-50 to-blue-50 rounded-2xl border border-indigo-100">
            <div className="flex items-start gap-3">
              <Target className="h-6 w-6 text-indigo-600 shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-gray-900">Our Mission</h4>
                <p className="mt-2 text-gray-600">
                  To democratize financial technology for cooperatives, enabling
                  transparency, trust, and sustainable growth for
                  community-based organizations worldwide.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="rounded-3xl border bg-linear-to-br from-gray-50 to-white p-10 shadow-sm">
            <p className="text-sm uppercase tracking-wide text-gray-500">
              Our Focus
            </p>
            <h3 className="mt-3 text-xl font-semibold">
              Cooperative-first Financial Technology
            </h3>
            <p className="mt-4 text-gray-600">
              We don't adapt generic banking software. We build specifically for
              cooperatives — their structure, governance, and community-driven
              values.
            </p>
          </div>

          <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-gray-900">200+</h4>
                <p className="text-sm text-gray-600">Cooperatives Empowered</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">50K+</h4>
                <p className="text-sm text-gray-600">Members Served</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">15+</h4>
                <p className="text-sm text-gray-600">Countries</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-28">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-semibold text-center">
            What We Stand For
          </h2>
          <p className="mt-4 text-gray-600 text-center max-w-3xl mx-auto">
            Our core principles guide every feature we build and every
            partnership we form.
          </p>

          <div className="mt-20 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Shield,
                title: "Transparency",
                desc: "Clear records and real-time visibility for all members.",
                features: [
                  "Real-time reporting",
                  "Audit trails",
                  "Member dashboards",
                ],
              },
              {
                icon: Lock,
                title: "Security",
                desc: "Enterprise-grade protection for sensitive financial data.",
                features: [
                  "Bank-level encryption",
                  "Multi-factor authentication",
                  "Regular security audits",
                ],
              },
              {
                icon: Users,
                title: "Community",
                desc: "Built to strengthen trust within cooperative groups.",
                features: [
                  "Member communication tools",
                  "Collaborative decision making",
                  "Community analytics",
                ],
              },
              {
                icon: TrendingUp,
                title: "Growth",
                desc: "Tools designed to help cooperatives scale sustainably.",
                features: [
                  "Scalable infrastructure",
                  "Growth analytics",
                  "Expansion support",
                ],
              },
            ].map((item) => (
              <motion.div
                key={item.title}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="rounded-2xl border bg-white p-8 shadow-sm hover:shadow-lg transition-shadow"
              >
                <div className="h-12 w-12 rounded-xl bg-linear-to-br from-indigo-100 to-blue-100 flex items-center justify-center mb-6">
                  <item.icon className="h-6 w-6 text-indigo-600" />
                </div>
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="mt-2 text-gray-600">{item.desc}</p>
                <ul className="mt-6 space-y-2">
                  {item.features.map((feature, index) => (
                    <li
                      key={index}
                      className="flex items-center gap-2 text-sm text-gray-500"
                    >
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-28">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-semibold">How We Work</h2>
          <p className="mt-4 text-gray-600 max-w-3xl mx-auto">
            Our unique approach combines deep cooperative understanding with
            modern technology.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: HeartHandshake,
              title: "Cooperative-First Design",
              description:
                "Every feature is designed with cooperative governance, member voting, and transparency in mind.",
            },
            {
              icon: Globe,
              title: "Local & Global",
              description:
                "We support local currencies and regulations while maintaining global security standards.",
            },
            {
              icon: BarChart3,
              title: "Data-Driven Insights",
              description:
                "Provide cooperatives with actionable insights to improve financial health and member satisfaction.",
            },
          ].map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-8 rounded-2xl border border-gray-200 hover:border-indigo-200 hover:bg-linear-to-br from-white to-indigo-50/30 transition-all"
            >
              <div className="h-14 w-14 rounded-xl bg-linear-to-br from-gray-900 to-gray-700 flex items-center justify-center mb-6">
                <item.icon className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="bg-linear-to-br from-gray-900 to-black text-white py-28">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-semibold">
                Trust & Security at Our Core
              </h2>
              <p className="mt-6 text-gray-300">
                We understand that cooperatives handle sensitive member data and
                funds. Our platform is built with multiple layers of security
                and compliance.
              </p>

              <div className="mt-8 space-y-6">
                {[
                  { icon: Shield, text: "SOC 2 Type II Compliant" },
                  { icon: Lock, text: "End-to-end encryption for all data" },
                  { icon: Clock, text: "99.9% uptime guarantee" },
                  { icon: Award, text: "Regular third-party security audits" },
                ].map((item) => (
                  <div key={item.text} className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center">
                      <item.icon className="h-5 w-5" />
                    </div>
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-linear-to-br from-gray-800/50 to-black/50 p-8 rounded-3xl border border-gray-700/50">
              <h3 className="text-xl font-semibold mb-6">Our Commitment</h3>
              <div className="space-y-6">
                <div className="p-4 bg-linear-to-r from-gray-800 to-gray-900/50 rounded-xl">
                  <h4 className="font-semibold mb-2">Data Ownership</h4>
                  <p className="text-gray-300 text-sm">
                    Cooperatives own 100% of their data. We never sell or share
                    member information.
                  </p>
                </div>
                <div className="p-4 bg-linear-to-r from-gray-800 to-gray-900/50 rounded-xl">
                  <h4 className="font-semibold mb-2">Regulatory Compliance</h4>
                  <p className="text-gray-300 text-sm">
                    Built to comply with local financial regulations and data
                    protection laws.
                  </p>
                </div>
                <div className="p-4 bg-linear-to-r from-gray-800 to-gray-900/50 rounded-xl">
                  <h4 className="font-semibold mb-2">Disaster Recovery</h4>
                  <p className="text-gray-300 text-sm">
                    Multi-region backups and disaster recovery protocols ensure
                    business continuity.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-7xl mx-auto px-6 py-28">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {[
            {
              stat: "100%",
              label: "Data Ownership",
              icon: Shield,
              description: "You own all your data",
            },
            {
              stat: "99.9%",
              label: "Uptime",
              icon: Zap,
              description: "Reliable service guarantee",
            },
            {
              stat: "24/7",
              label: "Support",
              icon: Clock,
              description: "Always here to help",
            },
            {
              stat: "200+",
              label: "Cooperatives",
              icon: Users,
              description: "Trusting our platform",
            },
          ].map((item) => (
            <div
              key={item.label}
              className="p-8 rounded-2xl border border-gray-200 hover:border-indigo-200 transition-colors"
            >
              <div className="h-14 w-14 rounded-xl bg-linear-to-br from-indigo-100 to-blue-100 flex items-center justify-center mx-auto mb-6">
                <item.icon className="h-7 w-7 text-indigo-600" />
              </div>
              <div className="text-4xl font-bold bg-linear-to-r from-black to-gray-300 bg-clip-text text-transparent">
                {item.stat}
              </div>
              <p className="mt-2 font-semibold text-gray-900">{item.label}</p>
              <p className="mt-1 text-sm text-gray-500">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative bg-linear-to-r from-black to-gray-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-r from-indigo-500/10 to-purple-500/10" />
        <div className="relative max-w-7xl mx-auto px-6 py-24 text-center">
          <h2 className="text-3xl sm:text-4xl font-semibold">
            Ready to modernize your cooperative?
          </h2>
          <p className="mt-4 text-indigo-100 max-w-xl mx-auto">
            Join hundreds of cooperatives already building trust, transparency,
            and growth with Cofinity.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <a
              onClick={() => navigate("/signup")}
              className="rounded-xl bg-linear-to-r from-white to-gray-100 px-8 py-4 font-semibold text-black hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
            >
              Create Account{" "}
            </a>

            <BookDemoModal className=" sm:w-56 w-full   inline-flex items-center justify-center gap-2 sm:gap-3 px-16 sm:px-18 py-5 sm:py-7 rounded-lg sm:rounded-xl border-2 border-white/30 text-white font-bold text-sm sm:text-lg hover:bg-white/10 transition-all duration-300" />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default AboutUs;
