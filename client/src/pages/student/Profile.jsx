import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import Course from "./Course";
import { motion } from "framer-motion";
import {
  useLoadUserQuery,
  useUpdateUserMutation,
} from "@/features/api/authApi";
import { toast } from "sonner";

const Profile = () => {
  const [name, setName] = useState("");
  const [profilePhoto, setProfilePhoto] = useState("");

  const { data, isLoading, refetch } = useLoadUserQuery();
  const [
    updateUser,
    { isLoading: updateUserIsLoading, isSuccess, isError, error },
  ] = useUpdateUserMutation();

  const user = data?.user;

  const onChangeHandler = (e) => {
    const file = e.target.files?.[0];
    if (file) setProfilePhoto(file);
  };

  const updateUserHandler = async () => {
    const formData = new FormData();
    formData.append("name", name || user.name);
    if (profilePhoto) {
      formData.append("profilePhoto", profilePhoto);
    }
    await updateUser(formData);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Profile updated successfully!");
      refetch();
    }
    if (isError) {
      toast.error(error?.data?.message || "Failed to update profile.");
    }
  }, [isSuccess, isError, error, refetch]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-xl font-semibold text-gray-700 dark:text-gray-300">
          Loading Profile...
        </h1>
      </div>
    );
  }

  return (
    <div className="relative bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 dark:from-gray-800 dark:via-gray-700 dark:to-gray-900 min-h-screen py-10">
      <motion.div
        className="max-w-5xl mx-auto text-center text-white dark:text-gray-100"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-4xl font-extrabold mb-6">Your Profile</h1>
        <p className="text-lg font-medium">
          Manage your account details and explore your enrolled courses.
        </p>
      </motion.div>

      <motion.div
        className="max-w-5xl mx-auto mt-10 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="flex flex-col md:flex-row items-center gap-8">
          <Avatar className="h-32 w-32 shadow-lg">
            <AvatarImage
              src={user?.photoUrl || "https://via.placeholder.com/150"}
              alt="User Avatar"
            />
            <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Name:
                <span className="ml-2 font-normal text-gray-700 dark:text-gray-300">
                  {user?.name}
                </span>
              </h2>
            </div>
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Email:
                <span className="ml-2 font-normal text-gray-700 dark:text-gray-300">
                  {user?.email}
                </span>
              </h2>
            </div>
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Role:
                <span className="ml-2 font-normal text-gray-700 dark:text-gray-300">
                  {user?.role?.toUpperCase()}
                </span>
              </h2>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-blue-600 text-white hover:bg-blue-700">
                  Edit Profile
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    Edit Profile
                  </DialogTitle>
                  <DialogDescription className="text-gray-600 dark:text-gray-400">
                    Update your profile details below. Click save when you're
                    done.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-6 py-4">
                  {/* Name Input */}
                  <div className="flex flex-col gap-2">
                    <Label
                      htmlFor="name"
                      className="text-gray-700 dark:text-gray-300"
                    >
                      Name
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your name"
                      className="border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Profile Photo Input */}
                  <div className="flex flex-col gap-2">
                    <Label
                      htmlFor="profilePhoto"
                      className="text-gray-700 dark:text-gray-300"
                    >
                      Profile Photo
                    </Label>
                    <div className="flex items-center gap-4">
                      <Avatar className="h-16 w-16 shadow-lg">
                        <AvatarImage
                          src={
                            profilePhoto
                              ? URL.createObjectURL(profilePhoto)
                              : user?.photoUrl ||
                                "https://via.placeholder.com/150"
                          }
                          alt="Profile Preview"
                        />
                        <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <Button
                        variant="outline"
                        className="text-blue-600 border border-blue-600 hover:bg-blue-100"
                        onClick={() =>
                          document.getElementById("profilePhotoInput").click()
                        }
                      >
                        Choose Image
                      </Button>
                      <Input
                        id="profilePhotoInput"
                        type="file"
                        accept="image/*"
                        onChange={(e) => setProfilePhoto(e.target.files[0])}
                        className="hidden"
                      />
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    onClick={async () => {
                      await updateUserHandler();
                      document.querySelector("[data-state='open']").click(); // Close the dialog
                    }}
                    disabled={updateUserIsLoading}
                    className="bg-blue-600 text-white hover:bg-blue-700"
                  >
                    {updateUserIsLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                        Saving...
                      </>
                    ) : (
                      "Save Changes"
                    )}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="max-w-5xl mx-auto mt-10"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <h2 className="text-2xl font-bold text-white dark:text-gray-100 mb-6">
          Enrolled Courses
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {user?.enrolledCourses?.length === 0 ? (
            <p className="text-lg text-gray-100 dark:text-gray-300">
              You haven't enrolled in any courses yet.
            </p>
          ) : (
            user.enrolledCourses.map((course) => (
              <Course course={course} key={course._id} />
            ))
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Profile;
