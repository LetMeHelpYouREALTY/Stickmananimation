'use client';

import { useState } from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import type { Video } from "@shared/schema";
import VideoCard from "../ui/VideoCard";
import { siteConfig } from "@/config/site";
import { FaArrowRight } from "react-icons/fa";

export default function Shorts() {
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);

  const { data: shorts = [], isLoading } = useQuery<Video[]>({
    queryKey: ["/api/videos/shorts"],
    staleTime: 60 * 60 * 1000,
  });

  const closeModal = () => setSelectedVideoId(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section id="shorts" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-['Poppins'] font-bold mb-4">
            Latest <span className="text-primary">Shorts</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Quick, bite-sized animation moments from {siteConfig.youtube.handle}.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {isLoading ? (
            Array.from({ length: 8 }).map((_, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="bg-white/70 dark:bg-gray-900/40 rounded-xl h-80 animate-pulse"
              />
            ))
          ) : shorts.length > 0 ? (
            shorts.slice(0, 12).map((video) => (
              <motion.div key={video.id} variants={itemVariants}>
                <VideoCard
                  title={video.title}
                  description={video.description || ""}
                  thumbnailUrl={video.thumbnailUrl}
                  category="Shorts"
                  duration={video.duration}
                  videoId={video.videoId}
                  featured={false}
                  onClick={(id) => setSelectedVideoId(id)}
                />
              </motion.div>
            ))
          ) : (
            <motion.div variants={itemVariants} className="col-span-full text-center py-10">
              <p className="text-gray-500 dark:text-gray-400">No Shorts found yet.</p>
            </motion.div>
          )}
        </motion.div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <motion.a
            href={siteConfig.youtube.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-6 py-3 bg-primary text-white font-semibold rounded-md shadow-md hover:shadow-lg transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Watch more on YouTube
            <FaArrowRight className="ml-2" />
          </motion.a>
        </motion.div>
      </div>

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
              title="YouTube Shorts player"
              className="w-full h-full"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}

