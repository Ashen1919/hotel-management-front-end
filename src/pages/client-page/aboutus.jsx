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
      <div className="w-full h-auto p-8 lg:p-16 lg:ml-10">
        <div className="text-xl font-semibold flex flex-row items-center mt-2">
          <hr className="w-[55px] bg-amber-400 border-0 h-[6px] rounded-lg" />
          <span className="px-3">Your Mountain Escape</span>
          <hr className="w-[55px] bg-amber-400 border-0 h-[6px] rounded-lg" />
        </div>
        <p className="font-semibold text-[25px] md:text-[45px]">
          About <span className="text-amber-500">Everpeak Lodge Hotel</span>
        </p>
        <div className="w-full h-auto flex gap-5 mt-5">
          {/* about-description */}
          <div className="w-[100%] h-auto lg:mr-20 text-justify">
            <p>
              Welcome to Everpeak Lodge Hotel, your haven of luxury and
              tranquility nestled in the heart of nature’s splendor. Situated at
              the base of majestic peaks, our hotel is the perfect blend of
              rustic charm and contemporary elegance, offering an unparalleled
              retreat for travelers seeking comfort and adventure. <br /> At
              Everpeak Lodge, we believe every guest deserves an unforgettable
              experience. Our spacious rooms and suites are thoughtfully
              designed with warm interiors, modern amenities, and breathtaking
              views of the surrounding mountains and valleys. Whether you’re
              here for a romantic getaway, a family vacation, or a corporate
              retreat, we ensure your stay is as memorable as the scenery
              outside.{" "}
            </p>{" "}
            <p className="md:block hidden mt-[-15px]">
              <br /> Our on-site restaurant serves a curated menu of locally
              sourced ingredients, bringing a taste of the region's culinary
              delights to your plate. Guests can unwind in our cozy lounge by
              the crackling fireplace, rejuvenate in our spa, or explore the
              outdoors with activities like hiking, skiing, and wildlife tours,
              depending on the season. <br /> Committed to sustainability,
              Everpeak Lodge Hotel incorporates eco-friendly practices to
              preserve the natural beauty that surrounds us. We aim to provide
              exceptional service while minimizing our environmental footprint.{" "}
              <br /> Everpeak Lodge is more than a place to stay; it’s a
              destination where cherished memories are made. Whether you're
              seeking adventure or relaxation, our dedicated team is here to
              cater to your every need. Come and discover the magic of Everpeak
              Lodge Hotel, where the mountains meet your heart.
            </p>
          </div>
        </div>
        {/* about-cards */}
        <div className="mt-8 w-full flex flex-col lg:flex-row justify-between">
          {/* story card */}
          <div className="relative w-full lg:w-[30%] h-[50vh] overflow-hidden rounded-lg shadow-lg transform group-hover:scale-105 transition-transform duration-500 lg:shadow-gray-400 hover:cursor-pointer group">
            <img
              src="https://cloud.appwrite.io/v1/storage/buckets/672a1e700037c646954e/files/678161350018edfa1bf4/view?project=672a1dc2000b4396bb7d&project=672a1dc2000b4396bb7d&mode=admin"
              alt="Our Vision"
              className="w-full h-full object-cover"
            />

            {/* Overlay with Text and Link */}
            <div className="absolute inset-0 bg-black/60 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <a
                href=""
                className="text-white text-sm md:text-base underline transition-colors duration-300"
              >
                <button className="p-3 bg-amber-400 font-semibold text-white hover:bg-transparent hover:text-amber-400 rounded-lg transition duration-300 hover:border-2 border-amber-400">
                  Our Story
                </button>
              </a>
            </div>
          </div>
          {/* why choose us card */}
          <div className="relative w-full mt-5 lg:mt-0 lg:w-[30%] h-[50vh] overflow-hidden rounded-lg shadow-lg transform group-hover:scale-105 transition-transform duration-500 lg:shadow-gray-400 hover:cursor-pointer group">
            <img
              src="https://cloud.appwrite.io/v1/storage/buckets/672a1e700037c646954e/files/6781612a00256f8f0d0e/view?project=672a1dc2000b4396bb7d&project=672a1dc2000b4396bb7d&mode=admin"
              alt="Our Vision"
              className="w-full h-full object-cover"
            />

            {/* Overlay with Text and Link */}
            <div className="absolute inset-0 bg-black/60 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <a
                href=""
                className="text-white text-sm md:text-base underline transition-colors duration-300"
              >
                <button className="p-3 bg-amber-400 font-semibold text-white hover:bg-transparent hover:text-amber-400 rounded-lg transition duration-300 hover:border-2 border-amber-400">
                  Why choose us
                </button>
              </a>
            </div>
          </div>
          {/* awards card */}
          <div className="relative w-full mt-5 lg:mt-0 lg:w-[30%] h-[50vh] lg:mr-20 overflow-hidden rounded-lg shadow-lg transform group-hover:scale-105 transition-transform duration-500 lg:shadow-gray-400 hover:cursor-pointer group">
            <img
              src="https://cloud.appwrite.io/v1/storage/buckets/672a1e700037c646954e/files/6781679a0035fceea20d/view?project=672a1dc2000b4396bb7d&project=672a1dc2000b4396bb7d&mode=admin"
              alt="Our Vision"
              className="w-full h-full object-cover"
            />

            {/* Overlay with Text and Link */}
            <div className="absolute inset-0 bg-black/60 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <a
                href=""
                className="text-white text-sm md:text-base underline transition-colors duration-300"
              >
                <button className="p-3 bg-amber-400 font-semibold text-white hover:bg-transparent hover:text-amber-400 rounded-lg transition duration-300 hover:border-2 border-amber-400">
                Our Awards
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
