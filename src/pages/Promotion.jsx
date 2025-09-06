import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import promotionBannerMobile from "../assets/banner.jpg";
import promotionBannerDesktop from "../assets/banner2.jpg";

const Promotion = () => {
  useEffect(() => {
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
      <div className="max-w-7xl mx-auto px-0 sm:px-0 lg:px-0">
        <motion.div
          className="overflow-hidden  shadow-xl"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <Link to="/products">
            <picture>
              {/* Desktop / Tablet */}
              <source
                media="(min-width: 768px)"
                srcSet={promotionBannerDesktop}
              />
              {/* Mobile */}
              <img
                src={promotionBannerMobile}
                alt="Special Promotion"
                className="
                  w-full
                  h-[60vh] sm:h-[75vh] lg:h-[80vh] 
                  object-cover
                  object-right    
                  block
                "
              />
            </picture>
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Promotion;
