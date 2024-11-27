import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({ name: "", image: "" });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  // Check if user is logged in on component mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // Fetch user data using token
      fetchUserData(token);
      setIsLoggedIn(true);
    }
  }, []);

  const fetchUserData = (token) => {
    // Replace with your API endpoint for fetching user data
    fetch(import.meta.env.VITE_BACKEND_URL + "/api/users", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setUser({
          name: `${data.user.firstName} ${data.user.lastName}`,
          image: data.user.profilePicture || "/default-avatar.png", // Fallback image
        });
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        setIsLoggedIn(false);
      });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login"); // Redirect to login page after logout
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

      {/* Buttons or User Dropdown */}
      <div className="hidden lg:flex items-center space-x-4">
        {isLoggedIn ? (
          <div className="relative flex items-center">
            <img
              src={user.image}
              alt="User Avatar"
              className="w-10 h-10 rounded-full cursor-pointer"
              onClick={toggleDropdown}
            />
            <span
              className="text-white ml-2 cursor-pointer"
              onClick={toggleDropdown}
            >
              {user.name}
            </span>
            {isDropdownOpen && (
              <div className="absolute top-[50px] right-0 bg-gray-700 text-white rounded-lg shadow-lg p-4">
                <Link to="/bookings" className="block py-2 hover:text-red-500">
                  Bookings
                </Link>
                <Link to="/profile" className="block py-2 hover:text-red-500">
                  Profile
                </Link>
                <Link to="/settings" className="block py-2 hover:text-red-500">
                  Settings
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left py-2 hover:text-red-500"
                >
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
    </header>
  );
}

export default Header;
