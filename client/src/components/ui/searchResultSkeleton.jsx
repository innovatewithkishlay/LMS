import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const SearchResultSkeleton = () => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden max-w-md mx-auto h-full">
      {/* Skeleton for Image */}
      <div className="w-full h-48 bg-gray-200">
        <Skeleton className="h-full w-full" />
      </div>

      {/* Skeleton for Card Content */}
      <div className="p-4 flex flex-col justify-between h-[300px]">
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
};

export default { SearchResultSkeleton };
