import React from "react";
import { IoIosArrowForward } from "react-icons/io";
import { IoPersonSharp } from "react-icons/io5";

const RoomCard = ({ image, price, rating, maxGuests, description }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg m-4 border-2 border-transparent cursor-pointer hover:scale-105 hover:border-amber-500 hover:shadow-2xl transition-transform duration-300 relative group">
      {/* Image with subtle rotation on hover */}
      <div className="overflow-hidden">
        <img
          className="w-full h-60 object-cover transition-transform duration-300 group-hover:scale-105"
          src={image}
          alt="Room"
        />
      </div>

      {/* Content */}
      <div className="px-6 py-4">
        <div className="flex justify-between">
            <div className="font-bold text-xl mb-2">${price} / night</div>
            <div className="font-bold text-xl mb-2 flex items-center"><IoPersonSharp className="mr-4"/><p className="text-blue-700">{maxGuests}</p></div>
        </div>
        <div className="flex items-center mb-2">
          <span className="text-yellow-500">
            {"★".repeat(rating)}
            {"☆".repeat(5 - rating)}
          </span>
          <span className="ml-2 text-gray-600">{rating} Stars</span>
        </div>
        <p className="text-gray-700 text-base">{description}</p>
      </div>

      {/* Book Now Button with hover effects */}
      <div className="px-6 pt-4 pb-4">
        <a href="#booking">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-transform duration-300 transform group-hover:scale-110">
            Book Now
          </button>
        </a>
      </div>
    </div>
  );
};

export default function AllRooms() {
    const [rooms, setRooms] = useState([]);
  const [roomIsLoading, setRoomIsLoading] = useState(false);

  useEffect(()=>{
    if(!roomIsLoading){
      axios.get(import.meta.env.VITE_BACKEND_URL+"/api/rooms/").then((res)=>{
        setRooms(res.data.result);
        setRoomIsLoading(true);
      })
    }
  }, [roomIsLoading]);

  return (
    <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-4">
      {roomData.map((room, index) => (
        <RoomCard
          key={index}
          image={room.image}
          price={room.price}
          rating={room.rating}
          maxGuests={room.maxGuests}
          description={room.description}
        />
      ))}
    </div>
  );
  }
