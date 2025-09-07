import React, { useEffect } from "react";
import { motion } from "framer-motion";
import {
  CheckCircle,
  XCircle,
  HelpCircle,
  Mail,
  AlertTriangle,
  ChevronsRight,
} from "lucide-react";
import { HashLink } from "react-router-hash-link";

// Reusable component for consistent policy points
const PolicyPoint = ({ icon: Icon, color, children }) => (
  <li className="flex items-start">
    <Icon className={`w-5 h-5 mr-3 ${color} mt-1 flex-shrink-0`} />
    <span>{children}</span>
  </li>
);

const Return = () => {
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
      {/* --- 1. Refined Header --- */}
      <div className="bg-white py-16 sm:py-20 text-center px-4 border-b border-gray-200">
        <motion.h1
          className="text-4xl md:text-5xl font-bold font-display text-gray-900"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
        >
          Return & Exchange Policy
        </motion.h1>
        <motion.p
          className="text-gray-600 mt-4 max-w-2xl mx-auto"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          At Laoperfume, we are committed to ensuring your satisfaction. If you
          are not completely happy, we offer a hassle-free return and exchange
          process.
        </motion.p>
      </div>

      {/* --- 2. Elegant & Readable Layout --- */}
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start"
        >
          {/* Column 1 */}
          <div className="space-y-8">
            <motion.div
              variants={itemVariants}
              className="p-8 bg-white rounded-lg border border-gray-200/80 shadow-sm"
            >
              <h2 className="text-2xl font-bold font-display mb-4 text-gray-800">
                Eligibility for Returns
              </h2>
              <ul className="space-y-3 text-gray-700">
                <PolicyPoint icon={CheckCircle} color="text-green-500">
                  The product must be{" "}
                  <span className="font-semibold">unused, unopened,</span> and
                  in its{" "}
                  <span className="font-semibold">original packaging.</span>
                </PolicyPoint>
                <PolicyPoint icon={CheckCircle} color="text-green-500">
                  Returns must be initiated within{" "}
                  <span className="font-semibold">14 days</span> of receiving
                  your order.
                </PolicyPoint>
                <PolicyPoint icon={XCircle} color="text-red-500">
                  Opened or used perfumes are not eligible for returns due to
                  hygiene reasons.
                </PolicyPoint>
              </ul>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="p-8 bg-white rounded-lg border border-gray-200/80 shadow-sm"
            >
              <h2 className="text-2xl font-bold font-display mb-4 text-gray-800">
                Refund Process
              </h2>
              <ul className="space-y-3 text-gray-700 list-inside">
                <PolicyPoint icon={ChevronsRight} color="text-brand-gold">
                  Refunds are processed after we receive and inspect the item.
                </PolicyPoint>
                <PolicyPoint icon={ChevronsRight} color="text-brand-gold">
                  Approved refunds are credited to your original payment method
                  within{" "}
                  <span className="font-semibold">7-10 business days.</span>
                </PolicyPoint>
                <PolicyPoint icon={ChevronsRight} color="text-brand-gold">
                  Shipping fees are non-refundable.
                </PolicyPoint>
              </ul>
            </motion.div>
          </div>

          {/* Column 2 */}
          <div className="space-y-8">
            <motion.div
              variants={itemVariants}
              className="p-8 bg-white rounded-lg border border-gray-200/80 shadow-sm"
            >
              <h2 className="text-2xl font-bold font-display mb-4 text-gray-800">
                How to Return
              </h2>
              <ol className="space-y-4 text-gray-700 list-decimal list-inside">
                <li>
                  <span className="font-semibold">Contact Us:</span> Reach out
                  with your order number and reason for the return.
                </li>
                <li>
                  <span className="font-semibold">Approval:</span> You will
                  receive instructions on how to send the product back.
                </li>
                <li>
                  <span className="font-semibold">Return Shipping:</span> You
                  are responsible for return shipping costs unless the item was
                  damaged or incorrect.
                </li>
              </ol>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="p-6 bg-yellow-50/60 border-l-4 border-brand-gold rounded-r-lg"
            >
              <div className="flex">
                <AlertTriangle className="h-6 w-6 text-yellow-900 mr-4 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-lg mb-2 text-yellow-900">
                    Important Notes
                  </h3>
                  <ul className="space-y-2 text-sm text-yellow-800 list-disc list-inside">
                    <li>
                      We recommend using a tracked shipping method for all
                      returns.
                    </li>
                    <li>
                      Products returned without prior approval may not be
                      accepted.
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* --- 3. Consistent, Impactful CTA --- */}
      <section className="py-20 ">
        <div className="container mx-auto text-center px-4">
          <HelpCircle className="mx-auto h-12 w-12 text-brand-gold" />
          <h2 className="text-3xl font-bold font-display mt-4">
            Have More Questions?
          </h2>
          <p className="text-gray-600 mt-4 mb-8 max-w-lg mx-auto">
            If you have any further questions about our policies, feel free to
            contact our customer support team.
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

export default Return;
