import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, CheckCircle } from "lucide-react";

const Contact = () => {
  const [formStatus, setFormStatus] = useState("idle"); // 'idle', 'sending', 'success'

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormStatus("sending");

    // Simulate a network request
    setTimeout(() => {
      setFormStatus("success");
      e.target.reset();
      // After 3 seconds, reset to idle so the user can send another message
      setTimeout(() => setFormStatus("idle"), 3000);
    }, 1000);
  };

  const pageVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0 },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6 } },
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
          Get In Touch
        </motion.h1>
        <motion.p
          className="text-gray-600 mt-4 max-w-2xl mx-auto"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          We'd love to hear from you. Whether you have a question about our
          products, an order, or anything else, our team is ready to help.
        </motion.p>
      </div>

      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12"
        >
          {/* --- 1. Refined Contact Details & Map --- */}
          <motion.div variants={itemVariants} className="space-y-8">
            <div className="bg-white p-8 rounded-lg border border-gray-200/80 shadow-sm">
              <h2 className="text-2xl font-bold font-display mb-6 text-gray-800">
                Contact Information
              </h2>
              <div className="space-y-4 text-gray-700">
                <a
                  href="tel:+8562028987977"
                  className="flex items-center group"
                >
                  <Phone className="w-5 h-5 mr-4 text-brand-gold flex-shrink-0" />
                  <span className="group-hover:text-brand-gold transition-colors">
                    +8562028987977
                  </span>
                </a>
                <a
                  href="mailto:admin@laoperfume.la"
                  className="flex items-center group"
                >
                  <Mail className="w-5 h-5 mr-4 text-brand-gold flex-shrink-0" />
                  <span className="group-hover:text-brand-gold transition-colors">
                    admin@laoperfume.la
                  </span>
                </a>
                <div className="flex items-start">
                  <MapPin className="w-5 h-5 mr-4 text-brand-gold mt-1 flex-shrink-0" />
                  <span>Sokpaluang Road, Vientiane, Laos</span>
                </div>
              </div>
            </div>
            <div className="h-80 w-full rounded-lg overflow-hidden shadow-sm border border-gray-200/80">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3794.288820658052!2d102.6200156758655!3d17.96280818301564!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3124686206e3006d%3A0x2865327299a9a13b!2sSokpaluang%20Rd%2C%20Vientiane%2C%20Laos!5e0!3m2!1sen!2sus!4v1693948210376!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Laoperfume Location"
              ></iframe>
            </div>
          </motion.div>

          {/* --- 2. Custom-Styled Contact Form --- */}
          <motion.div
            variants={itemVariants}
            className="bg-white p-8 rounded-lg border border-gray-200/80 shadow-sm"
          >
            <h2 className="text-2xl font-bold font-display mb-6 text-gray-800">
              Send Us a Message
            </h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  required
                  className="form-input w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-gold focus:border-brand-gold"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  className="form-input w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-gold focus:border-brand-gold"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Message
                </label>
                <textarea
                  name="message"
                  id="message"
                  rows="5"
                  required
                  className="form-textarea w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-gold focus:border-brand-gold"
                ></textarea>
              </div>
              <div>
                {/* --- 3. No More `alert()` & Refined CTA --- */}
                <button
                  type="submit"
                  disabled={formStatus === "sending"}
                  className="group w-full flex items-center justify-center bg-gray-900 text-white font-bold py-3 px-8 rounded-md hover:bg-brand-gold hover:text-black transition-all duration-300 transform hover:shadow-lg disabled:bg-gray-400"
                >
                  <Send className="w-5 h-5 mr-3 transform transition-transform duration-300 group-hover:-translate-x-1" />
                  {formStatus === "sending" ? "Sending..." : "Send Message"}
                </button>
                {formStatus === "success" && (
                  <p className="mt-4 text-center text-sm flex items-center justify-center text-green-600">
                    <CheckCircle className="w-5 h-5 mr-2" /> Message sent
                    successfully! We'll be in touch soon.
                  </p>
                )}
              </div>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Contact;
