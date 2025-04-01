import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Course = ({ course, isPurchased, completionPercentage }) => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    if (isPurchased) {
      // Navigate to the course progress page
      navigate(`/course-progress/${course._id}`);
    } else {
      // Navigate to the course detail page for enrollment
      navigate(`/course-detail/${course._id}`);
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }} // Slightly scale up on hover
      whileTap={{ scale: 0.95 }} // Slightly scale down on tap
      initial={{ opacity: 0, y: 20 }} // Initial animation
      animate={{ opacity: 1, y: 0 }} // Animate into view
      transition={{ duration: 0.3, ease: "easeInOut" }} // Smooth transition
      className="rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transform transition-all duration-300"
    >
      <Card className="dark:bg-gray-800 bg-white">
        {/* Course Thumbnail */}
        <div className="relative">
          <img
            src={course.courseThumbnail}
            alt="course"
            className="w-full h-56 object-contain bg-gray-100 rounded-t-lg"
          />
          <Badge className="absolute top-3 left-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-3 py-1 text-xs rounded-full shadow-md">
            {course.courseLevel}
          </Badge>
        </div>

        {/* Course Content */}
        <CardContent className="px-6 py-5 space-y-4">
          {/* Course Title */}
          <h1 className="hover:underline font-extrabold text-xl truncate text-gray-800 dark:text-white">
            {course.courseTitle}
          </h1>

          {/* Creator Info */}
          <div className="flex items-center gap-4">
            <Avatar className="h-12 w-12">
              <AvatarImage
                src={
                  course.creator?.photoUrl || "https://github.com/shadcn.png"
                }
                alt="Creator Avatar"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="font-semibold text-sm text-gray-600 dark:text-gray-300">
                {course.creator?.name}
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {course.creator?.role || "Instructor"}
              </p>
            </div>
          </div>

          {/* Completion Percentage */}
          {isPurchased && completionPercentage !== undefined && (
            <div className="mb-4">
              <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <div
                  className="bg-green-600 h-2.5 rounded-full"
                  style={{ width: `${completionPercentage}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                {completionPercentage}% completed
              </p>
            </div>
          )}

          {/* Course Price and Button */}
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-gray-800 dark:text-white">
              ₹{course.coursePrice}
            </span>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleButtonClick}
              className={`px-5 py-2 rounded-lg shadow-md hover:shadow-lg transition-all ${
                isPurchased
                  ? "bg-green-600 text-white hover:bg-green-700"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              {isPurchased ? "Continue Course" : "Enroll Now"}
            </motion.button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default Course;
