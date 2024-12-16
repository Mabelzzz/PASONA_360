import React, { useState } from "react";
import { uploadExcel, generateLinks } from "../services/api";

const Upload = () => {
    const [file, setFile] = useState(null);
    const [links, setLinks] = useState([]);

    const handleUpload = async () => {
        const formData = new FormData();
        formData.append("file", file);
        const res = await uploadExcel(formData);
        const generated = await generateLinks({ assessments: res.data.data });
        setLinks(generated.data.links);
    };

    return (
        <div>
            <h2>Upload Excel</h2>
            <input type="file" onChange={(e) => setFile(e.target.files[0])} />
            <button onClick={handleUpload}>Upload</button>
            <ul>
                {links.map((link, idx) => (
                    <li key={idx}>{link}</li>
                ))}
            </ul>
        </div>
    );
};

export default Upload;
