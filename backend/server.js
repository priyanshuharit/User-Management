require("dotenv").config(); // Load environment variables from .env file
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const authRoutes = require("./routes/auth"); // Import authentication routes
const cron = require("node-cron"); // Import cron for scheduling tasks
const User = require("./models/User"); // Import User model

const app = express(); // Create an Express application

// 🔹 Middleware Configuration
app.use(cors()); // Enable Cross-Origin Resource Sharing (CORS)
app.use(bodyParser.json()); // Parse incoming JSON requests

// 🔹 Connect to MongoDB using environment variable from .env file
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected")) // Log success message if connected
    .catch(err => console.log(err)); // Log error if connection fails

// 🔹 Define API routes
app.use("/api/auth", authRoutes); // Use authentication routes under `/api/auth`

// 🔹 Define server port (default: 5000)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); // Start server

// 🔹 CRON JOB: Runs every minute to check inactive users
cron.schedule("* * * * *", async () => {
    const oneHourAgo = new Date();
    oneHourAgo.setHours(oneHourAgo.getHours() - 1); // Subtract 1 hour from current time

    try {
        // Find users who haven't logged in for over an hour and mark them inactive
        await User.updateMany(
            { lastLogin: { $lt: oneHourAgo } }, // Condition: Last login was more than 1 hour ago
            { $set: { isActive: false } } // Action: Set isActive to false
        );
        console.log("Updated inactive users"); // Log successful update
    } catch (error) {
        console.error("Error updating inactive users:", error); // Log error if update fails
    }
});
