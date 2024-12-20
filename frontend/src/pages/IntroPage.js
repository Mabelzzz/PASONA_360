import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
// import Survey from "./Survey";
import logo from "../assets/pasona-logo.png";

const IntroPage = () => {
    const location = useLocation();
    const surveyData = location.state?.parsedData || [];
    const navigate = useNavigate();

    const handleButtonClick = () => {
        console.log("Start Survey", surveyData);
        navigate("/survey", { state: { surveyData } });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-8 max-w-2xl text-center">
                <img src={logo} alt="Pasona Logo" className="mx-auto h-16 mb-4" />
                <h1 className="text-2xl font-semibold text-gray-800 mb-4">Welcome to the 360-degree Assessment Survey</h1>
                <p className="text-gray-700 mb-4">
                    Welcome to <span className="font-bold text-red-600">Khun Panunan Cardini</span>'s 360-degree assessment survey 2021. This survey consists of <span className="font-bold">10 leadership competencies</span>. The 360-degree assessment survey is not intended to be used for performance appraisal or employment selection purposes. We support you in providing honest feedback to the participant, the survey process is anonymous and the assessee cannot identify who is the rater.
                </p>
                <p className="text-red-600 font-medium">
                    Please keep all information related to this survey in confidentiality. Don’t share your answer with internal and external parties.
                </p>
                <button
                    onClick={handleButtonClick}
                    className="mt-6 bg-gray-800 text-white py-2 px-6 rounded-lg hover:bg-gray-700 transition duration-200"
                >
                    START
                </button>
            </div>
        </div>
    );
};

export default IntroPage;
