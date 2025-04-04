import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useSearchParams } from "react-router-dom";

const categories = [
  { id: "math", label: "Math" },
  { id: "Physics", label: "Physics" },
  { id: "Chemistry", label: "Chemistry" },
  { id: "Biology", label: "Biology" },
  { id: "social-studies", label: "Social Studies" },
  { id: "english", label: "English" },
  { id: "history", label: "History" },
  { id: "geography", label: "Geography" },
  { id: "computer-science", label: "Computer Science" },
  { id: "art", label: "Art" },
  { id: "music", label: "Music" },
  { id: "physical-education", label: "Physical Education" },
  { id: "economics", label: "Economics" },
];

const Filter = ({ handleFilterChange }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategories, setSelectedCategories] = useState(
    searchParams.get("categories")?.split(",") || []
  );
  const [sortByPrice, setSortByPrice] = useState(
    searchParams.get("sortByPrice") || ""
  );

  const updateURLParams = (categories, price) => {
    const params = {};
    if (categories.length > 0) {
      params.categories = categories.join(",");
    }
    if (price) {
      params.sortByPrice = price;
    }
    setSearchParams(params);
  };

  const handleCategoryChange = (categoryId) => {
    setSelectedCategories((prevCategories) => {
      const newCategories = prevCategories.includes(categoryId)
        ? prevCategories.filter((id) => id !== categoryId)
        : [...prevCategories, categoryId];

      console.log("Selected Categories:", newCategories); // Debugging
      handleFilterChange(newCategories, sortByPrice);
      updateURLParams(newCategories, sortByPrice);
      return newCategories;
    });
  };

  const selectByPriceHandler = (selectedValue) => {
    setSortByPrice(selectedValue);
    console.log("Sort By Price:", selectedValue); // Debugging
    handleFilterChange(selectedCategories, selectedValue);
    updateURLParams(selectedCategories, selectedValue);
  };

  return (
    <motion.div
      className="w-full md:w-[20%] bg-white p-4 rounded-lg shadow-md border border-gray-200"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <motion.div
        className="flex items-center justify-between mb-4"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
      >
        <h1 className="font-bold text-lg md:text-xl text-gray-800">
          Filter Options
        </h1>
        <Select onValueChange={selectByPriceHandler} value={sortByPrice}>
          <SelectTrigger className="w-32 border border-gray-300 rounded-md shadow-sm hover:shadow-md transition duration-300">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Sort by price</SelectLabel>
              <SelectItem value="low">Low to High</SelectItem>
              <SelectItem value="high">High to Low</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </motion.div>

      <Separator className="my-3" />

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.4 }}
      >
        <h1 className="font-bold text-gray-800 mb-2">Categories</h1>
        <div className="grid grid-cols-1 gap-1">
          {categories.map((category) => (
            <motion.div
              key={category.id}
              className="flex items-center space-x-2 hover:bg-gray-100 p-2 rounded-md transition duration-300"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <Checkbox
                id={category.id}
                checked={selectedCategories.includes(category.id)}
                onCheckedChange={() => handleCategoryChange(category.id)}
              />
              <Label
                htmlFor={category.id}
                className="text-sm font-medium text-gray-700"
              >
                {category.label}
              </Label>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Filter;
