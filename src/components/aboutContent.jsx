import React from "react";
import { motion } from "framer-motion";
import { fadeIn } from "./variants";

export default function AboutContent() {
  return (
    <div className="flex flex-col items-center justify-center py-7 px-4 mt-4 space-y-10">
      {/* Section 1: Our Vision */}
      <motion.div 
      variants={fadeIn('left', 0.5)}
      initial = 'hidden'
      whileInView={'show'}
      viewport={{once: false, amount: 0.7}}
      className="flex flex-col md:flex-row items-center justify-center w-[370px] md:w-[790px] lg:w-[950px] space-y-0">
        {/* Left Side: Image */}
        <div className="w-full md:w-1/2 flex justify-center mb-10 lg:mb-10 md:mb-20 group">
          <div className="relative w-80 h-80 md:w-96 md:h-96 overflow-hidden rounded-lg shadow-lg transform group-hover:rotate-3 group-hover:scale-105 transition-transform duration-500 lg:shadow-gray-400 hover:cursor-pointer group">
            <img
              src="https://lhimcvfirhvazhcgcvfm.supabase.co/storage/v1/object/sign/Images/8893.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJJbWFnZXMvODg5My5qcGciLCJpYXQiOjE3MzI4NTIwMjQsImV4cCI6MjM2MzU3MjAyNH0.dw_Wo3F05NepKcs0tH0LgTr0rp5aF97hPapAbWXfaF4&t=2024-11-29T03%3A47%3A02.517Z"
              alt="Our Vision"
              className="w-full h-full object-cover"
            />

            {/* Overlay with Text and Link */}
            <div className="absolute inset-0 bg-black/60 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <h2 className="text-white text-xl md:text-2xl font-bold mb-2">
                Our Vision
              </h2>
              <a
                href="/read-more"
                className="text-white text-sm md:text-base underline transition-colors duration-300"
              >
                <button className="p-3 bg-amber-400 font-semibold text-white hover:bg-transparent hover:text-amber-400 rounded-lg transition duration-300 hover:border-2 border-amber-400">Read More</button>
              </a>
            </div>
          </div>
        </div>

        {/* Right Side: Content */}
        <motion.div 
        variants={fadeIn('down', 0.3)}
        initial = 'hidden'
        whileInView={'show'}
        viewport={{once: false, amount: 0.4}}
        className="w-full md:w-1/2 p-4 lg:ml-0 md:ml-3 lg:p-6 flex flex-col items-center md:items-start group cursor-pointer hover:bg-amber-100 transition-colors duration-300">
          {/* Heading */}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 text-center md:text-left mb-4 group-hover:text-amber-500 transition-colors duration-300">
            Our Vision
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-gray-600 mb-4 text-center md:text-left max-w-3xl group-hover:text-gray-800 transition-colors duration-300">
            At EverPeak Lodge, we believe in creating unforgettable experiences
            that blend comfort with the beauty of nature. Our vision is to
            inspire guests with the perfect balance of relaxation and adventure
            while cherishing the environment that surrounds us.
          </p>

          {/* Our Values */}
          <div className="bg-gray-200 rounded-lg p-6 text-center md:text-left lg:shadow-lg lg:group-hover:shadow-gray-400 transition-shadow duration-300">
            <h3 className="text-xl font-semibold text-gray-700 mb-2 group-hover:text-amber-500">
              Our Values
            </h3>
            <ul className="text-gray-600 space-y-2">
              <li>Commitment to Excellence</li>
              <li>Sustainability & Eco-Friendly Practices</li>
              <li>Guest-Centric Approach</li>
              <li>Building Community Connections</li>
            </ul>
          </div>
        </motion.div>
      </motion.div>

      {/* Section 2: Our Mission */}
      <motion.div 
      variants={fadeIn('right', 0.5)}
      initial = 'hidden'
      whileInView={'show'}
      viewport={{once: false, amount: 0.7}}
      className="flex flex-col-reverse md:flex-row items-center justify-center w-[370px] md:w-[790px] lg:w-[950px] space-y-0 md:space-x-10">
        {/* Left Side: Content */}
        <div className="w-full md:w-1/2 p-4 lg:p-6 flex flex-col items-center md:items-start mt-7 md:mt-0 md:mb-20 group cursor-pointer hover:bg-blue-100 transition-colors duration-300">
          {/* Heading */}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 text-center md:text-left mt-5 md:mt-0 mb-5 group-hover:text-blue-500 transition-colors duration-300">
            Our Mission
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-gray-600 mb-4 text-center md:text-left max-w-3xl group-hover:text-gray-800 transition-colors duration-300">
            Our mission is to craft extraordinary experiences that seamlessly
            blend comfort, nature, and hospitality. We aim to provide a serene
            escape where guests can unwind, connect with loved ones, and immerse
            themselves in the beauty of the great outdoors.
          </p>
        </div>

        {/* Right Side: Image */}
        <motion.div 
        variants={fadeIn('up', 0.5)}
        initial = 'hidden'
        whileInView={'show'}
        viewport={{once: false, amount: 0.7}}
        className="w-full md:w-1/2 flex justify-center mb-10 md:mb-0 group">
          <div className="relative w-80 h-80 md:w-96 md:h-96 overflow-hidden rounded-lg shadow-lg transform group-hover:rotate-3 group-hover:scale-105 transition-transform duration-500 lg:shadow-gray-400 hover:cursor-pointer group">
            <img
              src="https://cloud.appwrite.io/v1/storage/buckets/672a1e700037c646954e/files/6748ca34001025700094/view?project=672a1dc2000b4396bb7d&project=672a1dc2000b4396bb7d&mode=admin"
              alt="Our Mission"
              className="w-full h-full object-cover"
            />

            {/* Overlay with Text and Link */}
            <div className="absolute inset-0 bg-black/60 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <h2 className="text-white text-xl md:text-2xl font-bold mb-2">
                Our Mission
              </h2>
              <a
                href="/read-more"
                className="text-white text-sm md:text-base underline hover:text-amber-400 transition-colors duration-300"
              >
                <button className="p-3 bg-amber-400 font-semibold text-white hover:bg-transparent hover:text-amber-400 rounded-lg transition duration-300 hover:border-2 border-amber-400">Read More</button>
                </a>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
