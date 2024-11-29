import { useState, useEffect } from "react";
import { Client, Storage, ID } from "appwrite";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const client = new Client()
  .setEndpoint(import.meta.env.VITE_ENDPOINT)
  .setProject(import.meta.env.VITE_PROJECT_ID);

const storage = new Storage(client);

export default function AddRoomForm() {
  const navigate = useNavigate();
  const [roomId, setRoomId] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]); 
  const [maxGuests, setMaxGuests] = useState(3);
  const [available, setAvailable] = useState(true);
  const [photos, setPhotos] = useState([]);
  const [specialDescription, setSpecialDescription] = useState("");
  const [notes, setNotes] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(import.meta.env.VITE_BACKEND_URL + "/api/category");
        setCategories(response.data.categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const getFileUrl = (fileId) => {
    return `${import.meta.env.VITE_ENDPOINT}/storage/buckets/${import.meta.env.VITE_BUCKET_ID}/files/${fileId}/view?project=${import.meta.env.VITE_PROJECT_ID}`;
  };

  const handlePhotoChange = (e) => {
    if (e.target.files) {
      setPhotos(Array.from(e.target.files));
    }
  };

  async function handleForm(e) {
    e.preventDefault();
    setIsLoading(true);

    try {
      const photoUrls = [];
      for (const photo of photos) {
        const response = await storage.createFile(
          import.meta.env.VITE_BUCKET_ID,
          ID.unique(),
          photo
        );
        photoUrls.push(getFileUrl(response.$id));
      }

      const roomInfo = {
        roomId: parseInt(roomId, 10),
        category,
        maxGuests,
        available,
        photos: photoUrls,
        specialDescription,
        notes,
      };

      await axios.post(import.meta.env.VITE_BACKEND_URL + "/api/rooms", roomInfo, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      toast.success("Room added successfully!");
      navigate("/rooms");
    } catch (error) {
      console.error("Failed to add room:", error);
      toast.error("Failed to add room.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="w-full h-[100vh] flex justify-center items-center text-black">
      <form
        className="w-1/3 bg-white p-6 rounded shadow-lg"
        onSubmit={handleForm}
      >
        <h2 className="text-2xl font-semibold mb-4">Add New Room</h2>

        <label className="block mb-2">Room ID:</label>
        <input
          type="number"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          placeholder="Room ID"
          required
        />

        <label className="block mb-2">Category:</label>
        <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 mb-4 border border-gray-300 rounded"
            placeholder= "Category"
          >
            <option value="">Select</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>

        <label className="block mb-2">Max Guests:</label>
        <input
          type="number"
          value={maxGuests}
          onChange={(e) => setMaxGuests(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          placeholder="Maximum Guests"
        />

        <label className="block mb-2">Available:</label>
        <input
          type="checkbox"
          checked={available}
          onChange={(e) => setAvailable(e.target.checked)}
          className="mb-4"
        />

        <label className="block mb-2">Photos:</label>
        <input
          type="file"
          onChange={handlePhotoChange}
          className="w-full p-2 mb-4"
          multiple
        />

        <label className="block mb-2">Special Description:</label>
        <textarea
          value={specialDescription}
          onChange={(e) => setSpecialDescription(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          placeholder="Special Description"
        ></textarea>

        <label className="block mb-2">Notes:</label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          placeholder="Notes"
        ></textarea>

        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 flex justify-center"
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="border-white border-t-2 w-[20px] min-h-[20px] rounded-full animate-spin"></div>
          ) : (
            <span>Add Room</span>
          )}
        </button>
      </form>
    </div>
  );
}
