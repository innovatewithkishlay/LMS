import React, { useState, useEffect } from "react";
import { Loader2, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

const Login = ({ defaultTab = "login", closeModal }) => {
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [signupInput, setSignupInput] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loginInput, setLoginInput] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  const changeInputHandler = (e, type) => {
    const { name, value } = e.target;
    if (type === "signup") {
      setSignupInput({ ...signupInput, [name]: value });
    } else {
      setLoginInput({ ...loginInput, [name]: value });
    }
  };

  const handleRegistration = async (type) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (type === "signup") {
        toast.success("Signup successful!");
        closeModal(); // Close modal after successful signup
      } else {
        toast.success("Login successful!");
        closeModal(); // Close modal after successful login
      }
    }, 2000);
  };

  useEffect(() => {
    setActiveTab(defaultTab);
  }, [defaultTab]);

  return (
    <div
      className="flex items-center justify-center w-full h-full bg-black bg-opacity-50 fixed inset-0 z-50"
      onClick={closeModal} // Close modal on outside click
    >
      <div
        className="bg-white rounded-lg shadow-lg w-[400px] p-6"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
      >
        {/* Tabs */}
        <div className="flex justify-center mb-6">
          <button
            onClick={() => setActiveTab("login")}
            className={`px-4 py-2 text-lg font-semibold ${
              activeTab === "login"
                ? "text-white bg-gradient-to-r from-blue-500 to-purple-500 rounded-md"
                : "text-gray-600 hover:text-blue-500"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setActiveTab("signup")}
            className={`px-4 py-2 text-lg font-semibold ${
              activeTab === "signup"
                ? "text-white bg-gradient-to-r from-blue-500 to-purple-500 rounded-md"
                : "text-gray-600 hover:text-blue-500"
            }`}
          >
            Signup
          </button>
        </div>

        {/* Login Form */}
        {activeTab === "login" && (
          <form className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                value={loginInput.email}
                onChange={(e) => changeInputHandler(e, "login")}
                placeholder="Enter your email"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
              />
            </div>
            <div className="relative">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={loginInput.password}
                onChange={(e) => changeInputHandler(e, "login")}
                placeholder="Enter your password"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-9 right-3 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            <div className="flex justify-between items-center mt-4 gap-4">
              <button
                type="button"
                onClick={() => handleRegistration("login")}
                disabled={isLoading}
                className="w-full px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-md hover:opacity-90"
              >
                {isLoading ? (
                  <Loader2 className="animate-spin h-5 w-5 mx-auto" />
                ) : (
                  "Login"
                )}
              </button>
              <button
                type="button"
                onClick={closeModal}
                className="w-full px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
              >
                Close
              </button>
            </div>
          </form>
        )}

        {/* Signup Form */}
        {activeTab === "signup" && (
          <form className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                type="text"
                name="name"
                value={signupInput.name}
                onChange={(e) => changeInputHandler(e, "signup")}
                placeholder="Enter your name"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                value={signupInput.email}
                onChange={(e) => changeInputHandler(e, "signup")}
                placeholder="Enter your email"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
              />
            </div>
            <div className="relative">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={signupInput.password}
                onChange={(e) => changeInputHandler(e, "signup")}
                placeholder="Enter your password"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-9 right-3 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            <div className="flex justify-between items-center mt-4 gap-4">
              <button
                type="button"
                onClick={() => handleRegistration("signup")}
                disabled={isLoading}
                className="w-full px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-md hover:opacity-90"
              >
                {isLoading ? (
                  <Loader2 className="animate-spin h-5 w-5 mx-auto" />
                ) : (
                  "Signup"
                )}
              </button>
              <button
                type="button"
                onClick={closeModal}
                className="w-full px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
              >
                Close
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;
