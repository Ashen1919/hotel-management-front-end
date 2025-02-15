import { Link, Route, Routes, useNavigate } from "react-router-dom";
import {
  FaRegBookmark,
  FaDoorOpen,
  FaUsers,
  FaComments,
  FaImages,
  FaCalendarCheck,
  FaTicketAlt,
  FaSearch,
  FaSignOutAlt,
  FaHome,
} from "react-icons/fa";
import AdminCategories from "../admin/category/adminCategory.jsx";
import AdminRooms from "../admin/rooms/adminRooms.jsx";
import AdminUsers from "../admin/users/adminUsers.jsx";
import AdminFeedback from "../admin/feedback/adminFeedback.jsx";
import AdminGalleryItem from "../admin/galleryItem/AdminGalleryItem.jsx";
import AdminBooking from "../admin/Booking/adminBooking.jsx";
import AdminTicketing from "../admin/ticketing/adminTicketing.jsx";
import AddCategoryForm from "../admin/category/addCategory/addCategoryForm.jsx";
import UpdateCategoryForm from "../admin/category/updateCategoryForm/updateCategory.jsx";
import AddGalleryItemForm from "../admin/galleryItem/addGalleryItem/addGalleryItemForm.jsx";
import UpdateGalleryItemForm from "../admin/galleryItem/updateGalleryItem/updateGalleryItemForm.jsx";
import { useState, useEffect } from "react";
import { FaGear } from "react-icons/fa6";
import axios from "axios";
import AddRoomForm from "../admin/rooms/addRoom/addRoom.jsx";
import UpdateRoomForm from "../admin/rooms/updateRoom/updateRoom.jsx";
import UpdateUser from "../admin/users/updateUser/updateUser.jsx";
import Dashboard from "../admin/dashboard/dashboard.jsx";
import { IoCloseSharp, IoMenuSharp } from "react-icons/io5";
import { motion } from "framer-motion";
import SettingPage from "../admin/setting/setting.jsx";

