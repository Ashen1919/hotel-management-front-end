import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [name, setName] = useState("");
  const [profileImage, setProfileImage] = useState(""); // Add profileImage state
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
          setName(res.data.user.firstName + " " + res.data.user.lastName);
          setProfileImage(res.data.user.profileImage); // Set profile image
          setIsLoggedIn(true);
        })
        .catch((err) => {
          console.error("User not found!", err);
          setIsLoggedIn(false); // Handle invalid token scenario
        });
    } else {
      setIsLoggedIn(false); // No token, so user is not logged in
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setName("");
    setProfileImage(""); // Clear profile image on logout
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

      {/* User Dropdown */}
      <div className="hidden lg:flex items-center space-x-4">
        {isLoggedIn ? (
          <div className="relative flex items-center">
            <img
              src={profileImage} // Use the profileImage state here
              alt="User Avatar"
              className="w-10 h-10 rounded-full cursor-pointer"
              onClick={toggleDropdown}
            />
            <span
              className="text-white ml-2 cursor-pointer"
              onClick={toggleDropdown}
            >
              {name}
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
    </header>
  );
}

export default Header;
