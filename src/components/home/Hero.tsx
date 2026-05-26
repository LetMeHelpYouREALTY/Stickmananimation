'use client';

import { motion } from "framer-motion";
import AnimatedGradient from "../ui/AnimatedGradient";
import ScrollIndicator from "../ui/ScrollIndicator";
import { useQuery } from "@tanstack/react-query";
import { getLatestShowreel } from "../../lib/youtube";
import { FaPlay, FaCode, FaFilm, FaAward, FaLaptopCode } from "react-icons/fa";
import { useRef, useState, useEffect } from "react";
import { siteConfig } from "@/config/site";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

// Moving particles in background
function ParticleBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white opacity-20 dark:opacity-30"
          style={{
            width: Math.random() * 40 + 10 + "px",
            height: Math.random() * 40 + 10 + "px",
            left: Math.random() * 100 + "%",
            top: Math.random() * 100 + "%",
          }}
          animate={{
            x: [0, Math.random() * 200 - 100],
            y: [0, Math.random() * 200 - 100],
            scale: [1, Math.random() + 0.5, 1],
            opacity: [0.2, Math.random() * 0.5 + 0.3, 0.2],
          }}
          transition={{
            duration: Math.random() * 10 + 20,
            repeat: Infinity,
            ease: "easeInOut",
            repeatType: "reverse",
          }}
        />
      ))}
    </div>
  );
}

