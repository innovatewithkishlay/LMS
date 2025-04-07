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
      <>
        {/* Background Blur */}
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40"></div>

        {/* Popup Content */}
        <motion.div
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "100%", opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="fixed inset-0 flex items-center justify-center z-50"
        >
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-2xl text-center max-w-lg w-full relative">
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-gray-600 dark:text-gray-300 text-xl font-bold hover:text-gray-800 dark:hover:text-gray-100 transition-colors"
            >
              ✕
            </button>

            {/* Title */}
            <h1 className="font-extrabold text-3xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text mb-4">
              Welcome to V-Learning
            </h1>

            {/* Content */}
            <p className="text-gray-700 dark:text-gray-300 text-lg mb-6">
              Empowering learners for over <strong>12 years</strong>, V-Learning
              is your trusted platform for mastering new skills and achieving
              your goals. Join thousands of students who have transformed their
              lives with our expertly curated courses.
            </p>

            <ul className="text-gray-600 dark:text-gray-400 text-left mb-6 space-y-2">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                50+ expertly designed courses.
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                5000+ students are learning.
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-pink-500 rounded-full mr-2"></span>
                Learn at your own pace with flexible schedules.
              </li>
            </ul>

            {/* Explore Courses Button */}
            <button
              onClick={handleExploreCourses}
              className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-8 py-3 rounded-lg shadow-md hover:opacity-90 transition-all duration-300 mb-4"
            >
              Explore Courses
            </button>

            {/* Additional Note */}
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Start your journey today and unlock your potential!
            </p>
          </div>
        </motion.div>
      </>
    )
  );
};

export default PopupBrief;
