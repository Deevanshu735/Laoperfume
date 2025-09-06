import React, { useEffect } from "react";
import { motion } from "framer-motion";
import {
  CheckCircle,
  XCircle,
  HelpCircle,
  Mail,
  AlertTriangle,
} from "lucide-react";

const Returns = () => {
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
          Return & Exchange Policy
        </motion.h1>
        <motion.p
          className="text-gray-600 mt-4 max-w-2xl mx-auto"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          At Laoperfume, we are committed to ensuring customer satisfaction. If
          you are not completely happy with your purchase, we offer a
          hassle-free return and exchange process.
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
          {/* Eligibility Section */}
          <div className="p-8 bg-white rounded-lg border border-gray-200 shadow-sm">
            <h2 className="text-2xl font-bold font-display mb-4">
              Eligibility for Returns
            </h2>
            <p className="text-gray-600 mb-6">
              We accept returns under the following conditions:
            </p>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 mr-3 text-green-500 mt-1 flex-shrink-0" />
                <span>
                  The product must be{" "}
                  <span className="font-semibold">unused, unopened,</span> and
                  in its{" "}
                  <span className="font-semibold">original packaging.</span>
                </span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 mr-3 text-green-500 mt-1 flex-shrink-0" />
                <span>
                  Returns must be initiated within{" "}
                  <span className="font-semibold">14 days</span> of receiving
                  your order.
                </span>
              </li>
              <li className="flex items-start">
                <XCircle className="w-5 h-5 mr-3 text-red-500 mt-1 flex-shrink-0" />
                <span>
                  Perfumes that have been opened, used, or tampered with are not
                  eligible for returns due to hygiene and safety reasons.
                </span>
              </li>
            </ul>
          </div>

          {/* How to Return Section */}
          <div className="p-8 bg-white rounded-lg border border-gray-200 shadow-sm">
            <h2 className="text-2xl font-bold font-display mb-4">
              Steps to Return an Item
            </h2>
            <ol className="space-y-4 text-gray-700 list-decimal list-inside">
              <li>
                <span className="font-semibold">Contact Us:</span> Reach out to
                our customer support team with your order number and reason for
                the return.
              </li>
              <li>
                <span className="font-semibold">Approval:</span> Once your
                request is approved, you will receive instructions on how to
                send the product back.
              </li>
              <li>
                <span className="font-semibold">Return Shipping:</span> You are
                responsible for the return shipping cost unless the item was
                damaged or incorrect.
              </li>
            </ol>
          </div>

          {/* Exchanges Section */}
          <div className="p-8 bg-white rounded-lg border border-gray-200 shadow-sm">
            <h2 className="text-2xl font-bold font-display mb-4">Exchanges</h2>
            <p className="text-gray-600 mb-6">
              We offer exchanges for eligible products under the following
              circumstances:
            </p>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 mr-3 text-green-500 mt-1 flex-shrink-0" />
                <span>
                  <span className="font-semibold">
                    Incorrect Item Received:
                  </span>{" "}
                  If you received the wrong item, contact us immediately, and
                  we’ll arrange an exchange at no extra cost.
                </span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 mr-3 text-green-500 mt-1 flex-shrink-0" />
                <span>
                  <span className="font-semibold">Damaged Product:</span> If
                  your product arrives damaged, please provide photos of the
                  damaged item within{" "}
                  <span className="font-semibold">48 hours</span> of delivery.
                </span>
              </li>
            </ul>
          </div>

          {/* Refund Process Section */}
          <div className="p-8 bg-white rounded-lg border border-gray-200 shadow-sm">
            <h2 className="text-2xl font-bold font-display mb-4">
              Refund Process
            </h2>
            <ul className="space-y-3 text-gray-700 list-disc list-inside">
              <li>
                Refunds will be processed once we receive and inspect the
                returned item.
              </li>
              <li>
                Approved refunds will be credited to your original payment
                method within{" "}
                <span className="font-semibold">7-10 business days.</span>
              </li>
              <li>
                Shipping fees and gift-wrapping charges (if any) are
                non-refundable.
              </li>
            </ul>
          </div>

          {/* Non-Returnable Items Section */}
          <div className="p-8 bg-white rounded-lg border border-gray-200 shadow-sm">
            <h2 className="text-2xl font-bold font-display mb-4">
              Non-Returnable Items
            </h2>
            <p className="text-gray-600 mb-6">
              The following items are not eligible for returns or exchanges:
            </p>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <XCircle className="w-5 h-5 mr-3 text-red-500 mt-1 flex-shrink-0" />
                <span>Opened or used perfumes.</span>
              </li>
              <li className="flex items-start">
                <XCircle className="w-5 h-5 mr-3 text-red-500 mt-1 flex-shrink-0" />
                <span>Custom or personalized products.</span>
              </li>
              <li className="flex items-start">
                <XCircle className="w-5 h-5 mr-3 text-red-500 mt-1 flex-shrink-0" />
                <span>Items marked as final sale.</span>
              </li>
            </ul>
          </div>

          {/* Important Notes Section */}
          <div className="p-6 bg-yellow-50 border-l-4 border-brand-gold rounded-r-lg">
            <div className="flex">
              <AlertTriangle className="h-5 w-5 text-yellow-900 mr-3 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-lg mb-2 text-yellow-900">
                  Important Notes
                </h3>
                <ul className="space-y-2 text-sm text-yellow-800 list-disc list-inside">
                  <li>
                    We recommend using a tracked shipping method for returns, as
                    we are not responsible for lost or undelivered packages.
                  </li>
                  <li>
                    Products returned without prior approval may not be
                    accepted.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Contact Support Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto text-center px-4">
          <HelpCircle className="mx-auto h-12 w-12 text-brand-gold" />
          <h2 className="text-3xl font-bold font-display mt-4">
            Have More Questions?
          </h2>
          <p className="text-gray-600 mt-4 mb-8 max-w-lg mx-auto">
            If you have any further questions or concerns regarding our Return &
            Exchange Policy, feel free to contact our customer support team.
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

export default Returns;
