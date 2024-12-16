const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/upload", require("./routes/upload"));
app.use("/api/generate", require("./routes/generate"));

const PORT = process.env.PORT || 5001; // Use 5001 instead of 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
