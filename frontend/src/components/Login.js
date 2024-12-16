import React, { useState } from "react";
import { login } from "../services/api";
import { useNavigate } from "react-router-dom";
// import logo from "../assets/logo.png"; // Import the logo image

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await login({ email, password });
            localStorage.setItem("token", response.data.token);
            alert("Login successful!");
            navigate("/upload");
        } catch (err) {
            setError("Invalid email or password");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
                {/* Logo */}
                <div className="flex justify-center mb-6">
                    <img src="https://app.surveylab.com/UserFiles/66a49dea110a/PASONA-RECRUITMENT-Logo.png" alt="Pasona Logo" className="w-32 h-auto" />
                </div>

                <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Login</h2>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-1">Email</label>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b21f24]"
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 mb-1">Password</label>
                    <input
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b21f24]"
                    />
                </div>
                <button
                    onClick={handleLogin}
                    className="w-full bg-[#b21f24] hover:bg-[#8e191d] text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
                >
                    Login
                </button>
                {error && <p className="mt-4 text-center text-red-500">{error}</p>}
            </div>
        </div>
    );
};

export default Login;
