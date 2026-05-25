'use client';

import { useEffect, useState, RefObject } from "react";

interface AnimateOptions {
  threshold?: number;
  once?: boolean;
}

export default function useAnimateOnScroll(
  ref: RefObject<HTMLElement>,
  options: AnimateOptions = {}
) {
  const { threshold = 0.1, once = true } = options;
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) {
            observer.unobserve(entry.target);
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold }
    );

    observer.observe(ref.current);

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref, threshold, once]);

  return isVisible;
}
