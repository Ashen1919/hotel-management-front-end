import React from "react";
import { motion } from "framer-motion";
import { fadeIn } from "../../components/variants";

export default function GalleryItem() {
  return (
    <div className="relative w-full h-auto bg-gray-100 md:py-10 justify-center mt-10">
      {/* Pink Background Rectangle */}
      <div className="absolute top-0 md:left-[200px] sm-w-full sm:h-[500px] md:block sm:hidden lg:left-[370px] bg-pink-600 md:w-[50%] md:h-[700px] -z-100 rounded-lg"></div>
      {/* Textual Card */}
      <motion.div 
      variants={fadeIn('left', 0.5)}
      initial = 'hidden'
      whileInView={'show'}
      viewport={{once: false, amount: 0.7}}
      className="bg-purple-700 text-white rounded-lg shadow-lg p-6 absolute w-[300px]  md:right-24 lg:right-48 z-10 top-[700px] right-20 md:top-[500px] md:w-[400px] hover:bg-purple-800 transition duration-300 cursor-pointer">
        <h3 className="sm:text-xl md:text-2xl lg:text-3xl font-bold mb-4">Our Portfolio</h3>
        <p className="text-md mb-4">
          Ever Peak Hotel's gallery showcases a curated collection of stunning
          artwork and photography, blending modern elegance with local culture.
          Guests can immerse themselves in captivating visuals that enhance
          their stay with inspiration and beauty.
        </p>
        <a
          href="#"
          className="text-md font-semibold border-2 border-amber-500 transition duration-300 text-white bg-amber-500 hover:bg-transparent hover:border-2 hover:border-amber-500 py-2 px-4 rounded inline-block"
        >
          Explore More
        </a>
      </motion.div>

      <div className="w-4/5 mx-auto flex flex-wrap items-start justify-between gap-6 relative cursor-pointer">
        {/* Gallery Section */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 flex-1">
          {/* Image 1 */}
          <div className="overflow-hidden rounded-lg shadow-md hover:shadow-xl transform transition duration-300 hover:scale-105">
            <img
              src="https://cloud.appwrite.io/v1/storage/buckets/672a1e700037c646954e/files/6749cc3a0026875e76c8/view?project=672a1dc2000b4396bb7d&mode=admin"
              alt="Gallery item 1"
              className="w-full h-60 object-cover"
            />
          </div>
          {/* Image 2 */}
          <div className="overflow-hidden rounded-lg shadow-md hover:shadow-xl transform transition duration-300 hover:scale-105">
            <img
              src="https://cloud.appwrite.io/v1/storage/buckets/672a1e700037c646954e/files/6749cbd4000c099438cd/view?project=672a1dc2000b4396bb7d&mode=admin"
              alt="Gallery item 2"
              className="w-full h-60 object-cover"
            />
          </div>
          {/* Image 3 */}
          <div className="overflow-hidden rounded-lg shadow-md hover:shadow-xl transform transition duration-300 hover:scale-105">
            <img
              src="https://cloud.appwrite.io/v1/storage/buckets/672a1e700037c646954e/files/674b32fa00245997534b/view?project=672a1dc2000b4396bb7d&project=672a1dc2000b4396bb7d&mode=admin"
              alt="Gallery item 3"
              className="w-full h-60 object-cover"
            />
          </div>
          {/* Image 4 */}
          <div className="overflow-hidden rounded-lg shadow-md hover:shadow-xl transform transition duration-300 hover:scale-105">
            <img
              src="https://cloud.appwrite.io/v1/storage/buckets/672a1e700037c646954e/files/6749cba70006883ad819/view?project=672a1dc2000b4396bb7d&project=672a1dc2000b4396bb7d&mode=admin"
              alt="Gallery item 4"
              className="w-full h-60 object-cover"
            />
          </div>
          {/* Image 5 */}
          <div className="overflow-hidden rounded-lg shadow-md hover:shadow-xl transform transition duration-300 hover:scale-105">
            <img
              src="https://cloud.appwrite.io/v1/storage/buckets/672a1e700037c646954e/files/674b32f0001955ea17f4/view?project=672a1dc2000b4396bb7d&project=672a1dc2000b4396bb7d&mode=admin"
              alt="Gallery item 5"
              className="w-full h-60 object-cover"
            />
          </div>
          {/* Image 6 */}
          <div className="overflow-hidden rounded-lg shadow-md hover:shadow-xl transform transition duration-300 hover:scale-105">
            <img
              src="https://cloud.appwrite.io/v1/storage/buckets/672a1e700037c646954e/files/674b324a00044ec90d7b/view?project=672a1dc2000b4396bb7d&project=672a1dc2000b4396bb7d&mode=admin"
              alt="Gallery item 6"
              className="w-full h-60 object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
