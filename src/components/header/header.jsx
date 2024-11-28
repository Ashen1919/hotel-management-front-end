import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FaChevronDown,
  FaRegCalendarAlt,
  FaUser,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

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

  return (
    <header className="w-full h-[60px] bg-gray-800 flex items-center justify-between px-6 md:h-[70px]">
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
        {isLoading ? ( // Show loading state while fetching data
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
        <nav className="absolute top-[90px] left-0 w-full bg-gray-800 flex flex-col items-center space-y-4 p-4 lg:hidden">
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

          {/* Conditional Rendering for Authenticated Users */}
          {isLoggedIn ? (
            <div className="relative flex flex-col items-center space-y-4 mt-6">
              <button
                className="text-white flex items-center space-x-1"
                onClick={toggleDropdown}
              >
                <span className="text-lg">{"Welcome " + name}</span>
                <FaChevronDown />
              </button>
              {isDropdownOpen && (
                <div className="w-full bg-gray-700 text-white rounded-lg shadow-lg mt-2 p-4">
                  <Link
                    to="/bookings"
                    className="block py-2 hover:text-red-500 text-center"
                  >
                    <FaRegCalendarAlt className="inline-block mr-2" />
                    Bookings
                  </Link>
                  <Link
                    to="/profile"
                    className="block py-2 hover:text-red-500 text-center"
                  >
                    <FaUser className="inline-block mr-2" />
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left py-2 hover:text-red-500 text-center"
                  >
                    <FaSignOutAlt className="inline-block mr-2" />
                    Log Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center space-y-4 mt-6">
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
          )}
        </nav>
      )}

      {/* User Dropdown or Buttons */}
      {isLoggedIn && (
        <div className="hidden lg:flex items-center space-x-4">
          {isLoading ? ( // Show loading state while fetching data
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
      )}
    </header>
  );
}

export default Header;
