import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FaChevronDown,
  FaRegCalendarAlt,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Desktop Dropdown
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false); // Mobile Dropdown
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50); // Set scroll threshold
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token !== null) {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/users/", {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          console.log(res);
          setName(res.data.user.firstName);
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
    navigate("/");
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const toggleMobileDropdown = () => setIsMobileDropdownOpen(!isMobileDropdownOpen);

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

      {/* User Dropdown or Buttons */}
      <div className="hidden lg:flex items-center space-x-4">
        {isLoading ? (
          <span className="text-white">Loading...</span>
        ) : isLoggedIn ? (
          <div className="relative flex items-center">
            <span
              className="text-white ml-2 cursor-pointer flex items-center space-x-1"
              onClick={toggleDropdown}
            >
              <span className="text-xl">{"Welcome " + name}</span>
              <FaChevronDown className="text-white" />
            </span>
            {isDropdownOpen && (
              <div className="absolute top-[50px] right-0 bg-gray-700 text-white rounded-lg shadow-lg p-4">
                <Link
                  to="/bookings"
                  className="flex items-center py-2 hover:text-red-500"
                >
                  <FaRegCalendarAlt className="mr-2" />
                  Bookings
                </Link>
                <Link
                  to="/profile"
                  className="flex items-center py-2 hover:text-red-500"
                >
                  <FaUser className="mr-2" />
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center w-full text-left py-2 hover:text-red-500"
                >
                  <FaSignOutAlt className="mr-2" />
                  Log Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <Link to="/login">
              <button className="bg-transparent border border-white text-white px-4 py-1 rounded-md hover:bg-white hover:text-gray-800 transition">
                Login
              </button>
            </Link>
            <Link to="/signup">
              <button className="bg-blue-600 text-white px-4 py-1 rounded-md hover:bg-blue-700 transition">
                Sign Up
              </button>
            </Link>
          </>
        )}
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
        <nav
          className={`fixed z-10 top-[50px] md:top-[90px] right-0 w-[200px] h-[330px] bg-gray-800 opacity-80 flex flex-col items-center space-y-4 p-4 lg:hidden transform ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          } transition-transform ease-in-out duration-300`}
        >
          <a href="#home" className="text-white text-lg hover:text-red-500">
            Home
          </a>
          <a href="#about" className="text-white text-lg hover:text-red-500">
            About
          </a>
          <a href="#rooms" className="text-white text-lg hover:text-red-500">
            Rooms
          </a>
          <a href="#gallery" className="text-white text-lg hover:text-red-500">
            Gallery
          </a>
          <a href="#contact" className="text-white text-lg hover:text-red-500">
            Contact
          </a>
          <div className="w-full mt-6">
            {isLoggedIn ? (
              <div className="flex flex-col items-center space-y-4">
                <span className="text-white text-xl">Welcome {name}</span>
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
                  <button className="bg-blue-600 text-white px-4 py-1 rounded-md hover:bg-blue-700 transition">
                    Sign Up
                  </button>
                </Link>
              </div>
              </>
            )}
          </div>
        </nav>
      )}
    </header>
  );
}

export default Header;
