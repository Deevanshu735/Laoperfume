import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { FileText, HelpCircle, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

const Terms = () => {
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

  const termsContent = [
    {
      title: "1. General Terms",
      content:
        "By accessing and using the Laoperfume website, you agree to abide by these terms and any applicable laws or regulations. We reserve the right to update or modify these terms at any time, and such changes will be effective immediately upon posting on the website.",
    },
    {
      title: "2. Product Information",
      content:
        "We make every effort to ensure that the descriptions, prices, and availability of products listed on our website are accurate. However, we cannot guarantee that there will be no errors. We reserve the right to modify or discontinue any products without prior notice.",
    },
    {
      title: "3. Orders and Payments",
      content:
        "All orders placed on our website are subject to acceptance by Laoperfume. We reserve the right to refuse or cancel orders for any reason, including but not limited to product availability, errors in product descriptions, or issues with payment authorization. Payments for orders are processed securely via our supported payment methods.",
    },
    {
      title: "4. Delivery",
      content:
        "We offer delivery within our serviceable region. All delivery times and charges are provided during checkout and are subject to availability. We strive to meet delivery timelines, but delays may occur due to unforeseen circumstances.",
    },
    {
      title: "5. Returns & Exchanges",
      content:
        "Our Return and Exchange Policy outlines the terms under which you may return or exchange products. Products that have been opened or used are not eligible for return due to hygiene and safety reasons unless the product is damaged or defective.",
    },
    {
      title: "6. Privacy & Security",
      content:
        "We are committed to protecting your privacy. Please refer to our Privacy Policy to learn about how we collect, use, and protect your personal data. We use secure payment systems to ensure your transactions are protected.",
    },
    {
      title: "7. Intellectual Property",
      content:
        "All content on the Laoperfume website, including text, graphics, logos, images, and videos, is the property of Laoperfume and is protected by copyright laws. You may not copy, reproduce, distribute, or modify any part of our website content without prior written consent.",
    },
    {
      title: "8. Limitation of Liability",
      content:
        "Laoperfume will not be liable for any indirect, incidental, or consequential damages arising from your use of our website or products. We do not guarantee that our website will be free from errors or interruptions, but we will make every effort to resolve any issues promptly.",
    },
    {
      title: "9. User Conduct",
      content:
        "By using our website, you agree not to engage in any conduct that could damage, disable, or impair the website or interfere with other users’ enjoyment of the site. You also agree to refrain from submitting harmful content, including viruses or malware.",
    },
    {
      title: "10. Governing Law",
      content:
        "These terms and conditions are governed by and construed in accordance with the laws of Laos, and any disputes will be subject to the exclusive jurisdiction of the courts of that region.",
    },
    {
      title: "11. Contact Information",
      content:
        "If you have any questions about these Terms and Conditions, please contact us at support@laoperfume.la.",
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
          <FileText className="mx-auto h-12 w-12 text-brand-gold" />
        </motion.div>
        <motion.h1
          className="text-4xl md:text-5xl font-bold font-display mt-4"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          Terms & Conditions
        </motion.h1>
        <motion.p
          className="text-gray-600 mt-4 max-w-2xl mx-auto"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          Welcome to Laoperfume! By using our website, you agree to comply with
          the following terms. Please read them carefully.
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
          {termsContent.map((section, index) => (
            <div key={index}>
              <h2 className="text-xl font-bold font-display mb-2">
                {section.title}
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {section.content}
                {section.title === "5. Returns & Exchanges" && (
                  <Link
                    to="/returns"
                    className="text-brand-gold font-semibold hover:underline ml-1"
                  >
                    Read the full policy here.
                  </Link>
                )}
                {section.title === "6. Privacy & Security" && (
                  <Link
                    to="/privacy"
                    className="text-brand-gold font-semibold hover:underline ml-1"
                  >
                    Read the full policy here.
                  </Link>
                )}
              </p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Contact Support Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto text-center px-4">
          <HelpCircle className="mx-auto h-12 w-12 text-brand-gold" />
          <h2 className="text-3xl font-bold font-display mt-4">
            Still Have Questions?
          </h2>
          <p className="text-gray-600 mt-4 mb-8 max-w-lg mx-auto">
            If you have any questions about these Terms and Conditions, please
            don't hesitate to reach out to our support team.
          </p>
          <HashLink
            smooth
            to="/#contact"
            className="inline-flex items-center justify-center bg-black text-white font-bold py-3 px-8  hover:bg-gray-800 transition-colors text-lg"
          >
            <Mail className="w-5 h-5 mr-3" />
            Contact Support
          </HashLink>
        </div>
      </section>
    </motion.div>
  );
};

export default Terms;
