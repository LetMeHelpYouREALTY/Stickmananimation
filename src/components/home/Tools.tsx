'use client';

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { 
  FaCode, 
  FaDesktop, 
  FaLaptop, 
  FaTabletAlt, 
  FaCamera, 
  FaHdd,
  FaPlay,
  FaYoutube,
  FaQuestion,
  FaChalkboardTeacher,
  FaLightbulb,
  FaExternalLinkAlt
} from "react-icons/fa";

interface SoftwareTool {
  name: string;
  level: number;
  icon: string;
  description: string;
  relatedVideoId?: string;
  videoTitle?: string;
}

// Software tools with skill level
const softwareTools: SoftwareTool[] = [
  { 
    name: "Adobe After Effects", 
    level: 95, 
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/aftereffects/aftereffects-plain.svg",
    description: "Primary software for animation effects, compositing, and motion graphics",
    relatedVideoId: "lQKyi1eoOhk",
    videoTitle: "How I create special effects with After Effects"
  },
  { 
    name: "Blender", 
    level: 80, 
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/blender/blender-original.svg",
    description: "3D modeling, animation, and rendering for more complex scenes",
    relatedVideoId: "1Dc65Fy5LHw",
    videoTitle: "Blender Animation Techniques"
  },
  { 
    name: "Cinema 4D", 
    level: 85, 
    icon: "https://cdn.cdnlogo.com/logos/c/40/cinema-4d.svg",
    description: "Used for complex 3D elements and background environments",
    relatedVideoId: "fJMwTdLBXLs",
    videoTitle: "Creating Epic 3D Backgrounds"
  },
  { 
    name: "ToonBoom Harmony", 
    level: 90, 
    icon: "https://www.toonboom.com/sites/default/files/logos/Harmony-icon-light.svg",
    description: "Professional 2D animation software for character animation",
    relatedVideoId: "A69p56AOkT0",
    videoTitle: "Character Animation Process"
  },
  { 
    name: "Adobe Photoshop", 
    level: 88, 
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-plain.svg",
    description: "Creating textures, backgrounds, and editing frame sequences",
    relatedVideoId: "lQKyi1eoOhk",
    videoTitle: "Creating Textures for Animation"
  },
];

interface HardwareTool {
  name: string;
  description: string;
  icon: JSX.Element;
  showInAction?: string;
  role: string;
}

// Hardware tools
const hardwareTools: HardwareTool[] = [
  { 
    name: "Custom Built Workstation", 
    description: "32GB RAM, RTX 3080, i9 Processor", 
    icon: <FaLaptop />,
    showInAction: "https://www.youtube.com/@genekellyboyle/videos",
    role: "Powers all rendering and animation processing"
  },
  { 
    name: "Wacom Cintiq Pro 24", 
    description: "Drawing tablet with screen", 
    icon: <FaTabletAlt />,
    showInAction: "https://www.youtube.com/@genekellyboyle/videos",
    role: "For frame-by-frame animation and detailed character work"
  },
  { 
    name: "DSLR Camera Setup", 
    description: "For reference footage and stop motion", 
    icon: <FaCamera />,
    showInAction: "https://www.youtube.com/@genekellyboyle/videos",
    role: "Captures reference material and textures for animations"
  },
  { 
    name: "Storage Solution", 
    description: "24TB RAID setup for project files", 
    icon: <FaHdd />,
    role: "Stores all animation projects and source files"
  },
];

interface TutorialTopic {
  title: string;
  description: string;
  icon: JSX.Element;
  videoId?: string;
}

// Tutorial topics that viewers would be interested in
const tutorialTopics: TutorialTopic[] = [
  {
    title: "Character Animation",
    description: "Learn how I create fluid character movements in my animations",
    icon: <FaChalkboardTeacher />,
    videoId: "A69p56AOkT0"
  },
  {
    title: "Special Effects",
    description: "Discover the techniques behind my animation special effects",
    icon: <FaLightbulb />,
    videoId: "lQKyi1eoOhk"
  },
  {
    title: "Animation Workflow",
    description: "My complete process from concept to final render",
    icon: <FaQuestion />,
    videoId: "fJMwTdLBXLs"
  }
];

