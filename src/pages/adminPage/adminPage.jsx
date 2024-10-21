import { Link, Route, Routes } from "react-router-dom";

export default function AdminPage(){
    return(
        <div className="w-full max-h-[100vh] overflow-hidden flex">
            <div className="w-[20%] h-[100vh] bg-red-800 flex flex-col">
                <div className="text-white text-[20px] hover:text-black ">
                    <Link to="/admin/bookings">Bookings</Link>
                </div>
                <div className="text-white text-[20px]  hover:text-black">
                    <Link to="/admin/rooms">Rooms</Link>
                </div>
                <div className="text-white text-[20px]  hover:text-black">
                    <Link to="/admin/bookings">Bookings</Link>
                </div>
                <div className="text-white text-[20px]  hover:text-black">
                    <Link to="/admin/bookings">Bookings</Link>
                </div>
                <div className="text-white text-[20px]  hover:text-black">
                    <Link to="/admin/bookings">Bookings</Link>
                </div>
                <div className="text-white text-[20px]  hover:text-black">
                    <Link to="/admin/bookings">Bookings</Link>
                </div>
                <div className="text-white text-[20px]  hover:text-black">
                    <Link to="/admin/bookings">Bookings</Link>
                </div>

            </div>
            <div className="w-[80%] bg-blue-700">

            </div>
        </div>
    )
}