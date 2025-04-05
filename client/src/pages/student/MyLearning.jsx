import React from "react";
import { useLoadUserQuery } from "@/features/api/authApi";
import { motion } from "framer-motion";

const MyLearning = () => {
  const { data, isLoading } = useLoadUserQuery();

  // Extract enrolled courses
  const myLearning = data?.user.enrolledCourses || [];

  return (
    <div className="max-w-7xl mx-auto my-10 px-4 md:px-0">
      <h1 className="font-extrabold text-4xl text-center mb-12 text-gray-800 dark:text-white">
        My Learning
      </h1>
      <div className="my-5">
        {isLoading ? (
          <MyLearningSkeleton />
        ) : myLearning.length === 0 ? (
          <p className="text-center text-gray-600 dark:text-gray-300 text-lg">
            You are not enrolled in any course.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {myLearning.map((course) => {
              return (
                <motion.div
                  key={course._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-800 dark:to-gray-900 rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
                >
                  {/* Course Thumbnail */}
                  <div className="relative h-64 bg-gray-100 dark:bg-gray-700">
                    <img
                      src={course.courseThumbnail}
                      alt={course.courseTitle}
                      className="w-full h-full object-contain rounded-t-lg"
                    />
                  </div>

                  {/* Course Details */}
                  <div className="p-6 space-y-4">
                    <h2 className="font-bold text-xl text-gray-800 dark:text-white truncate">
                      {course.courseTitle}
                    </h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Dive into this course and continue your learning journey.
                    </p>

                    {/* Continue Button */}
                    <button
                      onClick={() => {
                        // Navigate to course progress page
                        window.location.href = `/course-progress/${course._id}`;
                      }}
                      className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-all duration-300 font-semibold"
                    >
                      Continue Learning
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyLearning;

// Skeleton component for loading state
const MyLearningSkeleton = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
    {[...Array(6)].map((_, index) => (
      <div
        key={index}
        className="bg-gray-300 dark:bg-gray-700 rounded-lg h-72 animate-pulse"
      ></div>
    ))}
  </div>
);
