import React, { useState, useEffect } from "react";
import { FaArrowUpLong } from "react-icons/fa6";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsVisible(true); 
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div
      className={`fixed right-0 mr-4 bottom-0 mb-8 transition-opacity duration-500 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <button
        className="p-3 md:p-4 rounded-full border-2 border-amber-500 bg-amber-500 transition duration-500 hover:border-2 hover:bg-transparent"
        onClick={scrollToTop}
      >
        <FaArrowUpLong className="md:text-lg"/>
      </button>
    </div>
  );
};

export default ScrollToTopButton;
