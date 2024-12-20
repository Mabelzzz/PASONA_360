import React from "react";
import logo from "../assets/pasona-logo.png";

const ThankYou = () => {
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="bg-white shadow-lg rounded-lg p-8 max-w-2xl text-center">
                <img src={logo} alt="Pasona Logo" className="mx-auto h-16 mb-4" />
                <h1 className="text-2xl font-semibold text-gray-800 mb-4">Thank You!</h1>
                <p className="text-gray-700 mb-4">
                    We appreciate you taking the time to complete the 360-degree assessment survey.
                </p>
                <p className="text-gray-700 mb-4">
                    Your feedback is valuable and will help us improve and grow.
                </p>
                <p className="text-gray-700 font-medium">
                    If you have any questions, please contact our team.
                </p>
                <button
                    onClick={() => window.location.href = "/home"}
                    className="mt-6 bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition duration-200"
                >
                    Back to Home
                </button>
            </div>
        </div>
    );
};

export default ThankYou;
