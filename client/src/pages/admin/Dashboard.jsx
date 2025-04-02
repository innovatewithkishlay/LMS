import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetPurchasedCoursesQuery } from "@/features/api/purchaseApi";
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { motion } from "framer-motion";

const Dashboard = () => {
  const { data, isSuccess, isError, isLoading } = useGetPurchasedCoursesQuery();

  if (isLoading) return <h1>Loading...</h1>;
  if (isError)
    return <h1 className="text-red-500">Failed to get purchased course</h1>;

  const { purchasedCourse } = data || [];

  const courseData = purchasedCourse.map((course) => ({
    name: course.courseId.courseTitle,
    price: course.courseId.coursePrice,
    students: course.studentsEnrolled || 0,
  }));

  const totalRevenue = purchasedCourse.reduce(
    (acc, element) => acc + (element.amount || 0),
    0
  );

  const totalSales = purchasedCourse.length;

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
  };

  return (
    <motion.div
      className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={cardVariants} className="col-span-1 lg:col-span-2">
        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 bg-gradient-to-r from-blue-500 to-purple-500 text-white">
          <CardHeader>
            <CardTitle>Total Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{totalSales}</p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Total Revenue Card */}
      <motion.div variants={cardVariants} className="col-span-1 lg:col-span-2">
        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 bg-gradient-to-r from-green-500 to-teal-500 text-white">
          <CardHeader>
            <CardTitle>Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">₹{totalRevenue}</p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Course Prices Chart */}
      <motion.div
        variants={cardVariants}
        className="col-span-1 sm:col-span-2 lg:col-span-4"
      >
        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white dark:bg-gray-800">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-700 dark:text-gray-200">
              Course Prices
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="w-full h-[300px] sm:h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={courseData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                  <XAxis
                    dataKey="name"
                    stroke="#6b7280"
                    angle={-30}
                    textAnchor="end"
                    interval={0}
                  />
                  <YAxis stroke="#6b7280" />
                  <Tooltip
                    formatter={(value, name) => [`₹${value}`, name]}
                    contentStyle={{
                      backgroundColor: "#1f2937",
                      borderRadius: "8px",
                      color: "#fff",
                    }}
                  />
                  <Legend
                    verticalAlign="top"
                    align="right"
                    wrapperStyle={{ paddingBottom: "10px" }}
                  />
                  <Line
                    type="monotone"
                    dataKey="price"
                    name="Course Price"
                    stroke="#4a90e2"
                    strokeWidth={3}
                    dot={{ stroke: "#4a90e2", strokeWidth: 2 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="students"
                    name="Students Enrolled"
                    stroke="#34d399"
                    strokeWidth={3}
                    dot={{ stroke: "#34d399", strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default Dashboard;
