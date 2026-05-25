'use client';

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FaPlay, FaYoutube, FaBell, FaThumbsUp, FaStar, FaFilm, FaUserFriends, FaEnvelope, FaShare } from "react-icons/fa";

interface SeriesInfoProps {
  title: string;
  description: string;
  episodes: number;
  releaseFrequency: string;
  categories: string[];
}

const seriesInfo: SeriesInfoProps = {
  title: "Stickman Epic Legends",
  description: "Join Stickman on Animation Island in this action-packed animated series featuring epic battles, comedic moments, and an engaging storyline that follows our hero's adventures against various villains.",
  episodes: 10,
  releaseFrequency: "New episodes monthly",
  categories: ["Action", "Comedy", "Adventure", "Animation"]
};

interface MilestoneProps {
  year: string;
  event: string;
  highlight?: boolean;
  subscribers?: string;
}

const channelMilestones: MilestoneProps[] = [
  { year: "2020", event: "Launched the first episode of Stickman Epic Legends", highlight: true, subscribers: "500+" },
  { year: "2021", event: "Reached 10,000 subscribers milestone", highlight: true, subscribers: "10K+" },
  { year: "2022", event: "Released \"The Epic Battle\" (most viewed episode)", highlight: true, subscribers: "50K+" },
  { year: "2023", event: "Surpassed 1 million total channel views", highlight: true, subscribers: "75K+" },
  { year: "Present", event: "Posting new animations twice monthly", subscribers: "100K+" },
];

function Milestone({ year, event, highlight, subscribers }: MilestoneProps) {
  return (
    <div className="relative flex flex-col md:flex-row gap-2 md:gap-6 group p-4 rounded-lg hover:bg-gray-100/50 dark:hover:bg-gray-800/50 transition-colors">
      <div className="flex-shrink-0 font-bold text-primary text-lg mb-1 md:mb-0 md:w-24">{year}</div>
      <div className="flex-1">
        <div className={`${highlight ? "font-medium text-gray-800 dark:text-gray-200 text-lg" : "text-gray-700 dark:text-gray-300"}`}>
          {event}
          {highlight && (
            <span className="inline-block ml-2 text-yellow-500">
              <FaStar className="inline-block transform group-hover:rotate-12 transition-transform" />
            </span>
          )}
        </div>
        {subscribers && (
          <div className="mt-1 flex items-center gap-1.5 text-gray-500 dark:text-gray-400 text-sm">
            <FaUserFriends className="text-red-500" size={14} />
            <span>{subscribers} subscribers</span>
          </div>
        )}
      </div>
      {highlight && (
        <div className="absolute -right-1 top-0 h-full w-1 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
      )}
    </div>
  );
}

