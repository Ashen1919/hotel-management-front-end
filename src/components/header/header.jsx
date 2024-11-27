import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaChevronDown,
  FaRegCalendarAlt,
  FaUser,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [name, setName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedName = localStorage.getItem("name");
    const token = localStorage.getItem("token");

    if (token && storedName) {
      setIsLoggedIn(true); 
      setName(storedName); 
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token"); 
    localStorage.removeItem("name"); 
    setIsLoggedIn(false);
    setName("");
    navigate("/"); 
  };

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  return (
    <header className="bg-gray-800 p-4 text-white flex justify-between items-center">
      <h1 className="text-2xl font-bold">EverPeak Lodge</h1>
      <div className="relative">
        {isLoggedIn ? (
          <span
            className="cursor-pointer flex items-center"
            onClick={toggleDropdown}
          >
            <span className="mr-2">Welcome, {name}</span>
            <FaChevronDown />
          </span>
        ) : (
          <Link to="/login" className="text-white">
            Login
          </Link>
        )}
        {isLoggedIn && isDropdownOpen && (
          <div className="absolute right-0 mt-2 bg-gray-700 text-white rounded-lg shadow-lg p-4">
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
            <Link
              to="/settings"
              className="flex items-center py-2 hover:text-red-500"
            >
              <FaCog className="mr-2" />
              Settings
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
    </header>
  );
}

export default Header;
