import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import PopupBrief from "../components/PopupBrief";

const RoleSelection = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const navbar = document.querySelector("nav");
    if (navbar) navbar.style.display = "none";

    return () => {
      if (navbar) navbar.style.display = "block";
    };
  }, []);

  return (
    <>
      {/* Render the Popup */}
      <PopupBrief />

      {/* Role Selection Page Content */}
      <motion.div
        className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-700 via-blue-800 to-indigo-900 text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Title Section */}
        <motion.h1
          className="text-5xl md:text-6xl font-extrabold mb-8 text-center bg-gradient-to-r from-yellow-300 via-red-500 to-purple-500 text-transparent bg-clip-text"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Welcome to <span className="text-white">V-Learning</span>
        </motion.h1>
        <motion.p
          className="text-lg md:text-xl text-center max-w-2xl mb-12 text-gray-200"
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Empowering learners and educators to achieve their goals. Choose your
          role to get started on your journey with our premium LMS platform.
        </motion.p>

        {/* Buttons Section */}
        <motion.div
          className="space-y-6"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <button
            onClick={() => navigate("/hero-section")}
            className="bg-gradient-to-r from-green-500 to-teal-600 text-white px-8 py-4 rounded-full shadow-lg hover:shadow-xl hover:opacity-90 transition-all duration-300 text-lg font-semibold"
          >
            I'm a Student / Verified Teacher
          </button>
          <button
            onClick={() => navigate("/teacher-registration")}
            className="bg-gradient-to-r from-yellow-500 to-orange-600 text-white px-8 py-4 rounded-full shadow-lg hover:shadow-xl hover:opacity-90 transition-all duration-300 text-lg font-semibold"
          >
            Want to Join the Teacher Team of V-Learning?
          </button>
        </motion.div>

        {/* Footer Section */}
        <motion.p
          className="text-sm text-gray-300 mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          Your journey to success starts here. Let’s make it happen together!
        </motion.p>
      </motion.div>
    </>
  );
};

export default RoleSelection;
