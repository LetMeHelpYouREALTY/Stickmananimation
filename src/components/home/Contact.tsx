'use client';

import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { apiRequest } from "../../lib/queryClient";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "../../hooks/use-toast";
import { FaEnvelope, FaYoutube, FaInstagram, FaTwitter } from "react-icons/fa";

// Form schema validation
const subscribeSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Please enter a valid email"),
  consent: z.boolean().refine(val => val === true, {
    message: "You must agree to receive emails",
  }),
});

type SubscribeFormData = z.infer<typeof subscribeSchema>;

export default function Contact() {
  const { toast } = useToast();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<SubscribeFormData>({
    resolver: zodResolver(subscribeSchema),
    defaultValues: {
      name: "",
      email: "",
      consent: false,
    },
  });

  // Contact information
  const contactInfo = [
    { icon: <FaEnvelope />, title: "Email", value: "genekellyboyle@gmail.com", href: "mailto:genekellyboyle@gmail.com" },
    { icon: <FaYoutube />, title: "YouTube", value: "@genekellyboyle", href: "https://www.youtube.com/@genekellyboyle" },
  ];

  // Mutation for newsletter subscription
  const subscribeToNewsletter = useMutation({
    mutationFn: (data: SubscribeFormData) => {
      return apiRequest("POST", "/api/newsletter/subscribe", data);
    },
    onSuccess: () => {
      toast({
        title: "Subscription successful!",
        description: "Thank you for subscribing to our newsletter.",
      });
      reset();
    },
    onError: (error) => {
      toast({
        title: "Subscription failed",
        description: error instanceof Error ? error.message : "Something went wrong, please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: SubscribeFormData) => {
    subscribeToNewsletter.mutate(data);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
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
    <section id="contact" className="py-20 bg-primary text-white">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Newsletter */}
          <motion.div variants={itemVariants}>
            <h2 className="text-3xl font-['Poppins'] font-bold mb-4">Join My Newsletter</h2>
            <p className="mb-6 opacity-90">
              Get exclusive behind-the-scenes content, animation tips, and updates on my latest projects.
            </p>
            
            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">Name</label>
                <input 
                  type="text" 
                  id="name" 
                  className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-white text-white" 
                  placeholder="Your name"
                  {...register("name")}
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-300">{errors.name.message}</p>
                )}
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-white text-white" 
                  placeholder="your@email.com"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-300">{errors.email.message}</p>
                )}
              </div>
              <div className="flex items-center">
                <input 
                  type="checkbox" 
                  id="consent" 
                  className="mr-2"
                  {...register("consent")} 
                />
                <label htmlFor="consent" className="text-sm">
                  I agree to receive email updates about new animations and content
                </label>
              </div>
              {errors.consent && (
                <p className="mt-1 text-sm text-red-300">{errors.consent.message}</p>
              )}
              <motion.button 
                type="submit" 
                className="px-6 py-3 bg-white text-primary font-semibold rounded-md hover:bg-gray-100 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={subscribeToNewsletter.isPending}
              >
                {subscribeToNewsletter.isPending ? "Subscribing..." : "Subscribe"}
              </motion.button>
            </form>
          </motion.div>
          
          {/* Contact */}
          <motion.div variants={itemVariants}>
            <h2 className="text-3xl font-['Poppins'] font-bold mb-4">Let's Connect</h2>
            <p className="mb-6 opacity-90">
              If you're passionate about animation, digital storytelling, or innovative content creation, I'd love to chat! Check out my work and let's discuss how we can push the boundaries of digital animation together.
            </p>
            
            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <motion.div 
                  key={index}
                  className="flex items-center"
                  variants={itemVariants}
                >
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mr-4">
                    {info.icon}
                  </div>
                  <div>
                    <h4 className="font-medium">{info.title}</h4>
                    <a 
                      href={info.href} 
                      className="opacity-90 hover:opacity-100"
                      target={info.title === "Email" ? "_self" : "_blank"}
                      rel="noopener noreferrer"
                    >
                      {info.value}
                    </a>
                  </div>
                </motion.div>
              ))}
              
              <motion.div 
                className="mt-8 pt-6 border-t border-white/20"
                variants={itemVariants}
              >
                <h4 className="font-medium mb-3">Find me online</h4>
                <div className="flex flex-wrap gap-2">
                  {["#DigitalAnimation", "#YouTubeCreator", "#IndependentAnimator", "#StickFigureAnimation", "#VisualStorytelling"].map((tag, i) => (
                    <span key={i} className="px-3 py-1 bg-white/10 rounded-full text-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
