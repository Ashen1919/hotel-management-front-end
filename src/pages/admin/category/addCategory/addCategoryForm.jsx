import { useState } from "react";

export default function AddCategoryForm() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [features, setFeatures] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
        setImage(e.target.files[0]);
    }
};


function handleForm(e){
    e.preventDefault();
    console.log("form submitted")
  }

  return (
    <div className="w-full h-[100vh] flex justify-center items-center">
      <form className="w-1/3 bg-white p-6 rounded shadow-lg" onSubmit={handleForm}>
        <h2 className="text-2xl font-semibold mb-4">Add New Category</h2>

        <label className="block mb-2">Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          placeholder="Category name"
          required
        />

        <label className="block mb-2">Price ($):</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          placeholder="Category price"
          required
        />

        <label className="block mb-2">Features:</label>
        <input
          type="text"
          value={features}
          onChange={(e) => setFeatures(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          placeholder="Category features"
          required
        />

        <label className="block mb-2">Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          placeholder="Category description"
          required
        ></textarea>

        <label className="block mb-2">Image:</label>
        <input
          type="file"
          onChange={handleImageChange}
          className="w-full p-2 mb-4"
          required
        />

        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600"
        >
          Add Category
        </button>
      </form>
    </div>
  );
}
