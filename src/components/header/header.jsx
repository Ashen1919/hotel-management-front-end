import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaCog, FaBookmark } from "react-icons/fa";
import { motion } from "framer-motion";
import { fadeIn } from "../variants";
import { LuLogOut } from "react-icons/lu";
import './header.css'

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false);
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect((email) => {
    const token = localStorage.getItem("token");
    if (token !== null) {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/users/" + email, {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          setName(res.data.user.firstName);
          setImage(res.data.user.profileImage);
          setIsLoggedIn(true);
        })
        .catch((err) => {
          console.error("User not found!", err);
          setIsLoggedIn(false);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setIsLoggedIn(false);
      setIsLoading(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setName("");
    setImage(null);
    navigate("/");
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const toggleMobileDropdown = () =>
    setIsMobileDropdownOpen(!isMobileDropdownOpen);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header
      className={`w-full h-[60px] sticky top-0 z-20 flex items-center justify-between px-6 md:h-[70px] transition-all ${
        isScrolled ? "bg-black opacity-80 shadow-md" : "bg-gray-800"
      }`}
    >
      {/* Logo */}
      <div className="flex items-center">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img
            src="https://cloud.appwrite.io/v1/storage/buckets/672a1e700037c646954e/files/674442ad003129203858/view?project=672a1dc2000b4396bb7d&mode=admin"
            className="h-10 md:h-[90px]"
            alt="EverPeak Logo"
          />
          <span className="self-center text-xl md:text-2xl font-semibold whitespace-nowrap text-white">
            EverPeak Lodge
          </span>
        </a>
      </div>

      {/* Navigation Links */}
      <nav className="hidden lg:flex space-x-8">
        <a
          href="/"
          className="text-white relative before:content-[''] before:block before:w-0 before:h-0.5 before:bg-amber-500 before:absolute before:left-0 before:bottom-0 before:transition-all duration-300 before:duration-500 hover:text-amber-500 focus:text-amber-500 hover:before:w-full hover:before:h-[3px]"
        >
          Home
        </a>
        <a
          href ="#about"
          className="text-white relative before:content-[''] before:block before:w-0 before:h-0.5 before:bg-amber-500 before:absolute before:left-0 before:bottom-0 before:transition-all duration-300 before:duration-500 hover:text-amber-500 focus:text-amber-500 hover:before:w-full hover:before:h-[3px]"
        >
          About
        </a>
        <a
          href="#features"
          className="text-white relative before:content-[''] before:block before:w-0 before:h-0.5 before:bg-amber-500 before:absolute before:left-0 before:bottom-0 before:transition-all duration-300 before:duration-500 hover:text-amber-500 focus:text-amber-500 hover:before:w-full hover:before:h-[3px]"
        >
          Features
        </a>
        <a
          href="#rooms"
          className="text-white relative before:content-[''] before:block before:w-0 before:h-0.5 before:bg-amber-500 before:absolute before:left-0 before:bottom-0 before:transition-all duration-300 before:duration-500 hover:text-amber-500 focus:text-amber-500 hover:before:w-full hover:before:h-[3px]"
         
        >
          Rooms
        </a>
        <a
          href="#gallery"
          className="text-white relative before:content-[''] before:block before:w-0 before:h-0.5 before:bg-amber-500 before:absolute before:left-0 before:bottom-0 before:transition-all duration-300 before:duration-500 hover:text-amber-500 focus:text-amber-500 hover:before:w-full hover:before:h-[3px]"
          
        >
          Gallery
        </a>
        <a
          href="#contact"
          className="text-white relative before:content-[''] before:block before:w-0 before:h-0.5 before:bg-amber-500 before:absolute before:left-0 before:bottom-0 before:transition-all duration-300 before:duration-500 hover:text-amber-500 focus:text-amber-500 hover:before:w-full hover:before:h-[3px]"
          
        >
          Contact
        </a>
      </nav>

      {/* User Dropdown or Buttons */}
      <div className="hidden lg:flex items-center justify-center space-x-4">
        <div className="w-full flex items-center justify-center">
          {isLoggedIn ? (
            <div className="flex flex-row items-center space-x-3 relative">
              {/* Welcome text with hover effect */}
              <motion.span
                className="text-white text-lg cursor-pointer"
                onHoverStart={() => setIsDropdownOpen(true)}
                onHoverEnd={() => setIsDropdownOpen(false)}
              >
                Welcome {name}
                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute top-8 left-0 bg-gray-800 text-white rounded-lg shadow-lg w-40 py-2 space-y-2 z-10">
                    <div className="flex items-center px-4 py-2 hover:bg-gray-700 rounded-md">
                      <FaBookmark className="mr-2" /> My Booking
                    </div>
                    <div className="flex items-center px-4 py-2 hover:bg-gray-700 rounded-md">
                      <FaCog className="mr-2" /> Settings
                    </div>
                    <div className="flex items-center px-4 py-2 hover:bg-gray-700 rounded-md">
                      <LuLogOut className="mr-2" />{" "}
                      <button onClick={handleLogout}>Log Out</button>
                    </div>
                  </div>
                )}
              </motion.span>
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-amber-500 shadow-md">
                <img
                  src={image}
                  alt="User Profile"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          ) : (
            <>
              <div className="flex flex-row space-x-3 items-center justify-center">
                <Link to="/login">
                  <button className="bg-transparent border border-white text-white px-4 py-1 rounded-md hover:bg-white hover:text-gray-800 transition">
                    Login
                  </button>
                </Link>
                <Link to="/signup">
                  <button className="bg-amber-600 text-white border-2 border-amber-500 px-4 py-1 rounded-md hover:bg-transparent hover:text-amber-500 hover:border-2 hover:border-amber-500 hover:transition hover:duration-300">
                    Sign Up
                  </button>
                </Link>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Mobile Hamburger Menu */}
      <div className="lg:hidden flex items-center">
        <button onClick={toggleMenu} className="text-white">
          {isMenuOpen ? (
            <svg
              className="w-6 h-6"
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
              className="w-6 h-6"
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

      {/* Mobile Navigation Links */}
      {isMenuOpen && (
        <motion.nav
          initial={{ opacity: 0, x: 200 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 200 }}
          transition={{ duration: 0.3 }}
          className="fixed z-10 top-[60px] md:top-[90px] right-0 w-[200px] h-auto bg-gray-800 opacity-80 flex flex-col items-center space-y-4 p-4 lg:hidden"
        >
          <a
            href="/"
            className="text-white text-lg hover:text-amber-500"
            onClick={closeMenu}
          >
            Home
          </a>
          <a
            href="#about"
            className="text-white text-lg hover:text-amber-500"
            onClick={closeMenu}
          >
            About
          </a>
          <a
            href="#features"
            className="text-white text-lg hover:text-amber-500"
            onClick={closeMenu}
          >
            Features
          </a>
          <a
            href="#rooms"
            className="text-white text-lg hover:text-amber-500"
            onClick={closeMenu}
          >
            Rooms
          </a>
          <a
            href="#gallery"
            className="text-white text-lg hover:text-amber-500"
            onClick={closeMenu}
          >
            Gallery
          </a>
          <a
            href="#contact"
            className="text-white text-lg hover:text-amber-500"
            onClick={closeMenu}
          >
            Contact
          </a>
          <div className="w-full mt-6">
            {isLoggedIn ? (
              <div className="flex flex-col items-center space-y-4">
                <Link to={"/"}>
                  <span className="text-white text-xl">Welcome {name}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white px-4 py-2 rounded-md"
                >
                  Log Out
                </button>
              </div>
            ) : (
              <>
                <div className="flex flex-col items-center justify-center space-y-3">
                  <Link to="/login">
                    <button className="bg-transparent border border-white text-white px-4 py-1 rounded-md hover:bg-white hover:text-gray-800 transition">
                      Login
                    </button>
                  </Link>
                  <Link to="/signup">
                    <button className="bg-amber-600 text-white border-2 border-amber-500 px-4 py-1 rounded-md hover:bg-transparent hover:text-amber-500 hover:border-2 hover:border-amber-500 hover:transition hover:duration-300">
                      Sign Up
                    </button>
                  </Link>
                </div>
              </>
            )}
          </div>
        </motion.nav>
      )}
    </header>
  );
}

export default Header;
