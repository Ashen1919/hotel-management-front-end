import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

export default function AdminUsers() {
  const token = localStorage.getItem("token");

  if (token == null) {
    window.location.href = "/login";
  }

  const [user, setUser] = useState([]);
  const [userIsLoaded, setUserIsLoaded] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!userIsLoaded) {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/users/")
        .then((res) => {
            console.log("API Response:", res.data);
            setUser(res.data.result || []);
            setUserIsLoaded(true);
        })
        .catch((err) => {
          console.error("Failed to load users:", err);
        });
    }
  }, [userIsLoaded]);

  function deleteUser(email) {
    if (window.confirm("Are you sure you want to delete this user")) {
      axios
        .delete(import.meta.env.VITE_BACKEND_URL + "/api/users/" + email, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then(() => {
          toast.success("User deleted successfully");
          setUserIsLoaded(false);
        })
        .catch((err) => {
          toast.error("Failed to delete user");
          console.error(err);
        });
    }
  }

  return (
    <div className="p-4 w-full text-black">
      <table className="w-full bg-white border border-gray-400 text-left">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border border-gray-300 text-black">Email</th>
            <th className="p-2 border border-gray-300 text-black">First Name</th>
            <th className="p-2 border border-gray-300 text-black">Last Name</th>
            <th className="p-2 border border-gray-300 text-black">Type</th>
            <th className="p-2 border border-gray-300 text-black">Whatsapp</th>
            <th className="p-2 border border-gray-300 text-black">Email Verified</th>
            <th className="p-2 border border-gray-300 text-black">Profile</th>
          </tr>
        </thead>
        <tbody>
          {user.map((user) => (
            <tr key={user.email} className="hover:bg-gray-100">
              <td className="p-2 border border-gray-300 text-black">{user.email}</td>
              <td className="p-2 border border-gray-300 text-black">{user.firstName}</td>
              <td className="p-2 border border-gray-300 text-black">{user.lastName}</td>
              <td className="p-2 border border-gray-300 text-black">{user.type}</td>
              <td className="p-2 border border-gray-300 text-black">{user.whatsapp}</td>
              <td className="p-2 border border-gray-300 text-black">
                {user.emailVerified ? "Yes" : "No"}
              </td>
              <td className="p-2 border border-gray-300 text-black">{user.profileImage}</td>
              <td className="p-2 border border-gray-300">
                <Link
                  to={`/admin/update-users`}
                  className="bg-blue-500 p-1 text-white rounded-sm hover:bg-blue-600 inline-flex items-center space-x-1 mr-2"
                  state={user}
                >
                  <FaEdit />
                </Link>
                <button
                  className="bg-red-500 p-1 text-white rounded-sm hover:bg-red-600"
                  onClick={() => deleteUser(user.email)}
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