export default function AdminPage() {
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("email");
    if (token !== null) {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/users/" + email, {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          setImage(res.data.user.profileImage);
          setIsLoggedIn(true);
        })
        .catch((err) => {
          console.error("User not found!", err);
          setIsLoggedIn(false);
        });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    navigate("/login");
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="flex w-full h-auto overflow-hidden bg-gray-900">
      {/* Sidebar */}
      <div className="w-[20%] h-[100vh] bg-gray-800 hidden md:flex md:flex-col p-4 space-y-6">
        <div className="text-white text-[22px] flex flex-row font-semibold  text-center">
          <p className="md:flex hidden">Admin Dashboard</p>
        </div>

        {/* Navigation Links */}
        <div className="space-y-7 relative ">
          {/* Dashboard */}
          <div className="text-gray-200 cursor-pointer text-[18px] flex items-center space-x-3 group m-0 p-2 rounded-xl hover:text-white transition-all duration-300 bg-red-600 w-full">
            <FaHome className="cursor-pointer group-hover:-rotate-90 transition-transform duration-300" />
            <Link to="/admin" className="relative">
              Dashboard
              <span className="absolute bottom-[-2px] left-0 w-0 h-[2px] bg-white group-hover:w-full transition-all duration-300"></span>
            </Link>
          </div>
          <hr className="w-full border-0 h-[2px] bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 shadow-lg rounded-lg" />
          {/* Categories */}
          <div className="text-gray-400 text-[18px] flex items-center space-x-3 group hover:text-white transition-all duration-300">
            <FaRegBookmark className="cursor-pointer group-hover:scale-125 transition-transform duration-300" />
            <Link to="/admin/categories" className="relative">
              Categories
              <span className="absolute bottom-[-2px] left-0 w-0 h-[2px] bg-white group-hover:w-full transition-all duration-300"></span>
            </Link>
          </div>

          {/* Rooms */}
          <div className="text-gray-400 text-[18px] flex items-center space-x-3 group hover:text-white transition-all duration-300">
            <FaDoorOpen className="cursor-pointer group-hover:rotate-90 transition-transform duration-300" />
            <Link to="/admin/rooms" className="relative">
              Rooms
              <span className="absolute bottom-[-2px] left-0 w-0 h-[2px] bg-white group-hover:w-full transition-all duration-300"></span>
            </Link>
          </div>

          {/* Users */}
          <div className="text-gray-400 text-[18px] flex items-center space-x-3 group hover:text-white transition-all duration-300">
            <FaUsers className="cursor-pointer group-hover:translate-x-1 transition-transform duration-300" />
            <Link to="/admin/users" className="relative">
              Users
              <span className="absolute bottom-[-2px] left-0 w-0 h-[2px] bg-white group-hover:w-full transition-all duration-300"></span>
            </Link>
          </div>

          {/* Feedback */}
          <div className="text-gray-400 text-[18px] flex items-center space-x-3 group hover:text-white transition-all duration-300">
            <FaComments className="cursor-pointer group-hover:scale-125 transition-transform duration-300" />
            <Link to="/admin/feedback" className="relative">
              Feedback
              <span className="absolute bottom-[-2px] left-0 w-0 h-[2px] bg-white group-hover:w-full transition-all duration-300"></span>
            </Link>
          </div>

          {/* Gallery */}
          <div className="text-gray-400 text-[18px] flex items-center space-x-3 group hover:text-white transition-all duration-300">
            <FaImages className="cursor-pointer group-hover:rotate-180 transition-transform duration-300" />
            <Link to="/admin/galleryitems" className="relative">
              Gallery
              <span className="absolute bottom-[-2px] left-0 w-0 h-[2px] bg-white group-hover:w-full transition-all duration-300"></span>
            </Link>
          </div>

          {/* Bookings */}
          <div className="text-gray-400 text-[18px] flex items-center space-x-3 group hover:text-white transition-all duration-300">
            <FaCalendarCheck className="cursor-pointer group-hover:translate-y-1 transition-transform duration-300" />
            <Link to="/admin/bookings" className="relative">
              Bookings
              <span className="absolute bottom-[-2px] left-0 w-0 h-[2px] bg-white group-hover:w-full transition-all duration-300"></span>
            </Link>
          </div>

          {/* Ticketing */}
          <div className="text-gray-400 text-[18px] flex items-center space-x-3 group hover:text-white transition-all duration-300">
            <FaTicketAlt className="cursor-pointer group-hover:scale-110 transition-transform duration-300" />
            <Link to="/admin/ticketing" className="relative">
              Ticketing
              <span className="absolute bottom-[-2px] left-0 w-0 h-[2px] bg-white group-hover:w-full transition-all duration-300"></span>
            </Link>
          </div>

          {/* Settings*/}
          <div className="fixed bottom-5">
            <div className="text-gray-400 text-[18px] flex items-center space-x-3 group hover:text-white transition-all duration-300">
              <FaGear className="cursor-pointer group-hover:rotate-180 transition-transform duration-300" />
              <Link to="/admin/setting">
                Setting
                <span className="absolute bottom-[-2px] left-0 w-0 h-[2px] bg-white group-hover:w-full transition-all duration-300"></span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="md:w-[80%] w-full max-h-[100vh] flex flex-col bg-gray-900 text-white">
        {/* Header Section */}
        <div className="flex items-center justify-between px-6 py-4 bg-gray-800 shadow-md">
          <div className="text-white text-[22px] flex flex-row font-semibold gap-3 text-center">
            <button onClick={toggleMenu}>
              <IoMenuSharp className="md:hidden" />
            </button>
            <p className="flex md:hidden">Admin Dashboard</p>
          </div>
          {/* Search Bar */}
          <div className="md:flex hidden items-center bg-gray-700 text-gray-400 rounded-lg px-3 py-2 space-x-3">
            <FaSearch />
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent focus:outline-none text-sm text-white placeholder-gray-400"
            />
          </div>

          {/* Admin Tools */}
          <div className="flex items-center md:space-x-4">
            {/* Profile */}
            {isLoggedIn && (
              <div className="w-10 h-10 rounded-full md:flex hidden overflow-hidden border-2 border-amber-500 shadow-md">
                <img
                  src={image}
                  alt="Admin Profile"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <span className="text-gray-300 md:flex hidden text-lg">Admin</span>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="flex items-center bg-red-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-700"
            >
              <FaSignOutAlt className="mr-2" />
              Logout
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div>
          {/* Mobile nav menu */}
          <div
            className={`fixed top-0 left-0 h-full w-[250px] bg-gray-800 text-white transform ${
              isMenuOpen ? "translate-x-0" : "-translate-x-full"
            } transition-transform duration-300 ease-in-out z-10`}
          >
            {/* Close Button */}
            <div className="p-4">
              <button
                className="text-white border border-white p-2 rounded-md"
                onClick={toggleMenu}
              >
                <IoCloseSharp />
              </button>
            </div>

            {/* Navigation Links */}
            <div className="space-y-7 p-4">
              <div className="flex items-center space-x-3 group">
                <FaHome className="text-xl" />
                <Link to="/admin" className="hover:text-red-400">
                  Dashboard
                </Link>
              </div>

              <div className="flex items-center space-x-3 group">
                <FaRegBookmark className="text-xl" />
                <Link to="/admin/categories" className="hover:text-red-400">
                  Categories
                </Link>
              </div>

              <div className="flex items-center space-x-3 group">
                <FaDoorOpen className="text-xl" />
                <Link to="/admin/rooms" className="hover:text-red-400">
                  Rooms
                </Link>
              </div>

              <div className="flex items-center space-x-3 group">
                <FaUsers className="text-xl" />
                <Link to="/admin/users" className="hover:text-red-400">
                  Users
                </Link>
              </div>

              <div className="flex items-center space-x-3 group">
                <FaComments className="text-xl" />
                <Link to="/admin/feedback" className="hover:text-red-400">
                  Feedback
                </Link>
              </div>

              <div className="flex items-center space-x-3 group">
                <FaImages className="text-xl" />
                <Link to="/admin/galleryitems" className="hover:text-red-400">
                  Gallery
                </Link>
              </div>

              <div className="flex items-center space-x-3 group">
                <FaCalendarCheck className="text-xl" />
                <Link to="/admin/bookings" className="hover:text-red-400">
                  Bookings
                </Link>
              </div>

              <div className="flex items-center space-x-3 group">
                <FaTicketAlt className="text-xl" />
                <Link to="/admin/ticketing" className="hover:text-red-400">
                  Ticketing
                </Link>
              </div>

              <div className="flex items-center space-x-3 group">
                <FaGear className="text-xl" />
                <Link to="/admin/setting" className="hover:text-red-400">
                  Setting
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Routes Section */}
        <div className="overflow-auto h-full p-6">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/categories" element={<AdminCategories />} />
            <Route path="/add-categories" element={<AddCategoryForm />} />
            <Route path="/update-category" element={<UpdateCategoryForm />} />
            <Route path="/rooms" element={<AdminRooms />} />
            <Route path="/add-room" element={<AddRoomForm />} />
            <Route path="/update-room" element={<UpdateRoomForm />} />
            <Route path="/users" element={<AdminUsers />} />
            <Route path="/update-users" element={<UpdateUser />} />
            <Route path="/feedback" element={<AdminFeedback />} />
            <Route path="/galleryitems" element={<AdminGalleryItem />} />
            <Route path="/add-gallery-item" element={<AddGalleryItemForm />} />
            <Route
              path="/update-gallery-item"
              element={<UpdateGalleryItemForm />}
            />
            <Route path="/bookings" element={<AdminBooking />} />
            <Route path="/ticketing" element={<AdminTicketing />} />
            <Route path="/setting" element={<SettingPage/>}/>
          </Routes>
        </div>
      </div>
    </div>
  );
}
