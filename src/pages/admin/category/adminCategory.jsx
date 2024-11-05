import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

export default function CategoriesPage() {
  const token = localStorage.getItem("token");

  if (token == null) {
    window.location.href = "/login";
  }

  const [categories, setCategories] = useState([]);
  const [categoriesIsLoaded, setCategoriesIsLoaded] = useState(false);

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
        .delete(import.meta.env.VITE_BACKEND_URL + "/api/category/" + name , {
          headers : {
            Authorization : "Bearer" + token
          }
        })
        .then((res) => {
          setCategoriesIsLoaded(false);
        })
        .catch((err) => {
          console.error("Failed to delete category:", err);
        });
    }
  }

  return (
    <div className="p-4 w-full">
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
                <button className="bg-blue-500 p-1 text-white rounded-sm hover:bg-blue-600 space-x-2">
                  <FaEdit />
                </button>
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
