'use client';

import { useEffect, useState, RefObject } from "react";

interface ParallaxOptions {
  speed?: number;
  direction?: "up" | "down" | "left" | "right";
}

export default function useParallax(
  ref: RefObject<HTMLElement>, 
  options: ParallaxOptions = {}
) {
  const { speed = 0.1, direction = "up" } = options;
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      
      const elementTop = ref.current.getBoundingClientRect().top;
      const elementHeight = ref.current.offsetHeight;
      const windowHeight = window.innerHeight;
      
      // Check if element is in viewport
      if (elementTop < windowHeight && elementTop > -elementHeight) {
        const scrollPosition = window.scrollY;
        setOffset(scrollPosition * speed);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initialize on mount
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [ref, speed, direction]);

  // Return transform style based on direction
  const getTransformStyle = () => {
    switch (direction) {
      case "up":
        return { transform: `translateY(-${offset}px)` };
      case "down":
        return { transform: `translateY(${offset}px)` };
      case "left":
        return { transform: `translateX(-${offset}px)` };
      case "right":
        return { transform: `translateX(${offset}px)` };
      default:
        return { transform: `translateY(-${offset}px)` };
    }
  };

  return getTransformStyle();
}
