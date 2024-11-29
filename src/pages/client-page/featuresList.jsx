import React from "react";
import {
  FaBed,
  FaUtensils,
  FaSpa,
  FaHiking,
  FaSwimmer,
  FaWifi,
} from "react-icons/fa";

export default function FeaturesList() {
  const features = [
    {
      icon: <FaBed />,
      title: "Luxury Rooms",
      description: "Elegantly designed with comfort and breathtaking views.",
    },
    {
      icon: <FaUtensils />,
      title: "Gourmet Dining",
      description: "Savor world-class cuisine crafted by top chefs.",
    },
    {
      icon: <FaSpa />,
      title: "Spa & Wellness",
      description: "Relax and rejuvenate with our premium spa services.",
    },
    {
      icon: <FaHiking />,
      title: "Outdoor Adventures",
      description: "Explore hiking trails and breathtaking nature.",
    },
    {
      icon: <FaSwimmer />,
      title: "Infinity Pool",
      description: "Swim in luxury with stunning mountain views.",
    },
    {
      icon: <FaWifi />,
      title: "Free Wi-Fi",
      description: "Stay connected with high-speed internet throughout.",
    },
  ];

  return (
    <div className="mt-5 px-5 w-full bg-gray-200 py-7">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <div
            key={index}
            className="group bg-white border-2 border-gray-200 rounded-lg shadow-lg p-5 hover:shadow-xl hover:cursor-pointer hover:border-2 hover:border-amber-600 transition duration-300 ease-in-out"
          >
            <div className="flex flex-col items-center text-center">
              <div className="text-4xl text-amber-500 mb-3 group-hover:text-amber-700 transition">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2 group-hover:text-amber-500 transition">
                {feature.title}
              </h3>
              <p className="text-gray-500 group-hover:text-gray-700 transition">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
