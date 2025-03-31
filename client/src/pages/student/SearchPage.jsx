import React, { useState } from "react";
import Filter from "./Filter";
import { useGetSearchCourseQuery } from "@/features/api/courseApi";
import { Link, useSearchParams } from "react-router-dom";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SearchResultSkeleton } from "@/components/ui/skeleton";
import { SearchResult } from "./SearchResult";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");
  const [selectedCategories, setSelectedCatgories] = useState([]);
  const [sortByPrice, setSortByPrice] = useState("");

  const { data, isLoading } = useGetSearchCourseQuery({
    searchQuery: query,
    categories: selectedCategories,
    sortByPrice,
  });

  const isEmpty = !isLoading && data?.courses.length === 0;

  const handleFilterChange = (categories, price) => {
    setSelectedCatgories(categories);
    setSortByPrice(price);
  };

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8">
      <div className="my-6">
        <h1 className="font-bold text-xl md:text-2xl">Results for "{query}"</h1>
        <p>
          Showing results for{" "}
          <span className="text-blue-800 font-bold italic">{query}</span>
        </p>
      </div>
      <div className="flex flex-col md:flex-row gap-14">
        <Filter handleFilterChange={handleFilterChange} />
        <div className="flex-1 space-y-0">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {Array.from({ length: 4 }).map((_, idx) => (
                <SearchResultSkeleton key={idx} />
              ))}
            </div>
          ) : isEmpty ? (
            <CourseNotFound />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {data?.courses?.map((course) => (
                <SearchResult key={course._id} course={course} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;

const CourseNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-32 dark:bg-gray-900 p-6">
      <AlertCircle className="text-red-500 h-16 w-16 mb-4" />
      <h1 className="font-bold text-2xl md:text-4xl text-gray-800 dark:text-gray-200 mb-2">
        Course Not Found
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
        Sorry, we couldn't find the course you're looking for.
      </p>
      <Link to="/" className="italic">
        <Button variant="link">Browse All Courses</Button>
      </Link>
    </div>
  );
};
