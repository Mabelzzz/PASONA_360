import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/pasona-logo.png";
import logo_home from "../assets/home_button.png";
import survey_logo from "../assets/survey.png";
import contact_logo from "../assets/contact.png";
import question_logo from "../assets/question.png";
import { AiOutlineCloudUpload } from "react-icons/ai";

const AllSurvey = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/upload");
  };
  // Mockup survey data
  const [surveys] = useState([
    {
      id: 1,
      name: "Survey 1",
      lastResponse: "Yesterday",
      responses: 10,
      views: 12,
    },
    {
      id: 2,
      name: "Survey 2",
      lastResponse: "14 days",
      responses: 2,
      views: 2,
    },
    {
      id: 3,
      name: "Customer Feedback",
      lastResponse: "5 days",
      responses: 20,
      views: 30,
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  // Filter surveys based on search input
  const filteredSurveys = surveys.filter((survey) =>
    survey.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-grayLight">
      {/* Sidebar */}
      <div className="w-1/6 bg-gray-300 flex flex-col">
        <div className="w-full px-6 mb-8">
          <Link to="/">
            <img
              src={logo}
              alt="Pasona Logo"
              className="w-full h-auto object-contain cursor-pointer"
            />
          </Link>
        </div>

        <nav className="space-y-6">
          <Link
              to="/home"
              className="flex items-center space-x-2 text-textDark px-4 py-2 cursor-pointer hover:bg-grayLight rounded"
          >
              <img src={logo_home} alt="Survey Logo" className="h-6" />
              <span className="font-semibold">Home</span>
          </Link>
          <Link
              to="/all-survey"
              className="flex items-center space-x-2 text-primary px-4 py-2 cursor-pointer hover:bg-grayLight rounded"
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
          <h2 className="text-white text-lg font-semibold">Survey</h2>
          <div className="ml-auto cursor-pointer">
            <img src={question_logo} alt="Help" className="h-6 text-white" />
          </div>
        </div>

        {/* Create Survey Button */}
        <div className="px-6 py-4">
          <button
          className="bg-primary text-white py-2 px-4 rounded-lg shadow-lg hover:bg-secondary transition"
          onClick={handleButtonClick}
        >
          Create Survey
        </button>
        </div>

        {/* Search Bar */}
        <div className="px-6 mb-4">
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border-b border-gray-400 focus:outline-none px-2 py-1"
          />
        </div>

        {/* Table */}
        <div className="px-6">
        <div className="border rounded-lg shadow-lg bg-white">
            {/* Table Header */}
            <div className="grid grid-cols-5 font-semibold text-textDark border-b py-2 px-4 bg-grayLight">
            <div className="col-span-2">Name</div>
            <div>Last Response</div>
            <div>Responses</div>
            <div>View</div>
            </div>

            {/* Table Rows */}
            <div className="divide-y">
            {filteredSurveys.map((survey) => (
                <div
                key={survey.id}
                className="grid grid-cols-5 py-2 px-4 hover:bg-gray-100"
                >
                {/* Name (2 parts) */}
                <div className="col-span-2">
                    <span className="font-semibold">{survey.name}</span>
                    <div className="text-sm text-gray-500 space-x-2 mt-1">
                    <Link
                        to={`/survey/${survey.id}/design`}
                        className="text-primary hover:underline"
                    >
                        ✏️ Design
                    </Link>
                    <Link
                        to={`/survey/${survey.id}/collect`}
                        className="text-primary hover:underline"
                    >
                        📤 Collect Responses
                    </Link>
                    <Link
                        to={`/survey/${survey.id}/report`}
                        className="text-primary hover:underline"
                    >
                        📊 Report
                    </Link>
                    </div>
                </div>

                {/* Last Response */}
                <div>{survey.lastResponse}</div>

                {/* Responses */}
                <div>{survey.responses}</div>

                {/* View */}
                <div>{survey.views}</div>
                </div>
            ))}
            {filteredSurveys.length === 0 && (
                <div className="text-center py-4 text-gray-500">
                No surveys found
                </div>
            )}
            </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default AllSurvey;
