import { AiOutlineArrowLeft } from "react-icons/ai";

export default function CategoriesPage() {
  return (
    <div className="w-full h-auto p-5 flex flex-col justify-center items-center">
      {/* Back Button */}
      <button className="absolute top-4 left-4 items-center text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-70 hidden lg:flex">
        <AiOutlineArrowLeft className="text-xl" />
        <span className="ml-2 text-sm font-medium">Back</span>
      </button>
      <div className="mt-10 w-full h-auto p-5 flex flex-col justify-center items-center relative">
        <p className="font-bold text-3xl relative left-4 mb-5">Your Bookings</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mr-10 w-full h-auto justify-between">
          <div className="ml-5 p-4 justify-between mr-5 w-full h-auto flex flex-col bg-gray-900 rounded-xl">
            <div className="w-full h-auto flex flex-row">
              <div className="flex flex-col mt-2 space-y-10 w-[50%] text-white font-semibold">
                <p className="text-red-600 flex flex-row">
                  Booking ID:<p className="text-white ml-3">1003</p>{" "}
                </p>
                <p className="text-red-600 flex flex-row">
                  Room ID: <p className="text-white ml-3">1003</p>{" "}
                </p>
                <p className="text-red-600 flex flex-row">
                  Email <p className="text-white ml-3">1003</p>{" "}
                </p>
              </div>
              <div className="flex flex-col mt-2 space-y-10 w-[50%] text-white font-semibold">
                <p className="text-red-600 flex flex-row">
                  Check In Date: <p className="text-white ml-3">1003</p>{" "}
                </p>
                <p className="text-red-600 flex flex-row">
                  Check Out Date: <p className="text-white ml-3">1003</p>{" "}
                </p>
                <p className="text-red-600 flex flex-row">
                  Status: <p className="text-white ml-3">1003</p>{" "}
                </p>
              </div>
            </div>
            <hr className="text-white font-semibold mt-3 mb-3" />
            <div className="w-full flex flex-row text-white font-semibold">
              <p className="text-red-600 flex flex-row">
                Reason: <p className="text-white ml-3"></p>{" "}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
