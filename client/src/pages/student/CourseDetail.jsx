import BuyCourseButton from "@/components/BuyCourseButton";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useGetCourseDetailWithStatusQuery } from "@/features/api/purchaseApi";
import { BadgeInfo, Lock, PlayCircle } from "lucide-react";
import React from "react";
import ReactPlayer from "react-player";
import { useNavigate, useParams } from "react-router-dom";
import LoadingSpinner from "@/components/LoadingSpinner"; // Import the updated spinner
import { motion } from "framer-motion"; // Import Framer Motion

const CourseDetail = () => {
  const params = useParams();
  const courseId = params.courseId;
  const navigate = useNavigate();
  const { data, isLoading, isError } =
    useGetCourseDetailWithStatusQuery(courseId);

  // Use the updated LoadingSpinner component
  if (isLoading) return <LoadingSpinner />;

  if (isError || !data || !data.course)
    return (
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-xl font-semibold">
          Course not found or an error occurred.
        </h1>
      </div>
    );

  const { course, purchased } = data;

  const handleContinueCourse = () => {
    if (purchased) {
      navigate(`/course-progress/${courseId}`);
    }
  };

  return (
    <motion.div
      className="space-y-5"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      {/* Header Section */}
      <motion.div
        className="bg-[#2D2F31] dark:bg-gray-900 text-white dark:text-gray-100"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        <div className="max-w-7xl mx-auto py-8 px-4 md:px-8 flex flex-col gap-2">
          <h1 className="font-bold text-2xl md:text-3xl">
            {course?.courseTitle || "No Title Available"}
          </h1>
          <p className="text-base md:text-lg">
            {course?.subTitle || "No Subtitle Available"}
          </p>

          <p>
            Created By{" "}
            <span className="text-[#C0C4FC] dark:text-blue-400 underline italic">
              {course?.creator?.name || "Unknown Creator"}
            </span>
          </p>
          <div className="flex items-center gap-2 text-sm">
            <BadgeInfo size={16} />
            <p>Last updated {course?.createdAt?.split("T")[0] || "N/A"}</p>
          </div>
          <p>Students enrolled: {course?.enrolledStudents?.length || 0}</p>
        </div>
      </motion.div>

      {/* Main Content Section */}
      <div className="max-w-7xl mx-auto my-5 px-4 md:px-8 flex flex-col lg:flex-row justify-between gap-10">
        {/* Left Section */}
        <motion.div
          className="w-full lg:w-1/2 space-y-5"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <h1 className="font-bold text-xl md:text-2xl">Description</h1>
          <p
            className="text-sm text-gray-700 dark:text-gray-300"
            dangerouslySetInnerHTML={{
              __html: course?.description || "No description available.",
            }}
          />
          <Card className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">
                Course Content
              </CardTitle>
              <CardDescription>
                {course?.lectures?.length || 0} lectures
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {course?.lectures?.map((lecture, idx) => (
                <motion.div
                  key={idx}
                  className="flex items-center gap-3 text-sm"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1, duration: 0.4 }}
                >
                  <span>
                    {true ? (
                      <PlayCircle size={14} className="text-blue-500" />
                    ) : (
                      <Lock size={14} className="text-gray-500" />
                    )}
                  </span>
                  <p className="text-gray-800 dark:text-gray-200">
                    {lecture?.lectureTitle || "Untitled Lecture"}
                  </p>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Right Section */}
        <motion.div
          className="w-full lg:w-1/3"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <Card className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-4 flex flex-col">
              <div className="w-full aspect-video mb-4">
                <ReactPlayer
                  width="100%"
                  height={"100%"}
                  url={course?.lectures?.[0]?.videoUrl || ""}
                  controls={true}
                />
              </div>
              <h1 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                {course?.lectures?.[0]?.lectureTitle || "Lecture Title"}
              </h1>
              <Separator className="my-2" />
              <h1 className="text-lg md:text-xl font-semibold text-gray-800 dark:text-gray-200">
                ₹{course?.price || "Free"}
              </h1>
            </CardContent>
            <CardFooter className="flex justify-center p-4">
              {purchased ? (
                <Button
                  onClick={handleContinueCourse}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white"
                >
                  Continue Course
                </Button>
              ) : (
                <BuyCourseButton courseId={courseId} />
              )}
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default CourseDetail;
