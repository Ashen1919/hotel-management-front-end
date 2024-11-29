import React, { useState, useEffect } from "react";
import { BsBoxArrowInRight } from "react-icons/bs";

export default function HomeContent() {
  // Images array
  const images = [
    "https://cloud.appwrite.io/v1/storage/buckets/672a1e700037c646954e/files/674805af00206a87e96d/view?project=672a1dc2000b4396bb7d&project=672a1dc2000b4396bb7d&mode=admin",
    "https://cloud.appwrite.io/v1/storage/buckets/672a1e700037c646954e/files/6748059d003be2d1b9d5/view?project=672a1dc2000b4396bb7d&project=672a1dc2000b4396bb7d&mode=admin",
    "https://cloud.appwrite.io/v1/storage/buckets/672a1e700037c646954e/files/6748058c003a6bd68c03/view?project=672a1dc2000b4396bb7d&project=672a1dc2000b4396bb7d&mode=admin",
    "https://cloud.appwrite.io/v1/storage/buckets/672a1e700037c646954e/files/67480582003b6f8059e2/view?project=672a1dc2000b4396bb7d&project=672a1dc2000b4396bb7d&mode=admin",
    "https://cloud.appwrite.io/v1/storage/buckets/672a1e700037c646954e/files/6748057700336cb7a205/view?project=672a1dc2000b4396bb7d&project=672a1dc2000b4396bb7d&mode=admin",
  ];

  // State to track the current slide
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 7000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative w-full h-[600px] mx-auto ">
      {/* Slide Container */}
      <div className="overflow-hidden">
      <div
        className="flex transition-transform duration-700 ease-in-out "
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {images.map((image, index) => (
          <div
            key={index}
            className="w-full flex-shrink-0 h-[600px] relative"
          >
            {/* Background Image */}
            <img
              src={image}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover"
            />
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/70"></div>
            {/* Text Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Welcome to EverPeak Lodge
              </h1>
              <p className="text-lg md:text-xl">
                Discover the perfect blend of comfort and nature.
              </p>
              <div className="mt-5">
                <a href="#booking">
                  <button
                    className="relative py-3 px-4 md:py-4 md:px-6 md:text-lg font-semibold text-white bg-amber-500 rounded-md flex items-center space-x-2 hover:bg-transparent border-2 border-amber-500 hover:text-amber-500 transition duration-300"
                  >
                    <span>Let's Booking</span>
                    <BsBoxArrowInRight className="font-semibold" />
                  </button>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
      </div>
    </div>
    
  );
}
