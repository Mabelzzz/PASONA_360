import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/pasona-logo.png";
import logo_home from "../assets/home_button.png";
import survey_logo from "../assets/survey.png";
import survey_big from "../assets/survey_big.png";
import contact_logo from "../assets/contact.png";
import question_logo from "../assets/question.png";
import { AiOutlineCloudUpload } from "react-icons/ai";

const Home = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/upload");
  };
  return (
    <div className="flex h-screen bg-grayLight">
      {/* Sidebar */}
      <div className="w-1/6 bg-gray-300 flex flex-col">
        {/* Logo */}
        <div className="w-full px-6 mb-8">
          <Link to="/home">
            <img
              src={logo}
              alt="Pasona Logo"
              className="w-full h-auto object-contain cursor-pointer"
            />
          </Link>
        </div>

        {/* Navigation */}
        <nav className="space-y-6">
          <Link
            to="/home"
            className="flex items-center space-x-2 text-primary px-4 py-2 cursor-pointer hover:bg-grayLight rounded"
          >
            <img src={logo_home} alt="Survey Logo" className="h-6" />
            <span className="font-semibold">Home</span>
          </Link>
          <Link
            to="/all-survey"
            className="flex items-center space-x-2 text-textDark px-4 py-2 cursor-pointer hover:bg-grayLight rounded"
          >
            <img src={survey_logo} alt="Survey Logo" className="h-6" />
            <span className="font-semibold">All Surveys</span>
          </Link>
          <Link
            to="/upload"
            className="flex items-center space-x-2 text-textDark px-4 py-2 cursor-pointer hover:bg-grayLight rounded"
          >
            <AiOutlineCloudUpload className="text-primary cursor-pointer text-xl"/>
            <span className="font-semibold">Upload Survey</span>
          </Link>
          <Link
            to="/contact"
            className="flex items-center space-x-2 text-textDark px-4 py-2 cursor-pointer hover:bg-grayLight rounded"
          >
            <img src={contact_logo} alt="Contact Logo" className="h-6" />
            <span className="font-semibold">Contacts</span>
          </Link>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <div className="bg-primary h-14 flex items-center px-6 shadow-md">
          <h2 className="text-white text-lg font-semibold">Home</h2>
          <div className="ml-auto cursor-pointer">
            <img
              src={question_logo}
              alt="Question Logo"
              className="h-6 text-white"
            />
          </div>
        </div>

        {/* Center Content */}
        <div className="flex-1 flex justify-center items-center">
          <div className="text-center">
            {/* Survey Icon */}
            <div className="text-primary mb-6">
              <img
                src={survey_big}
                alt="Survey Icon"
                className="w-40 h-40 mx-auto"
              />
            </div>

            {/* Create Survey Button */}
            <button className="bg-primary text-white font-semibold py-3 px-8 rounded-lg shadow-lg hover:bg-secondary transition"
              onClick={handleButtonClick}
            >
              Create Survey
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
