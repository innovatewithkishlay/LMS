import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const PopupBrief = () => {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const hasVisited = localStorage.getItem("hasVisited");
    if (!hasVisited) {
      setIsVisible(true);
      localStorage.setItem("hasVisited", "true");
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleExploreCourses = () => {
    setIsVisible(false);
    navigate("/course/search");
  };

  return (
    isVisible && (
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="fixed bottom-0 left-0 w-full bg-white dark:bg-gray-800 shadow-lg z-50"
      >
        {/* Background Blur */}
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40"></div>

        {/* Popup Content */}
        <div className="relative p-6 text-center">
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-gray-600 dark:text-gray-300 text-xl font-bold"
          >
            ✕
          </button>
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
            Welcome to [LMS Name]!
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Empowering learners for over 12 years. Explore our courses and start
            your journey today!
          </p>
          <button
            onClick={handleExploreCourses}
            className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-lg shadow-md hover:opacity-90 transition-all duration-300"
          >
            Explore Courses
          </button>
        </div>
      </motion.div>
    )
  );
};

export default PopupBrief;
