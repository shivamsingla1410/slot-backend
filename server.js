const express = require("express");
const connectDB = require("./src/connection");
const cors = require("cors");
require("dotenv").config(); // Environment variables

const slotRoutes = require("./src/routes/slotRoutes"); // Importing routes

const app = express();

// Connecting to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enabling the CORS
app.use(cors());

// Routes
app.use("/api", slotRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
