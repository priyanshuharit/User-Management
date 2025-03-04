import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  // State variables to store user input values
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user"); // Default role is "user"
  const navigate = useNavigate(); // Used for navigation

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents default form submission behavior
    try {
      // Send a POST request to register a new user
      await axios.post("http://localhost:5000/api/auth/register", {
        name,
        dob,
        email,
        password,
        role,
      });
      alert("User registered successfully!"); // Show success message
      navigate("/"); // Redirect to login page
    } catch (error) {
      alert("Email already exists!"); // Show error message if registration fails
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-teal-400 to-teal-600">
      {/* Container for the registration form */}
      <div className="bg-gray-800 rounded-lg shadow-lg p-8 w-96">
        {/* Registration title */}
        <h2 className="text-2xl font-bold text-white text-center mb-6">
          Register
        </h2>

        {/* Profile Image Placeholder */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-full bg-gray-700 flex items-center justify-center">
            <img 
              src="profile.jpg" // Replace with the actual path
              alt="Profile" 
              className="h-full w-full rounded-full object-cover" 
            />
          </div>
        </div>

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Role Selection Dropdown */}
          <div>
            <label
              className="block text-gray-400 text-sm font-bold mb-2"
              htmlFor="role"
            >
              Role
            </label>
            <select
              id="role"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline bg-gray-700"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {/* Name Input Field */}
          <div>
            <label
              className="block text-gray-400 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Name"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline bg-gray-700"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* Date of Birth Input Field */}
          <div>
            <label
              className="block text-gray-400 text-sm font-bold mb-2"
              htmlFor="dob"
            >
              Date of Birth
            </label>
            <input
              type="date"
              id="dob"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline bg-gray-700"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              required
            />
          </div>

          {/* Email Input Field */}
          <div>
            <label
              className="block text-gray-400 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Email"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline bg-gray-700"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password Input Field */}
          <div>
            <label
              className="block text-gray-400 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline bg-gray-700"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Register Button */}
          <button
            type="submit"
            className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
          >
            Register
          </button>
        </form>

        {/* Login Link */}
        <p className="mt-4 text-center text-gray-400 text-sm">
          Already have an account?{" "}
          <button
            className="text-teal-400 hover:text-teal-300 font-bold ml-2"
            onClick={() => navigate("/")} // Redirects to login page
          >
            Login here
          </button>
        </p>
      </div>
    </div>
  );
}

export default Register;
