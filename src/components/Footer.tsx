import React from "react";
import { Link } from "react-router-dom";
import { Linkedin, Facebook, Instagram, Youtube } from "lucide-react";
import CofinityLogo from "@/assets/Cofinitylogo.png";

const Logo: React.FC = () => (
  <div className="flex items-center gap-3">
    <div className="relative w-30 h-auto">
      <img src={CofinityLogo} alt="Cofinity Logo" />
    </div>
  </div>
);

const footerLinks = {
  Product: [
    { label: "Features", href: "/#features" },
    { label: "Pricing", href: "/#pricing" },
    { label: "Customers", href: "/#testimonials" },
    { label: "FAQs", href: "/#faq" },
  ],
  Company: [
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms of Service", href: "/terms-of-service" },
    { label: "Cookie Policy", href: "/cookie-policy" },
    { label: "Compliance", href: "/compliance" },
  ],
};

// Social Media Links with icons
const socialLinks = [
  {
    name: "LinkedIn",
    icon: Linkedin,
    href: "https://linkedin.com/company/cofinity",
    color: "hover:bg-blue-600 hover:text-white",
    label: "Connect on LinkedIn",
  },
  {
    name: "Facebook",
    icon: Facebook,
    href: "https://www.facebook.com/cofinityng/",
    color: "hover:bg-blue-700 hover:text-white",
    label: "Like us on Facebook",
  },
  {
    name: "Instagram",
    icon: Instagram,
    href: " https://www.instagram.com/cofinity_ng/",
    color: "hover:bg-pink-600 hover:text-white",
    label: "Follow us on Instagram",
  },
  {
    name: "YouTube",
    icon: Youtube,
    href: "https://www.youtube.com/channel/UCK9mkLM4Y2g86soZgIEozBQ",
    color: "hover:bg-red-600 hover:text-white",
    label: "Watch on YouTube",
  },
];

// Footer Component
const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-200 text-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 sm:gap-12">
          <div className="lg:col-span-1">
            <Logo />
            <p className="mt-3 sm:mt-4 text-sm text-gray-600">
              Empowering cooperatives with modern financial technology since
              2020.
            </p>

            <div className="mt-4 sm:mt-6">
              <h4 className="text-gray-900 font-semibold mb-3 sm:mb-4">
                Follow Us
              </h4>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-10 h-10 rounded-lg bg-gray-800 text-white flex items-center justify-center transition-all duration-300 ${social.color} hover:scale-105`}
                      aria-label={social.label}
                      title={social.label}
                    >
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className="lg:col-span-1">
              <h4 className="text-gray-900 font-semibold mb-3 sm:mb-4">
                {category}
              </h4>
              <ul className="space-y-2 sm:space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    {link.href.includes("#") ? (
                      <a
                        href={link.href}
                        className="text-sm text-gray-700 hover:text-gray-900 transition-colors hover:underline"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        to={link.href}
                        className="text-sm text-gray-700 hover:text-gray-900 transition-colors hover:underline"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-gray-300">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4">
            <div className="text-center md:text-left">
              <div className="text-gray-700 text-xs sm:text-sm">
                © {currentYear} Cofinity. All rights reserved.
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
