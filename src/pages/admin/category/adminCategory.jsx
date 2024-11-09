import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

export default function CategoriesPage() {
  const token = localStorage.getItem("token");

  if (token == null) {
    window.location.href = "/login";
  }

  const [categories, setCategories] = useState([]);
  const [categoriesIsLoaded, setCategoriesIsLoaded] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!categoriesIsLoaded) {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/category/")
        .then((res) => {
          setCategories(res.data.categories);
          setCategoriesIsLoaded(true);
        })
        .catch((err) => {
          console.error("Failed to load categories:", err);
        });
    }
  }, [categoriesIsLoaded]);

  function deleteItem(name) {
    if (
      window.confirm(
        "Are you sure? Do you want to delete " + name + " category"
      )
    ) {
      axios
        .delete(import.meta.env.VITE_BACKEND_URL + "/api/category/" + name, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((res) => {
          toast.success("Category deleted successfully");
          setCategoriesIsLoaded(false);
        })
        .catch((err) => {
          toast.error("Failed to delete Category");
        });
    }
  }

  function handlePlusClick() {
    navigate("/admin/add-categories");
  }

  return (
    <div className="p-4 w-full">
      <button
        className="w-[60px] h-[60px] bg-red-600 rounded-full justify-center items-center flex text-2xl bottom-5 right-5 fixed"
        onClick={() => {
          handlePlusClick();
        }}
      >
        <FaPlus color="white" />
      </button>
      <table className="w-full bg-white border border-gray-400 text-left">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border border-gray-300">Name</th>
            <th className="p-2 border border-gray-300">Description</th>
            <th className="p-2 border border-gray-300">Price($)</th>
            <th className="p-2 border border-gray-300">Image</th>
            <th className="p-2 border border-gray-300">Features</th>
            <th className="p-2 border border-gray-300">Action</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.name} className="hover:bg-gray-100">
              <td className="p-2 border border-gray-300">{category.name}</td>
              <td className="p-2 border border-gray-300">
                {category.description}
              </td>
              <td className="p-2 border border-gray-300">{category.price}</td>
              <td className="p-2 border border-gray-300">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-16 h-16 object-cover"
                />
              </td>
              <td className="p-2 border border-gray-300">
                {category.features.join(", ")}
              </td>
              <td className="p-2 border border-gray-300">
                <Link
                  to={`/admin/update-category/`}
                  className="bg-blue-500 p-1 text-white rounded-sm hover:bg-blue-600 inline-flex items-center space-x-1 mr-2"
                  state={category}
                >
                  <FaEdit />
                </Link>

                <button
                  className="bg-red-500 p-1 text-white rounded-sm hover:bg-red-600 w-auto"
                  onClick={() => deleteItem(category.name)}
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
