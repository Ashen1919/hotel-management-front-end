import axios from "axios";
import { useEffect, useState } from "react";

function UserTag(props) {
  const [name, setName] = useState("");
  const [userFound, setUserFound] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/users/", {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          setName(res.data.user.firstName + " " + res.data.user.lastName);
          setUserFound(true);
        })
        .catch((err) => {
          console.log("Error fetching user data:", err);
          setUserFound(false);
        });
    } else {
      setName("");
    }
  }, []);

  return (
    userFound && (
      <div className="absolute right-0 flex items-center cursor-pointer">
        <img
          className="rounded-full w-[75px] h-[69px]"
          src={props.imageLink}
          alt="User"
        />
        <span className="text-white ml-[7px] text-xl mr-[7px]">{name}</span>
        <button
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition duration-300 mr-4 ml-2"
          onClick={() => {
            localStorage.removeItem("token");
            setUserFound(false);
            window.location.reload(); // Reload to reset the logged-in state
          }}
        >
          Logout
        </button>
      </div>
    )
  );
}

export default UserTag;
