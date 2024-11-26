import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AiOutlineMail, AiOutlineLock, AiOutlineWhatsApp, AiOutlineArrowLeft } from "react-icons/ai";
import { BsPerson } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Client, Storage, ID } from "appwrite";

const client = new Client()
  .setEndpoint(import.meta.env.VITE_ENDPOINT)
  .setProject(import.meta.env.VITE_PROJECT_ID);

const storage = new Storage(client);

export default function SignUpPage() {
  const navigate = useNavigate();
  const [firstName, setName] = useState("");
  const [lastName, setLName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConPassword] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [image, setImage] = useState(null);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const getFileUrl = (fileId) => {
    return `${import.meta.env.VITE_ENDPOINT}/storage/buckets/${import.meta.env.VITE_BUCKET_ID}/files/${fileId}/view?project=${import.meta.env.VITE_PROJECT_ID}`;
  };

  const handleChange = (e) => {
    if (e.target.name === "termsAccepted") {
      setTermsAccepted(e.target.checked);
    }
  };

  async function handleForm(e) {
    e.preventDefault();
    setIsLoading(true);

    if (!termsAccepted) {
      toast.error("Please accept the Terms of Use and Privacy Policy.");
      setIsLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match please try again!");
      setIsLoading(false);
      return;
    }

    if (!image) {
      toast.error("Please upload a profile picture.");
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

      const signUpInfo = {
        firstName,
        lastName,
        email,
        password,
        whatsapp,
        profileImage: imageUrl,
      };

      const apiResponse = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/api/users/signup",
        signUpInfo
      );
      
        toast.success("User created successfully!");
        navigate("/login");
      
    } catch (error) {
      console.error("Signup failed:", error);
      toast.error("Signup failed. Please check your inputs and try again.");
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <div className="relative flex min-h-screen items-center justify-center bg-gradient-to-r from-purple-400 to-blue-500">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://cloud.appwrite.io/v1/storage/buckets/672a1e700037c646954e/files/6744a914000be7d7c8b3/view?project=672a1dc2000b4396bb7d&project=672a1dc2000b4396bb7d&mode=admin')`,
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-80"></div>
      </div>

      {/* Back Button */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-4 left-4 items-center text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-70 hidden lg:flex"
      >
        <AiOutlineArrowLeft className="text-xl" />
        <span className="ml-2 text-sm font-medium">Back</span>
      </button>
      <ToastContainer />
      <div className="flex w-3/4 max-w-4xl overflow-hidden rounded-lg bg-white shadow-lg relative z-10">
        {/* Left Section */}
        <div
          className="w-1/2 bg-cover bg-center relative hidden lg:block"
          style={{
            backgroundImage: `url('https://cloud.appwrite.io/v1/storage/buckets/672a1e700037c646954e/files/6744a2bd0005c4aab034/view?project=672a1dc2000b4396bb7d&project=672a1dc2000b4396bb7d&mode=admin')`,
          }}
        >
          <div className="flex h-full flex-col items-center justify-center text-center p-10 bg-black bg-opacity-50 text-white">
            <h2 className="text-3xl font-bold mb-4">Welcome</h2>
            <p className="text-sm">
              Discover the beauty of nature and create unforgettable
              experiences. Join us and unlock endless possibilities.
            </p>
          </div>
        </div>

        {/* Right Section */}
        <div className="w-full p-5 lg:w-1/2 lg:p-10">
          <h2 className="text-2xl font-bold mb-2 text-gray-800">Register</h2>
          <p className="text-sm text-gray-600 mb-6">
            Create your account. It's free and only takes a minute.
          </p>
          <form onSubmit={handleForm} encType="multipart/form-data">
            {/* First Name and Last Name */}
            <div className="flex gap-4 mb-4">
              <div className="flex items-center border border-gray-300 rounded p-2 w-1/2">
                <BsPerson className="text-blue-600 mr-2" />
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="First Name"
                  required
                  className="w-full focus:outline-none"
                />
              </div>
              <div className="flex items-center border border-gray-300 rounded p-2 w-1/2">
                <BsPerson className="text-blue-600 mr-2" />
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLName(e.target.value)}
                  placeholder="Last Name"
                  required
                  className="w-full focus:outline-none"
                />
              </div>
            </div>

            {/* Email */}
            <div className="flex items-center border border-gray-300 rounded p-2 mb-4">
              <AiOutlineMail className="text-red-600 mr-2" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
                className="w-full focus:outline-none"
              />
            </div>

            {/* Password */}
            <div className="flex items-center border border-gray-300 rounded p-2 mb-4">
              <AiOutlineLock className="text-gray-700 mr-2" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
                className="w-full focus:outline-none"
              />
            </div>

            {/* Confirm Password */}
            <div className="flex items-center border border-gray-300 rounded p-2 mb-4">
              <AiOutlineLock className="text-gray-700 mr-2" />
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConPassword(e.target.value)}
                placeholder="Confirm Password"
                required
                className="w-full focus:outline-none"
              />
            </div>

            {/* WhatsApp */}
            <div className="flex items-center border border-gray-300 rounded p-2 mb-4">
              <AiOutlineWhatsApp className="text-green-500 mr-2" />
              <input
                type="text"
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                placeholder="WhatsApp Number"
                required
                className="w-full focus:outline-none"
              />
            </div>

            {/* Profile Picture */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Profile Picture
              </label>
              <input
                type="file"
                name="profilePicture"
                onChange={handleImageChange}
                accept="image/*"
                className="w-full p-2 border border-gray-300 rounded"
                id="uploader"
              />
            </div>

            {/* Terms and Conditions */}
            <div className="mb-6 flex items-center">
              <input
                type="checkbox"
                name="termsAccepted"
                checked={termsAccepted}
                onChange={handleChange}
                className="mr-2"
              />
              <label className="text-sm text-gray-600">
                I accept the{" "}
                <a href="#" className="text-blue-600 underline">
                  Terms of Use
                </a>{" "}
                &{" "}
                <a href="#" className="text-blue-600 underline">
                  Privacy Policy
                </a>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full p-3 text-white bg-purple-600 hover:bg-purple-700 rounded"
              disabled={isLoading}
            >{isLoading ? (
              <div className="border-white border-t-2 w-[20px] min-h-[20px] rounded-full animate-spin"></div>
            ) : (
              <span>Register Now</span>
            )}
            </button>
            <p className="mt-4 text-center text-sm text-gray-600">
              Already have an account?{" "}
              <a href="/login" className="text-purple-600 hover:underline">
                Login
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
