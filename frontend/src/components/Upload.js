import React, { useState } from "react";
import * as XLSX from "xlsx";
import { Link } from "react-router-dom";
import IntroPage from "../pages/IntroPage";
import logo from "../assets/pasona-logo.png";
import logo_home from "../assets/home_button.png";
import survey_logo from "../assets/survey.png";
import contact_logo from "../assets/contact.png";
import question_logo from "../assets/question.png";
import { AiOutlineCloudUpload, AiOutlineClose } from "react-icons/ai";

const Upload = () => {
    const [file, setFile] = useState(null);
    const [sheetNames, setSheetNames] = useState([]);
    const [selectedSheet, setSelectedSheet] = useState("");
    const [criteriaColumn, setCriteriaColumn] = useState("");
    const [criteriaRange, setCriteriaRange] = useState({ start: "", end: "" });
    const [questionColumn, setQuestionColumn] = useState("");
    const [questionRange, setQuestionRange] = useState({ start: "", end: "" });
    const [parsedData, setParsedData] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [showSurvey, setShowSurvey] = useState(false);

    const columns = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i)); // A-Z

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile && (selectedFile.name.endsWith(".xlsx") || selectedFile.name.endsWith(".csv"))) {
            setFile(selectedFile);
            const reader = new FileReader();
            reader.onload = (event) => {
                const data = new Uint8Array(event.target.result);
                const workbook = XLSX.read(data, { type: "array" });
                setSheetNames(workbook.SheetNames);
                setSelectedSheet(workbook.SheetNames[0]);
                setShowPopup(true);
            };
            reader.readAsArrayBuffer(selectedFile);
        } else {
            alert("Please upload a valid Excel or CSV file.");
        }
    };

    const handleCancelFile = () => {
        setShowPopup(false);
    };

    const handleUpload = () => {
        if (!file) {
            alert("Please select a file before uploading.");
            return;
        }

        const reader = new FileReader();
        reader.onload = (event) => {
            const data = new Uint8Array(event.target.result);
            const workbook = XLSX.read(data, { type: "array" });
            const sheet = workbook.Sheets[selectedSheet];
            const rows = XLSX.utils.sheet_to_json(sheet, { header: 1 });

            if (!rows || rows.length === 0) {
                alert("The selected sheet is empty or invalid.");
                return;
            }

            const criteriaData = rows
                .slice(Number(criteriaRange.start) - 1, Number(criteriaRange.end))
                .map((row) => row[columns.indexOf(criteriaColumn)]);

            const questionData = rows
                .slice(Number(questionRange.start) - 1, Number(questionRange.end))
                .map((row) => row[columns.indexOf(questionColumn)]);

            if (!criteriaData || !questionData) {
                alert("Invalid column or range selection.");
                return;
            }

            const dataPairs = criteriaData.map((criteria, index) => ({
                criteria: criteria || "", // Ensure criteria is not undefined
                question: questionData[index] || "", // Ensure question is not undefined
            }));

            setParsedData(dataPairs);
            setShowSurvey(true);
        };
        reader.readAsArrayBuffer(file);
    };

    if (showSurvey) {
        return <IntroPage data={parsedData} />;
    }

    return (
        <div className="flex h-screen bg-gray-100">
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
                        className="flex items-center space-x-2 text-textDark px-4 py-2 cursor-pointer hover:bg-grayLight rounded"
                    >
                        <img src={survey_logo} alt="Survey Logo" className="h-6" />
                        <span className="font-semibold">All Surveys</span>
                    </Link>
                    <Link
                        to="/upload"
                        className="flex items-center space-x-2 text-primary px-4 py-2 cursor-pointer hover:bg-grayLight rounded"
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
                    <h2 className="text-white text-lg font-semibold">Upload Survey</h2>
                    <div className="ml-auto cursor-pointer">
                        <img src={question_logo} alt="Help" className="h-6 text-white" />
                    </div>
                </div>

                {/* Content Section */}
                <div className="flex flex-col items-center justify-center flex-1 p-6">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 w-1/2 flex flex-col items-center justify-center">
                        <AiOutlineCloudUpload className="text-6xl text-gray-400 mb-4" />
                        {file ? (
                            <div className="flex items-center space-x-4 mb-4">
                                <span className="text-gray-700">Selected File: {file.name}</span>
                                <AiOutlineClose
                                    className="text-red-600 cursor-pointer text-xl"
                                    onClick={() => setFile(null)}
                                />
                            </div>
                        ) : (
                            <>
                                <p className="text-gray-700 mb-2">Choose a file or drag & drop it here</p>
                                <p className="text-gray-500 mb-4">Excel (.xlsx, .csv) format only</p>
                                <input
                                    type="file"
                                    accept=".xlsx,.csv"
                                    onChange={handleFileChange}
                                    className="hidden"
                                    id="fileInput"
                                />
                                <label
                                    htmlFor="fileInput"
                                    className="bg-primary text-white py-2 px-4 rounded-lg hover:bg-red-600 cursor-pointer"
                                >
                                    Browse File
                                </label>
                            </>
                        )}
                    </div>

                    {showPopup && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                            <div className="bg-white rounded-lg shadow-lg w-2/3 p-6">
                                <h3 className="text-lg font-bold mb-4">Preview Excel</h3>
                                <div className="mb-4">
                                    <label className="block text-gray-700 mb-2">Select Sheet:</label>
                                    <select
                                        value={selectedSheet}
                                        onChange={(e) => setSelectedSheet(e.target.value)}
                                        className="w-full border rounded-lg px-3 py-2"
                                    >
                                        {sheetNames.map((sheet, idx) => (
                                            <option key={idx} value={sheet}>{sheet}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="mb-4">
                                    <label className="block text-gray-700 mb-2">Criteria Column:</label>
                                    <select
                                        value={criteriaColumn}
                                        onChange={(e) => setCriteriaColumn(e.target.value)}
                                        className="w-full border rounded-lg px-3 py-2"
                                    >
                                        {columns.map((col, idx) => (
                                            <option key={idx} value={col}>{col}</option>
                                        ))}
                                    </select>

                                    <div className="flex space-x-2 mt-2">
                                        <input
                                            type="number"
                                            placeholder="Start Row"
                                            value={criteriaRange.start}
                                            onChange={(e) => setCriteriaRange({ ...criteriaRange, start: parseInt(e.target.value) || "" })}
                                            className="w-full border rounded-lg px-3 py-2"
                                        />
                                        <input
                                            type="number"
                                            placeholder="End Row"
                                            value={criteriaRange.end}
                                            onChange={(e) => setCriteriaRange({ ...criteriaRange, end: parseInt(e.target.value) || "" })}
                                            className="w-full border rounded-lg px-3 py-2"
                                        />
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <label className="block text-gray-700 mb-2">Question Column:</label>
                                    <select
                                        value={questionColumn}
                                        onChange={(e) => setQuestionColumn(e.target.value)}
                                        className="w-full border rounded-lg px-3 py-2"
                                    >
                                        {columns.map((col, idx) => (
                                            <option key={idx} value={col}>{col}</option>
                                        ))}
                                    </select>

                                    <div className="flex space-x-2 mt-2">
                                        <input
                                            type="number"
                                            placeholder="Start Row"
                                            value={questionRange.start}
                                            onChange={(e) => setQuestionRange({ ...questionRange, start: parseInt(e.target.value) || "" })}
                                            className="w-full border rounded-lg px-3 py-2"
                                        />
                                        <input
                                            type="number"
                                            placeholder="End Row"
                                            value={questionRange.end}
                                            onChange={(e) => setQuestionRange({ ...questionRange, end: parseInt(e.target.value) || "" })}
                                            className="w-full border rounded-lg px-3 py-2"
                                        />
                                    </div>
                                </div>

                                <button
                                    onClick={() => {
                                        handleUpload();
                                        setShowPopup(false);
                                    }}
                                    className="bg-primary text-white py-2 px-4 rounded-lg hover:bg-red-600"
                                >
                                    Upload
                                </button>
                                <button
                                    onClick={handleCancelFile}
                                    className="ml-4 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Upload;
