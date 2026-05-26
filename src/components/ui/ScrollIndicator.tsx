'use client';

import { motion } from "framer-motion";
import { FaChevronDown } from "react-icons/fa";

export default function ScrollIndicator() {
  return (
    <motion.div 
      className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white text-center"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.5 }}
    >
      <p className="text-sm mb-2 opacity-80">Scroll to explore</p>
      <motion.div
        animate={{ 
          y: [0, 10, 0]
        }}
        transition={{ 
          duration: 1.5, 
          repeat: Infinity,
          ease: "easeInOut" 
        }}
      >
        <FaChevronDown />
      </motion.div>
    </motion.div>
  );
}
