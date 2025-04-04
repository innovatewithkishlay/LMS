import { motion } from "framer-motion"; // Import Framer Motion
import React, { useState } from "react";

const SparkleEffect = ({ isHovered }) => {
  if (!isHovered) return null; // Only show the sparkle effect when hovered

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center pointer-events-none"
      initial={{ scale: 0, opacity: 1 }}
      animate={{ scale: 2, opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="w-16 h-16 bg-yellow-400 rounded-full blur-lg"></div>
    </motion.div>
  );
};

const AIButton = ({ onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);

  const handleClick = () => {
    setShowSparkle(true);
    setTimeout(() => setShowSparkle(false), 500);
    onClick();
  };

  return (
    <motion.button
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)} // Trigger hover state
      onMouseLeave={() => setIsHovered(false)} // Remove hover state
      className="fixed bottom-4 right-4 p-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all"
      whileHover={{ scale: 1.1 }} // Framer Motion hover animation
      whileTap={{ scale: 0.9 }} // Framer Motion tap animation
    >
      {/* Sparkle Effect on Hover */}
      <SparkleEffect isHovered={isHovered} />

      {/* Sparkle Effect on Click */}
      {showSparkle && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: 2, opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-16 h-16 bg-yellow-400 rounded-full blur-lg"></div>
        </motion.div>
      )}

      {/* Button Content */}
      <div className="flex items-center justify-center space-x-2 relative">
        <span className="text-lg font-semibold">AI</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 20.25c4.97 0 9-4.03 9-9s-4.03-9-9-9-9 4.03-9 9 4.03 9 9 9z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 9.75l-3 3-3-3"
          />
        </svg>
      </div>
    </motion.button>
  );
};

export default AIButton;
