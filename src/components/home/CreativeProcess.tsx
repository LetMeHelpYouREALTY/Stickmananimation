'use client';

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FaYoutube, FaFilm, FaPlay, FaThumbsUp, FaBell, FaUsers, FaVideo, FaShare } from "react-icons/fa";
import { getLongestVideo } from "../../lib/youtube";
import { getFeaturedVideos } from "../../lib/youtube";
import { getVideosByCategory } from "../../lib/youtube";
import { useQuery } from "@tanstack/react-query";

export default function CreativeProcess() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  
  // Define valid series keys
  type SeriesKey = 'stickman' | 'shorts' | 'tutorials';
  const [selectedSeries, setSelectedSeries] = useState<SeriesKey>("stickman");
  
  // Fetch the longest video for featured example
  const { data: longestVideo, isLoading: longestLoading } = useQuery({
    queryKey: ['/api/videos/longest'],
    queryFn: getLongestVideo
  });

  // Fetch featured videos
  const { data: featuredVideos, isLoading: featuredLoading } = useQuery({
    queryKey: ['/api/videos/featured'],
    queryFn: getFeaturedVideos
  });

  // Define types for animation series
  type AnimationVariant = {
    hidden: { opacity: number; x?: number; y?: number; };
    visible: { opacity: number; x?: number; y?: number; transition: { duration: number; }; };
  };

  type SeriesItem = {
    title: string;
    icon: React.ReactNode;
    description: string;
    features: string[];
    animation: AnimationVariant;
  };

  // Define record with specific keys
  type AnimationSeries = Record<SeriesKey, SeriesItem>;

  // Animation series data
  const animationSeries: AnimationSeries = {
    stickman: {
      title: "Stickman Epic Legends",
      icon: <FaUsers className="text-3xl text-primary" />,
      description: "Follow the adventures of Stickman on Animation Island, showcasing action-packed sequences, comedic storytelling, and fluid character motion.",
      features: ["Action Sequences", "Epic Battles", "Character Development", "Storyline Arcs"],
      animation: {
        hidden: { opacity: 0, x: -50 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
      }
    },
    shorts: {
      title: "Animation Shorts",
      icon: <FaVideo className="text-3xl text-primary" />,
      description: "Quick and engaging animated content that delivers humor and creativity in bite-sized videos perfect for social media.",
      features: ["Quick Stories", "Visual Humor", "Experimental Animation", "Trending Topics"],
      animation: {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
      }
    },
    tutorials: {
      title: "Animation Tutorials",
      icon: <FaFilm className="text-3xl text-primary" />,
      description: "Learn the techniques behind my animation process as I break down how to create compelling animated content.",
      features: ["Step-by-Step Guides", "Technical Tips", "Industry Insights", "Software Tutorials"],
      animation: {
        hidden: { opacity: 0, x: 50 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
      }
    }
  };

  // Channel highlights
  const channelHighlights = [
    { title: "Subscribers", value: "100K+", icon: <FaUsers className="text-2xl text-primary" /> },
    { title: "Videos", value: "30+", icon: <FaVideo className="text-2xl text-primary" /> },
    { title: "Total Views", value: "1M+", icon: <FaPlay className="text-2xl text-primary" /> },
    { title: "Likes", value: "50K+", icon: <FaThumbsUp className="text-2xl text-primary" /> }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section id="process" className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800" ref={sectionRef}>
      <div className="container mx-auto px-4 md:px-6">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl md:text-4xl font-['Poppins'] font-bold mb-4">
            Explore My <span className="text-primary">Channel</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Discover the world of "Stickman Epic Legends" and more engaging animated content on my YouTube channel
          </p>
        </motion.div>

        {/* Channel Stats */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {channelHighlights.map((stat, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 text-center"
            >
              <div className="flex justify-center mb-2">{stat.icon}</div>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200">{stat.value}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">{stat.title}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Animation Series Tabs */}
        <motion.div 
          className="mb-10 flex flex-wrap justify-center gap-2"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {Object.entries(animationSeries).map(([key, series]) => (
            <button
              key={key}
              onClick={() => setSelectedSeries(key as SeriesKey)}
              className={`px-5 py-3 rounded-full flex items-center gap-2 font-medium transition-all ${
                selectedSeries === key 
                  ? "bg-primary text-white shadow-lg" 
                  : "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200"
              }`}
            >
              {series.icon}
              <span>{series.title}</span>
            </button>
          ))}
        </motion.div>

        {/* Selected Series Details */}
        <motion.div 
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <div className="p-8 md:p-10">
            <motion.div
              key={selectedSeries}
              initial="hidden"
              animate="visible"
              variants={animationSeries[selectedSeries].animation}
              className="text-center"
            >
              <div className="flex items-center justify-center gap-3 mb-4">
                {animationSeries[selectedSeries].icon}
                <h3 className="text-2xl font-['Poppins'] font-bold">{animationSeries[selectedSeries].title}</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-3xl mx-auto">
                {animationSeries[selectedSeries].description}
              </p>
              <div>
                <h4 className="font-medium text-lg mb-3">What to Expect</h4>
                <div className="flex flex-wrap gap-2 justify-center">
                  {animationSeries[selectedSeries].features.map((feature: string, index: number) => (
                    <span 
                      key={index} 
                      className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
              
              <motion.a
                href="https://www.youtube.com/@genekellyboyle?sub_confirmation=1"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full font-medium shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaYoutube className="text-xl" />
                Subscribe to Channel
              </motion.a>
            </motion.div>
          </div>
        </motion.div>

        {/* Featured Videos Grid */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-['Poppins'] font-bold flex items-center gap-2">
              <FaFilm className="text-primary" />
              Featured Videos
            </h3>
            <a 
              href="https://www.youtube.com/@genekellyboyle/videos" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:underline font-medium flex items-center gap-1"
            >
              View All <span className="text-xl">→</span>
            </a>
          </div>
          
          {featuredLoading ? (
            <div className="h-64 flex items-center justify-center">
              <div className="w-10 h-10 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
            </div>
          ) : featuredVideos && featuredVideos.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredVideos.slice(0, 3).map((video) => (
                <motion.div 
                  key={video.id}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden"
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <div className="aspect-video bg-gray-200 dark:bg-gray-700 relative group">
                    <img 
                      src={video.thumbnailUrl} 
                      alt={video.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <a 
                        href={`https://www.youtube.com/watch?v=${video.videoId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-red-600 text-white p-3 rounded-full"
                      >
                        <FaPlay />
                      </a>
                    </div>
                  </div>
                  <div className="p-4">
                    <h4 className="font-medium text-gray-800 dark:text-gray-200 line-clamp-1">{video.title}</h4>
                    
                    {video.description && (
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2 h-8 overflow-hidden">
                        {video.description.split(/\r?\n/)[0]}
                      </p>
                    )}
                    
                    <div className="flex justify-between items-center mt-2">
                      <div className="flex items-center gap-1">
                        <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">{video.category}</span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">{video.duration}</span>
                      </div>
                      <div className="flex gap-2">
                        <a 
                          href={`https://www.youtube.com/watch?v=${video.videoId}`}
                          target="_blank"
                          rel="noopener noreferrer" 
                          className="text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-500"
                          title="Watch"
                        >
                          <FaPlay size={14} />
                        </a>
                        <a 
                          href={`https://www.youtube.com/watch?v=${video.videoId}&sub_confirmation=1`}
                          target="_blank"
                          rel="noopener noreferrer" 
                          className="text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-500"
                          title="Like and Subscribe"
                        >
                          <FaThumbsUp size={14} />
                        </a>
                        <a 
                          href={`https://twitter.com/intent/tweet?text=Check out this amazing animation by @gkanimates&url=https://www.youtube.com/watch?v=${video.videoId}`}
                          target="_blank"
                          rel="noopener noreferrer" 
                          className="text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-500"
                          title="Share"
                        >
                          <FaShare size={14} />
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="bg-yellow-100 dark:bg-yellow-900/20 p-6 rounded-xl text-yellow-800 dark:text-yellow-200 text-center">
              No featured videos found. Check back later for more content!
            </div>
          )}
        </motion.div>
        
        {/* Call to Action */}
        <motion.div 
          className="rounded-xl overflow-hidden relative"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.6 }}
        >
          <div className="bg-gradient-to-r from-primary to-primary/80 p-10 md:p-16 text-white text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">Join the Animation Journey!</h3>
            <p className="text-white/90 max-w-2xl mx-auto mb-8">
              Subscribe to my YouTube channel for regular uploads featuring the adventures of Stickman and more animated content. Don't miss out on future episodes!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="https://www.youtube.com/@genekellyboyle?sub_confirmation=1"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaYoutube className="text-xl" />
                Subscribe Now
              </motion.a>
              <motion.a
                href="https://www.youtube.com/@genekellyboyle/videos"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-lg font-medium backdrop-blur-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaFilm className="text-xl" />
                Watch Latest Videos
              </motion.a>
            </div>
            
            <div className="mt-8 flex items-center justify-center gap-4">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center text-white text-xs">
                  <FaBell />
                </div>
                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs">
                  <FaThumbsUp />
                </div>
                <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white text-xs">
                  <FaShare />
                </div>
              </div>
              <span className="text-sm text-white/80">Join 100K+ subscribers today!</span>
            </div>
          </div>
        </motion.div>
        
        {/* Featured Episode */}
        {!longestLoading && longestVideo && (
          <motion.div 
            className="mt-16"
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.7 }}
          >
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-['Poppins'] font-bold flex items-center gap-2">
                <FaFilm className="text-primary" />
                Featured Episode
              </h3>
              <a 
                href="https://www.youtube.com/@genekellyboyle/videos" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline font-medium flex items-center gap-1"
              >
                Watch Series <span className="text-xl">→</span>
              </a>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="aspect-video bg-gray-100 dark:bg-gray-900 relative group">
                  <iframe
                    src={`https://www.youtube.com/embed/${longestVideo.videoId}?rel=0`}
                    title={longestVideo.title}
                    className="absolute inset-0 w-full h-full"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
                <div className="p-6 md:p-8 flex flex-col">
                  {/* Episode badge */}
                  <div className="mb-3">
                    <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                      {longestVideo.title.includes("Ep") ? 
                        longestVideo.title.match(/Ep\.?\s*\d+/i)?.[0] || "Latest Episode" : 
                        "Featured Video"
                      }
                    </span>
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-xl md:text-2xl font-['Poppins'] font-bold mb-2">
                    {longestVideo.title}
                  </h3>
                  
                  {/* Meta info */}
                  <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400 mb-4">
                    <span className="flex items-center gap-1">
                      <FaVideo size={14} className="text-primary" /> {longestVideo.category}
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-1 h-1 rounded-full bg-gray-400"></span> {longestVideo.duration}
                    </span>
                  </div>
                  
                  {/* Description */}
                  {longestVideo.description && (
                    <div className="mb-6 flex-grow">
                      <div className="text-gray-600 dark:text-gray-400 text-sm space-y-3 md:pr-4">
                        {longestVideo.description.split(/\r?\n/).slice(0, 2).map((line, idx) => (
                          <p key={idx} className={idx === 0 ? "font-medium text-gray-800 dark:text-gray-200" : ""}>
                            {line}
                          </p>
                        ))}
                        {longestVideo.description.split(/\r?\n/).length > 2 && (
                          <button 
                            className="text-primary hover:underline text-xs font-medium mt-1 flex items-center"
                            onClick={() => window.open(`https://www.youtube.com/watch?v=${longestVideo.videoId}`, '_blank')}
                          >
                            Read full description on YouTube <span className="ml-1">→</span>
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                  
                  {/* Action buttons */}
                  <div className="flex flex-wrap gap-3 mt-auto">
                    <a 
                      href={`https://www.youtube.com/watch?v=${longestVideo.videoId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
                    >
                      <FaPlay /> Watch Now
                    </a>
                    <a 
                      href={`https://www.youtube.com/watch?v=${longestVideo.videoId}&sub_confirmation=1`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-lg text-sm font-medium"
                    >
                      <FaThumbsUp /> Like
                    </a>
                    <a 
                      href={`https://twitter.com/intent/tweet?text=Check out this amazing animation by @gkanimates&url=https://www.youtube.com/watch?v=${longestVideo.videoId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-lg text-sm font-medium"
                    >
                      <FaShare /> Share
                    </a>
                  </div>
                </div>
              </div>
              
              {/* Episode navigation */}
              <div className="bg-gray-50 dark:bg-gray-750 p-4 flex justify-between items-center border-t border-gray-100 dark:border-gray-700">
                <div className="text-sm">
                  <span className="text-primary font-medium">Stickman Epic Legends</span>
                  <span className="text-gray-500 dark:text-gray-400 ml-2">Action Animation Series</span>
                </div>
                <div className="flex gap-2">
                  <a 
                    href="https://www.youtube.com/playlist?list=PL66XQNBh4vSUNPRkJnB6RJHLL6nOOH9NB" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:underline font-medium"
                  >
                    View All Episodes
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
