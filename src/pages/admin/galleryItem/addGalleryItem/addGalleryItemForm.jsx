import { useState } from "react";
import { Client, Storage, ID } from "appwrite";
import toast from "react-hot-toast";
import axios from "axios";

const client = new Client()
  .setEndpoint(import.meta.env.VITE_ENDPOINT)
  .setProject(import.meta.env.VITE_PROJECT_ID);

const storage = new Storage(client);

export default function AddGalleryItemForm() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const token = localStorage.getItem("token");

  const getFileUrl = (fileId) => {
    return `${import.meta.env.VITE_ENDPOINT}/storage/buckets/${import.meta.env.VITE_BUCKET_ID}/files/${fileId}/view?project=${import.meta.env.VITE_PROJECT_ID}`;
  };

  async function handleForm(e) {
    e.preventDefault();
    setIsLoading(true);

    if (!image) {
      console.log("No image selected");
      setIsLoading(true);
      return;
    }
    if (!token) {
        toast.error("Authentication token not found. Please log in again.");
        setIsLoading(false);
        return;
      }

    try {
      const response = await storage.createFile(
        import.meta.env.VITE_BUCKET_ID,
        ID.unique(),
        image
      );
      const fileId = response.$id;
      const imageUrl = getFileUrl(fileId);

      const categoryInfo = {
        name: name,
        description: description,
        image: imageUrl,
      };
      axios.post(
        import.meta.env.VITE_BACKEND_URL + "/api/gallery",
        categoryInfo,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      
      console.log("File uploaded successfully:", imageUrl);

      toast.success("Gallery added successfully!");
    } catch (error) {
      console.error("File upload failed:", error);
      toast.error("File upload failed.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="w-full h-[100vh] flex justify-center items-center">
      <form
        className="w-1/3 bg-white p-6 rounded shadow-lg"
        onSubmit={handleForm}
      >
        <h2 className="text-2xl font-semibold mb-4">Add New Gallery Item</h2>

        <label className="block mb-2">Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          placeholder="Category name"
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
          className="w-full p-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 flex justify-center"
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="border-white border-t-2 w-[20px] min-h-[20px] rounded-full animate-spin"></div>
          ) : (
            <span>Add Gallery Item</span>
          )}
        </button>
      </form>
    </div>
  );
}
