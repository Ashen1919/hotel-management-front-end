import { useEffect, useState } from "react";
import { Client, Storage, ID } from "appwrite";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";

const client = new Client()
  .setEndpoint(import.meta.env.VITE_ENDPOINT)
  .setProject(import.meta.env.VITE_PROJECT_ID);

const storage = new Storage(client);

export default function CustomerSettingPage() {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [emailVerified, setEmailVerified] = useState(false);
  const [currentImage, setCurrentImage] = useState("");
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const token = localStorage.getItem("token");
  const email = localStorage.getItem("email");

  if (token == null) {
    navigate("/login");
  }

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/api/users/" + email)
      .then((res) => {
        setFirstName(res.data.user.firstName);
        setLastName(res.data.user.lastName);
        setWhatsapp(res.data.user.whatsapp);
        setEmailVerified(res.data.user.emailVerified);
        setCurrentImage(res.data.user.profileImage);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const getFileUrl = (fileId) => {
    return `${import.meta.env.VITE_ENDPOINT}/storage/buckets/${
      import.meta.env.VITE_BUCKET_ID
    }/files/${fileId}/view?project=${import.meta.env.VITE_PROJECT_ID}`;
  };

  async function handleForm(e) {
    e.preventDefault();
    setIsLoading(true);

    try {
      let imageUrl = currentImage; // Default to existing image if no new image is uploaded

      if (image) {
        // Only upload a new file if an image is selected
        const response = await storage.createFile(
          import.meta.env.VITE_BUCKET_ID,
          ID.unique(),
          image
        );
        imageUrl = getFileUrl(response.$id);
        console.log("File uploaded successfully:", imageUrl);
      }

      const userInfo = {
        email,
        firstName,
        lastName,
        whatsapp,
        emailVerified,
        profileImage: imageUrl,
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
      navigate("/");
    } catch (error) {
      console.error("Update failed:", error);
      toast.error("Update failed.");
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <div className="w-full h-auto p-5 flex justify-center items-center">
      {/* Background Layer */}
      <div
        className="absolute inset-0 h-auto bg-cover bg-center bg-black opacity-80 blur-sm"
        style={{
          backgroundImage:
            'url("https://cloud.appwrite.io/v1/storage/buckets/672a1e700037c646954e/files/6758fe3b003409d50e55/view?project=672a1dc2000b4396bb7d&project=672a1dc2000b4396bb7d&mode=admin")',
        }}
      ></div>
      {/* Back Button */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-4 left-4 items-center text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-70 hidden lg:flex"
      >
        <AiOutlineArrowLeft className="text-xl" />
        <span className="ml-2 text-sm font-medium">Back</span>
      </button>

      {/* Form Container */}
      <div className="w-[800px] h-auto flex flex-row md:flex-col rounded-xl bg-gray-700 text-black shadow-xl relative">
        <form
          className="w-full bg-gray-700 text-black p-6 rounded-xl shadow-lg"
          onSubmit={handleForm}
        >
          <div className="flex flex-col justify-center mt-5 items-center">
            <div className="relative flex justify-center items-center">
              {/* Profile Image */}
              <img
                src={currentImage}
                alt="User Profile"
                className="w-[300px] h-auto rounded-full border-4 border-gray-200 shadow-lg"
              />

              {/* Plus Button */}
              <label
                htmlFor="image-upload"
                className="absolute bottom-0 right-0 w-[50px] h-[50px] bg-blue-500 text-white flex items-center justify-center rounded-full cursor-pointer shadow-lg hover:bg-blue-600"
                title="Update Profile Picture"
              >
                +
              </label>

              {/* Hidden File Input */}
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>

            <div className="mt-6 flex flex-col md:flex-row justify-between w-full text-gray-700">
              {/* Email Field */}
              <div className="flex flex-col space-y-3 md:space-y-1 w-full md:w-[50%] ml-5">
                <label
                  htmlFor="email"
                  className="text-xl font-semibold text-white"
                >
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  name="email"
                  id="email"
                  placeholder="Email"
                  disabled
                  className="p-3 rounded-xl text-lg w-[90%] border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                />
              </div>

              {/* First Name Field */}
              <div className="flex flex-col space-y-3 md:space-y-1 w-full md:w-[50%] md:mt-0 mt-5 ml-5 mr-5">
                <label
                  htmlFor="firstName"
                  className="text-xl font-semibold text-white"
                >
                  First Name
                </label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  name="firstName"
                  id="firstName"
                  placeholder="First Name"
                  className="p-3 rounded-xl text-lg w-[90%] border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>

            <div className="mt-6 flex flex-col md:flex-row justify-between w-full text-gray-700">
              {/* Last Name Field */}
              <div className="flex flex-col space-y-3 md:space-y-1 w-full md:w-[50%] ml-5">
                <label
                  htmlFor="lastName"
                  className="text-xl font-semibold text-white"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  name="lastName"
                  id="lastName"
                  placeholder="Last Name"
                  className="p-3 rounded-xl text-lg w-[90%] border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                />
              </div>

              {/* WhatsApp Field */}
              <div className="flex flex-col space-y-3 md:space-y-1 w-full md:w-[50%] md:mt-0 mt-5 ml-5 mr-5">
                <label
                  htmlFor="whatsapp"
                  className="text-xl font-semibold text-white"
                >
                  WhatsApp
                </label>
                <input
                  type="text"
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  name="whatsapp"
                  id="whatsapp"
                  placeholder="WhatsApp"
                  className="p-3 rounded-xl text-lg w-[90%] border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>

            <div className="mt-6 flex flex-col md:flex-row justify-between w-full text-gray-700">
              {/* Email Verified */}
              <div className="flex items-center w-full md:w-[50%] ml-5 space-x-3">
                <label
                  htmlFor="emailVerified"
                  className="text-lg font-semibold text-white"
                >
                  Email Verified
                </label>
                {emailVerified ? (
                  <button
                    type="button"
                    className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600"
                  >
                    Verified
                  </button>
                ) : (
                  <button
                    type="button"
                    className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                  >
                    Not Verified
                  </button>
                )}
              </div>

              {/* Submit Button */}
              <div className="w-[50%] md:ml-0 ml-5 md:mt-0 mt-5 mr-14 flex md:justify-end">
                <button
                  type="submit"
                  className="px-6 py-2 text-lg bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-500"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="border-white border-t-2 w-6 h-6 rounded-full animate-spin"></div>
                  ) : (
                    "Update User"
                  )}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
