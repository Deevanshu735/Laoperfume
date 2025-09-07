import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Mail } from "lucide-react";
import { HashLink } from "react-router-hash-link";

// Your FAQ content
const faqData = [
  {
    question: "What is Laoperfume?",
    answer:
      "Laoperfume is an online store offering a wide range of high-quality perfumes for men, women, and unisex fragrances. We curate premium fragrances to suit your style and personality.",
  },
  {
    question: "Do you sell authentic perfumes?",
    answer:
      "Yes, we only sell 100% authentic and genuine perfumes. All our products come from trusted manufacturers and authorized distributors.",
  },
  {
    question: "How can I place an order on your website?",
    answer:
      "Placing an order is simple: Browse through our collection, select your desired perfume, click on 'Add to Cart', and proceed to checkout to enter your details and complete your order.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We currently offer Cash on Delivery (COD) and QR Code payments. All orders are confirmed via WhatsApp after checkout.",
  },
  {
    question: "Do you offer international shipping?",
    answer:
      "Currently, we primarily ship within Laos. For international shipping inquiries, please contact our support team to see if arrangements can be made.",
  },
  {
    question: "How long does shipping take?",
    answer:
      "For local orders, delivery typically takes 1-8 business hours, depending on the location. You’ll be updated on your order status via WhatsApp.",
  },
  {
    question: "Can I return or exchange a perfume?",
    answer:
      "We accept returns or exchanges for unopened and unused perfumes within 14 days of delivery. Unfortunately, we cannot accept returns for opened items due to hygiene reasons.",
  },
  {
    question: "What should I do if I receive a damaged product?",
    answer:
      "If your product arrives damaged, please contact us within 48 hours of delivery. Provide your order number and photos of the product, and we’ll resolve the issue promptly.",
  },
];

// Reusable Accordion Item Component
const AccordionItem = ({ item, isOpen, onClick }) => {
  return (
    // --- 1. Elegant Accordion Card Design ---
    <div className="bg-white border border-gray-200/80 rounded-lg shadow-sm overflow-hidden">
      <button
        onClick={onClick}
        className="w-full flex justify-between items-center text-left p-6 hover:bg-gray-50/50 transition-colors"
      >
        <h3
          className={`text-lg font-semibold font-display transition-colors ${
            isOpen ? "text-brand-gold" : "text-gray-800"
          }`}
        >
          {item.question}
        </h3>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown
            className={`w-6 h-6 transition-colors ${
              isOpen ? "text-brand-gold" : "text-gray-400"
            }`}
          />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="p-6 pt-0 text-gray-600 leading-relaxed">
              {item.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <motion.div
      className="bg-gray-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* --- 2. Refined Header --- */}
      <div className="bg-white py-16 sm:py-20 text-center px-4 border-b border-gray-200">
        <motion.h1
          className="text-4xl md:text-5xl font-bold font-display text-gray-900"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
        >
          Frequently Asked Questions
        </motion.h1>
        <motion.p
          className="text-gray-600 mt-4 max-w-2xl mx-auto"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          Have questions? We're here to help. Find answers to common queries
          below.
        </motion.p>
      </div>

      <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="space-y-4">
          {faqData.map((item, index) => (
            <AccordionItem
              key={index}
              item={item}
              isOpen={openIndex === index}
              onClick={() => handleToggle(index)}
            />
          ))}
        </div>
      </div>

      {/* --- 3. Consistent, Impactful CTA --- */}
      <section className="py-20 ">
        <div className="container mx-auto text-center px-4">
          <h2 className="text-3xl font-bold font-display">Still Need Help?</h2>
          <p className="text-gray-600 mt-4 mb-8 max-w-lg mx-auto">
            If you can't find the answer you're looking for, please don't
            hesitate to reach out to our support team.
          </p>
          <HashLink
            smooth
            to="/#contact"
            className="inline-flex items-center justify-center bg-brand-gold text-black font-bold py-3 px-8 hover:bg-opacity-90 transition-all text-lg transform hover:scale-105"
          >
            <Mail className="w-5 h-5 mr-3" />
            Contact Us
          </HashLink>
        </div>
      </section>
    </motion.div>
  );
};

export default Faq;
