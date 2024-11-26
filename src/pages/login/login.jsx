import { useState } from 'react';
import axios from 'axios';
import './login.css';

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleLogin() {
        axios.post(import.meta.env.VITE_BACKEND_URL+ "/api/users/login" , {
            email: email,
            password: password
        }).then((result) => {
            localStorage.setItem("token", result.data.token)
            if(result.data.user.type == "customer"){
                window.location.href = "/home"
            }
            else if(result.data.user.type == "admin"){
                window.location.href = "/admin"
            }
        }).catch((err) => {
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
        <div className="w-full h-[100vh] back-img flex justify-center items-center">
            <div className="overlay"></div>
            <div className='w-[400px] h-[400px] bg-white bg-opacity-60 backdrop-blur-md rounded-lg flex flex-col justify-center items-center p-4 shadow-md relative'>
                <h2 className="text-5xl font-bold mb-12">Login</h2>
                <input
                    type="email"
                    placeholder="Email"
                    className="mb-3 p-2 w-full border border-gray-300 rounded-md"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="mb-3 p-2 w-full border border-gray-300 rounded-md"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className="p-2 w-full bg-blue-500 text-white rounded-md hover:bg-blue-600" onClick={handleLogin}>
                    Login
                </button>
            </div>
        </div>
    );
}
