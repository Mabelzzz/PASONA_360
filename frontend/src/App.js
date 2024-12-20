import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Upload from "./components/Upload";
import AllSurvey from "./pages/AllSurvey";
import Survey from "./pages/Survey";
import Contact from "./pages/Contact";
function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/home" element={<Home />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/upload" element={<Upload />} />
                <Route path="/survey" element={<Survey />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/all-survey" element={<AllSurvey />} />
                <Route path="/survey/:id/design" element={<div>Design Page</div>} />
                <Route path="/survey/:id/collect" element={<div>Collect Page</div>} />
                <Route path="/survey/:id/report" element={<div>Report Page</div>} />
            </Routes>
        </Router>
    );
}

export default App;

