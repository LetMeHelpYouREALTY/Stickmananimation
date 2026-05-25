'use client';

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface TimelineItemProps {
  year: string;
  title: string;
  children?: React.ReactNode;
  imageUrl?: string;
  index: number;
  reverse?: boolean;
}

export default function TimelineItem({ year, title, children, imageUrl, index, reverse = false }: TimelineItemProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      className={`relative pl-12 ${reverse ? "md:mt-32" : ""}`}
      initial={{ opacity: 0, x: reverse ? 50 : -50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.2 }}
    >
      <div className="timeline-item relative before:content-[''] before:absolute before:left-[-37px] before:top-0 before:w-5 before:h-5 before:rounded-full before:bg-primary before:z-[1]">
        <h3 className="font-['Poppins'] font-semibold text-xl mb-3">{title}</h3>
        <div className="text-gray-600 dark:text-gray-400 mb-4">{children}</div>
        
        {imageUrl && (
          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
            <img src={imageUrl} alt={title} className="w-full h-48 object-cover" />
          </div>
        )}
        
        <div className="timeline-connector absolute left-[-28px] top-5 w-[2px] h-[calc(100%+30px)] bg-primary"></div>
      </div>
    </motion.div>
  );
}
