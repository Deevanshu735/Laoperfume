import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Mail, Phone } from "lucide-react";

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
      "Placing an order is simple: Browse through our collection, select your desired perfume, click on Buy Now, and proceed to checkout to enter your details and complete payment. You’ll receive a confirmation email once your order is placed.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept various payment methods, including credit/debit cards, PayPal, and other secure payment options available during checkout.",
  },
  {
    question: "Do you offer international shipping?",
    answer:
      "Yes, we ship internationally. Shipping costs and delivery times may vary depending on the destination country.",
  },
  {
    question: "How long does shipping take?",
    answer:
      "For local orders, delivery typically takes 1-8 business hours, depending on the location. You’ll receive a tracking number to monitor your order.",
  },
  {
    question: "Can I return or exchange a perfume if I don’t like the scent?",
    answer:
      "We accept returns or exchanges for unopened and unused perfumes within 14 days of delivery. Unfortunately, we cannot accept returns for opened items due to hygiene reasons. For assistance, please contact our support team.",
  },
  {
    question: "How can I find the right perfume for me?",
    answer:
      "You can explore our fragrance categories (woody, floral, oriental, etc.) or use our fragrance recommendation tool. Feel free to contact our team for personalized suggestions.",
  },
  {
    question: "What should I do if I receive a damaged or incorrect product?",
    answer:
      "If your product arrives damaged or incorrect, please contact us within 48 hours of delivery. Provide your order number and photos of the product, and we’ll resolve the issue promptly.",
  },
];

// Reusable Accordion Item Component
const AccordionItem = ({ item, isOpen, onClick }) => {
  return (
    <div className="border-b border-gray-200 py-6">
      <button
        onClick={onClick}
        className="w-full flex justify-between items-center text-left"
      >
        <h3 className="text-lg md:text-xl font-semibold font-display">
          {item.question}
        </h3>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className="w-6 h-6 text-brand-gold" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0, marginTop: 0 }}
            animate={{ height: "auto", opacity: 1, marginTop: "16px" }}
            exit={{ height: 0, opacity: 0, marginTop: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="text-gray-600 leading-relaxed">{item.answer}</p>
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
      className="bg-zinc-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Hero Section */}
      <div className="bg-white py-20 text-center">
        <motion.h1
          className="text-4xl md:text-5xl font-bold font-display"
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

      {/* FAQ Accordion Section */}
      <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        {faqData.map((item, index) => (
          <AccordionItem
            key={index}
            item={item}
            isOpen={openIndex === index}
            onClick={() => handleToggle(index)}
          />
        ))}
      </div>

      {/* Contact Support Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto text-center px-4">
          <h2 className="text-3xl font-bold font-display">Still Need Help?</h2>
          <p className="text-gray-600 mt-4 mb-8 max-w-lg mx-auto">
            If you can't find the answer you're looking for, please don't
            hesitate to reach out to our support team.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
            <a
              href="mailto:admin@laoperfume.la"
              className="inline-flex items-center font-semibold text-lg text-black hover:text-brand-gold transition-colors"
            >
              <Mail className="w-5 h-5 mr-2" />
              admin@laoperfume.la
            </a>
            <a
              href="tel:+8562028987977"
              className="inline-flex items-center font-semibold text-lg text-black hover:text-brand-gold transition-colors"
            >
              <Phone className="w-5 h-5 mr-2" />
              +8562028987977
            </a>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default Faq;
