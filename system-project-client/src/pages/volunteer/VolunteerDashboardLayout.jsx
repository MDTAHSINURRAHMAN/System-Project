import React from "react";
import { Link, Outlet } from "react-router-dom";

const VolunteerDashboardLayout = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-1/4 bg-gray-800 text-white p-5">
        <h2 className="text-2xl font-bold mb-6">Volunteer Dashboard</h2>
        <ul className="space-y-4">
          <li>
            <Link to="/volunteer/profile" className="hover:text-gray-300">
              Profile
            </Link>
          </li>
          <li>
            <Link to="/volunteer/tasks" className="hover:text-gray-300">
              Tasks
            </Link>
          </li>
          <li>
            <Link to="/volunteer/chats" className="hover:text-gray-300">
              Pending Chats
            </Link>
          </li>
          <li>
            <Link to="/volunteer/chatroom" className="hover:text-gray-300">
              Chatroom
            </Link>
          </li>
          <li>
            <Link to="/volunteer/logout" className="hover:text-gray-300">
              Logout
            </Link>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="w-3/4 p-6 bg-gray-50">
        <Outlet />
      </div>
    </div>
  );
};

export default VolunteerDashboardLayout;
