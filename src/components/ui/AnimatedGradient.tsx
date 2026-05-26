'use client';

import { ReactNode, useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface AnimatedGradientProps {
  children: ReactNode;
  className?: string;
}

export default function AnimatedGradient({ children, className = "" }: AnimatedGradientProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Animated blob background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let particles: Array<{
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
    }> = [];
    
    const colors = ['rgba(0, 191, 166, 0.3)', 'rgba(108, 99, 255, 0.3)', 'rgba(63, 61, 86, 0.3)'];
    
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      initParticles();
    };
    
    const initParticles = () => {
      particles = [];
      const particleCount = 8;
      
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 150 + 100,
          speedX: (Math.random() - 0.5) * 0.7,
          speedY: (Math.random() - 0.5) * 0.7,
          color: colors[Math.floor(Math.random() * colors.length)]
        });
      }
    };
    
    const drawBlob = (x: number, y: number, size: number, color: string) => {
      ctx.beginPath();
      ctx.fillStyle = color;
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();
      ctx.closePath();
    };
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Boundary check
        if (particle.x < -particle.size) particle.x = canvas.width + particle.size;
        if (particle.x > canvas.width + particle.size) particle.x = -particle.size;
        if (particle.y < -particle.size) particle.y = canvas.height + particle.size;
        if (particle.y > canvas.height + particle.size) particle.y = -particle.size;
        
        drawBlob(particle.x, particle.y, particle.size, particle.color);
      });
      
      requestAnimationFrame(animate);
    };
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    animate();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);
  
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full"
        style={{ filter: 'blur(60px)' }}
      />
      
      <div 
        className="absolute inset-0"
        style={{
          background: "linear-gradient(135deg, rgba(0,191,166,0.8) 0%, rgba(108,99,255,0.8) 100%)",
          backgroundSize: "400% 400%",
          animation: "gradient 15s ease infinite"
        }}
      >
        <style dangerouslySetInnerHTML={{
          __html: `
            @keyframes gradient {
              0% {
                background-position: 0% 50%;
              }
              50% {
                background-position: 100% 50%;
              }
              100% {
                background-position: 0% 50%;
              }
            }
          `
        }} />
      </div>
      
      {/* Pattern overlay */}
      <div className="absolute inset-0 opacity-10 dark:opacity-20">
        <div className="absolute inset-0 bg-pattern"></div>
      </div>
      
      {/* Floating elements */}
      <motion.div 
        className="absolute top-20 left-[10%] w-24 h-24 rounded-full bg-white opacity-10"
        animate={{ 
          y: [0, -30, 0],
          rotate: [0, 360]
        }}
        transition={{ 
          y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
          rotate: { duration: 20, repeat: Infinity, ease: "linear" }
        }}
      />
      
      <motion.div 
        className="absolute bottom-40 right-[15%] w-32 h-32 rounded-full bg-white opacity-10"
        animate={{ 
          y: [0, -40, 0],
          rotate: [360, 0]
        }}
        transition={{ 
          y: { duration: 5, repeat: Infinity, ease: "easeInOut" },
          rotate: { duration: 25, repeat: Infinity, ease: "linear" }
        }}
      />
      
      <motion.div 
        className="absolute top-1/2 right-[5%] w-16 h-16 rounded-full bg-white opacity-10"
        animate={{ 
          y: [0, -20, 0],
          x: [0, 20, 0]
        }}
        transition={{ 
          y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
          x: { duration: 4, repeat: Infinity, ease: "easeInOut" }
        }}
      />
      
      {/* Main content */}
      <div className="container mx-auto px-4 md:px-6 py-24 md:py-32 relative z-10">
        {children}
      </div>
    </div>
  );
}
