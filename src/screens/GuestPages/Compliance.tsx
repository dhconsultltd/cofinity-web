import React from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const Compliance: React.FC = () => {
  return (
    <main className="bg-linear-to-b from-slate-50 to-white text-gray-800">
      <Navigation />
      {/* Hero Section */}
      <section className="border-b border-gray-200 bg-black ">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-20 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-200">
            Compliance
          </h1>
          <p className="mt-4 text-gray-200 text-center">
            At Cofinity, we are committed to adhering to the highest standards
            of regulatory and industry compliance to ensure security,
            transparency, and trust for our users.
          </p>
          <p className="mt-2 text-xs text-gray-400">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-14 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="bg-white px-6 sm:px-10 py-10 space-y-12 text-sm sm:text-base leading-relaxed">
            <p className="text-gray-700">
              Cofinity operates under strict compliance with relevant laws,
              regulations, and industry standards to protect our users,
              partners, and platform.
            </p>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                1. Regulatory Compliance
              </h2>
              <p className="text-gray-700">
                Cofinity adheres to applicable financial regulations, including:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>
                  Anti-Money Laundering (AML) and Know Your Customer (KYC)
                  regulations
                </li>
                <li>Data protection laws such as GDPR and NDPR</li>
                <li>Payment card security standards (PCI DSS)</li>
                <li>Other local and international regulatory requirements</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                2. Data Security
              </h2>
              <p className="text-gray-700">
                We implement rigorous security measures to protect user data,
                including:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Encrypted connections (HTTPS/TLS)</li>
                <li>Secure cloud infrastructure and servers</li>
                <li>Access controls and authentication policies</li>
                <li>Regular vulnerability assessments and security audits</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                3. Audits & Monitoring
              </h2>
              <p className="text-gray-700">
                Cofinity conducts regular internal and external audits to ensure
                ongoing compliance with laws, security standards, and
                operational best practices.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                4. User Responsibilities
              </h2>
              <p className="text-gray-700">
                Users are responsible for providing accurate information during
                account creation, following KYC/AML requirements, and using the
                platform in accordance with laws and Cofinity’s Terms of
                Service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                5. Updates to Compliance Practices
              </h2>
              <p className="text-gray-700">
                Cofinity continuously updates its compliance policies to meet
                evolving regulatory standards. Any significant updates will be
                reflected on this page.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                6. Contact for Compliance Inquiries
              </h2>
              <p className="text-gray-700">
                For questions regarding our compliance practices or regulatory
                matters, please contact:
              </p>
              <p className="mt-2">
                <a
                  href="mailto:compliance@cofinity.ng"
                  className="text-blue-600 hover:underline font-medium"
                >
                  compliance@cofinity.ng
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

export default Compliance;
