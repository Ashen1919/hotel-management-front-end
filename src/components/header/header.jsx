import React, { useState } from "react";
import { Link } from "react-router-dom";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Toggle the menu visibility
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="w-full h-[60px] bg-gray-800 flex items-center justify-between px-6 md:h-[70px]">
      <div className="flex items-center">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img
            src="https://cloud.appwrite.io/v1/storage/buckets/672a1e700037c646954e/files/674442ad003129203858/view?project=672a1dc2000b4396bb7d&project=672a1dc2000b4396bb7d&mode=admin"
            className="h-10 md:h-[90px]"
            alt="EverPeak Logo"
          />
          <span className="self-center text-xl md:text-2xl font-semibold whitespace-nowrap dark:text-white block">
            EverPeak Lodge
          </span>
        </a>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden lg:flex space-x-8">
        <a
          href="#home"
          className="text-white relative before:content-[''] before:block before:w-0 before:h-0.5 before:bg-red-500 before:absolute before:left-0 before:bottom-0 before:transition-all hover:text-red-500 hover:before:w-full hover:before:h-[3px]"
        >
          Home
        </a>
        <a
          href="#about"
          className="text-white relative before:content-[''] before:block before:w-0 before:h-0.5 before:bg-red-500 before:absolute before:left-0 before:bottom-0 before:transition-all hover:text-red-500 hover:before:w-full hover:before:h-[3px]"
        >
          About
        </a>
        <a
          href="#rooms"
          className="text-white relative before:content-[''] before:block before:w-0 before:h-0.5 before:bg-red-500 before:absolute before:left-0 before:bottom-0 before:transition-all hover:text-red-500 hover:before:w-full hover:before:h-[3px]"
        >
          Rooms
        </a>
        <a
          href="#gallery"
          className="text-white relative before:content-[''] before:block before:w-0 before:h-0.5 before:bg-red-500 before:absolute before:left-0 before:bottom-0 before:transition-all hover:text-red-500 hover:before:w-full hover:before:h-[3px]"
        >
          Gallery
        </a>
        <a
          href="#contact"
          className="text-white relative before:content-[''] before:block before:w-0 before:h-0.5 before:bg-red-500 before:absolute before:left-0 before:bottom-0 before:transition-all hover:text-red-500 hover:before:w-full hover:before:h-[3px]"
        >
          Contact
        </a>
      </nav>

      {/* Desktop Buttons */}
      <div className="hidden lg:flex items-center space-x-4">
        <Link to={'/login'}>
        <button className="bg-transparent border border-white text-white px-4 py-1 rounded-md hover:bg-white hover:text-gray-800 transition">
          Login
        </button>
        </Link>
        <Link to={'/signup'}>
        <button className="bg-blue-600 text-white px-4 py-1 rounded-md hover:bg-blue-700 transition">
          Sign Up
        </button>
        </Link>
      </div>

      {/* Hamburger Menu for Small Screens */}
      <div className="lg:hidden flex items-center">
        <button onClick={toggleMenu} className="text-white">
          {isMenuOpen ? (
            <svg
              className="w-6 h-6 md:w-[45px] md:h-[45px]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          ) : (
            <svg
              className="w-6 h-6 md:w-[45px] md:h-[45px]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu (Only visible when isMenuOpen is true) */}
      <div
        className={`${
          isMenuOpen ? "block" : "hidden"
        } absolute top-[75px] md:top-[95px] left-0 w-full bg-gray-800 text-white p-4 lg:hidden`}
      >
        <a
          href="#home"
          className="block py-2 hover:text-red-500 transition"
        >
          Home
        </a>
        <a
          href="#about"
          className="block py-2 hover:text-red-500 transition"
        >
          About
        </a>
        <a
          href="#rooms"
          className="block py-2 hover:text-red-500 transition"
        >
          Rooms
        </a>
        <a
          href="#gallery"
          className="block py-2 hover:text-red-500 transition"
        >
          Gallery
        </a>
        <a
          href="#contact"
          className="block py-2 hover:text-red-500 transition"
        >
          Contact
        </a>

        <div className="flex flex-col items-center space-y-4 mt-4">
          <Link to={'/login'}>
          <button className="bg-transparent border border-white text-white px-4 py-1 rounded-md hover:bg-white hover:text-gray-800 transition">
            Login
          </button>
          </Link>
          <Link to={'/signup'}>
          <button className="bg-blue-600 text-white px-4 py-1 rounded-md hover:bg-blue-700 transition">
            Sign Up
          </button>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
