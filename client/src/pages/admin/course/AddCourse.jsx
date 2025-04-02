import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { useCreateCourseMutation } from "@/features/api/courseApi";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const AddCourse = () => {
  const [courseTitle, setCourseTitle] = useState("");
  const [category, setCategory] = useState("");

  const [createCourse, { data, isLoading, error, isSuccess }] =
    useCreateCourseMutation();

  const navigate = useNavigate();

  const getSelectedCategory = (value) => {
    setCategory(value);
  };

  const createCourseHandler = async () => {
    await createCourse({ courseTitle, category });
  };

  // Display toast notifications
  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message || "Course created.");
      navigate("/admin/course");
    }
  }, [isSuccess, error]);

  return (
    <div className="flex-1 mx-auto max-w-3xl p-4 sm:p-6 bg-white dark:bg-gray-900 rounded-lg shadow-lg">
      {/* Header */}
      <div className="mb-6 text-center sm:text-left">
        <h1 className="font-extrabold text-2xl text-gray-800 dark:text-gray-100">
          Add a New Course
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Provide basic details about your course to get started.
        </p>
      </div>

      {/* Form */}
      <div className="space-y-6">
        {/* Course Title */}
        <div>
          <Label className="text-gray-700 dark:text-gray-300">
            Course Title
          </Label>
          <Input
            type="text"
            value={courseTitle}
            onChange={(e) => setCourseTitle(e.target.value)}
            placeholder="Enter your course name"
            className="mt-2 w-full"
          />
        </div>

        {/* Category */}
        <div>
          <Label className="text-gray-700 dark:text-gray-300">Category</Label>
          <Select onValueChange={getSelectedCategory}>
            <SelectTrigger className="w-full mt-2">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Math</SelectLabel>
                <SelectItem value="Algebra">Algebra</SelectItem>
                <SelectItem value="Geometry">Geometry</SelectItem>
                <SelectItem value="Calculus">Calculus</SelectItem>
                <SelectItem value="Statistics">Statistics</SelectItem>

                <SelectLabel>Science</SelectLabel>
                <SelectItem value="Physics">Physics</SelectItem>
                <SelectItem value="Chemistry">Chemistry</SelectItem>
                <SelectItem value="Biology">Biology</SelectItem>
                <SelectItem value="Earth Science">Earth Science</SelectItem>

                <SelectLabel>English</SelectLabel>
                <SelectItem value="Grammar">Grammar</SelectItem>
                <SelectItem value="Literature">Literature</SelectItem>
                <SelectItem value="Writing Skills">Writing Skills</SelectItem>
                <SelectItem value="Vocabulary">Vocabulary</SelectItem>

                <SelectLabel>Social Studies</SelectLabel>
                <SelectItem value="History">History</SelectItem>
                <SelectItem value="Geography">Geography</SelectItem>
                <SelectItem value="Civics">Civics</SelectItem>
                <SelectItem value="Economics">Economics</SelectItem>

                <SelectLabel>General Knowledge</SelectLabel>
                <SelectItem value="Current Affairs">Current Affairs</SelectItem>
                <SelectItem value="World Facts">World Facts</SelectItem>
                <SelectItem value="Logical Reasoning">
                  Logical Reasoning
                </SelectItem>
                <SelectItem value="Quizzes">Quizzes</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Button
            variant="outline"
            onClick={() => navigate("/admin/course")}
            className="w-full sm:w-auto"
          >
            Back
          </Button>
          <Button
            disabled={isLoading}
            onClick={createCourseHandler}
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating...
              </>
            ) : (
              "Create Course"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddCourse;