export default function Tools() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1
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
    <section id="tools" className="py-20 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800" ref={sectionRef}>
      <div className="container mx-auto px-4 md:px-6">
        <motion.div 
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl md:text-4xl font-['Poppins'] font-bold mb-4">
            Behind The <span className="text-primary">Animation</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Discover the tools and techniques I use to create the animations on my YouTube channel
          </p>
        </motion.div>
        
        {/* Featured Tutorial CTA */}
        <motion.div 
          className="bg-gradient-to-r from-primary/90 to-primary rounded-xl shadow-lg overflow-hidden mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <div className="p-8 flex flex-col md:flex-row items-center">
            <div className="md:w-2/3 mb-6 md:mb-0 md:pr-8">
              <h3 className="text-white text-2xl font-bold mb-3">Want to learn animation?</h3>
              <p className="text-white/90 mb-4">
                I share my techniques, tips and behind-the-scenes looks at how I create my animations 
                on my YouTube channel. Subscribe to learn more about my animation process!
              </p>
              <div className="flex flex-wrap gap-3">
                <motion.a
                  href="https://www.youtube.com/@genekellyboyle?sub_confirmation=1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaYoutube size={18} /> Subscribe Now
                </motion.a>
                <motion.a
                  href="https://www.youtube.com/@genekellyboyle/videos"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white px-5 py-2.5 rounded-lg text-sm font-medium"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaPlay size={14} /> Watch Tutorials
                </motion.a>
              </div>
            </div>
            <div className="md:w-1/3 flex justify-center">
              <div className="relative w-40 h-40 md:w-48 md:h-48">
                <div className="absolute inset-0 bg-white/10 rounded-full animate-pulse"></div>
                <div className="absolute inset-2 bg-white/20 rounded-full"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <FaChalkboardTeacher className="text-white" size={64} />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Software */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden"
          >
            <div className="p-6">
              <h3 className="font-['Poppins'] font-semibold text-xl mb-6 flex items-center">
                <FaCode className="text-primary mr-3" />
                Animation Software
              </h3>
              
              <div className="space-y-6">
                {softwareTools.map((tool, index) => (
                  <motion.div 
                    key={index}
                    className="border border-gray-100 dark:border-gray-700 rounded-lg overflow-hidden"
                    variants={itemVariants}
                  >
                    <div className="flex items-center p-4">
                      <img src={tool.icon} alt={tool.name} className="w-10 h-10 mr-4" />
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 dark:text-gray-100">{tool.name}</h4>
                        <div className="mt-1 bg-gray-200 dark:bg-gray-700 h-2 rounded-full w-full">
                          <motion.div 
                            className="bg-primary h-full rounded-full"
                            initial={{ width: 0 }}
                            animate={isInView ? { width: `${tool.level}%` } : {}}
                            transition={{ duration: 1, delay: 0.3 + (index * 0.1) }}
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 dark:bg-gray-700/50 p-3 border-t border-gray-100 dark:border-gray-700">
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        {tool.description}
                      </p>
                      
                      {tool.relatedVideoId && (
                        <a 
                          href={`https://www.youtube.com/watch?v=${tool.relatedVideoId}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:text-primary/80"
                        >
                          <FaPlay size={10} /> See how I use it in my videos
                          <FaExternalLinkAlt size={8} className="ml-1" />
                        </a>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
          
          {/* Hardware */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden"
          >
            <div className="p-6">
              <h3 className="font-['Poppins'] font-semibold text-xl mb-6 flex items-center">
                <FaDesktop className="text-primary mr-3" />
                Animation Hardware
              </h3>
              
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-lg z-10"></div>
                <motion.img 
                  src="https://images.unsplash.com/photo-1593642533144-3d62aa4783ec" 
                  alt="Animation workspace" 
                  className="w-full rounded-lg h-56 object-cover"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.6 }}
                />
                <div className="absolute bottom-0 left-0 p-4 z-20">
                  <span className="text-white text-sm font-medium bg-primary/80 py-1 px-2 rounded">
                    My Animation Studio
                  </span>
                </div>
                <motion.div
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20"
                  whileHover={{ scale: 1.2 }}
                >
                  <a 
                    href="https://www.youtube.com/@genekellyboyle/videos" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-red-600 hover:bg-red-700 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg"
                  >
                    <FaPlay className="ml-1" />
                  </a>
                </motion.div>
              </div>
              
              <div className="space-y-3">
                {hardwareTools.map((tool, index) => (
                  <motion.div 
                    key={index}
                    className="p-3 bg-gray-50 dark:bg-gray-700/30 rounded-lg flex items-center"
                    variants={itemVariants}
                  >
                    <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      {tool.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-gray-100">{tool.name}</h4>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{tool.description}</p>
                        </div>
                        {tool.showInAction && (
                          <a 
                            href={tool.showInAction}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:text-primary/80 ml-2 flex-shrink-0"
                            title="See in action"
                          >
                            <FaExternalLinkAlt size={12} />
                          </a>
                        )}
                      </div>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 italic">
                        {tool.role}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Animation Techniques Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-10"
        >
          <h3 className="text-2xl font-['Poppins'] font-bold text-center mb-10">
            Learn Animation <span className="text-primary">Techniques</span>
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tutorialTopics.map((topic, index) => (
              <motion.div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                whileHover={{ y: -5 }}
              >
                <div className="p-6">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    {topic.icon}
                  </div>
                  <h4 className="text-lg font-semibold text-center mb-2">{topic.title}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 text-center mb-4">
                    {topic.description}
                  </p>
                  {topic.videoId && (
                    <div className="flex justify-center">
                      <motion.a
                        href={`https://www.youtube.com/watch?v=${topic.videoId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <FaPlay size={10} /> Watch Tutorial
                      </motion.a>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        {/* Subscribe CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-12"
        >
          <h3 className="text-lg font-medium mb-4 text-gray-700 dark:text-gray-300">
            Want to stay updated with my latest animation techniques and tutorials?
          </h3>
          <motion.a
            href="https://www.youtube.com/@genekellyboyle?sub_confirmation=1"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium shadow-md"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaYoutube size={20} /> Subscribe to My YouTube Channel
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
