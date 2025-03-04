import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Dashboard() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]); // Store the list of registered users
  const [user, setUser] = useState(null); // Store the currently logged-in user

  // Function to fetch all users from the backend API
  const fetchUsers = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/auth/users");
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // useEffect runs when the component mounts
  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");

    // If no user is logged in, redirect to the login page
    if (!loggedInUser) {
      navigate("/");
    } else {
      setUser(JSON.parse(loggedInUser)); // Parse and store logged-in user data
      fetchUsers(); // Fetch users from the backend
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Container for the dashboard */}
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          {/* Welcome message for the logged-in user */}
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Welcome, <span className="text-blue-600">{user?.name}!</span>
          </h2>

          {/* Table for displaying users */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    #
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date Created
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {/* Loop through the users and display them in the table */}
                {users.map((u, index) => (
                  <tr key={u._id}>
                    <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                    <td className="px-6 py-4 whitespace-nowrap flex items-center">
                      {/* Avatar Image (Generated using an API) */}
                      <div className="flex-shrink-0 h-10 w-10">
                        <img
                          className="h-10 w-10 rounded-full"
                          src={`https://i.pravatar.cc/150?img=${index}`}
                          alt="User Avatar"
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {u.name}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{u.dob}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {/* Show the role (Default: "User") */}
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                        {u.role || "User"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {/* Show "Active" or "Suspended" based on isActive status */}
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          u.isActive
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {u.isActive ? "Active" : "Suspended"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      {/* Action Buttons */}
                      <a
                        href="#"
                        className="text-blue-600 hover:text-blue-900 mr-2"
                      >
                        ⚙️
                      </a>{" "}
                      {/* Settings Button */}
                      <a href="#" className="text-red-600 hover:text-red-900">
                        ❌
                      </a>{" "}
                      {/* Delete Button */}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination Section */}
        <div className="bg-gray-50 px-6 py-3 flex items-center justify-between border-t border-gray-200">
          {/* Previous Button */}
          <div className="flex-1 flex justify-between sm:justify-start">
            <a
              href="#"
              className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              Previous
            </a>
          </div>
          {/* Pagination Numbers */}
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-center">
            <div>
              <nav
                className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                aria-label="Pagination"
              >
                <a
                  href="#"
                  aria-current="page"
                  className="z-10 bg-blue-50 border-blue-500 text-blue-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                >
                  1
                </a>
                <a
                  href="#"
                  className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                >
                  2
                </a>
                <a
                  href="#"
                  className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                >
                  3
                </a>
              </nav>
            </div>
          </div>
          {/* Next Button */}
          <div className="flex-1 flex justify-end">
            <a
              href="#"
              className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              Next
            </a>
          </div>
        </div>

        {/* Logout Button */}
        <div className="p-6 border-t border-gray-200">
          <button
            onClick={() => {
              localStorage.removeItem("user"); // Remove user session
              navigate("/"); // Redirect to login page
            }}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
