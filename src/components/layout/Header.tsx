'use client';

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedLogo from "../ui/AnimatedLogo";
import ThemeToggle from "../ui/ThemeToggle";
import { FaBars, FaTimes, FaYoutube } from "react-icons/fa";
import { siteConfig } from "@/config/site";

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#portfolio", label: "Portfolio" },
  { href: "#process", label: "Process" },
  { href: "#about", label: "About" },
  { href: "#tools", label: "Tools" },
  { href: "#contact", label: "Contact" },
];

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-sm transition-all duration-300">
      <div className="container mx-auto px-4 md:px-6 py-3 flex justify-between items-center">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.location.href = '/'}>
          <AnimatedLogo />
          <div>
            <h1 className="text-xl font-['Comfortaa'] font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
              gkanimates
            </h1>
            <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">by Gene Kelly Boyle</p>
          </div>
        </div>
        
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.href}
              href={link.href} 
              className="font-medium hover:text-primary transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>
        
        <div className="flex items-center gap-4">
          <a
            href={siteConfig.youtube.url}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Visit GK Animates on YouTube"
          >
            <FaYoutube className="text-red-600" />
            <span>YouTube</span>
          </a>
          <ThemeToggle />
          
          <button 
            onClick={toggleMobileMenu}
            className="md:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>
      
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="container mx-auto px-4 py-4 flex flex-col space-y-3">
              {navLinks.map((link) => (
                <a 
                  key={link.href}
                  href={link.href} 
                  className="py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <a
                href={siteConfig.youtube.url}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors flex items-center gap-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <FaYoutube className="text-red-600" />
                <span>Visit YouTube Channel</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
