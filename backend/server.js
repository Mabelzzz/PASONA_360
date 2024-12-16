const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const swaggerUI = require("swagger-ui-express");
const swaggerFile = require("./swagger-output.json"); // Import the generated file

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

// Swagger UI
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerFile));

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/upload", require("./routes/upload"));
app.use("/api/generate", require("./routes/generate"));

// Start Server
const PORT = process.env.PORT || 5001; // Use 5001 as default
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
