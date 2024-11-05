import { useState } from "react";
import { Client, Storage, ID } from "appwrite";
import toast from "react-hot-toast";

const client = new Client()
    .setEndpoint(import.meta.env.VITE_ENDPOINT)
    .setProject(import.meta.env.VITE_PROJECT_ID);

const storage = new Storage(client);

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

  async function handleForm(e) {
    e.preventDefault();
    toast.success("Form submited successfully")

    if (!image) {
      console.log("No image selected");
      return;
    }

    try {
      // Upload file to Appwrite Storage
      const response = await storage.createFile(
        import.meta.env.VITE_BUCKET_ID,  // Bucket ID
        ID.unique(),                    // Unique ID for the file
        image                           // File from the input field
      );
      console.log("File uploaded successfully:", response);
      // You can also set additional form data if needed, like name, price, etc.
    } catch (error) {
      console.error("File upload failed:", error);
    }
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
          id="uploader"
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
