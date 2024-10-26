import { Link, Route, Routes } from "react-router-dom";
import { FaRegBookmark, FaDoorOpen, FaUsers, FaComments, FaImages, FaCalendarCheck, FaTicketAlt } from "react-icons/fa";
import AdminCategories from "../admin/category/adminCategory.jsx";
import AdminRooms from "../admin/rooms/adminRooms.jsx";
import AdminUsers from "../admin/users/adminUsers.jsx";
import AdminFeedback from "../admin/feedback/adminFeedback.jsx";
import AdminGalleryItem from "../admin/galleryItem/AdminGalleryItem.jsx";
import AdminBooking from "../admin/Booking/adminBooking.jsx";
import AdminTicketing from "../admin/ticketing/adminTicketing.jsx";

export default function AdminPage() {
  return (
    <div className="w-full max-h-[100vh] overflow-hidden flex">
      <div className="w-[20%] h-[100vh] bg-blue-400 flex flex-col p-2">
        <div className="text-white text-[20px] font-normal flex items-center space-x-2 hover:font-medium hover:text-white">
          <FaRegBookmark className="cursor-pointer" />
          <Link to="/admin/categories">Categories</Link>
        </div>
        <div className="text-white text-[20px] font-normal flex items-center space-x-2 hover:font-medium hover:text-white">
          <FaDoorOpen className="cursor-pointer" />
          <Link to="/admin/rooms">Rooms</Link>
        </div>
        <div className="text-white text-[20px] font-normal flex items-center space-x-2 hover:font-medium hover:text-white">
          <FaUsers className="cursor-pointer" />
          <Link to="/admin/users">Users</Link>
        </div>
        <div className="text-white text-[20px] font-normal flex items-center space-x-2 hover:font-medium hover:text-white">
          <FaComments className="cursor-pointer" />
          <Link to="/admin/feedback">Feedback</Link>
        </div>
        <div className="text-white text-[20px] font-normal flex items-center space-x-2 hover:font-medium hover:text-white">
          <FaImages className="cursor-pointer" />
          <Link to="/admin/galleryitems">GalleryItem</Link>
        </div>
        <div className="text-white text-[20px] font-normal flex items-center space-x-2 hover:font-medium hover:text-white">
          <FaCalendarCheck className="cursor-pointer" />
          <Link to="/admin/bookings">Bookings</Link>
        </div>
        <div className="text-white text-[20px] font-normal flex items-center space-x-2 hover:font-medium hover:text-white">
          <FaTicketAlt className="cursor-pointer" />
          <Link to="/admin/ticketing">Ticketing</Link>
        </div>
      </div>
      <div className="w-[80%] max-h-[100vh] bg-blue-700">
        <Routes path="/*">
            <Route path="/categories" element={<AdminCategories/>}/>
            <Route path="/rooms" element={<AdminRooms/>}/>
            <Route path="/users" element={<AdminUsers/>}/>
            <Route path="/feedback" element={<AdminFeedback/>}/>
            <Route path="/galleryitems" element={<AdminGalleryItem/>}/>
            <Route path="/bookings" element={<AdminBooking/>}/>
            <Route path="/ticketing" element={<AdminTicketing/>}/>
        </Routes>
      </div>
    </div>
  );
}
