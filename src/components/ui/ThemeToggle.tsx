'use client';

﻿import { motion } from "framer-motion";
import { FaSun, FaMoon } from "react-icons/fa";
import { useTheme } from "../../contexts/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      onClick={toggleTheme}
      className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
    >
      {theme === "dark" ? (
        <FaSun className="text-yellow-400" />
      ) : (
        <FaMoon className="text-primary" />
      )}
    </motion.button>
  );
}

