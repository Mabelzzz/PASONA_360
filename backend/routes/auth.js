const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET;
const users = []; // Temporary user storage

// Signup
router.post("/signup", async (req, res) => {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({ email, password: hashedPassword });
    res.json({ message: "User registered successfully" });
});

// Login
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const user = users.find((u) => u.email === email);
    if (!user || !(await bcrypt.compare(password, user.password)))
        return res.status(400).json({ message: "Invalid credentials" });
    const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: "1h" });
    res.json({ token });
});

module.exports = router;
