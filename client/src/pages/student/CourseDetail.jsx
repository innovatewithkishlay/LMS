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
import LoadingSpinner from "@/components/LoadingSpinner";
import { motion } from "framer-motion";

const CourseDetail = () => {
  const params = useParams();
  const courseId = params.courseId;
  const navigate = useNavigate();
  const { data, isLoading, isError } =
    useGetCourseDetailWithStatusQuery(courseId);

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
      className="space-y-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      {/* Header Section */}
      <motion.div
        className="bg-gradient-to-r from-blue-500 to-blue-700 text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        <div className="max-w-7xl mx-auto py-10 px-6 md:px-8 flex flex-col gap-6">
          <div>
            <h2 className="text-sm font-medium uppercase tracking-wide text-gray-300">
              Title
            </h2>
            <h1 className="font-bold text-3xl md:text-4xl text-yellow-300">
              {course?.courseTitle || "No Title Available"}
            </h1>
          </div>

          <div>
            <h2 className="text-sm font-medium uppercase tracking-wide text-gray-300">
              Subtitle
            </h2>
            <p className="text-lg md:text-xl text-yellow-300">
              {course?.subTitle || "No Subtitle Available"}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h2 className="text-sm font-medium uppercase tracking-wide text-gray-300">
                Created By
              </h2>
              <p className="text-base text-yellow-300">
                <span className="underline italic">
                  {course?.creator?.name || "Unknown Creator"}
                </span>
              </p>
            </div>
            <div>
              <h2 className="text-sm font-medium uppercase tracking-wide text-gray-300">
                Last Updated
              </h2>
              <p className="text-base text-yellow-300">
                {course?.createdAt?.split("T")[0] || "N/A"}
              </p>
            </div>
            <div>
              <h2 className="text-sm font-medium uppercase tracking-wide text-gray-300">
                Students Enrolled
              </h2>
              <p className="text-base font-semibold text-yellow-300">
                {course?.enrolledStudents?.length || 0}
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Content Section */}
      <div className="max-w-7xl mx-auto px-6 md:px-8 flex flex-col lg:flex-row justify-between gap-10">
        {/* Left Section */}
        <motion.div
          className="w-full lg:w-2/3 space-y-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <Card className="transition-shadow">
            <CardHeader>
              <CardTitle>Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p
                className="text-sm md:text-base text-gray-700 dark:text-gray-300"
                dangerouslySetInnerHTML={{
                  __html: course?.description || "No description available.",
                }}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Course Content</CardTitle>
              <CardDescription>
                {course?.lectures?.length || 0} Lectures
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {course?.lectures?.map((lecture, idx) => (
                <motion.div
                  key={idx}
                  className="flex items-center gap-4 text-sm md:text-base"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1, duration: 0.4 }}
                >
                  <span>
                    {true ? (
                      <PlayCircle size={20} className="text-blue-500" />
                    ) : (
                      <Lock size={20} className="text-gray-500" />
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
          <Card>
            <CardContent className="p-6 flex flex-col items-center">
              <div className="w-full aspect-video mb-6">
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
              <Separator className="my-4" />
              <h1 className="text-xl font-bold text-gray-800 dark:text-gray-200">
                ₹{course?.price || "Free"}
              </h1>
            </CardContent>
            <CardFooter>
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
