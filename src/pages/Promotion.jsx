import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import promotionBanner from "../assets/promotionbanner.webp"; // Import the banner image

const Promotion = () => {
  useEffect(() => {
    // Scroll to the top when the page loads
    window.scrollTo(0, 0);
  }, []);

  const pageVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0 },
  };

  return (
    <motion.div
      className="bg-zinc-50"
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
        <motion.div
          className="overflow-hidden rounded-lg shadow-xl"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          {/* The entire banner is now a clickable link to the products page */}
          <Link to="/products">
            <img
              src={promotionBanner}
              alt="20% Off Selected Brands Promotion"
              className="w-full h-auto block" // 'block' removes any extra space below the image
            />
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Promotion;
