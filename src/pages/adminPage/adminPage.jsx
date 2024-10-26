import { Link, Route, Routes } from "react-router-dom";
import { FaRegBookmark, FaDoorOpen, FaUsers, FaComments, FaImages, FaCalendarCheck, FaTicketAlt } from "react-icons/fa";

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
            <Route path="/categories" element={<h1>Categories</h1>}/>
            <Route path="/rooms" element={<h1>Rooms</h1>}/>
            <Route path="/users" element={<h1>Users</h1>}/>
            <Route path="/feedback" element={<h1>Feedback</h1>}/>
            <Route path="/galleryitems" element={<h1>Galley Items</h1>}/>
            <Route path="/bookings" element={<h1>Bookings</h1>}/>
            <Route path="/ticketing" element={<h1>Ticketing</h1>}/>
        </Routes>
      </div>
    </div>
  );
}
