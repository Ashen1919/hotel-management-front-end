import { useState } from 'react';
import './login.css';
const [email, setEmail] = useState("")
const [password, setPassword] = useState("")

function handleLogin(){

}

export default function LoginPage() {
    return (
        <div className="w-full h-[100vh] back-img flex justify-center items-center">
            <div className="overlay"></div>
            <div className='w-[400px] h-[400px] bg-white bg-opacity-60 backdrop-blur-md rounded-lg flex flex-col justify-center items-center p-4 shadow-md relative'>
                <h2 className="text-5xl font-bold mb-12">Login</h2>
                <input 
                    type="email" 
                    placeholder="Email" 
                    className="mb-3 p-2 w-full border border-gray-300 rounded-md"
                    defaultValue={email}
                    onChange={(e)=>{
                        setEmail(e.target.value)
                    }}
                />
                <input 
                    type="password" 
                    placeholder="Password" 
                    className="mb-3 p-2 w-full border border-gray-300 rounded-md"
                    defaultValue={password}
                    onChange={(e)=>{
                        setPassword(e.target.value)
                    }}
                />
                <button className="p-2 w-full bg-blue-500 text-white rounded-md hover:bg-blue-600" onClick={handleLogin}>
                    Login
                </button>
            </div>
        </div>
    )
}
