import React from "react";
import { motion } from "framer-motion";

const InfoCard = ({ children, variants }) => (
  <motion.div
    variants={variants}
    className="bg-white p-8 rounded-lg border border-gray-200/80 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 h-full text-center"
  >
    {children}
  </motion.div>
);

export default InfoCard;
