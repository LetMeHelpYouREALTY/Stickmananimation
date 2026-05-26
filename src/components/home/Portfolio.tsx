'use client';

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import VideoCard from "../ui/VideoCard";
import { useQuery } from "@tanstack/react-query";
import type { Video } from "@shared/schema";

type VideoCategory = "All" | "Character" | "Motion Graphics" | "Short Films" | "Commercial" | "Experimental";

export default function Portfolio() {
  const [selectedCategory, setSelectedCategory] = useState<VideoCategory>("All");
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(8);
  
  const { data: allVideos = [], isLoading } = useQuery<Video[]>({ 
    queryKey: ["/api/videos/all"],
    staleTime: 60 * 60 * 1000, // 1 hour
  });

  const categories: VideoCategory[] = ["All", "Character", "Motion Graphics", "Short Films", "Commercial", "Experimental"];
  
  const filteredVideos = allVideos?.filter(video => 
    selectedCategory === "All" || video.category === selectedCategory
  ) || [];

  const handleVideoClick = (videoId: string) => {
    setSelectedVideoId(videoId);
  };

  const closeModal = () => {
    setSelectedVideoId(null);
  };

  const loadMore = () => {
    setVisibleCount(prev => prev + 8);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  return (
    <section id="portfolio" className="py-20 bg-gray-50 dark:bg-gray-900/70">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div 
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-['Poppins'] font-bold mb-4">
            Animation <span className="text-primary">Portfolio</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
            Browse my complete collection of animations across different styles and techniques
          </p>
        </motion.div>
        
        <motion.div 
          className="flex flex-wrap justify-center gap-3 mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              className={`px-4 py-2 rounded-full font-medium text-sm transition-colors ${
                selectedCategory === category
                  ? "bg-primary text-white"
                  : "bg-gray-200 dark:bg-gray-700 hover:bg-primary hover:text-white"
              }`}
              onClick={() => setSelectedCategory(category)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>
        
        <AnimatePresence mode="wait">
          <motion.div 
            key={selectedCategory}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0 }}
          >
            {isLoading ? (
              // Skeleton loaders
              Array.from({ length: 8 }).map((_, i) => (
                <motion.div 
                  key={i}
                  variants={itemVariants}
                  className="bg-gray-100 dark:bg-gray-800 rounded-lg h-64 animate-pulse"
                />
              ))
            ) : (
              filteredVideos.slice(0, visibleCount).map((video) => (
                <motion.div key={video.id} variants={itemVariants}>
                  <VideoCard
                    title={video.title}
                    thumbnailUrl={video.thumbnailUrl}
                    category={video.category}
                    duration={video.duration}
                    videoId={video.videoId}
                    onClick={handleVideoClick}
                  />
                </motion.div>
              ))
            )}
          </motion.div>
        </AnimatePresence>
        
        {!isLoading && filteredVideos.length > visibleCount && (
          <motion.div 
            className="text-center mt-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.button
              className="px-6 py-3 bg-gray-200 dark:bg-gray-700 rounded-md font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              onClick={loadMore}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Load More
            </motion.button>
          </motion.div>
        )}
      </div>

      {/* Video Modal */}
      {selectedVideoId && (
        <motion.div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeModal}
        >
          <motion.div 
            className="w-full max-w-4xl aspect-video bg-black rounded-lg overflow-hidden"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
            onClick={(e) => e.stopPropagation()}
          >
            <iframe 
              src={`https://www.youtube.com/embed/${selectedVideoId}?autoplay=1&rel=0`}
              title="YouTube video player"
              className="w-full h-full"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}
