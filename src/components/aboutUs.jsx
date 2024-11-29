import React from "react";
import { motion } from "framer-motion";
import { fadeIn } from "./variants";

export default function AboutUs() {
  return (
    <div className="flex flex-col items-center justify-center mt-5" id="about">
      {/* Creative Heading */}
      <motion.h1 
      variants={fadeIn('up', 0.2)}
      initial = 'hidden'
      whileInView={'show'}
      viewport={{once: false, amount: 0.7}}
      className="text-4xl md:text-6xl font-bold text-gray-800 tracking-wide relative w-full flex justify-center">
        <span className="block relative z-10">
          About <span className="text-amber-500">Us</span>
        </span>
        <span className="absolute top-1 left-1 -z-10 w-full h-full text-gray-300 transform scale-105 blur-sm flex justify-center">
          ABOUT US
        </span>
      </motion.h1>

      {/* Decorative Subheading */}
      <motion.p 
      variants={fadeIn('up', 0.2)}
      initial = 'hidden'
      whileInView={'show'}
      viewport={{once: false, amount: 0.7}}
      className="mt-4 text-gray-600 text-sm md:text-xl p-3 text-center max-w-2xl md:max-w-full">
        We are passionate about creating unforgettable experiences for our guests. Discover our story, values, and what makes us unique.
      </motion.p>
    </div>
  );
}
