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

const Delivery = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const pageVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0 },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

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
        <motion.h1
          className="text-4xl md:text-5xl font-bold font-display"
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
          know about our specialized 4-hour delivery service.
        </motion.p>
      </div>

      {/* Main Content Section */}
      <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
          className="space-y-10"
        >
          {/* Key Highlights Grid */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {/* Delivery Timeline */}
            <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm flex items-start">
              <Clock className="w-8 h-8 mr-5 text-brand-gold flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-2xl font-bold font-display mb-2">
                  4-Hour Delivery
                </h3>
                <p className="text-gray-600">
                  We guarantee delivery within 4 hours of order confirmation, 7
                  days a week, from 9:00 AM to 9:00 PM.
                </p>
              </div>
            </div>
            {/* Delivery Area */}
            <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm flex items-start">
              <Map className="w-8 h-8 mr-5 text-brand-gold flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-2xl font-bold font-display mb-2">
                  Delivery Area
                </h3>
                <p className="text-gray-600">
                  We currently deliver{" "}
                  <span className="font-semibold">
                    only within Vientiane, Laos.
                  </span>{" "}
                  International or long-distance delivery is not available.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Order & Charges Section */}
          <motion.div
            variants={itemVariants}
            className="p-8 bg-white rounded-lg border border-gray-200 shadow-sm"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold font-display mb-2">
                  Delivery Charges
                </h3>
                <p className="text-gray-600">
                  Fees are calculated based on your location and displayed at
                  checkout. Free delivery may be available for orders over a
                  specific amount.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-bold font-display mb-2">
                  Order Processing
                </h3>
                <p className="text-gray-600">
                  Orders placed during operational hours are processed
                  immediately. Late orders will be processed the next day.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Important Notes Section */}
          <motion.div
            variants={itemVariants}
            className="p-6 bg-yellow-50 border-l-4 border-brand-gold rounded-r-lg"
          >
            <div className="flex">
              <AlertTriangle className="h-6 w-6 text-yellow-900 mr-4 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-xl mb-2 text-yellow-900">
                  Important Delivery Notes
                </h3>
                <ul className="space-y-2 text-sm text-yellow-800 list-disc list-inside">
                  <li>
                    Ensure your address and contact details are correct to avoid
                    delays.
                  </li>
                  <li>
                    Please make sure someone is available to receive the order
                    at the delivery location.
                  </li>
                  <li>
                    Delays may occasionally occur due to traffic, weather, or
                    other unforeseen circumstances.
                  </li>
                  <li>
                    If your order is damaged or incorrect upon arrival, please
                    contact us immediately within{" "}
                    <span className="font-semibold">24 hours.</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Contact Support Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto text-center px-4">
          <HelpCircle className="mx-auto h-12 w-12 text-brand-gold" />
          <h2 className="text-3xl font-bold font-display mt-4">
            Any Questions?
          </h2>
          <p className="text-gray-600 mt-4 mb-8 max-w-lg mx-auto">
            For any questions or concerns about our delivery service, feel free
            to reach out to our customer support team. We’re here to help!
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

export default Delivery;
