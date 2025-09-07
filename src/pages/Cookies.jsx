import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Cookie, CheckCircle, HelpCircle, Mail } from "lucide-react";
import { HashLink } from "react-router-hash-link";

const Cookies = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const pageVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0 },
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.3 } },
  };

  const cookieTypes = [
    {
      name: "Essential Cookies",
      description:
        "Necessary for the website to function properly, such as enabling secure payment processes and navigation.",
    },
    {
      name: "Performance Cookies",
      description:
        "Help us understand how visitors interact with our website, enabling us to improve functionality and performance.",
    },
    {
      name: "Functional Cookies",
      description:
        "Remember your preferences, such as language and region, for a personalized experience.",
    },
    {
      name: "Marketing Cookies",
      description:
        "Used to display relevant advertisements and track the effectiveness of marketing campaigns.",
    },
  ];

  return (
    <motion.div
      className="bg-zinc-50"
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {/* Hero Section */}
      <div className="bg-white py-20 text-center px-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.7 }}
        >
          <Cookie className="mx-auto h-12 w-12 text-brand-gold" />
        </motion.div>
        <motion.h1
          className="text-4xl md:text-5xl font-bold font-display mt-4"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          Cookies Policy
        </motion.h1>
        <motion.p
          className="text-gray-600 mt-4 max-w-2xl mx-auto"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          At Laoperfume, we use cookies to enhance your browsing experience and
          ensure the proper functioning of our website.
        </motion.p>
      </div>

      {/* Main Content Section */}
      <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="space-y-10"
        >
          {/* What Are Cookies? */}
          <div className="p-8 bg-white rounded-lg border border-gray-200 shadow-sm">
            <h2 className="text-2xl font-bold font-display mb-4">
              What Are Cookies?
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Cookies are small text files stored on your device when you visit
              a website. They help us remember your preferences, analyze website
              usage, and provide a seamless shopping experience.
            </p>
          </div>

          {/* How We Use Cookies */}
          <div className="p-8 bg-white rounded-lg border border-gray-200 shadow-sm">
            <h2 className="text-2xl font-bold font-display mb-6">
              How We Use Cookies
            </h2>
            <div className="space-y-4">
              {cookieTypes.map((cookie, index) => (
                <div key={index} className="flex items-start">
                  <CheckCircle className="w-5 h-5 mr-3 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      {cookie.name}
                    </h3>
                    <p className="text-gray-600">{cookie.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Third-Party & Managing Cookies */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-8 bg-white rounded-lg border border-gray-200 shadow-sm">
              <h2 className="text-2xl font-bold font-display mb-4">
                Third-Party Cookies
              </h2>
              <p className="text-gray-700">
                We may use third-party services (e.g., Google Analytics) that
                also place cookies on your device to help us analyze website
                traffic and user behavior.
              </p>
            </div>
            <div className="p-8 bg-white rounded-lg border border-gray-200 shadow-sm">
              <h2 className="text-2xl font-bold font-display mb-4">
                Managing Cookies
              </h2>
              <p className="text-gray-700">
                You can control or disable cookies through your browser
                settings, though some website features may not function properly
                as a result.
              </p>
            </div>
          </div>

          {/* Changes to Policy */}
          <div className="text-center text-gray-500 text-sm">
            <p>
              We may update this Cookies Policy from time to time to reflect
              changes in technology or legal requirements. Any updates will be
              posted on this page.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Contact Support Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto text-center px-4">
          <HelpCircle className="mx-auto h-12 w-12 text-brand-gold" />
          <h2 className="text-3xl font-bold font-display mt-4">
            Questions About Cookies?
          </h2>
          <p className="text-gray-600 mt-4 mb-8 max-w-lg mx-auto">
            If you have any questions about our use of cookies, please don't
            hesitate to contact our support team.
          </p>
          <HashLink
            smooth
            to="/#contact"
            className="inline-flex items-center justify-center bg-brand-gold text-black font-bold py-3 px-8 hover:bg-opacity-90 transition-all text-lg transform hover:scale-105"
          >
            <Mail className="w-5 h-5 mr-3" />
            Contact Support
          </HashLink>
        </div>
      </section>
    </motion.div>
  );
};

export default Cookies;
