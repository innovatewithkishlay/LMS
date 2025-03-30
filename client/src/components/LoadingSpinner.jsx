import { Loader } from "lucide-react";
import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-[#141414]">
      <div className="flex items-center justify-center">
        <Loader className="animate-spin h-16 w-16 text-blue-600 dark:text-blue-400" />
      </div>
      <p className="mt-4 text-lg font-semibold text-gray-700 dark:text-gray-300">
        Loading, please wait...
      </p>
    </div>
  );
};

export default LoadingSpinner;
