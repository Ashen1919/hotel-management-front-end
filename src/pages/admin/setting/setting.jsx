import { useEffect, useState } from "react";
import { Client, Storage, ID } from "appwrite";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const client = new Client()
  .setEndpoint(import.meta.env.VITE_ENDPOINT)
  .setProject(import.meta.env.VITE_PROJECT_ID);

const storage = new Storage(client);

export default function SettingPage() {
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

  useEffect(()=>{
    axios.get(import.meta.env.VITE_BACKEND_URL + "/api/users/" + email)
    .then((res)=>{
        setFirstName(res.data.user.firstName);
        setLastName(res.data.user.lastName);
        setWhatsapp(res.data.user.whatsapp);
        setEmailVerified(res.data.user.emailVerified);
        setCurrentImage(res.data.user.profileImage);
    }).catch((err)=>{
        console.log(err.message);
    })
  })

  const getFileUrl = (fileId) => {
    return `${import.meta.env.VITE_ENDPOINT}/storage/buckets/${
      import.meta.env.VITE_BUCKET_ID
    }/files/${fileId}/view?project=${import.meta.env.VITE_PROJECT_ID}`;
  };

  async function handleForm(e) {
    e.preventDefault();
    setIsLoading(true);

    try {
      let imageUrl = location.state.image; // Default to existing image if no new image is uploaded

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
        imageUrl,
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
    <div className="w-full h-auto p-5 flex justify-center items-center">
      <div className="w-[800px] h-[100vh] flex flex-col rounded-xl bg-gray-200">
        <form
          className="w-full bg-white p-6 rounded shadow-lg"
          onSubmit={handleForm}
        >
          <div className="flex flex-col justify-center mt-5 items-center">
            <div className="relative flex justify-center items-center">
              {/* Profile Image */}
              <img
                src={currentImage}
                alt="User Profile"
                className="w-[300px] h-[300px] rounded-full"
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
            <div className="mt-6 flex flex-row justify-between w-full text-black">
              <div className="flex flex-col space-y-1 w-[50%] ml-5 ">
                <label
                  htmlFor="email"
                  className="text-2xl font-semibold items-center flex"
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
                  className="p-3 rounded-xl text-lg w-[90%] border-2 border-gray-400 focus:border-blue-600 outline-none"
                />
              </div>
              <div className="flex flex-col space-y-1 w-[50%] ml-5 mr-5">
                <label
                  htmlFor="email"
                  className="text-2xl font-semibold items-center flex"
                >
                  First Name
                </label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  name="Name"
                  id="Name"
                  placeholder="FirstName"
                  className="p-3 rounded-xl w-[90%] text-lg border-2 border-gray-400 focus:border-blue-600 outline-none"
                />
              </div>
            </div>
            <div className="mt-6 flex flex-row justify-between w-full text-black">
              <div className="flex flex-col space-y-1 w-[50%] ml-5 ">
                <label
                  htmlFor="email"
                  className="text-2xl font-semibold items-center flex"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  name="LastName"
                  id="LastName"
                  placeholder="Last Name"
                  className="p-3 rounded-xl text-lg w-[90%] border-2 border-gray-400 focus:border-blue-600 outline-none"
                />
              </div>
              <div className="flex flex-col space-y-1 w-[50%] ml-5 mr-5">
                <label
                  htmlFor="email"
                  className="text-2xl font-semibold items-center flex"
                >
                  Whatsapp
                </label>
                <input
                  type="text"
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  name="whatsapp"
                  id="whatsapp"
                  placeholder="Whatsapp"
                  className="p-3 rounded-xl w-[90%] text-lg border-2 border-gray-400 focus:border-blue-600 outline-none"
                />
              </div>
            </div>
            <div className="mt-6 flex flex-row justify-between w-full text-black">
              <div className="mt-6 flex flex-row justify-between w-full text-black">
                <div className="flex flex-row items-center w-[50%] ml-5 space-x-3">
                  <label
                    htmlFor="emailVerified"
                    className="text-xl font-semibold flex items-center"
                  >
                    Email Verified
                  </label>

                  {/* Conditional Button */}
                  {emailVerified ? (
                    <button
                      type="button"
                      className="bg-green-500 text-white px-2 py-1 rounded-md hover:bg-green-600 transition"
                    >
                      Verified
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600 transition"
                    >
                      Not Verified
                    </button>
                  )}
                </div>
                <div className="w-[50%] mr-5">
                  <button
                    type="submit"
                    className="w-[70%] text-lg mt-3 p-2 bg-blue-500 text-white items-center font-semibold rounded hover:bg-blue-600 flex justify-center"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="border-white border-t-2 w-[20px] min-h-[20px] rounded-full animate-spin"></div>
                    ) : (
                      <span>Update User</span>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
