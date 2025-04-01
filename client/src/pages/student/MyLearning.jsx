import React from "react";
import Course from "./Course";
import { useLoadUserQuery } from "@/features/api/authApi";

const MyLearning = () => {
  const { data, isLoading } = useLoadUserQuery();

  const myLearning = data?.user.enrolledCourses || [];
  return (
    <div className="max-w-4xl mx-auto my-10 px-4 md:px-0">
      <h1 className="font-bold text-2xl">MY LEARNING</h1>
      <div className="my-5">
        {isLoading ? (
          <MyLearningSkeleton />
        ) : myLearning.length === 0 ? (
          <p>You are not enrolled in any course.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {myLearning.map((course) => {
              // Check if the course is purchased
              const isPurchased = data.user.enrolledCourses.some(
                (enrolledCourse) => enrolledCourse._id === course._id
              );

              // Get the completion percentage for the course
              const courseProgress = data.user.enrolledCourses.find(
                (enrolledCourse) => enrolledCourse._id === course._id
              );
              const completionPercentage =
                courseProgress?.completionPercentage || 0;

              return (
                <Course
                  course={course}
                  key={course._id}
                  isPurchased={isPurchased}
                  completionPercentage={completionPercentage}
                />
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
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
    {[...Array(3)].map((_, index) => (
      <div
        key={index}
        className="bg-gray-300 dark:bg-gray-700 rounded-lg h-40 animate-pulse"
      ></div>
    ))}
  </div>
);
