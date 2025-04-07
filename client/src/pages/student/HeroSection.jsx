import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import PopupBrief from "@/components/PopupBrief";

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const searchHandler = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      navigate(`/course/search?query=${searchQuery}`);
    }
    setSearchQuery("");
  };

  // Dynamically set placeholder based on screen size
  const [placeholder, setPlaceholder] = useState("Search for courses...");
  useEffect(() => {
    const updatePlaceholder = () => {
      if (window.innerWidth <= 768) {
        setPlaceholder("Search...");
      } else {
        setPlaceholder("Search for courses...");
      }
    };

    updatePlaceholder();
    window.addEventListener("resize", updatePlaceholder);
    return () => window.removeEventListener("resize", updatePlaceholder);
  }, []);

  return (
    <>
      {/* Include the PopupBrief */}
      <PopupBrief />

      <motion.div
        className="relative bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-gray-800 dark:to-gray-900 py-24 px-4 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          className="max-w-3xl mx-auto"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.h1
            className="text-white text-5xl font-extrabold mb-6 leading-tight"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Unlock Your Potential with the Best Courses
          </motion.h1>
          <motion.p
            className="text-gray-200 dark:text-gray-400 text-lg mb-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Explore a world of knowledge, master new skills, and achieve your
            goals with our expertly curated courses.
          </motion.p>

          {/* Search Box */}
          <motion.form
            onSubmit={searchHandler}
            className="flex items-center bg-white dark:bg-gray-800 rounded-full shadow-lg overflow-hidden max-w-xl mx-auto mb-8 border border-gray-300 dark:border-gray-700"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={placeholder} // Dynamic placeholder
              className="flex-grow border-none focus-visible:ring-0 px-6 py-4 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 caret-blue-600 text-lg blinking-cursor" // Added blinking cursor class
            />
            <Button
              type="submit"
              className="bg-gradient-to-r from-blue-600 to-purple-700 text-white px-8 py-4 rounded-r-full hover:opacity-90 transition-all duration-300 text-lg font-semibold shadow-md"
            >
              Search Courses
            </Button>
          </motion.form>

          {/* Explore Courses Button with Animated Line */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="relative flex items-center justify-center mt-6"
          >
            <Button
              onClick={() => navigate(`/course/search?query`)}
              className="relative bg-gradient-to-r from-green-500 to-teal-600 text-white px-8 py-4 rounded-full hover:shadow-lg hover:opacity-90 transition-all duration-300 text-lg font-semibold z-10 overflow-hidden"
            >
              Explore Courses
              {/* Animated Line */}
              <span className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-green-400 to-teal-500 animate-slide"></span>
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>
    </>
  );
};

export default HeroSection;
