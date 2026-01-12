import React from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const PrivacyPolicy: React.FC = () => {
  return (
    <main className="bg-linear-to-b from-slate-50 to-white text-gray-800">
      <Navigation />
      {/* Hero */}
      <section className="border-b border-gray-200 bg-black">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-20 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-200">
            Privacy Policy
          </h1>
          <p className="mt-4 text-gray-200 max-w-2xl mx-auto">
            Your privacy matters to us. This policy explains how Cofinity
            collects, uses, and protects your information.
          </p>
          <p className="mt-2 text-xs text-gray-400">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>
      </section>

      {/* Content Card */}
      <section className="py-14 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="bg-white  p-6 sm:p-10 space-y-10 text-sm sm:text-base leading-relaxed">
            <p>
              Cofinity is committed to protecting your privacy and maintaining
              transparency about how your personal data is handled when you use
              our website, platform, and services (collectively, the
              “Services”).
            </p>

            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3">
                1. Information We Collect
              </h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>
                  <strong>Personal Information:</strong> Name, email address,
                  phone number, contact messages, and account-related details.
                </li>
                <li>
                  <strong>Technical Data:</strong> IP address, browser type,
                  device information, and usage statistics.
                </li>
                <li>
                  <strong>Cookies & Tracking:</strong> Data collected through
                  cookies and similar technologies.
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3">
                2. How We Use Your Information
              </h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Operate and maintain the Cofinity platform</li>
                <li>Respond to inquiries and support requests</li>
                <li>Improve performance, security, and user experience</li>
                <li>Prevent fraud and unauthorized access</li>
                <li>Comply with legal and regulatory requirements</li>
              </ul>
            </div>

            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3">
                3. Data Sharing & Third Parties
              </h2>
              <p className="text-gray-700">
                We do not sell your personal data. Information may be shared
                with trusted third-party service providers such as hosting
                providers, analytics services, communication tools, and payment
                processors solely for operating and improving our Services.
              </p>
            </div>

            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3">
                4. Data Security
              </h2>
              <p className="text-gray-700">
                Cofinity uses industry-standard security measures including
                encrypted connections, secure infrastructure, and restricted
                access controls. While no system is entirely risk-free, we take
                reasonable steps to protect your information.
              </p>
            </div>

            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3">
                5. Data Retention
              </h2>
              <p className="text-gray-700">
                Personal data is retained only for as long as necessary to
                fulfill the purposes outlined in this policy or to meet legal
                obligations. Data is securely deleted or anonymized when no
                longer required.
              </p>
            </div>

            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3">
                6. Your Rights
              </h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Request access to your personal data</li>
                <li>Request correction or deletion</li>
                <li>Withdraw consent where applicable</li>
                <li>Object to certain data processing activities</li>
              </ul>
            </div>

            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3">
                7. Children’s Privacy
              </h2>
              <p className="text-gray-700">
                Cofinity does not knowingly collect personal information from
                children under the age of 13 (or under 16 where required by
                applicable law).
              </p>
            </div>

            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3">
                8. Changes to This Policy
              </h2>
              <p className="text-gray-700">
                We may update this Privacy Policy periodically. Any changes will
                be posted on this page with an updated revision date.
              </p>
            </div>

            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3">
                9. Contact Us
              </h2>
              <p className="text-gray-700">
                If you have questions about this Privacy Policy, contact us at:
              </p>
              <p className="mt-2">
                <a
                  href="mailto:support@cofinity.com"
                  className="text-blue-600 hover:underline font-medium"
                >
                  support@cofinity.ng
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default PrivacyPolicy;
