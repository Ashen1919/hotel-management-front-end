import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

export default function AdminGalleryItem() {
  const token = localStorage.getItem("token");

  if (token == null) {
    window.location.href = "/login";
  }

  const [galleryItems, setGalleryItems] = useState([]);
  const [galleryIsLoaded, setGalleryIsLoaded] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!galleryIsLoaded) {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/gallery/")
        .then((res) => {
          setGalleryItems(res.data.list);
          setGalleryIsLoaded(true);
        })
        .catch((err) => {
          console.error("Failed to load gallery items:", err);
        });
    }
  }, [galleryIsLoaded]);

  function deleteItem(name) {
    if (window.confirm("Are you sure? Do you want to delete " + name + " item")) {
      axios
        .delete(import.meta.env.VITE_BACKEND_URL + "/api/gallery/" + name, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((res) => {
          toast.success("Gallery item deleted successfully");
          setGalleryIsLoaded(false);
        })
        .catch((err) => {
          toast.error("Failed to delete gallery item");
        });
    }
  }

  function handlePlusClick() {
    navigate("/admin/add-gallery-item");
  }

  return (
    <div className="p-4 w-full text-black">
      <button
        className="w-[60px] h-[60px] bg-red-600 rounded-full justify-center items-center flex text-2xl bottom-5 right-5 fixed"
        onClick={handlePlusClick}
      >
        <FaPlus color="white" />
      </button>
      <table className="w-full bg-white border border-gray-400 text-left">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border border-gray-300">Name</th>
            <th className="p-2 border border-gray-300">Description</th>
            <th className="p-2 border border-gray-300">Image</th>
            <th className="p-2 border border-gray-300">Action</th>
          </tr>
        </thead>
        <tbody>
          {galleryItems.map((item) => (
            <tr key={item.name} className="hover:bg-gray-100">
              <td className="p-2 border border-gray-300">{item.name}</td>
              <td className="p-2 border border-gray-300">{item.description}</td>
              <td className="p-2 border border-gray-300">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover"
                />
              </td>
              <td className="p-2 border border-gray-300">
                <Link
                  to={`/admin/update-gallery-item/`}
                  className="bg-blue-500 p-1 text-white rounded-sm hover:bg-blue-600 inline-flex items-center space-x-1 mr-2"
                  state={item}
                >
                  <FaEdit />
                </Link>

                <button
                  className="bg-red-500 p-1 text-white rounded-sm hover:bg-red-600 w-auto"
                  onClick={() => deleteItem(item.name)}
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
