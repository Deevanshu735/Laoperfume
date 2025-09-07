import React, { useEffect } from "react";
import { motion } from "framer-motion";
import {
  Clock,
  Map,
  Package,
  AlertTriangle,
  HelpCircle,
  Mail,
} from "lucide-react";
import { HashLink } from "react-router-hash-link";
import InfoCard from "../components/InfoCard.jsx"; // Imports the reusable component

const Delivery = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const pageVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0 },
  };

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      className="bg-gray-50 font-sans"
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div className="bg-white py-16 sm:py-20 text-center px-4 border-b border-gray-200">
        <motion.h1
          className="text-4xl md:text-5xl font-bold font-display text-gray-900"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
        >
          Delivery Information
        </motion.h1>
        <motion.p
          className="text-gray-600 mt-4 max-w-2xl mx-auto"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          Fast, reliable, and right to your doorstep. Here's what you need to
          know about our delivery service.
        </motion.p>
      </div>

      <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="space-y-12"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* --- THE FIX IS HERE: Using the reusable InfoCard correctly --- */}
            <InfoCard variants={itemVariants}>
              <div className="flex justify-center mb-4">
                <div className="bg-yellow-50/70 p-4 rounded-full border border-brand-gold/20">
                  <Clock className="w-8 h-8 text-brand-gold" />
                </div>
              </div>
              <h3 className="text-2xl font-bold font-display mb-2 text-gray-900">
                Delivery Timeline
              </h3>
              <p className="text-gray-600 leading-relaxed">
                We guarantee delivery within 4 hours of order confirmation, 7
                days a week.
              </p>
            </InfoCard>

            <InfoCard variants={itemVariants}>
              <div className="flex justify-center mb-4">
                <div className="bg-yellow-50/70 p-4 rounded-full border border-brand-gold/20">
                  <Map className="w-8 h-8 text-brand-gold" />
                </div>
              </div>
              <h3 className="text-2xl font-bold font-display mb-2 text-gray-900">
                Delivery Area
              </h3>
              <p className="text-gray-600 leading-relaxed">
                We currently deliver{" "}
                <span className="font-semibold">
                  only within Vientiane, Laos.
                </span>
              </p>
            </InfoCard>

            <InfoCard variants={itemVariants}>
              <div className="flex justify-center mb-4">
                <div className="bg-yellow-50/70 p-4 rounded-full border border-brand-gold/20">
                  <Package className="w-8 h-8 text-brand-gold" />
                </div>
              </div>
              <h3 className="text-2xl font-bold font-display mb-2 text-gray-900">
                Delivery Charges
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Fees are calculated at checkout. Free delivery may be available
                for large orders.
              </p>
            </InfoCard>
          </div>

          <motion.div
            variants={itemVariants}
            className="p-6 bg-yellow-50/60 border-l-4 border-brand-gold rounded-r-lg"
          >
            <div className="flex">
              <AlertTriangle className="h-6 w-6 text-yellow-900 mr-4 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-lg mb-2 text-yellow-900">
                  Important Delivery Notes
                </h3>
                <ul className="space-y-2 text-sm text-yellow-800 list-disc list-inside">
                  <li>
                    Ensure your address and contact details are correct to avoid
                    delays.
                  </li>
                  <li>
                    Please make sure someone is available to receive the order
                    at the location.
                  </li>
                  <li>
                    If your order is damaged or incorrect, please contact us
                    within 24 hours.
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <section className=" py-20 ">
        <div className="container mx-auto text-center px-4">
          <HelpCircle className="mx-auto h-12 w-12 text-brand-gold" />
          <h2 className="text-3xl font-bold font-display mt-4">
            Any Questions?
          </h2>
          <p className="text-gray-600 mt-4 mb-8 max-w-lg mx-auto">
            For any questions about our delivery service, feel free to reach out
            to our customer support team.
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

export default Delivery;