export default function Hero() {
  type ShowreelData = { videoId: string };
  
  const { data: showreelData, isLoading } = useQuery<ShowreelData>({ 
    queryKey: ["/api/videos/showreel"],
    staleTime: 60 * 60 * 1000, // 1 hour
  });

  const showreelVideoId = showreelData?.videoId || "";
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoContainerRef = useRef<HTMLDivElement>(null);

  // Typing effect for headline
  const [displayText, setDisplayText] = useState('');
  const fullText = "Bringing imagination to life through animation";
  
  useEffect(() => {
    let index = 0;
    const typingInterval = setInterval(() => {
      setDisplayText(fullText.substring(0, index));
      index++;
      if (index > fullText.length) {
        clearInterval(typingInterval);
      }
    }, 50);
    
    return () => clearInterval(typingInterval);
  }, []);

  const handlePlayClick = () => {
    setIsVideoPlaying(true);
  };

  return (
    <section id="home" className="relative overflow-hidden">
      <AnimatedGradient>
        <ParticleBackground />
        
        <div className="grid lg:grid-cols-2 gap-12 relative z-10">
          <motion.div 
            className="text-white space-y-6 max-w-xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div 
              className="flex items-center gap-2 px-4 py-1.5 bg-white/20 backdrop-blur-md rounded-full mb-2 w-fit"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <span className="animate-pulse-slow inline-block w-2 h-2 bg-[#00BFA6] rounded-full"></span>
              <p className="text-sm font-medium">Animation Artist & Creative Director</p>
            </motion.div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
              {displayText}
              <motion.span 
                className="inline-block w-[3px] h-[1em] bg-white align-middle ml-1"
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
              />
            </h1>
            
            <motion.p 
              className="text-lg md:text-xl opacity-90 max-w-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
            >
              Creating memorable characters and captivating animated stories that inspire and entertain audiences worldwide.
            </motion.p>
            
            <motion.div 
              className="flex flex-wrap gap-4 pt-4"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.a 
                href={siteConfig.youtube.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-md border border-white/30 text-white font-semibold rounded-md hover:bg-white/20 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                variants={itemVariants}
              >
                <FaFilm />
                YouTube Channel
              </motion.a>
              <motion.a 
                href="#portfolio" 
                className="flex items-center gap-2 px-6 py-3 bg-[#00BFA6] text-white font-semibold rounded-md shadow-lg hover:shadow-xl transition-all"
                whileHover={{ scale: 1.05, backgroundColor: "#00D1B2" }}
                whileTap={{ scale: 0.95 }}
                variants={itemVariants}
              >
                <FaFilm />
                View Portfolio
              </motion.a>
              <motion.a 
                href="#process" 
                className="flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-md border border-white/30 text-white font-semibold rounded-md hover:bg-white/20 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                variants={itemVariants}
              >
                <FaLaptopCode />
                Creative Process
              </motion.a>
              <motion.a 
                href="#contact" 
                className="flex items-center gap-2 px-6 py-3 bg-transparent border border-white/50 text-white font-semibold rounded-md hover:bg-white/10 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                variants={itemVariants}
              >
                <FaCode />
                Work Together
              </motion.a>
            </motion.div>
            
            <motion.div 
              className="flex items-center gap-8 pt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8, duration: 0.8 }}
            >
              <div className="flex flex-col items-center">
                <span className="text-3xl font-bold text-[#00BFA6]">10+</span>
                <span className="text-sm text-white/80">Years Experience</span>
              </div>
              <div className="h-12 w-px bg-white/20"></div>
              <div className="flex flex-col items-center">
                <span className="text-3xl font-bold text-[#00BFA6]">120+</span>
                <span className="text-sm text-white/80">Projects</span>
              </div>
              <div className="h-12 w-px bg-white/20"></div>
              <div className="flex flex-col items-center">
                <span className="text-3xl font-bold text-[#00BFA6]">15</span>
                <span className="text-sm text-white/80">Awards</span>
              </div>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            <div 
              ref={videoContainerRef}
              className="aspect-video bg-black rounded-xl overflow-hidden shadow-2xl border-2 border-white/20 video-container relative"
            >
              {isLoading || !showreelVideoId ? (
                <div className="w-full h-full bg-gray-800/60 backdrop-blur-md flex items-center justify-center text-white">
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#00BFA6] mb-4 animate-pulse-slow">
                      <FaPlay className="text-white text-xl" />
                    </div>
                    <p className="font-medium">Showreel Loading...</p>
                  </div>
                </div>
              ) : !isVideoPlaying ? (
                <div 
                  className="w-full h-full flex items-center justify-center cursor-pointer group relative"
                  onClick={handlePlayClick}
                >
                  <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
                  <img 
                    src={`https://img.youtube.com/vi/${showreelVideoId}/maxresdefault.jpg`} 
                    alt="Video thumbnail" 
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <motion.div 
                    className="relative z-10 flex flex-col items-center text-white"
                    whileHover={{ scale: 1.1 }}
                  >
                    <motion.div 
                      className="w-20 h-20 rounded-full bg-[#00BFA6] flex items-center justify-center mb-4 group-hover:bg-primary transition-colors duration-300"
                      whileHover={{ boxShadow: "0 0 20px 5px rgba(0, 191, 166, 0.5)" }}
                    >
                      <FaPlay className="text-white text-3xl pl-1" />
                    </motion.div>
                    <p className="font-bold text-xl">Watch Showreel</p>
                  </motion.div>
                </div>
              ) : (
                <iframe 
                  src={`https://www.youtube.com/embed/${showreelVideoId}?autoplay=1&mute=0&loop=1&rel=0&showinfo=0`}
                  title="Showreel"
                  className="w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              )}
            </div>
            
            {/* Decorative elements */}
            <motion.div 
              className="absolute -top-8 -right-8 w-28 h-28 bg-[#00BFA6] rounded-full opacity-60 blur-lg"
              animate={{ 
                y: [0, -15, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 6, 
                repeat: Infinity,
                ease: "easeInOut" 
              }}
            />
            <motion.div 
              className="absolute -bottom-6 -left-6 w-24 h-24 bg-primary rounded-full opacity-60 blur-lg"
              animate={{ 
                y: [0, -15, 0],
                scale: [1, 1.2, 1]
              }}
              transition={{ 
                duration: 7, 
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1 
              }}
            />
            
            {/* Animation icons */}
            <motion.div
              className="absolute -top-4 left-10 bg-white/10 backdrop-blur-md p-3 rounded-lg border border-white/20"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2, duration: 0.5 }}
            >
              <FaAward className="text-yellow-300 text-xl" />
            </motion.div>
            
            <motion.div
              className="absolute top-1/3 -right-4 bg-white/10 backdrop-blur-md p-3 rounded-lg border border-white/20"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.4, duration: 0.5 }}
            >
              <FaFilm className="text-[#00BFA6] text-xl" />
            </motion.div>
            
            <motion.div
              className="absolute -bottom-4 right-20 bg-white/10 backdrop-blur-md p-3 rounded-lg border border-white/20"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.6, duration: 0.5 }}
            >
              <FaCode className="text-primary text-xl" />
            </motion.div>
          </motion.div>
        </div>
        
        <ScrollIndicator />
      </AnimatedGradient>
    </section>
  );
}
