'use client';

import { motion } from "framer-motion";

interface AnimatedLogoProps {
  small?: boolean;
}

export default function AnimatedLogo({ small = false }: AnimatedLogoProps) {
  return (
    <motion.div
      className={`${small ? "w-10 h-10" : "w-12 h-12"} relative rounded-full overflow-hidden border-2 border-primary shadow-md bg-white`}
      animate={{
        scale: [1, 1.05, 1],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <img 
        src="/channels4-profile.jpg"
        alt="GK Animates Logo"
        className="w-full h-full object-cover"
      />
    </motion.div>
  );
}
