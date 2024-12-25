import axios from "axios";
import React, { useEffect, useState } from "react";

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [categoriesIsLoaded, setCategoriesIsLoaded] = useState(false);

  useEffect(() => {
    if (!categoriesIsLoaded) {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/category/")
        .then((res) => {
          setCategories(res.data.categories);
          setCategoriesIsLoaded(true);
        });
    }
  }, [categoriesIsLoaded]);

  function deleteItem(name) {
    if (
      window.confirm(
        "Are you sure? Do you want to delete " + name + " category?"
      )
    ) {
      axios
        .delete(import.meta.env.VITE_BACKEND_URL + "/api/category/" + name)
        .then((res) => {
          setCategoriesIsLoaded(false);
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
                <button
                  className="bg-red-500 p-1 text-white rounded-sm hover:bg-red-600 w-20 "
                  onClick={() => deleteItem(category.name)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="block w-full h-auto bg-gray-200">
        <div className="w-full pl-5 pr-5" id="booking">
          <div className="flex flex-col md:flex-row md:items-center md:justify-start bg-white shadow-lg p-4 space-y-4 md:space-y-0 border-[7px] border-sky-500">
            <div className="flex flex-col md:flex-row md:flex-wrap md:justify-between space-y-3 w-full">
              <div className="md:flex md:flex-row w-full">
                {/* Check-in Date */}
                <div className="flex flex-col md:flex-row gap-3 mt-3 md:mt-0 md:gap-7 md:border-r-[7px] md:border-sky-500 md:items-center w-full md:w-1/3">
                  <label className="text-black text-lg font-semibold w-24">
                    Check-in
                  </label>
                  <DatePicker
                    selected={checkInDate}
                    onChange={(date) => setCheckInDate(date)}
                    selectsStart
                    startDate={checkInDate}
                    endDate={checkOutDate}
                    className="border-2 border-gray-400 rounded-lg p-2 w-full"
                    placeholderText="Select date"
                  />
                </div>

                {/* Check-out Date */}
                <div className="flex flex-col md:flex-row mt-3 md:mt-0 gap-3 md:gap-7 md:items-center md:border-r-[7px] md:border-sky-500 w-full md:w-1/3 ml-0 md:ml-8">
                  <label className="text-black text-lg font-semibold w-24">
                    Check-out
                  </label>
                  <DatePicker
                    selected={checkOutDate}
                    onChange={(date) => setCheckOutDate(date)}
                    selectsEnd
                    startDate={checkInDate}
                    endDate={checkOutDate}
                    minDate={checkInDate}
                    className="border-2 border-gray-400 rounded-lg p-2 w-full"
                    placeholderText="Select date"
                  />
                </div>

                {/* Max Guests */}
                <div className="flex flex-col md:flex-row gap-3 mt-3 md:mt-0 md:gap-7 md:items-center w-full md:w-1/3 ml-0 md:ml-8">
                  <label className="text-black text-lg font-semibold w-40">
                    Max Guests
                  </label>
                  <select className="border-2 border-gray-400 rounded-lg p-2 w-full">
                    <option value="">Select</option>
                    {[1, 2, 3, 4].map((maxG) => (
                      <option key={maxG} value={maxG}>
                        {maxG}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Search Button */}
            <div className="flex justify-center md:w-[120px] md:mr-3 md:ml-3 md:flex-col md:border-l-[7px] md:border-sky-500">
              <button
                className="bg-blue-500 text-white px-5 mt-3 md:mt-0 py-3 md:ml-5 justify-center items-center gap-3 flex rounded-lg w-full hover:bg-blue-600 transition duration-300"
                onClick={handleSearchBtn}
              >
                <FaSearch className="md:hidden" /> Search
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
