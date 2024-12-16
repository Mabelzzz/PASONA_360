const express = require("express");
const { v4: uuidv4 } = require("uuid");
const router = express.Router();

router.post("/", (req, res) => {
    const { assessments } = req.body;
    const links = assessments.map(() => `http://yourdomain.com/form/${uuidv4()}`);
    res.json({ links });
});

module.exports = router;
