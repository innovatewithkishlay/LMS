import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

function Skeleton({ className, ...props }) {
  return (
    <motion.div
      className={cn(
        "relative overflow-hidden rounded-md bg-gray-200 dark:bg-gray-700",
        className
      )}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      {...props}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-gray-300 via-gray-100 to-gray-300 dark:from-gray-600 dark:via-gray-500 dark:to-gray-600 animate-shimmer"
        initial={{ x: "-100%" }}
        animate={{ x: "100%" }}
        transition={{
          repeat: Infinity,
          duration: 1.5,
          ease: "linear",
        }}
      />
    </motion.div>
  );
}

function SearchResultSkeleton() {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden w-[340px] h-[440px] mx-auto">
      {/* Skeleton for Image */}
      <div className="w-full h-44 bg-gray-200">
        <Skeleton className="h-full w-full" />
      </div>

      {/* Skeleton for Card Content */}
      <div className="p-4 flex flex-col justify-between h-full">
        {/* Skeleton for Title */}
        <Skeleton className="h-6 w-3/4 mb-2" />

        {/* Skeleton for Subtitle */}
        <Skeleton className="h-4 w-2/3 mb-4" />

        {/* Skeleton for Instructor Name */}
        <Skeleton className="h-4 w-1/2 mb-4" />

        {/* Skeleton for Difficulty Badge */}
        <Skeleton className="h-6 w-20 mb-4" />

        {/* Skeleton for Price and Button */}
        <div className="flex items-center justify-between mt-4">
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-8 w-24 rounded" />
        </div>
      </div>
    </div>
  );
}

export { Skeleton, SearchResultSkeleton };
