const mongoose = require("mongoose");

// Define the schema for the User model
const UserSchema = new mongoose.Schema({
    // Name of the user (String)
    name: String,

    // Date of birth of the user (String)
    dob: String,

    // Email (Must be unique)
    email: { type: String, unique: true },

    // Password (Stored as a hash in the database)
    password: String,

    // Role of the user (Default: "user", but can be "admin")
    role: String,

    // Active status (Default: true, user is active when registered)
    isActive: { type: Boolean, default: true },  

    // Track last login time (Default: current date/time when created)
    lastLogin: { type: Date, default: Date.now }, 
});

// Export the User model for use in other parts of the application
module.exports = mongoose.model("User", UserSchema);
