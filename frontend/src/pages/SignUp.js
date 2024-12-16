import React, { useState } from "react";
import logo from "../assets/pasona-logo.png";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  const handleSignUp = () => {
    if (!isChecked) {
      alert("Please agree to the Terms of Use.");
      return;
    }
    alert("Sign Up Successful!");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-grayLight px-4">
      <div className="w-full max-w-md px-4 bg-white p-8 rounded-lg shadow-lg">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img src={logo} alt="Pasona Logo" className="w-40 h-auto" />
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-center text-primary mb-2">Sign Up</h2>
        <p className="text-center text-textDark mb-6">Join PASONA. It is quick and free.</p>

        {/* Form */}
        <div className="mb-4">
          <label className="block text-textDark mb-1">Email</label>
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
          <p className="text-xs text-gray-500 mt-1 leading-relaxed">
            Password should have at least 8 characters.
          </p>
        </div>

        {/* Terms of Use */}
        <div className="mb-6">
          <label className="flex items-start text-textDark flex-wrap">
            <input
              type="checkbox"
              checked={isChecked}
              onChange={() => setIsChecked(!isChecked)}
              className="mr-2 mt-1"
            />
            <span className="leading-relaxed">
              I have read, understood & agreed to the{" "}
              <a href="#" className="text-accent hover:underline">
                Terms of Use
              </a>
            </span>
          </label>
        </div>

        {/* Buttons */}
        <div className="flex justify-between mb-4">
          <button
            onClick={handleSignUp}
            disabled={!isChecked || !email || !password}
            className={`w-full bg-primary text-white font-semibold py-2 px-4 rounded transition duration-200 ${
              !isChecked || !email || !password
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-secondary"
            }`}
          >
            SIGN UP
          </button>
          <button
            className="w-full ml-2 border border-gray-400 text-textDark font-semibold py-2 px-4 rounded hover:bg-grayLight transition"
            onClick={() => (window.location.href = "/")}
          >
            BACK
          </button>
        </div>

        {/* Divider */}
        <div className="flex items-center my-4">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-4 text-gray-500">Or sign up by</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        {/* Social Buttons */}
        <div className="flex justify-center gap-3">
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
        </div>
      </div>
    </div>
  );
};

export default SignUp;
