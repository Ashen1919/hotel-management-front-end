import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  AiOutlineMail,
  AiOutlineLock,
  AiOutlineWhatsApp,
  AiOutlineArrowLeft,
} from "react-icons/ai";
import { BsPerson } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    whatsapp: "",
    termsAccepted: false,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.termsAccepted) {
      toast.error("Please accept the terms and conditions.");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }
    toast.success("Signed up successfully!");
    console.log("Form Data:", formData);
  };

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
          <form onSubmit={handleSubmit}>
            {/* First Name and Last Name */}
            <div className="flex gap-4 mb-4">
              <div className="flex items-center border border-gray-300 rounded p-2 w-1/2">
                <BsPerson className="text-blue-600 mr-2" />
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="First Name"
                  required
                  className="w-full focus:outline-none"
                />
              </div>
              <div className="flex items-center border border-gray-300 rounded p-2 w-1/2">
                <BsPerson className="text-blue-600 mr-2" />
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
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
                name="email"
                value={formData.email}
                onChange={handleChange}
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
                name="password"
                value={formData.password}
                onChange={handleChange}
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
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
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
                name="whatsapp"
                value={formData.whatsapp}
                onChange={handleChange}
                placeholder="WhatsApp Number"
                required
                className="w-full focus:outline-none"
              />
            </div>

            {/* Terms and Conditions */}
            <div className="mb-6 flex items-center">
              <input
                type="checkbox"
                name="termsAccepted"
                checked={formData.termsAccepted}
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
            >
              Register Now
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
