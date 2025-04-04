import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import {
  useEditCourseMutation,
  useGetCourseByIdQuery,
  usePublishCourseMutation,
} from "@/features/api/courseApi";
import {
  Loader2,
  UploadCloud,
  Bold,
  Italic,
  Underline as UnderlineIcon,
  List,
  Heading,
  AlignLeft,
  AlignCenter,
  AlignRight,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

const CourseTab = () => {
  const [input, setInput] = useState({
    courseTitle: "",
    subTitle: "",
    description: "",
    category: "",
    courseLevel: "",
    coursePrice: "",
    courseThumbnail: "",
  });

  const params = useParams();
  const courseId = params.courseId;
  const {
    data: courseByIdData,
    isLoading: courseByIdLoading,
    refetch,
  } = useGetCourseByIdQuery(courseId);

  const [publishCourse] = usePublishCourseMutation();

  const [previewThumbnail, setPreviewThumbnail] = useState("");
  const navigate = useNavigate();

  const [editCourse, { data, isLoading, isSuccess, error }] =
    useEditCourseMutation();

  const changeEventHandler = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const selectCategory = (value) => {
    setInput({ ...input, category: value });
  };
  const selectCourseLevel = (value) => {
    setInput({ ...input, courseLevel: value });
  };

  const selectThumbnail = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const validTypes = ["image/jpeg", "image/png", "image/webp"];
      if (!validTypes.includes(file.type)) {
        toast.error(
          "Invalid file type. Please upload a JPG, PNG, or WEBP image."
        );
        return;
      }
      setInput({ ...input, courseThumbnail: file });
      const fileReader = new FileReader();
      fileReader.onloadend = () => setPreviewThumbnail(fileReader.result);
      fileReader.readAsDataURL(file);
    }
  };

  const updateCourseHandler = async () => {
    const formData = new FormData();
    formData.append("courseTitle", input.courseTitle);
    formData.append("subTitle", input.subTitle);
    formData.append("description", input.description);
    formData.append("category", input.category);
    formData.append("courseLevel", input.courseLevel);
    formData.append("coursePrice", input.coursePrice);
    formData.append("courseThumbnail", input.courseThumbnail);

    await editCourse({ formData, courseId });
  };

  const publishStatusHandler = async (action) => {
    try {
      const response = await publishCourse({
        courseId,
        query: action,
        courseLevel: input.courseLevel || "Beginner",
      });

      if (response.data) {
        refetch();
        toast.success(response.data.message);
      }
    } catch (error) {
      console.error("Error publishing course:", error);
      toast.error("Failed to publish or unpublish course");
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message || "Course updated successfully.");
    }
    if (error) {
      toast.error(error.data.message || "Failed to update course");
    }
  }, [isSuccess, error]);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    content: input.description, // Initialize with the description from the input state
    onUpdate: ({ editor }) => {
      setInput({ ...input, description: editor.getHTML() });
    },
  });

  useEffect(() => {
    if (courseByIdData?.course) {
      const course = courseByIdData.course;
      setInput({
        courseTitle: course.courseTitle || "",
        subTitle: course.subTitle || "",
        description: course.description || "", // Ensure description is set
        category: course.category || "", // Ensure category is set
        courseLevel: course.courseLevel || "", // Ensure course level is set
        coursePrice: course.coursePrice || "",
        courseThumbnail: course.courseThumbnail || "", // Load existing thumbnail
      });

      // Set the editor content with the existing description
      if (editor) {
        editor.commands.setContent(course.description || "");
      }

      // Set the preview thumbnail if it exists
      if (course.courseThumbnail) {
        setPreviewThumbnail(course.courseThumbnail);
      }
    }
  }, [courseByIdData, editor]);

  if (courseByIdLoading) return <h1>Loading...</h1>;

  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white dark:bg-gray-900 overflow-x-hidden px-4 sm:px-6">
      <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div className="w-full sm:w-auto">
          <CardTitle className="text-2xl font-bold text-gray-800 dark:text-gray-100 max-w-full">
            Edit Course
          </CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-400 max-w-full">
            Make changes to your course details and save them.
          </CardDescription>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 mt-4 sm:mt-0 w-full sm:w-auto">
          <Button
            disabled={courseByIdData?.course.lectures.length === 0}
            variant="outline"
            onClick={() =>
              publishStatusHandler(
                courseByIdData?.course.isPublished ? "false" : "true"
              )
            }
            className="w-full sm:w-auto"
          >
            {courseByIdData?.course.isPublished ? "Unpublish" : "Publish"}
          </Button>
          <Button variant="destructive" className="w-full sm:w-auto">
            Remove Course
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6 mt-5">
          {/* Title */}
          <div>
            <Label className="text-gray-700 dark:text-gray-300">Title</Label>
            <Input
              type="text"
              name="courseTitle"
              value={input.courseTitle} // Controlled input
              onChange={changeEventHandler}
              placeholder="Ex. Fullstack Developer"
              className="mt-2 w-full max-w-full"
            />
          </div>

          {/* Subtitle */}
          <div>
            <Label className="text-gray-700 dark:text-gray-300">Subtitle</Label>
            <Input
              type="text"
              name="subTitle"
              value={input.subTitle}
              onChange={changeEventHandler}
              placeholder="Ex. Become a Fullstack Developer from zero to hero"
              className="mt-2 w-full max-w-full"
            />
          </div>

          {/* Description */}
          <div>
            <Label className="text-gray-700 dark:text-gray-300">
              Description
            </Label>
            <div className="rounded-lg p-4 bg-white dark:bg-gray-900">
              {/* Toolbar */}
              <div className="flex items-center gap-2 mb-4 overflow-x-auto">
                <button
                  onClick={() => editor.chain().focus().toggleBold().run()}
                  className={`p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 ${
                    editor.isActive("bold")
                      ? "bg-gray-300 dark:bg-gray-600"
                      : ""
                  }`}
                  title="Bold"
                >
                  <Bold size={18} />
                </button>
                <button
                  onClick={() => editor.chain().focus().toggleItalic().run()}
                  className={`p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 ${
                    editor.isActive("italic")
                      ? "bg-gray-300 dark:bg-gray-600"
                      : ""
                  }`}
                  title="Italic"
                >
                  <Italic size={18} />
                </button>
                <button
                  onClick={() => editor.chain().focus().toggleUnderline().run()}
                  className={`p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 ${
                    editor.isActive("underline")
                      ? "bg-gray-300 dark:bg-gray-600"
                      : ""
                  }`}
                  title="Underline"
                >
                  <UnderlineIcon size={18} />
                </button>
                <button
                  onClick={() =>
                    editor.chain().focus().toggleHeading({ level: 1 }).run()
                  }
                  className={`p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 ${
                    editor.isActive("heading", { level: 1 })
                      ? "bg-gray-300 dark:bg-gray-600"
                      : ""
                  }`}
                  title="Heading 1"
                >
                  <Heading size={18} />
                </button>
                <button
                  onClick={() =>
                    editor.chain().focus().toggleHeading({ level: 2 }).run()
                  }
                  className={`p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 ${
                    editor.isActive("heading", { level: 2 })
                      ? "bg-gray-300 dark:bg-gray-600"
                      : ""
                  }`}
                  title="Heading 2"
                >
                  <Heading size={16} />
                </button>
                <button
                  onClick={() =>
                    editor.chain().focus().toggleBulletList().run()
                  }
                  className={`p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 ${
                    editor.isActive("bulletList")
                      ? "bg-gray-300 dark:bg-gray-600"
                      : ""
                  }`}
                  title="Bullet List"
                >
                  <List size={18} />
                </button>
                <button
                  onClick={() =>
                    editor.chain().focus().setTextAlign("left").run()
                  }
                  className={`p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 ${
                    editor.isActive({ textAlign: "left" })
                      ? "bg-gray-300 dark:bg-gray-600"
                      : ""
                  }`}
                  title="Align Left"
                >
                  <AlignLeft size={18} />
                </button>
                <button
                  onClick={() =>
                    editor.chain().focus().setTextAlign("center").run()
                  }
                  className={`p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 ${
                    editor.isActive({ textAlign: "center" })
                      ? "bg-gray-300 dark:bg-gray-600"
                      : ""
                  }`}
                  title="Align Center"
                >
                  <AlignCenter size={18} />
                </button>
                <button
                  onClick={() =>
                    editor.chain().focus().setTextAlign("right").run()
                  }
                  className={`p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 ${
                    editor.isActive({ textAlign: "right" })
                      ? "bg-gray-300 dark:bg-gray-600"
                      : ""
                  }`}
                  title="Align Right"
                >
                  <AlignRight size={18} />
                </button>
              </div>

              {/* Editor Content */}
              <EditorContent
                editor={editor}
                className="prose dark:prose-invert max-w-none focus:outline-none min-h-[50px] w-full"
              />
            </div>
          </div>

          {/* Category, Level, and Price */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <Label className="text-gray-700 dark:text-gray-300">
                Category
              </Label>
              <Select
                value={input.category} // Use value instead of defaultValue for controlled components
                onValueChange={selectCategory}
                className="w-full"
              >
                <SelectTrigger className="w-full mt-2">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="Math">Math</SelectItem>
                    <SelectItem value="Physics">Physics</SelectItem>
                    <SelectItem value="Chemistry">Chemistry</SelectItem>
                    <SelectItem value="Biology">Biology</SelectItem>
                    <SelectItem value="History">History</SelectItem>
                    <SelectItem value="Civics">Civics</SelectItem>
                    <SelectItem value="Economics">Economics</SelectItem>
                    <SelectItem value="English Grammar">
                      English Grammar
                    </SelectItem>
                    <SelectItem value="Spoken English">
                      Spoken English
                    </SelectItem>
                    <SelectItem value="Hindi Grammar">Hindi Grammar</SelectItem>
                    <SelectItem value="General Knowledge">
                      General Knowledge
                    </SelectItem>
                    <SelectItem value="Computer Coding">
                      Computer Coding
                    </SelectItem>
                    <SelectItem value="Art & Craft">Art & Craft</SelectItem>
                    <SelectItem value="Music">Music</SelectItem>
                    <SelectItem value="Public Speaking">
                      Public Speaking
                    </SelectItem>
                    <SelectItem value="Environmental Studies">
                      Environmental Studies
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-gray-700 dark:text-gray-300">
                Course Level
              </Label>
              .
              <Select
                value={input.courseLevel} // Use value instead of defaultValue for controlled components
                onValueChange={selectCourseLevel}
                className="w-full"
              >
                <SelectTrigger className="w-full mt-2">
                  <SelectValue placeholder="Select a course level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="Beginner">Beginner</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Advance">Advance</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-gray-700 dark:text-gray-300">
                Price (INR)
              </Label>
              <Input
                type="number"
                name="coursePrice"
                value={input.coursePrice}
                onChange={changeEventHandler}
                placeholder="199"
                className="mt-2 w-full max-w-full"
              />
            </div>
          </div>

          {/* Thumbnail */}
          <div>
            <Label className="text-gray-700 dark:text-gray-300">
              Course Thumbnail
            </Label>
            <div className="mt-2 flex items-center gap-4">
              <label
                htmlFor="thumbnail"
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700"
              >
                <UploadCloud size={20} />
                {input.courseThumbnail || previewThumbnail
                  ? "Edit Thumbnail"
                  : "Choose Thumbnail"}
              </label>
              <Input
                id="thumbnail"
                type="file"
                onChange={selectThumbnail}
                accept="image/jpeg, image/png, image/webp"
                className="hidden"
              />
            </div>
            {(previewThumbnail || input.courseThumbnail) && (
              <img
                src={previewThumbnail || input.courseThumbnail}
                className="w-full sm:w-64 mt-4 rounded-lg shadow-md"
                alt="Course Thumbnail"
              />
            )}
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <Button
              onClick={() => navigate("/admin/course")}
              variant="outline"
              className="w-full sm:w-auto"
            >
              Cancel
            </Button>
            <Button
              disabled={isLoading}
              onClick={updateCourseHandler}
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save"
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseTab;
