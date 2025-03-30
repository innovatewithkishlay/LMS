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

export { Skeleton };
