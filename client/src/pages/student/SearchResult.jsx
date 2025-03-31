import { Badge } from "@/components/ui/badge";
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export const SearchResult = ({ course }) => {
  return (
    <motion.div
      className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 w-[340px] h-[440px] mx-auto flex flex-col"
      whileHover={{ scale: 1.03 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Course Image */}
      <Link to={`/course-detail/${course._id}`} className="block">
        <img
          src={
            course.courseThumbnail ||
            "https://via.placeholder.com/300x200?text=No+Image"
          }
          alt={course.courseTitle || "Course Thumbnail"}
          className="w-full h-44 object-contain bg-gray-200"
        />
      </Link>

      {/* Course Details */}
      <div className="p-4 flex flex-col justify-between flex-grow">
        {/* Course Title */}
        <Link to={`/course-detail/${course._id}`}>
          <h1 className="font-semibold text-base md:text-lg text-gray-800 truncate">
            {course.courseTitle || "Untitled Course"}
          </h1>
        </Link>

        {/* Subtitle */}
        <p className="text-sm text-gray-600 mt-1 line-clamp-2">
          {course.subTitle || "No description available for this course."}
        </p>

        {/* Instructor Name */}
        <p className="text-sm text-gray-700 mt-2">
          Instructor:{" "}
          <span className="font-medium">
            {course.creator?.name || "Unknown"}
          </span>
        </p>

        {/* Difficulty Badge */}
        <div className="mt-3">
          {course.courseLevel ? (
            <Badge
              className={`${
                course.courseLevel === "Hard"
                  ? "bg-red-500 text-white"
                  : course.courseLevel === "Medium"
                  ? "bg-yellow-500 text-white"
                  : "bg-green-500 text-white"
              }`}
            >
              {course.courseLevel}
            </Badge>
          ) : (
            <Badge className="bg-gray-300 text-gray-700">Unknown Level</Badge>
          )}
        </div>

        {/* Price and View Details */}
        <div className="flex items-center justify-between mt-4">
          <h1 className="font-bold text-base text-blue-600">
            ₹{course.coursePrice || "0"}
          </h1>
          <Link to={`/course-detail/${course._id}`}>
            <button className="bg-blue-600 text-white px-3 py-1.5 rounded hover:bg-blue-700 transition duration-300 text-sm">
              View Details
            </button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};
