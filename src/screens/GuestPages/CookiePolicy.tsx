import React from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const CookiePolicy: React.FC = () => {
  return (
    <main className="bg-linear-to-b from-slate-50 to-white text-gray-800">
      <Navigation />
      {/* Hero */}
      <section className="border-b bg-black border-gray-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-20 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-100">
            Cookie Policy
          </h1>
          <p className="mt-4 text-gray-300  text-center">
            This Cookie Policy explains how Cofinity uses cookies and similar
            technologies to improve your experience on our platform.
          </p>
          <p className="mt-2 text-xs text-gray-400">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-14 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="bg-white px-6 sm:px-10 py-10 space-y-12 text-sm sm:text-base leading-relaxed">
            <p className="text-gray-700">
              Cofinity uses cookies and similar technologies on our website and
              services (“Services”) to enhance your user experience and
              understand how you interact with our platform.
            </p>

            {/* Section */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                1. What Are Cookies?
              </h2>
              <p className="text-gray-700">
                Cookies are small text files stored on your device when you
                visit a website. They help websites remember information about
                your visit, such as preferences, login status, and usage
                patterns.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                2. Types of Cookies We Use
              </h2>
              <ul className="list-disc pl-6 space-y-3 text-gray-700">
                <li>
                  <strong>Essential Cookies:</strong> Necessary for the basic
                  functionality of the website.
                </li>
                <li>
                  <strong>Performance Cookies:</strong> Collect anonymous
                  information on how visitors use the site to help us improve
                  its performance.
                </li>
                <li>
                  <strong>Functional Cookies:</strong> Remember your preferences
                  and settings for a more personalized experience.
                </li>
                <li>
                  <strong>Advertising/Targeting Cookies:</strong> Used to
                  deliver relevant advertisements and measure ad performance.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                3. How We Use Cookies
              </h2>
              <p className="text-gray-700">We use cookies to:</p>
              <ul className="list-disc pl-6 space-y-3 text-gray-700">
                <li>Ensure our website functions properly</li>
                <li>Remember your preferences and settings</li>
                <li>Analyze traffic and usage patterns</li>
                <li>Deliver relevant content and advertisements</li>
                <li>Improve user experience and performance</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                4. Third-Party Cookies
              </h2>
              <p className="text-gray-700">
                Some cookies are set by third-party services, such as analytics
                or advertising platforms. These third parties may track your
                usage across different websites.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                5. Managing Cookies
              </h2>
              <p className="text-gray-700">
                Most browsers allow you to manage, block, or delete cookies
                through their settings. Please note that disabling certain
                cookies may affect the functionality of the Services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                6. Changes to This Cookie Policy
              </h2>
              <p className="text-gray-700">
                We may update this Cookie Policy from time to time. Any changes
                will be posted on this page with an updated revision date.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                7. Contact Us
              </h2>
              <p className="text-gray-700">
                If you have any questions about this Cookie Policy, please
                contact us at:
              </p>
              <p className="mt-2">
                <a
                  href="mailto:support@cofinity.com"
                  className="text-blue-600 hover:underline font-medium"
                >
                  support@cofinity.com
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

export default CookiePolicy;
