import { useState } from "react";
import axios from "axios";
import "./login.css";
import { toast } from "react-toastify";
import {AiOutlineArrowLeft,} from "react-icons/ai";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
    const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin() {
    axios
      .post(import.meta.env.VITE_BACKEND_URL + "/api/users/login", {
        email: email,
        password: password,
      })
      .then((result) => {
        console.log("User type:", result.data.user.type);
        localStorage.setItem("token", result.data.token);
        localStorage.setItem("email", result.data.user.email);
        if (result.data.user.type == "Customer") {
          window.location.href = "/";
        } else if (result.data.user.type == "admin") {
          window.location.href = "/admin";
        }
        toast.success("Login Successful!");
      })
      .catch((err) => {
        if (err.response) {
          alert(err.response.data.message || "Login failed. Please try again.");
        } else if (err.request) {
          alert("Network error. Please check your internet connection.");
        } else {
          alert("An unexpected error occurred.");
        }
        console.log(err);
      });
  }

  return (
    <div className="w-full h-screen back-img flex justify-center items-center">
      <div className="absolute inset-0 bg-black opacity-70"></div>
      {/* Back Button */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-4 left-4 items-center text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-70 hidden lg:flex"
      >
        <AiOutlineArrowLeft className="text-xl" />
        <span className="ml-2 text-sm font-medium">Back</span>
      </button>

      <div className="w-[350px] md:w-[400px] bg-white p-8 rounded-lg shadow-lg relative z-10 backdrop-blur-md">
        <h2 className="text-4xl font-bold text-center mb-8 text-gray-800">
          Login
        </h2>

        <input
          type="email"
          placeholder="Email"
          className="mb-4 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="off"
        />

        <input
          type="password"
          placeholder="Password"
          className="mb-6 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="off"
        />

        <button
          onClick={handleLogin}
          className="w-full py-3 mb-4 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Login
        </button>

        <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <a href="/signup" className="text-blue-600 hover:underline">
            Register
          </a>
        </p>
      </div>
    </div>
  );
}
