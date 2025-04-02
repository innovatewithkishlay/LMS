import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetPurchasedCoursesQuery } from "@/features/api/purchaseApi";
import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { motion } from "framer-motion";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

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

  // Prepare data for Chart.js
  const chartData = {
    labels: courseData.map((course) => course.name),
    datasets: [
      {
        label: "Course Price (₹)",
        data: courseData.map((course) => course.price),
        borderColor: "#4a90e2",
        backgroundColor: "rgba(74, 144, 226, 0.2)",
        borderWidth: 2,
        tension: 0.4,
        pointRadius: 5,
        pointBackgroundColor: "#4a90e2",
      },
      {
        label: "Students Enrolled",
        data: courseData.map((course) => course.students),
        borderColor: "#34d399",
        backgroundColor: "rgba(52, 211, 153, 0.2)",
        borderWidth: 2,
        tension: 0.4,
        pointRadius: 5,
        pointBackgroundColor: "#34d399",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#6b7280",
          font: {
            size: 14,
          },
          usePointStyle: true, // Use dots instead of lines in the legend
          padding: 20, // Add spacing between legend items
        },
        onClick: (e, legendItem, legend) => {
          // Custom behavior for toggling datasets
          const index = legendItem.datasetIndex;
          const chart = legend.chart;
          const meta = chart.getDatasetMeta(index);
          meta.hidden = !meta.hidden; // Toggle visibility
          chart.update();
        },
      },
      tooltip: {
        backgroundColor: "#1f2937",
        titleColor: "#fff",
        bodyColor: "#fff",
        borderColor: "#4a90e2",
        borderWidth: 1,
        padding: 10,
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#6b7280",
          font: {
            size: 12,
          },
        },
        grid: {
          color: "#e5e7eb",
        },
      },
      y: {
        ticks: {
          color: "#6b7280",
          font: {
            size: 12,
          },
        },
        grid: {
          color: "#e5e7eb",
        },
      },
    },
  };

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
        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white dark:bg-gray-800 rounded-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-gray-800 dark:text-gray-100">
              Course Performance Overview
            </CardTitle>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              A detailed view of course prices and student enrollments.
            </p>
          </CardHeader>
          <CardContent>
            <div className="w-full h-[300px] sm:h-[400px]">
              <Line data={chartData} options={chartOptions} />
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default Dashboard;
