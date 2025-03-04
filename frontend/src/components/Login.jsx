import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
    // State variables to store email and password input values
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate(); // Used for navigation

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevents the default form submission behavior
        try {
            // Send a POST request to the backend login API with email and password
            const res = await axios.post("http://localhost:5000/api/auth/login", { email, password });

            // Store the user data in local storage for session persistence
            localStorage.setItem("user", JSON.stringify(res.data.user));

            // Navigate to the dashboard after successful login
            navigate("/dashboard");
        } catch (error) {
            // Show an alert if the login fails
            alert("Invalid email or password");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-teal-400 to-teal-600">
            {/* Container for the login form */}
            <div className="bg-gray-800 rounded-lg shadow-lg p-8 w-96">
                {/* Login title */}
                <h2 className="text-2xl font-bold text-white text-center mb-6">Sign In</h2>

                {/* Profile Image Placeholder */}
                <div className="flex justify-center mb-6">
                    <div className="w-20 h-20 rounded-full bg-gray-700 flex items-center justify-center">
                        <img 
                            src="profile.jpg" // Replace with actual profile image path
                            alt="Profile" 
                            className="h-full w-full rounded-full object-cover" 
                        />
                    </div>
                </div>

                {/* Login Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Email Input Field */}
                    <div>
                        <label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="email">
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
                        <label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="password">
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

                    {/* Remember Me and Forgot Password */}
                    <div className="flex items-center justify-between">
                        {/* Remember Me Checkbox */}
                        <div className="flex items-center">
                            <input 
                                className="mr-2 leading-tight" 
                                type="checkbox" 
                                id="remember" 
                            />
                            <label className="text-gray-400 text-sm" htmlFor="remember">
                                Remember Me
                            </label>
                        </div>

                        {/* Forgot Password Link */}
                        <a className="inline-block align-baseline text-sm text-teal-400 hover:text-teal-300" href="#">
                            Forgot Password?
                        </a>
                    </div>

                    {/* Sign In Button */}
                    <button 
                        type="submit" 
                        className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                    >
                        Sign In
                    </button>
                </form>

                {/* Register Link */}
                <p className="mt-4 text-center text-gray-400 text-sm">
                    Don't have an account?{" "}
                    <button
                        className="text-teal-400 hover:text-teal-300 font-bold ml-2"
                        onClick={() => navigate("/register")} // Redirects to Register page
                    >
                        Register here
                    </button>
                </p>
            </div>
        </div>
    );
}

export default Login;
