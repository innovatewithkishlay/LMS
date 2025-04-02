import { ChartNoAxesColumn, SquareLibrary } from "lucide-react";
import React from "react";
import { Link, Outlet } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="hidden lg:block w-[250px] sm:w-[300px] bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 border-r border-gray-300 dark:border-gray-700 p-5 sticky top-0 h-screen">
        <div className="space-y-6">
          {/* Logo */}
          <div className="text-center text-xl font-bold mb-6">
            <h1 className="text-blue-600 dark:text-blue-400">Admin Panel</h1>
          </div>

          {/* Navigation Links */}
          <div className="space-y-4">
            <Link
              to="dashboard"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-500 hover:text-white transition-all"
            >
              <ChartNoAxesColumn size={22} />
              <h1 className="text-lg font-medium">Dashboard</h1>
            </Link>
            <Link
              to="course"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-500 hover:text-white transition-all"
            >
              <SquareLibrary size={22} />
              <h1 className="text-lg font-medium">Courses</h1>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-10 bg-gray-50 dark:bg-gray-800">
        <Outlet />
      </div>
    </div>
  );
};

export default Sidebar;
