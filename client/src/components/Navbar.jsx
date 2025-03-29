import { Menu, School } from "lucide-react";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import DarkMode from "@/DarkMode";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { Link, useNavigate } from "react-router-dom";
import { useLogoutUserMutation } from "@/features/api/authApi";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import Login from "@/pages/Login";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const [logoutUser, { data, isSuccess }] = useLogoutUserMutation();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("login"); // Track active tab (login/signup)

  const logoutHandler = async () => {
    await logoutUser();
  };

  const openModal = (tab) => {
    setActiveTab(tab);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message || "User logged out.");
      navigate("/login");
    }
  }, [isSuccess]);

  return (
    <motion.div
      className="h-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 fixed top-0 left-0 right-0 shadow-md z-10"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Desktop */}
      <div className="max-w-7xl mx-auto hidden md:flex justify-between items-center px-6 h-full">
        <motion.div
          className="flex items-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <School size={30} className="text-blue-600 dark:text-blue-400" />
          <Link to="/">
            <h1 className="font-extrabold text-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
              V-Learning
            </h1>
          </Link>
        </motion.div>
        <div className="flex items-center gap-6">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar>
                  <AvatarImage
                    src={user?.photoUrl || "https://github.com/shadcn.png"}
                    alt="User Avatar"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" asChild>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <Link to="/my-learning">My Learning</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link to="/profile">Edit Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={logoutHandler}>
                      Log out
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  {user?.role === "instructor" && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Link to="/admin/dashboard">Dashboard</Link>
                      </DropdownMenuItem>
                    </>
                  )}
                </motion.div>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <motion.div
              className="flex items-center gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <Button variant="outline" onClick={() => openModal("login")}>
                Login
              </Button>
              <Button onClick={() => openModal("signup")}>Signup</Button>
            </motion.div>
          )}
          <DarkMode />
        </div>
      </div>

      {/* Mobile */}
      <div className="flex md:hidden items-center justify-between px-4 h-full">
        <motion.h1
          className="font-extrabold text-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          V-Learning
        </motion.h1>
        <MobileNavbar user={user} logoutHandler={logoutHandler} />
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={closeModal} // Close modal on outside click
        >
          <motion.div
            className="relative bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-[400px] max-w-full"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
          >
            <button
              className="absolute top-4 right-4 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              onClick={closeModal}
            >
              ✕
            </button>
            <Login defaultTab={activeTab} />
            <div className="mt-4 text-center">
              <Button variant="outline" onClick={closeModal}>
                Close Signup/Login
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};

export default Navbar;

const MobileNavbar = ({ user, logoutHandler }) => {
  const navigate = useNavigate();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          size="icon"
          className="rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
          variant="outline"
        >
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col bg-white dark:bg-gray-900" asChild>
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ duration: 0.5 }}
        >
          <SheetHeader className="flex flex-row items-center justify-between mt-2">
            <SheetTitle>
              <Link
                to="/"
                className="text-lg font-bold text-gray-800 dark:text-gray-100"
              >
                V-Learning
              </Link>
            </SheetTitle>
            <DarkMode />
          </SheetHeader>
          <Separator className="mr-2" />
          <nav className="flex flex-col space-y-4 mt-4">
            <Link
              to="/my-learning"
              className="text-gray-800 dark:text-gray-100"
            >
              My Learning
            </Link>
            <Link to="/profile" className="text-gray-800 dark:text-gray-100">
              Edit Profile
            </Link>
            <p
              onClick={logoutHandler}
              className="cursor-pointer text-red-600 dark:text-red-400"
            >
              Log out
            </p>
          </nav>
          {user?.role === "instructor" && (
            <SheetFooter className="mt-4">
              <SheetClose asChild>
                <Button
                  type="submit"
                  onClick={() => navigate("/admin/dashboard")}
                  className="w-full"
                >
                  Dashboard
                </Button>
              </SheetClose>
            </SheetFooter>
          )}
        </motion.div>
      </SheetContent>
    </Sheet>
  );
};
