import { useState } from "react";
import { Client, Storage, ID } from "appwrite";
import toast from "react-hot-toast";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const client = new Client()
  .setEndpoint(import.meta.env.VITE_ENDPOINT)
  .setProject(import.meta.env.VITE_PROJECT_ID);

const storage = new Storage(client);

export default function UpdateRoomForm() {
  const location = useLocation();
  const navigate = useNavigate();

  if (location.state == null) {
    window.location.href = "/admin/rooms";
  }

  const roomData = location.state;

  const [roomId] = useState(roomData.roomId); // roomId is fixed and non-editable
  const [category, setCategory] = useState(roomData.category);
  const [maxGuests, setMaxGuests] = useState(roomData.maxGuests);
  const [available, setAvailable] = useState(roomData.available);
  const [price, setPrice] = useState(roomData.price);
  const [photos, setPhotos] = useState([]);
  const [specialDescription, setSpecialDescription] = useState(
    roomData.specialDescription
  );
  const [notes, setNotes] = useState(roomData.notes);
  const [isLoading, setIsLoading] = useState(false);

  const token = localStorage.getItem("token");

  const getFileUrl = (fileId) => {
    return `${import.meta.env.VITE_ENDPOINT}/storage/buckets/${
      import.meta.env.VITE_BUCKET_ID
    }/files/${fileId}/view?project=${import.meta.env.VITE_PROJECT_ID}`;
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
      let photoUrls = roomData.photos; // Default to existing photos if no new photos are uploaded

      if (photos.length > 0) {
        photoUrls = [];
        for (const photo of photos) {
          const response = await storage.createFile(
            import.meta.env.VITE_BUCKET_ID,
            ID.unique(),
            photo
          );
          photoUrls.push(getFileUrl(response.$id));
        }
      }

      const roomInfo = {
        category,
        maxGuests,
        available,
        price,
        photos: photoUrls,
        specialDescription,
        notes,
      };

      await axios.put(
        import.meta.env.VITE_BACKEND_URL + "/api/rooms/" + roomId,
        roomInfo,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      toast.success("Room updated successfully!");
      navigate("/admin/rooms");
    } catch (error) {
      console.error("Update failed:", error);
      toast.error("Update failed.");
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
        <h2 className="text-2xl text-black font-semibold mb-4">Update Room</h2>

        <label className="block mb-2 text-black">Room ID:</label>
        <input
          type="number"
          value={roomId}
          className="w-full p-2 mb-4 border text-black border-gray-300 rounded"
          disabled
        />

        <label className="block mb-2 text-black">Category:</label>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-2 mb-4 border text-black border-gray-300 rounded"
          required
        />

        <label className="block mb-2 text-black">Max Guests:</label>
        <input
          type="number"
          value={maxGuests}
          onChange={(e) => setMaxGuests(e.target.value)}
          className="w-full text-black p-2 mb-4 border border-gray-300 rounded"
        />

        <label className="block mb-2 text-black">Available:</label>
        <input
          type="checkbox"
          checked={available}
          onChange={(e) => setAvailable(e.target.checked)}
          className="mb-4"
        />

        <label className="block mb-2 text-black">Price($):</label>
        <input
          type="number"
          checked={price}
          onChange={(e) => setPrice(e.target.value)}
          className="mb-4"
        />

        <label className="block mb-2 text-black">Photos:</label>
        <input
          type="file"
          onChange={handlePhotoChange}
          className="w-full p-2 mb-4"
          multiple
        />

        <label className="block mb-2 text-black">Special Description:</label>
        <textarea
          value={specialDescription}
          onChange={(e) => setSpecialDescription(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 rounded text-black"
          placeholder="Special Description"
        ></textarea>

        <label className="block mb-2 text-black">Notes:</label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 rounded text-black"
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
            <span>Update Room</span>
          )}
        </button>
      </form>
    </div>
  );
}
