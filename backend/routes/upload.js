const express = require("express");
const multer = require("multer");
const XLSX = require("xlsx");
const router = express.Router();

const upload = multer({ dest: "uploads/" });

router.post("/", upload.single("file"), (req, res) => {
    const workbook = XLSX.readFile(req.file.path);
    const sheetName = workbook.SheetNames[0];
    const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
    res.json({ success: true, data });
});

module.exports = router;
