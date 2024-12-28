import React from "react";
import { NavLink, Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white">
        <div className="p-5 text-xl font-bold border-b border-gray-700">
          Admin Dashboard
        </div>
        <nav className="p-5 space-y-4">
          <NavLink
            to="/admin/volunteers"
            className={({ isActive }) =>
              isActive
                ? "block py-2 px-4 bg-[#F15E42] rounded"
                : "block py-2 px-4 hover:bg-gray-700 rounded"
            }
          >
            Volunteers
          </NavLink>
          <NavLink
            to="/admin/pets"
            className={({ isActive }) =>
              isActive
                ? "block py-2 px-4 bg-[#F15E42] rounded"
                : "block py-2 px-4 hover:bg-gray-700 rounded"
            }
          >
            Pets
          </NavLink>
          <NavLink
            to="/admin/requests"
            className={({ isActive }) =>
              isActive
                ? "block py-2 px-4 bg-[#F15E42] rounded"
                : "block py-2 px-4 hover:bg-gray-700 rounded"
            }
          >
            Adoption Requests
          </NavLink>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 bg-gray-50">
        <Outlet /> {/* This renders child routes */}
      </main>
    </div>
  );
};

export default DashboardLayout;
