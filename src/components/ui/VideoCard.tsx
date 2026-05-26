'use client';

import { useState } from "react";
import { motion } from "framer-motion";
import { FaPlay } from "react-icons/fa";

interface VideoCardProps {
  title: string;
  description?: string;
  thumbnailUrl: string;
  category: string;
  duration: string;
  videoId: string;
  featured?: boolean;
  onClick: (videoId: string) => void;
}

export default function VideoCard({
  title,
  description,
  thumbnailUrl,
  category,
  duration,
  videoId,
  featured = false,
  onClick,
}: VideoCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const categoryColorClass = {
    Character: "bg-primary/10 text-primary",
    "Motion Graphics": "bg-accent/10 text-accent",
    "Short Film": "bg-secondary/10 text-secondary",
    Commercial: "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200",
    Experimental: "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200",
  }[category] || "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200";

  return (
    <motion.div
      className={`group video-container ${featured ? 'bg-gray-100 dark:bg-gray-800' : 'bg-white dark:bg-gray-900'} rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300`}
      whileHover={{ y: -5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onClick(videoId)}
    >
      <div className="relative aspect-video bg-gray-200 dark:bg-gray-800">
        <motion.img
          src={thumbnailUrl}
          alt={`${title} thumbnail`}
          className="w-full h-full object-cover"
          animate={{
            scale: isHovered ? 1.03 : 1,
          }}
          transition={{ duration: 0.3 }}
        />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/50">
          <motion.div
            className="bg-primary rounded-full p-4"
            whileHover={{ scale: 1.1 }}
          >
            <FaPlay className="text-white" />
          </motion.div>
        </div>
      </div>
      <div className="p-5">
        <h3 className="font-['Poppins'] font-semibold text-lg mb-2">{title}</h3>
        {description && (
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">{description}</p>
        )}
        <div className="flex items-center justify-between">
          <span className={`text-xs px-3 py-1 rounded-full ${categoryColorClass}`}>
            {category}
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400">{duration}</span>
        </div>
      </div>
    </motion.div>
  );
}
