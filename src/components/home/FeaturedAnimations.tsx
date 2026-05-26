'use client';

import { useState } from "react";
import { motion } from "framer-motion";
import VideoCard from "../ui/VideoCard";
import { useQuery } from "@tanstack/react-query";
import { FaArrowRight } from "react-icons/fa";
import type { Video } from "@shared/schema";
import { siteConfig } from "@/config/site";

export default function FeaturedAnimations() {
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);
  
  const { data: featuredVideos, isLoading } = useQuery<Video[]>({ 
    queryKey: ["/api/videos/featured"],
    staleTime: 60 * 60 * 1000, // 1 hour
  });

  const handleVideoClick = (videoId: string) => {
    setSelectedVideoId(videoId);
  };

  const closeModal = () => {
    setSelectedVideoId(null);
  };

  // Animation variants for container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  // Animation variants for items
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section id="featured" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-['Poppins'] font-bold mb-4">
            Featured <span className="text-primary">Animations</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
            My most impactful and creative works showcasing a range of styles and techniques
          </p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {isLoading ? (
            // Skeleton loaders
            Array.from({ length: 8 }).map((_, i) => (
              <motion.div 
                key={i}
                variants={itemVariants}
                className="bg-gray-100 dark:bg-gray-800 rounded-xl h-80 animate-pulse"
              />
            ))
          ) : (
            featuredVideos && featuredVideos.length > 0 ? (
              featuredVideos.map((video, index) => (
                <motion.div key={video.id} variants={itemVariants}>
                  <VideoCard
                    title={video.title}
                    description={video.description || ""}
                    thumbnailUrl={video.thumbnailUrl}
                    category={video.category}
                    duration={video.duration}
                    videoId={video.videoId}
                    featured={true}
                    onClick={handleVideoClick}
                  />
                </motion.div>
              ))
            ) : (
              <motion.div variants={itemVariants} className="col-span-full text-center py-12">
                <p className="text-gray-500 dark:text-gray-400">No featured videos available</p>
              </motion.div>
            )
          )}
        </motion.div>
        
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <motion.a
              href="#portfolio"
              className="inline-flex items-center justify-center px-6 py-3 bg-primary text-white font-semibold rounded-md shadow-md hover:shadow-lg transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Full Portfolio
              <FaArrowRight className="ml-2" />
            </motion.a>
            <motion.a
              href={siteConfig.youtube.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white font-semibold rounded-md shadow-sm hover:shadow-md transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View on YouTube
              <FaArrowRight className="ml-2" />
            </motion.a>
          </div>
        </motion.div>
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
