import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Shield, HelpCircle, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const Privacy = () => {
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

  const policySections = [
    {
      title: "1. Information We Collect",
      content:
        "We collect Personal Identifiable Information (name, email, phone, address, payment details) and Non-Personal Information (browser type, IP address) through cookies and analytics tools.",
    },
    {
      title: "2. How We Use Your Information",
      content:
        "Your information is used for order processing, customer support, marketing (if you opt-in), website improvement, and legal compliance.",
    },
    {
      title: "3. Sharing Your Information",
      content:
        "We do not sell or rent your personal data. We only share it with trusted partners for essential services like payment processing, shipping, and analytics, ensuring they adhere to strict privacy standards.",
    },
    {
      title: "4. Cookies and Tracking Technologies",
      content:
        "We use cookies to enhance your browsing experience and analyze traffic. You can control cookies via your browser settings.",
    },
    {
      title: "5. Data Security",
      content:
        "We use industry-standard encryption to protect your data. However, no method of transmission or storage is 100% secure, and we cannot guarantee absolute security.",
    },
    {
      title: "6. Your Rights and Choices",
      content:
        "You have the right to access, correct, or delete your personal data. You can also opt-out of marketing communications at any time by following the 'unsubscribe' link in our emails.",
    },
    {
      title: "7. Children's Privacy",
      content:
        "Our website is not intended for individuals under the age of 18. We do not knowingly collect personal information from children.",
    },
    {
      title: "8. Updates to This Privacy Policy",
      content:
        "We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated 'Effective Date.'",
    },
    {
      title: "9. Contact Us",
      content:
        "If you have any questions or concerns about our Privacy Policy, please contact us at support@laoperfume.la.",
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
          <Shield className="mx-auto h-12 w-12 text-brand-gold" />
        </motion.div>
        <motion.h1
          className="text-4xl md:text-5xl font-bold font-display mt-4"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          Privacy Policy
        </motion.h1>
        <motion.p
          className="text-gray-600 mt-4 max-w-2xl mx-auto"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          At Laoperfume, we respect and value your privacy. This policy outlines
          how we collect, use, and protect your personal information.
        </motion.p>
      </div>

      {/* Main Content Section */}
      <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="bg-white p-8 sm:p-12 rounded-lg border border-gray-200 shadow-sm space-y-8"
        >
          {policySections.map((section, index) => (
            <div key={index}>
              <h2 className="text-xl font-bold font-display mb-2">
                {section.title}
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {section.content}
                {section.title === "4. Cookies and Tracking Technologies" && (
                  <Link
                    to="/cookies"
                    className="text-brand-gold font-semibold hover:underline ml-1"
                  >
                    Read our full Cookies Policy.
                  </Link>
                )}
              </p>
            </div>
          ))}
          <div className="border-t pt-6 text-sm text-gray-500">
            <p>
              By using our website and services, you consent to the collection
              and use of your personal information as outlined in this Privacy
              Policy.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Contact Support Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto text-center px-4">
          <HelpCircle className="mx-auto h-12 w-12 text-brand-gold" />
          <h2 className="text-3xl font-bold font-display mt-4">
            Questions About Privacy?
          </h2>
          <p className="text-gray-600 mt-4 mb-8 max-w-lg mx-auto">
            We are committed to addressing your privacy concerns promptly.
            Please don't hesitate to reach out to our support team.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center justify-center bg-black text-white font-bold py-3 px-8 rounded-md hover:bg-gray-800 transition-colors text-lg"
          >
            <Mail className="w-5 h-5 mr-3" />
            Contact Support
          </a>
        </div>
      </section>
    </motion.div>
  );
};

export default Privacy;
