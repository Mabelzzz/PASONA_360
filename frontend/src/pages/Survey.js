import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/pasona-logo.png";

const Survey = () => {
    const location = useLocation();
    const data = location.state?.surveyData || []; // Retrieve the data from the route state
    const navigate = useNavigate();

    const [currentPage, setCurrentPage] = useState(0);
    const [responses, setResponses] = useState(
        Array.isArray(data)
            ? data.reduce((acc, item) => {
                  acc[item.criteria] = [];
                  return acc;
              }, {})
            : {}
    );
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");

    const criteriaGroupedQuestions = Array.isArray(data)
        ? data.reduce((acc, item) => {
              if (!acc[item.criteria]) {
                  acc[item.criteria] = [];
              }
              acc[item.criteria].push(item.question);
              return acc;
          }, {})
        : {};

    const criteriaList = Object.keys(criteriaGroupedQuestions);

    const totalQuestions = Object.values(criteriaGroupedQuestions).flat().length;
    const answeredQuestions = Object.values(responses).flat().filter((res) => res !== "").length;
    const progress = totalQuestions > 0 ? Math.round((answeredQuestions / totalQuestions) * 100) : 0;

    const currentCriteria = criteriaList[currentPage];
    const questions = criteriaGroupedQuestions[currentCriteria] || [];

    const handleChange = (index, value) => {
        setResponses((prev) => {
            const updated = { ...prev };
            if (!updated[currentCriteria]) {
                updated[currentCriteria] = [];
            }
            updated[currentCriteria][index] = value;
            return updated;
        });
    };

    const handleNext = () => {
        const unanswered = responses[currentCriteria]?.some((res) => res === "") || false;
        if (unanswered) {
            setShowAlert(true);
            setAlertMessage("Questions with asterisks are very important to us. Please fill them in.");
        } else {
            setShowAlert(false);
            setAlertMessage("");
            setCurrentPage((prev) => prev + 1);
        }
    };

    const handlePrevious = () => {
        setCurrentPage((prev) => prev - 1);
    };

    const handleSubmit = () => {
        const unanswered = Object.values(responses).flat().some((res) => res === "");
        if (unanswered || progress < 100) {
            setShowAlert(true);
            setAlertMessage("Questions with asterisks are very important to us. Please fill them in.");
        } else {
            setShowAlert(false);
            setAlertMessage("");
            alert("Survey submitted successfully! Thank you for your feedback.");
            navigate("/thank-you");
        }
    };

    if (!Array.isArray(data) || data.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-gray-600 text-lg">No survey data available.</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center">
            <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6 mt-10">
                <header className="mb-6">
                    <img src={logo} alt="Pasona Logo" className="h-12 mb-4" />
                    <h1 className="text-2xl font-semibold text-gray-800">
                        {currentCriteria || "Survey"}
                    </h1>
                </header>

                {showAlert && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
                        {alertMessage}
                    </div>
                )}

                <div className="space-y-6">
                    {questions.map((question, index) => (
                        <div key={index} className="space-y-2">
                            <p className="text-gray-800 font-semibold">{index + 1}. {question}</p>
                            <div className="flex space-x-4">
                                {["Very Low Level (1)", "Low Level (2)", "Moderate Level (3)", "High Level (4)", "Very High Level (5)", "Not Applicable (N/A)"].map((label, i) => (
                                    <label key={i} className="flex items-center space-x-2">
                                        <input
                                            type="radio"
                                            name={`question-${index}`}
                                            value={i + 1}
                                            checked={responses[currentCriteria]?.[index] === `${i + 1}`}
                                            onChange={() => handleChange(index, `${i + 1}`)}
                                            className="form-radio"
                                        />
                                        <span className="text-gray-600">{label}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <footer className="mt-8 flex flex-col items-center">
                    <div className="w-full flex justify-between items-center mb-4">
                        <button
                            onClick={handlePrevious}
                            disabled={currentPage === 0}
                            className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 disabled:opacity-50"
                        >
                            Previous
                        </button>

                        {currentPage < criteriaList.length - 1 ? (
                            <button
                                onClick={handleNext}
                                className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
                            >
                                Next
                            </button>
                        ) : (
                            <button
                                onClick={handleSubmit}
                                className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700"
                            >
                                Submit
                            </button>
                        )}
                    </div>

                    <div className="w-full">
                        <div className="bg-gray-300 w-full h-2 rounded">
                            <div
                                className="bg-red-600 h-2 rounded"
                                style={{ width: `${progress}%` }}
                            ></div>
                        </div>
                        <p className="text-gray-600 mt-2 text-sm text-center">{progress}% completed</p>
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default Survey;
