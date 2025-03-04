const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User"); // Import User model

const router = express.Router(); // Create an Express router

// 🔹 REGISTER API - Allows new users to register
router.post("/register", async (req, res) => {
    // Extract user details from the request body
    const { name, dob, email, password, role } = req.body; 
    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password for security

    try {
        // Create a new user with the provided details
        const user = new User({ name, dob, email, password: hashedPassword, role });
        await user.save(); // Save user to the database
        res.json({ message: "User registered successfully" });
    } catch (err) {
        res.status(400).json({ error: "Email already exists" }); // Handle duplicate email error
    }
});

// 🔹 GET ALL USERS API - Retrieves all registered users
router.get("/users", async (req, res) => {
    try {
        // Fetch all users from the database, excluding their passwords for security
        const users = await User.find({}, { password: 0 });
        res.json(users); // Send the users as a response
    } catch (err) {
        console.error("Error fetching users:", err);
        res.status(500).json({ error: "Internal server error" }); // Handle errors
    }
});

// 🔹 LOGIN API - Authenticates users and provides a token
router.post("/login", async (req, res) => {
    try {
        // Extract email and password from the request body
        const { email, password } = req.body;
        const user = await User.findOne({ email }); // Find user by email

        // If user is not found or password does not match, return error
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        // Update last login time and set user as active
        user.lastLogin = Date.now();
        user.isActive = true;
        await user.save(); // Save the updates to the database

        // Generate a JWT token for authentication
        const token = jwt.sign({ userId: user._id }, "your_secret_key", { expiresIn: "1h" });

        // Send response with user details (excluding password)
        res.json({ 
            token, 
            user: { 
                name: user.name, 
                email: user.email, 
                dob: user.dob, 
                isActive: user.isActive,
                role: user.role // Include role in response
            } 
        });
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ error: "Internal server error" }); // Handle errors
    }
});

module.exports = router; // Export the router
