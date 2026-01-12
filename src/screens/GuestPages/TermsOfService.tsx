import React from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const TermsOfService: React.FC = () => {
  return (
    <main className="bg-linear-to-b from-slate-50 to-white text-gray-800">
      <Navigation />
      {/* Hero */}
      <section className="border-b border-gray-200 bg-black">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-20 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-200">
            Terms of Service
          </h1>
          <p className="mt-4 text-gray-200  text-center">
            These Terms govern your access to and use of the Cofinity platform
            and services.
          </p>
          <p className="mt-2 text-xs text-gray-400 text-center">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-14 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="bg-white px-6 sm:px-10 py-10 space-y-12 text-sm sm:text-base leading-relaxed">
            <p className="text-gray-700">
              These Terms of Service (“Terms”) govern your access to and use of
              the Cofinity website, platform, and related services
              (collectively, the “Services”). By accessing or using Cofinity,
              you agree to be bound by these Terms.
            </p>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                1. Acceptance of Terms
              </h2>
              <p className="text-gray-700">
                By accessing, browsing, or using the Services, you confirm that
                you have read, understood, and agree to be bound by these Terms
                and all applicable laws and regulations.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                2. Eligibility
              </h2>
              <p className="text-gray-700">
                You must be at least 18 years old and legally capable of
                entering into binding agreements to use Cofinity. By using the
                Services, you represent and warrant that you meet these
                requirements.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                3. Use of the Services
              </h2>
              <ul className="list-disc pl-6 space-y-3 text-gray-700">
                <li>Use the Services only for lawful purposes</li>
                <li>Provide accurate and complete information</li>
                <li>Maintain the security of your account credentials</li>
                <li>Not misuse, disrupt, or interfere with the platform</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                4. Accounts & Responsibilities
              </h2>
              <p className="text-gray-700">
                You are responsible for all activities that occur under your
                account. Cofinity is not liable for losses arising from
                unauthorized access resulting from your failure to secure your
                credentials.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                5. Payments & Fees
              </h2>
              <p className="text-gray-700">
                Certain features of the Services may require payment. All fees
                are disclosed prior to purchase and are non-refundable unless
                otherwise stated.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                6. Intellectual Property
              </h2>
              <p className="text-gray-700">
                All content, trademarks, logos, and software used in the
                Services are the property of Cofinity or its licensors. You may
                not copy, modify, distribute, or exploit any part of the
                Services without written permission.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                7. Prohibited Activities
              </h2>
              <ul className="list-disc pl-6 space-y-3 text-gray-700">
                <li>Attempting to gain unauthorized access</li>
                <li>Using the Services for fraudulent activities</li>
                <li>Uploading malicious code or content</li>
                <li>Violating applicable laws or regulations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                8. Termination
              </h2>
              <p className="text-gray-700">
                Cofinity reserves the right to suspend or terminate your access
                to the Services at any time, with or without notice, if you
                violate these Terms or applicable laws.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                9. Limitation of Liability
              </h2>
              <p className="text-gray-700">
                To the maximum extent permitted by law, Cofinity shall not be
                liable for any indirect, incidental, or consequential damages
                arising from your use of the Services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                10. Changes to These Terms
              </h2>
              <p className="text-gray-700">
                We may update these Terms from time to time. Continued use of
                the Services after changes become effective constitutes
                acceptance of the revised Terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                11. Contact Information
              </h2>
              <p className="text-gray-700">
                If you have questions about these Terms, please contact us at:
              </p>
              <p className="mt-2">
                <a
                  href="mailto:support@cofinity.com"
                  className="text-blue-600 hover:underline font-medium"
                >
                  support@cofinity.ng
                </a>
              </p>
            </section>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default TermsOfService;
