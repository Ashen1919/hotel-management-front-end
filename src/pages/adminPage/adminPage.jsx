import { Link, Route, Routes } from "react-router-dom";

export default function AdminPage(){
    return(
        <div className="w-full h-[100vh] bg-green-800">
            <h1 className="text-white text-[50px] right-0">Hii Admin</h1>
            <Link className="mr-8" to={"/admin/rooms"}>Rooms</Link>
            <Link className="mr-8" to={"/admin/booking"}>Booking</Link>
            <Routes path="/*">
                <Route path="/rooms" element = {
                    <div className="bg-red-600 w-full h-[600vh]">
                        <h1 className="text-white text-[30px] text-center">Rooms</h1>
                    </div>
                }/>
                <Route path="/booking" element = {
                    <div className="bg-red-600 w-full h-[600vh]">
                        <h1 className="text-white text-[30px] text-center">Booking</h1>
                    </div>
                }/>
            </Routes>
        </div>
    )
}