export default function About() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  
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
    <section id="about" className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800" ref={sectionRef}>
      <div className="container mx-auto px-4 md:px-6">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl md:text-4xl font-['Poppins'] font-bold mb-2">
            Meet the <span className="text-primary">Creator</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            The creative mind behind Stickman Epic Legends and other animated adventures
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Creator Profile Section */}
          <motion.div 
            className="relative order-2 lg:order-1"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
              <div className="p-6 md:p-8">
                <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
                  {/* Profile Image */}
                  <div className="relative w-40 h-40 md:w-48 md:h-48 flex-shrink-0">
                    <div className="absolute inset-0 bg-primary/10 rounded-full"></div>
                    <img 
                      src="/src/channels4_profile (2).jpg" 
                      alt="GK Animates Logo" 
                      className="relative z-10 rounded-full w-36 h-36 md:w-44 md:h-44 object-cover border-4 border-white dark:border-gray-700 shadow-md"
                    />
                    
                    {/* YouTube Badge */}
                    <motion.a 
                      href="https://www.youtube.com/@genekellyboyle?sub_confirmation=1"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute -bottom-2 -right-2 bg-red-600 text-white p-2 rounded-full shadow-lg z-20"
                      initial={{ scale: 0.8 }}
                      animate={{ scale: [0.8, 1.1, 1] }}
                      transition={{ duration: 0.5, delay: 0.8 }}
                      whileHover={{ scale: 1.2 }}
                    >
                      <FaYoutube size={20} />
                    </motion.a>
                  </div>
                  
                  {/* Creator Info */}
                  <div className="text-center md:text-left">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Gene Kelly Boyle</h3>
                    <p className="text-primary font-medium">Animator & Digital Storyteller</p>
                    
                    <div className="mt-4 space-y-2">
                      <div className="flex items-center justify-center md:justify-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <FaUserFriends className="text-primary" />
                        <span>100K+ subscribers & growing</span>
                      </div>
                      <div className="flex items-center justify-center md:justify-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <FaFilm className="text-primary" />
                        <span>Creator of "Stickman Epic Legends"</span>
                      </div>
                      <div className="flex items-center justify-center md:justify-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <FaPlay className="text-primary" />
                        <span>New animations biweekly</span>
                      </div>
                    </div>
                    
                    <div className="mt-6 flex flex-wrap gap-3 justify-center md:justify-start">
                      <motion.a
                        href="https://www.youtube.com/@genekellyboyle?sub_confirmation=1"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <FaYoutube /> Subscribe Now
                      </motion.a>
                      <motion.a
                        href="https://www.youtube.com/@genekellyboyle/videos"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-lg text-sm font-medium"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <FaPlay /> Watch Videos
                      </motion.a>
                    </div>
                  </div>
                </div>
                
                {/* Creator Bio */}
                <div className="mt-8 space-y-4">
                  <p className="text-gray-600 dark:text-gray-400">
                    I'm passionate about pushing the boundaries of digital animation and storytelling. My channel combines dynamic action sequences, comedic storytelling, and cinematic techniques to create engaging animated content.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 dark:bg-gray-700/30 p-4 rounded-lg">
                      <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Animation Skills</h4>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs">2D Animation</span>
                        <span className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs">Character Design</span>
                        <span className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs">Storyboarding</span>
                        <span className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs">Digital Storytelling</span>
                        <span className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs">Video Editing</span>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 dark:bg-gray-700/30 p-4 rounded-lg">
                      <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Why Subscribe?</h4>
                      <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                        <li className="flex items-start gap-2">
                          <span className="text-primary mt-0.5">•</span>
                          <span>Fresh animations twice monthly</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary mt-0.5">•</span>
                          <span>Unique animated storytelling</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary mt-0.5">•</span>
                          <span>Join an active community</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Social Links */}
              <div className="bg-gray-50 dark:bg-gray-750 p-4 flex flex-wrap justify-between items-center border-t border-gray-100 dark:border-gray-700">
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Creator since 2020
                </div>
                <div className="flex gap-3">
                  <a 
                    href="https://www.youtube.com/@genekellyboyle"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-500"
                    title="YouTube"
                  >
                    <FaYoutube size={18} />
                  </a>
                  <a 
                    href="mailto:genekellyboyle@gmail.com"
                    className="text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-500"
                    title="Email"
                  >
                    <FaEnvelope size={18} />
                  </a>
                  <a 
                    href="https://twitter.com/intent/tweet?text=Check%20out%20this%20amazing%20animation%20channel%20by%20@gkanimates"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-blue-400 dark:text-gray-400 dark:hover:text-blue-400"
                    title="Share"
                  >
                    <FaShare size={18} />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Series Information */}
          <motion.div 
            className="order-1 lg:order-2"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <motion.div variants={itemVariants} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
              <div className="p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <FaFilm className="text-primary" size={20} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">{seriesInfo.title}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Animated Series • {seriesInfo.episodes} Episodes</p>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <p className="text-gray-600 dark:text-gray-400">
                    {seriesInfo.description}
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-gray-100 text-sm mb-2">Release Schedule</h4>
                      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                        <FaBell className="text-red-500" />
                        <span>{seriesInfo.releaseFrequency}</span>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-gray-100 text-sm mb-2">Categories</h4>
                      <div className="flex flex-wrap gap-1">
                        {seriesInfo.categories.map((category, index) => (
                          <span key={index} className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs">
                            {category}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-3">Channel Milestones</h4>
                    <div className="space-y-1 max-h-[250px] overflow-y-auto pr-2">
                      {channelMilestones.map((milestone, index) => (
                        <Milestone
                          key={index}
                          year={milestone.year}
                          event={milestone.event}
                          highlight={milestone.highlight}
                          subscribers={milestone.subscribers}
                        />
                      ))}
                    </div>
                  </div>
                  
                  <div className="pt-2">
                    <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-3">What Viewers Say</h4>
                    <div className="bg-gray-50 dark:bg-gray-700/30 p-4 rounded-lg italic text-gray-600 dark:text-gray-300 text-sm relative">
                      <div className="absolute -top-2 -left-2 text-primary text-opacity-20 text-4xl">"</div>
                      <div className="relative z-10">
                        Love the fluid animation style and creative storytelling! The battle scenes are epic and the comedy always makes me laugh. Can't wait for the next episode!
                      </div>
                      <div className="mt-3 flex items-center gap-2">
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <FaStar key={star} className="text-yellow-500" size={12} />
                          ))}
                        </div>
                        <span className="text-xs font-medium">YouTube Subscriber</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* CTA Footer */}
              <div className="bg-gradient-to-r from-primary to-primary/80 p-5 flex flex-col sm:flex-row justify-between items-center">
                <p className="text-white text-sm mb-4 sm:mb-0">
                  Join thousands of animation fans and subscribe today!
                </p>
                <div className="flex gap-2">
                  <motion.a
                    href="https://www.youtube.com/@genekellyboyle?sub_confirmation=1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-lg text-sm font-medium"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaYoutube /> Subscribe
                  </motion.a>
                  <motion.a
                    href="https://www.youtube.com/@genekellyboyle/videos"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 bg-white/20 hover:bg-white/30 text-white px-3 py-1.5 rounded-lg text-sm font-medium"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaThumbsUp /> Support
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
