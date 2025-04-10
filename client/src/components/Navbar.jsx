import { Menu, School } from "lucide-react";
import React from "react";
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
import { Link, useNavigate } from "react-router-dom";
import { useLogoutUserMutation } from "@/features/api/authApi";
import { toast } from "sonner";
import { useSelector } from "react-redux";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const [logoutUser, { data, isSuccess }] = useLogoutUserMutation();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    await logoutUser();
  };

  React.useEffect(() => {
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
          className="flex items-center gap-3 cursor-pointer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          onClick={() => navigate("/hero-section")}
        >
          <School size={30} className="text-blue-600 dark:text-blue-400" />
          <h1 className="font-extrabold text-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
            V-Learning
          </h1>
        </motion.div>
        <div className="flex items-center gap-6">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar
                  className="cursor-pointer"
                  key={user.photoUrl || "default-avatar"}
                >
                  {user?.photoUrl ? (
                    <AvatarImage
                      src={user.photoUrl}
                      alt="User Avatar"
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  ) : (
                    <AvatarFallback size="laptop" />
                  )}
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-56 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700"
                asChild
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <DropdownMenuLabel className="text-gray-700 dark:text-gray-300 font-semibold text-lg px-4 py-2">
                    My Account
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="border-gray-300 dark:border-gray-700" />
                  <DropdownMenuGroup>
                    <DropdownMenuItem className="hover:bg-blue-100 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-gray-200 px-4 py-2 rounded-md transition-all">
                      <Link to="/my-learning" className="w-full">
                        My Learning
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="hover:bg-blue-100 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-gray-200 px-4 py-2 rounded-md transition-all">
                      <Link to="/profile" className="w-full">
                        Edit Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={logoutHandler}
                      className="hover:bg-red-100 dark:hover:bg-red-700 hover:text-red-600 dark:hover:text-red-200 px-4 py-2 rounded-md transition-all"
                    >
                      Log out
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  {user?.role === "instructor" && (
                    <>
                      <DropdownMenuSeparator className="border-gray-300 dark:border-gray-700" />
                      <DropdownMenuItem className="hover:bg-blue-100 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-gray-200 px-4 py-2 rounded-md transition-all">
                        <Link to="/admin/dashboard" className="w-full">
                          Dashboard
                        </Link>
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
              <Button
                variant="outline"
                onClick={() => {
                  navigate("/login");
                }}
              >
                Login
              </Button>
              <Button
                onClick={() => {
                  navigate("/signup");
                }}
              >
                Signup
              </Button>
            </motion.div>
          )}
          <DarkMode />
        </div>
      </div>
    </motion.div>
  );
};

export default Navbar;

const MobileNavbar = ({ user, logoutHandler }) => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center gap-4">
      {user ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="cursor-pointer" key={user.photoUrl}>
              {user?.photoUrl ? (
                <AvatarImage
                  src={user.photoUrl}
                  alt="User Avatar"
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <AvatarFallback size="mobile" />
              )}
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-56 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700"
            asChild
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <DropdownMenuLabel className="text-gray-700 dark:text-gray-300 font-semibold text-lg px-4 py-2">
                My Account
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="border-gray-300 dark:border-gray-700" />
              <DropdownMenuGroup>
                <DropdownMenuItem
                  className="hover:bg-blue-100 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-gray-200 px-4 py-2 rounded-md transition-all"
                  onClick={() => navigate("/my-learning")}
                >
                  My Learning
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="hover:bg-blue-100 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-gray-200 px-4 py-2 rounded-md transition-all"
                  onClick={() => navigate("/profile")}
                >
                  Edit Profile
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="hover:bg-red-100 dark:hover:bg-red-700 hover:text-red-600 dark:hover:text-red-200 px-4 py-2 rounded-md transition-all"
                  onClick={logoutHandler}
                >
                  Log out
                </DropdownMenuItem>
              </DropdownMenuGroup>
              {user?.role === "instructor" && (
                <>
                  <DropdownMenuSeparator className="border-gray-300 dark:border-gray-700" />
                  <DropdownMenuItem
                    className="hover:bg-blue-100 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-gray-200 px-4 py-2 rounded-md transition-all"
                    onClick={() => navigate("/admin/dashboard")}
                  >
                    Dashboard
                  </DropdownMenuItem>
                </>
              )}
            </motion.div>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <>
          <Button
            variant="outline"
            onClick={() => {
              navigate("/login");
            }}
          >
            Login
          </Button>
          <Button
            onClick={() => {
              navigate("/signup");
            }}
          >
            Signup
          </Button>
        </>
      )}
      <DarkMode />
    </div>
  );
};
