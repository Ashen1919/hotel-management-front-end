import React from "react";

export default function AboutContent() {
  return (
    <div className="flex flex-col items-center justify-center py-7 px-4 mt-4 space-y-10">
      {/* Section 1: Our Vision */}
      <div className="flex flex-col md:flex-row items-center justify-center w-[950px] space-y-10 md:space-y-0">
        {/* Left Side: Image */}
        <div className="w-full md:w-1/2 flex justify-center mb-10 md:mb-0">
          <div className="relative w-64 h-80 md:w-96 md:h-96 overflow-hidden rounded-lg shadow-lg">
            <img
              src="https://cloud.appwrite.io/v1/storage/buckets/672a1e700037c646954e/files/6748c16c00387e644fa9/view?project=672a1dc2000b4396bb7d&mode=admin"
              alt="Our Vision"
              className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
            />
            {/* Overlay with Text */}
            <div className="absolute inset-0 bg-black/40 flex justify-center items-center">
              <h2 className="text-white text-xl md:text-2xl font-bold">Our Vision</h2>
            </div>
          </div>
        </div>

        {/* Right Side: Content */}
        <div className="w-full md:w-1/2 md:pl-4 flex flex-col items-center md:items-start">
          {/* Heading */}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 text-center md:text-left mb-4">
            Our Vision
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-gray-600 mb-4 text-center md:text-left max-w-3xl">
            At EverPeak Lodge, we believe in creating unforgettable experiences that blend comfort with the beauty of nature. Our vision is to inspire guests with the perfect balance of relaxation and adventure while cherishing the environment that surrounds us.
          </p>

          {/* Our Values */}
          <div className="bg-gray-200 rounded-lg p-6 text-center md:text-left">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Our Values</h3>
            <ul className="text-gray-600 space-y-2">
              <li>Commitment to Excellence</li>
              <li>Sustainability & Eco-Friendly Practices</li>
              <li>Guest-Centric Approach</li>
              <li>Building Community Connections</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Section 2: Our Mission */}
      <div className="flex flex-col-reverse md:flex-row items-center justify-center w-[950px] space-y-10 md:space-y-0 md:space-x-10">
        {/* Left Side: Content */}
        <div className="w-full md:w-1/2 md:pr-4 flex flex-col items-center md:items-start">
          {/* Heading */}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 text-center md:text-left mb-4">
            Our Mission
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-gray-600 mb-4 text-center md:text-left max-w-3xl">
            Our mission is to craft extraordinary experiences that seamlessly blend comfort, nature, and hospitality. We aim to provide a serene escape where guests can unwind, connect with loved ones, and immerse themselves in the beauty of the great outdoors.
          </p>
        </div>

        {/* Right Side: Image */}
        <div className="w-full md:w-1/2 flex justify-center mb-10 md:mb-0">
          <div className="relative w-64 h-80 md:w-96 md:h-96 overflow-hidden rounded-lg shadow-lg">
            <img
              src="https://cloud.appwrite.io/v1/storage/buckets/672a1e700037c646954e/files/6748ca34001025700094/view?project=672a1dc2000b4396bb7d&project=672a1dc2000b4396bb7d&mode=admin"
              alt="Our Mission"
              className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
            />
            {/* Overlay with Text */}
            <div className="absolute inset-0 bg-black/40 flex justify-center items-center">
              <h2 className="text-white text-xl md:text-2xl font-bold">Our Mission</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
