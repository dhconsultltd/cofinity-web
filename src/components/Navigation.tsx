import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, X, Menu } from "lucide-react";
import CofinityLogo from "@/assets/Cofinitylogo.png";
import { useNavigate } from "react-router-dom";

interface NavLink {
  label: string;
  href: string;
}

const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/#home" },
  { label: "Features", href: "/#features" },
  { label: "Pricing", href: "/#pricing" },
  { label: "Customers", href: "/#testimonials" },
  { label: "FAQs", href: "/#faq" },
];

// Logo Component
const Logo: React.FC = () => (
  <div className="flex items-center gap-3">
    <div className="relative w-30 h-auto">
      <img src={CofinityLogo} alt="Cofinity Logo" />
    </div>
  </div>
);

// Main Navigation Component
const Navigation: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/80 backdrop-blur-md shadow-lg"
            : "bg-white lg:bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <a onClick={() => navigate("/")} aria-label="Cofinity Home">
              <Logo />
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {NAV_LINKS.map((link) => (
                <a
                  onClick={() => navigate(link.href)}
                  key={link.href}
                  // href={link.href}
                  className="text-sm font-medium text-gray-700 hover:text-black transition-colors relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gray-500 group-hover:w-full transition-all duration-300"></span>
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate("/login")}
                className="hidden lg:inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-linear-to-r bg-black   text-white font-medium hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
              >
                Login
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={toggleMobileMenu}
                className="lg:hidden p-2 focus:outline-none"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6 text-gray-700" />
                ) : (
                  <Menu className="w-6 h-6 text-gray-700" />
                )}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-white border-b shadow-lg z-40"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
              <div className="flex flex-col space-y-4">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.href}
                    onClick={() => {
                      navigate(link.href);
                      closeMobileMenu();
                    }}
                    className="py-3 px-4 text-gray-700 hover:text-black hover:bg-gray-50 rounded-lg font-medium transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
                <a
                  onClick={() => {
                    navigate("/login");
                    closeMobileMenu();
                  }}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-linear-to-r bg-black text-white font-medium hover:shadow-lg transition-all duration-300 mt-4"
                >
                  Login
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
