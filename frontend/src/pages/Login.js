import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import logo from "../assets/pasona-logo.png"; // Import PASONA logo
// import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Initialize navigate

  const handleLogin = async () => {
    // try {
    //   const response = await axios.post("http://localhost:5001/api/auth/login", {
    //     email,
    //     password,
    //   });
      alert("Login successful!");
      // console.log("Token:", response.data.token);

      // Redirect to /home
      navigate("/home");
    // } catch (error) {
    //   alert(error.response?.data?.message || "Login failed!");
    // }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-grayLight">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img src={logo} alt="Pasona Logo" className="w-40 h-auto" />
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-center text-primary mb-6">Log In</h2>

        {/* Login Form */}
        <div className="mb-4">
          <label className="block text-textDark mb-1">Login / Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="mb-4">
          <label className="block text-textDark mb-1">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="flex items-center justify-between mb-6">
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" /> Keep me logged in
          </label>
          <a href="#" className="text-accent hover:underline">
            Forgot Password?
          </a>
        </div>

        <button
          onClick={handleLogin}
          className="w-full bg-primary text-white font-semibold py-2 px-4 rounded hover:bg-secondary transition"
        >
          LOG IN
        </button>

        {/* Sign Up */}
        <p className="mt-4 text-center text-textDark">
          Don't have an account?{" "}
          <a href="/signup" className="text-accent hover:underline">
            Sign Up
          </a>
        </p>

        {/* Divider */}
        <div className="flex items-center my-4">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-4 text-gray-500">Login with</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        {/* Social Login */}
        <div className="flex justify-around">
          <button className="flex items-center px-4 py-2 border rounded text-textDark hover:bg-grayLight">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/640px-Google_%22G%22_logo.svg.png"
              alt="Google"
              className="w-5 h-5 mr-2"
            />
            GOOGLE
          </button>
          <button className="flex items-center px-4 py-2 border rounded text-textDark hover:bg-grayLight">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg"
              alt="Microsoft"
              className="w-5 h-5 mr-2"
            />
            MICROSOFT
          </button>
          <button className="flex items-center px-4 py-2 border rounded text-textDark hover:bg-grayLight">
            <span className="mr-2">🔑</span> SSO
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
