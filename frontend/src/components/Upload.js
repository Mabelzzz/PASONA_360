import React, { useState } from "react";
import { uploadExcel, generateLinks } from "../services/api";
import { hover } from "@testing-library/user-event/dist/hover";

const Upload = () => {
    const [file, setFile] = useState(null);
    const [links, setLinks] = useState([]);
    const [isDragging, setIsDragging] = useState(false);

    // Handle drag events
    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };
    
    const handleDragLeave = () => {
        setIsDragging(false);
    };
    
    // Handle file drop
    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
    
        const droppedFile = e.dataTransfer.files[0];
        if (droppedFile) {
        if (droppedFile.name.match(/\.(xlsx|xls|xlsm)$/)) {
            setFile(droppedFile);
        } else {
            alert("Please upload a valid Excel file (.xlsx, .xls, .xlsm).");
        }
        }
    };

    const handleUpload = async () => {
        const formData = new FormData();
        formData.append("file", file);
        const res = await uploadExcel(formData);
        const generated = await generateLinks({ assessments: res.data.data });
        setLinks(generated.data.links);
    };

    return (
        <div style={styles.div} className="min-h-screen bg-gray-100">
            <h2 style={styles.h2} className="w-full max-w-md">Upload file via Excel</h2>
            {/* Original function */}
            <input type="file" accept=".xlsx,.xls,.xlsm" id="fileInput" onChange={(e) => setFile(e.target.files[0])} style={{ display: "none" }}/>
            {/* Original function */}

            <div style={styles.uploadSection} className="w-full max-w-md" onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop}>
                <span style={styles.fileInputIcon}>⬆</span>
                <label  htmlFor="fileInput" style={styles.selectFileButton} className="bg-[#b21f24] hover:bg-[#8e191d] transition duration-200">
                    Select File
                </label>
                {file && <p>Selected File: {file.name}</p>}
                <p className="text-gray-700 mb-1">Must be .xlsx files using our Excel template below</p>
            </div>

            
            <button style={styles.uploadFileButton} className="bg-[#b21f24] hover:bg-[#8e191d] transition duration-200" onClick={handleUpload} >Upload</button>
            <ul>
                {links.map((link, idx) => (
                    <li key={idx}>{link}</li>
                ))}
            </ul>
        </div>
    );
};

const styles = {

    div: {
        textAlign: "center",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
    },

    h2: {
        fontSize: "2.5rem",
        fontWeight: "bold",
        margin: "20px",
    },

    uploadSection: {
        padding: "70px",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        margin: "20px",
    },

    fileInputIcon: {
        fontSize: "30px",
        display: "block",
        marginBottom: "10px",
        cursor: "default",
        color: "#b21f24",
    },

    selectFileButton: {
        display: "inline-block",
        padding: "10px 20px",
        borderRadius: "8px",
        color: "#fff",
        borderRadius: "7px",
        fontWeight: "semi-bold",
        cursor: "pointer",
        margin: "10px",
    },

    uploadFileButton: {
        display: "inline-block",
        padding: "10px 20px",
        marginTop: "10px",
        borderRadius: "8px",
        color: "#fff",
        fontWeight: "semi-bold",
        cursor: "pointer",
        margin: "20px",
    },


}

export default Upload;
