/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users
 *     responses:
 *       200:
 *         description: List of users
 */

const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET;
const User = require("../models/User"); // MongoDB User model


// Signup
router.post("/signup", async (req, res) => {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({ email, password: hashedPassword });
    res.json({ message: "User registered successfully" });
});

// Login Route
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Check if user exists
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "User not found" });
      }
  
      // Verify password
      if (password !== user.password) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
  
      // Generate JWT Token
      const token = jwt.sign({ id: user._id, email: user.email }, "secretkey", {
        expiresIn: "1h",
      });
  
      res.json({
        message: "Login successful",
        token,
      });
    } catch (err) {
      res.status(500).json({ error: "Server error" });
    }
  });

module.exports = router;
