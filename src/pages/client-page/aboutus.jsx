import React from "react";

export default function AboutUsPage() {
  return (
    <div className="w-full h-auto">
      {/* Header iamge section */}
      <div className="w-full h-[250px] bg-gray-800 relative">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage:
              'url("https://cloud.appwrite.io/v1/storage/buckets/672a1e700037c646954e/files/6758fe3b003409d50e55/view?project=672a1dc2000b4396bb7d&project=672a1dc2000b4396bb7d&mode=admin")',
          }}
        ></div>
        <div className="relative z-10 flex p-5">
          <a href="/">
            <p className="text-2xl pl-0 md:pl-10 font-semibold text-amber-400">
              EverPeak Lodge
            </p>
            <p className="text-4xl font-bold md:pl-10 pl-0 text-white mt-5">
              Escape to Comfort: Your Journey Begins Here
            </p>
            <p className="text-lg text-white font-medium mt-5 md:pl-10 pl-0 md:block hidden">
              Discover the perfect blend of luxury and relaxation. Book your
              stay effortlessly and unlock unforgettable experiences at our
              exquisite hotel.
            </p>
          </a>
        </div>
      </div>
      {/* about content */}
      <div className="w-full h-auto p-16 ml-10">
        <div className="text-xl font-semibold flex flex-row items-center mt-2">
          <hr className="w-[55px] bg-amber-400 border-0 h-[6px] rounded-lg" />
          <span className="px-3">Your Mountain Escape</span>
          <hr className="w-[55px] bg-amber-400 border-0 h-[6px] rounded-lg" />
        </div>
        <p className="font-semibold text-[45px]">About <span className="text-amber-500">Everpeak Lodge Hotel</span></p>
        <div className="w-full h-auto flex gap-5 mt-5">
          {/* left-description */}
          <div className="w-[100%] h-auto mr-20 text-justify">
            <p>
              Welcome to Everpeak Lodge Hotel, your haven of luxury and
              tranquility nestled in the heart of nature’s splendor. Situated at
              the base of majestic peaks, our hotel is the perfect blend of
              rustic charm and contemporary elegance, offering an unparalleled
              retreat for travelers seeking comfort and adventure. <br/> At Everpeak
              Lodge, we believe every guest deserves an unforgettable
              experience. Our spacious rooms and suites are thoughtfully
              designed with warm interiors, modern amenities, and breathtaking
              views of the surrounding mountains and valleys. Whether you’re
              here for a romantic getaway, a family vacation, or a corporate
              retreat, we ensure your stay is as memorable as the scenery
              outside. <br/> Our on-site restaurant serves a curated menu of locally
              sourced ingredients, bringing a taste of the region's culinary
              delights to your plate. Guests can unwind in our cozy lounge by
              the crackling fireplace, rejuvenate in our spa, or explore the
              outdoors with activities like hiking, skiing, and wildlife tours,
              depending on the season. <br/> Committed to sustainability, Everpeak
              Lodge Hotel incorporates eco-friendly practices to preserve the
              natural beauty that surrounds us. We aim to provide exceptional
              service while minimizing our environmental footprint. <br/> Everpeak
              Lodge is more than a place to stay; it’s a destination where
              cherished memories are made. Whether you're seeking adventure or
              relaxation, our dedicated team is here to cater to your every
              need. Come and discover the magic of Everpeak Lodge Hotel, where
              the mountains meet your heart.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
