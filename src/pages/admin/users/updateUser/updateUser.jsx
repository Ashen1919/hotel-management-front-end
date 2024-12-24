import { useState } from "react";
import { Client, Storage, ID } from "appwrite";
import toast from "react-hot-toast";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const client = new Client()
  .setEndpoint(import.meta.env.VITE_ENDPOINT)
  .setProject(import.meta.env.VITE_PROJECT_ID);

const storage = new Storage(client);

export default function UpdateUser() {
  const location = useLocation();
  const navigate = useNavigate();

  if (!location.state) {
    window.location.href = "/admin/users";
    return null;
  }

  const userData = location.state;

  const [email, setEmail] = useState(userData.email);
  const [firstName, setFirstName] = useState(userData.firstName);
  const [lastName, setLastName] = useState(userData.lastName);
  const [whatsapp, setWhatsapp] = useState(userData.whatsapp);
  const [disabled, setDisabled] = useState(userData.disabled);
  const [emailVerified, setEmailVerified] = useState(userData.emailVerified);
  const [profileImage, setProfileImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const token = localStorage.getItem("token");

  const getFileUrl = (fileId) => {
    return `${import.meta.env.VITE_ENDPOINT}/storage/buckets/${
      import.meta.env.VITE_BUCKET_ID
    }/files/${fileId}/view?project=${import.meta.env.VITE_PROJECT_ID}`;
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setProfileImage(e.target.files[0]);
    }
  };

  async function handleForm(e) {
    e.preventDefault();
    setIsLoading(true);

    try {
      let profileImageUrl = userData.profileImage;

      if (profileImage) {
        const response = await storage.createFile(
          import.meta.env.VITE_BUCKET_ID,
          ID.unique(),
          profileImage
        );
        profileImageUrl = getFileUrl(response.$id);
      }

      const userInfo = {
        email,
        firstName,
        lastName,
        whatsapp,
        disabled,
        emailVerified,
        profileImage: profileImageUrl,
      };

      await axios.put(
        import.meta.env.VITE_BACKEND_URL + "/api/users/" + email,
        userInfo,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      toast.success("User updated successfully!");
      navigate("/admin/users");
    } catch (error) {
      console.error("Update failed:", error);
      toast.error("Update failed.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="w-full h-[130vh] flex justify-center items-center">
      <form
        className="w-1/3 bg-white p-6 rounded shadow-lg"
        onSubmit={handleForm}
      >
        <h2 className="text-2xl text-black font-semibold mb-4">Update User</h2>

        <label className="block mb-2 text-black">Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          required
        />

        <label className="block mb-2 text-black">First Name:</label>
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          required
        />

        <label className="block mb-2 text-black">Last Name:</label>
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          required
        />

        <label className="block mb-2 text-black">WhatsApp:</label>
        <input
          type="text"
          value={whatsapp}
          onChange={(e) => setWhatsapp(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          required
        />

        <label className="block mb-2 text-black">Disabled:</label>
        <input
          type="checkbox"
          checked={disabled}
          onChange={(e) => setDisabled(e.target.checked)}
          className="mb-4"
        />

        <label className="block mb-2 text-black">Email Verified:</label>
        <input
          type="checkbox"
          checked={emailVerified}
          onChange={(e) => setEmailVerified(e.target.checked)}
          className="mb-4"
        />

        <label className="block mb-2 text-black">Profile Image:</label>
        <input
          type="file"
          onChange={handleImageChange}
          className="w-full p-2 mb-4"
        />

        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 flex justify-center"
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="border-white border-t-2 w-[20px] min-h-[20px] rounded-full animate-spin"></div>
          ) : (
            <span>Update User</span>
          )}
        </button>
      </form>
    </div>
  );
}
