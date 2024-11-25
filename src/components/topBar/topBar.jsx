import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { useState, useEffect } from "react";

export default function TopBar() {
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update the time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-[40px] bg-gray-800 flex items-center justify-between px-5 md:h-[50px]">
      <div className="text-white text-sm font-medium md:text-lg">
        <span className="cursor-pointer hover:text-red-500">{currentTime.toLocaleDateString()}</span>
        <span className="mx-3 md:mx-4">|</span>
        <span className="cursor-pointer hover:text-blue-500">{currentTime.toLocaleTimeString()}</span>
      </div>

      <div className="flex space-x-3 md:space-x-6">
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaFacebook className="text-white hover:text-blue-500 w-5 h-5 transition duration-300" />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          <FaTwitter className="text-white hover:text-sky-400 w-5 h-5 transition duration-300" />
        </a>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaInstagram className="text-white hover:text-pink-500 w-5 h-5 transition duration-300" />
        </a>
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaLinkedin className="text-white hover:text-blue-600 w-5 h-5 transition duration-300" />
        </a>
      </div>
    </div>
  );
}
