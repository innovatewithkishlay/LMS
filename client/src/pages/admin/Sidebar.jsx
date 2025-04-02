import { ChartNoAxesColumn, SquareLibrary, Menu, X } from "lucide-react";
import React, { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const Sidebar = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const sidebarVariants = {
    hidden: { x: "-100%", opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const linkVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
  };

  const closeSidebar = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="relative flex">
      {/* Sidebar for Desktop */}
      <motion.div
        className="hidden lg:block w-[250px] sm:w-[300px] bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 border-r border-gray-300 dark:border-gray-700 p-5 sticky top-0 h-screen overflow-hidden"
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="space-y-6">
          {/* Logo */}
          <motion.div
            className="text-center text-xl font-bold mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-blue-600 dark:text-blue-400">Admin Panel</h1>
          </motion.div>

          {/* Navigation Links */}
          <div className="space-y-4">
            <motion.div
              variants={linkVariants}
              initial="hidden"
              animate="visible"
            >
              <Link
                to="dashboard"
                className={`relative flex items-center gap-3 p-3 rounded-lg transition-all ${
                  location.pathname.includes("dashboard")
                    ? "text-blue-500 dark:text-blue-400"
                    : "hover:text-blue-500 dark:hover:text-blue-400"
                }`}
              >
                {location.pathname.includes("dashboard") && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute left-0 top-0 h-full w-1 bg-blue-700 rounded-r-lg"
                  />
                )}
                <ChartNoAxesColumn size={22} />
                <h1 className="text-lg font-medium">Dashboard</h1>
              </Link>
            </motion.div>

            <motion.div
              variants={linkVariants}
              initial="hidden"
              animate="visible"
            >
              <Link
                to="course"
                className={`relative flex items-center gap-3 p-3 rounded-lg transition-all ${
                  location.pathname.includes("course")
                    ? "text-blue-500 dark:text-blue-400"
                    : "hover:text-blue-500 dark:hover:text-blue-400"
                }`}
              >
                {location.pathname.includes("course") && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute left-0 top-0 h-full w-1 bg-blue-700 rounded-r-lg"
                  />
                )}
                <SquareLibrary size={22} />
                <h1 className="text-lg font-medium">Courses</h1>
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Sidebar for Mobile */}
      <div className="lg:hidden">
        <button
          className="p-3 text-gray-800 dark:text-gray-200"
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <Menu size={28} />
        </button>

        {isMobileMenuOpen && (
          <>
            {/* Blurred Background */}
            <div
              className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40"
              onClick={closeSidebar}
            ></div>

            {/* Sidebar */}
            <motion.div
              className="fixed top-0 left-0 w-[250px] h-full bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 shadow-lg z-50 overflow-hidden"
              variants={sidebarVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <div className="space-y-6 p-5">
                {/* Close Button */}
                <button
                  className="absolute top-4 right-4 text-gray-800 dark:text-gray-200"
                  onClick={closeSidebar}
                >
                  <X size={28} />
                </button>

                {/* Logo */}
                <div className="text-center text-xl font-bold mb-6">
                  <h1 className="text-blue-600 dark:text-blue-400">
                    Admin Panel
                  </h1>
                </div>

                {/* Navigation Links */}
                <div className="space-y-4">
                  <Link
                    to="dashboard"
                    className={`relative flex items-center gap-3 p-3 rounded-lg transition-all ${
                      location.pathname.includes("dashboard")
                        ? "text-blue-500 dark:text-blue-400"
                        : "hover:text-blue-500 dark:hover:text-blue-400"
                    }`}
                    onClick={closeSidebar}
                  >
                    {location.pathname.includes("dashboard") && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="absolute left-0 top-0 h-full w-1 bg-blue-700 rounded-r-lg"
                      />
                    )}
                    <ChartNoAxesColumn size={22} />
                    <h1 className="text-lg font-medium">Dashboard</h1>
                  </Link>
                  <Link
                    to="course"
                    className={`relative flex items-center gap-3 p-3 rounded-lg transition-all ${
                      location.pathname.includes("course")
                        ? "text-blue-500 dark:text-blue-400"
                        : "hover:text-blue-500 dark:hover:text-blue-400"
                    }`}
                    onClick={closeSidebar}
                  >
                    {location.pathname.includes("course") && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="absolute left-0 top-0 h-full w-1 bg-blue-700 rounded-r-lg"
                      />
                    )}
                    <SquareLibrary size={22} />
                    <h1 className="text-lg font-medium">Courses</h1>
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </div>

      {/* Main Content */}
      <motion.div
        className="flex-1 p-10 bg-gray-50 dark:bg-gray-800"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Outlet />
      </motion.div>
    </div>
  );
};

export default Sidebar;
