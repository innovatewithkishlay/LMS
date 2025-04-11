import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  useLoginUserMutation,
  useRegisterUserMutation,
} from "@/features/api/authApi";
import { Loader2, Eye, EyeOff } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "sonner";
import { motion } from "framer-motion";

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const defaultTab = location.pathname === "/signup" ? "signup" : "login";

  const [activeTab, setActiveTab] = useState(defaultTab);
  const [signupInput, setSignupInput] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loginInput, setLoginInput] = useState({ email: "", password: "" });

  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [showLoginPassword, setShowLoginPassword] = useState(false);

  const [
    registerUser,
    {
      data: registerData,
      error: registerError,
      isLoading: registerIsLoading,
      isSuccess: registerIsSuccess,
    },
  ] = useRegisterUserMutation();
  const [
    loginUser,
    {
      data: loginData,
      error: loginError,
      isLoading: loginIsLoading,
      isSuccess: loginIsSuccess,
    },
  ] = useLoginUserMutation();

  const changeInputHandler = (e, type) => {
    const { name, value } = e.target;
    if (type === "signup") {
      setSignupInput({ ...signupInput, [name]: value });
    } else {
      setLoginInput({ ...loginInput, [name]: value });
    }
  };

  const handleRegistration = async (type) => {
    const inputData = type === "signup" ? signupInput : loginInput;
    const action = type === "signup" ? registerUser : loginUser;
    await action(inputData);
  };

  useEffect(() => {
    if (registerIsSuccess && registerData) {
      toast.success(registerData.message || "Signup successful.");
      const redirectTo = location.state?.from || "/hero-section";
      navigate(redirectTo);
    }
    if (registerError) {
      toast.error(registerError.data.message || "Signup Failed");
    }
    if (loginIsSuccess && loginData) {
      toast.success(loginData.message || "Login successful.");
      const redirectTo = location.state?.from || "/hero-section";
      navigate(redirectTo);
    }
    if (loginError) {
      toast.error(loginError.data.message || "Login Failed");
    }
  }, [
    loginIsLoading,
    registerIsLoading,
    loginData,
    registerData,
    loginError,
    registerError,
    location.state,
    navigate,
  ]);

  useEffect(() => {
    setActiveTab(defaultTab);
  }, [defaultTab]);

  return (
    <motion.div
      className="flex flex-col items-center w-full justify-center mt-10 px-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      {/* Toggle Buttons */}
      <motion.div
        className="flex justify-center gap-4 mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <Button
          variant={activeTab === "signup" ? "default" : "outline"}
          onClick={() => setActiveTab("signup")}
          className={`w-32 ${
            activeTab === "signup"
              ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
              : ""
          }`}
        >
          Signup
        </Button>
        <Button
          variant={activeTab === "login" ? "default" : "outline"}
          onClick={() => setActiveTab("login")}
          className={`w-32 ${
            activeTab === "login"
              ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
              : ""
          }`}
        >
          Login
        </Button>
      </motion.div>

      {/* Signup Form */}
      {activeTab === "signup" && (
        <motion.div
          className="w-full max-w-sm space-y-4 p-6 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg bg-white dark:bg-gray-900"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          <h2 className="text-xl font-semibold text-center text-gray-800 dark:text-gray-200">
            Create an Account
          </h2>
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              type="text"
              name="name"
              value={signupInput.name}
              onChange={(e) => changeInputHandler(e, "signup")}
              placeholder="Enter your full name (e.g., John Doe)"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              type="email"
              name="email"
              value={signupInput.email}
              onChange={(e) => changeInputHandler(e, "signup")}
              placeholder="Enter your email (e.g., john.doe@gmail.com)"
              required
            />
          </div>
          <div className="space-y-2 relative">
            <Label htmlFor="password">Password</Label>
            <Input
              type={showSignupPassword ? "text" : "password"}
              name="password"
              value={signupInput.password}
              onChange={(e) => changeInputHandler(e, "signup")}
              placeholder="Create a strong password"
              required
            />
            <span
              className="absolute right-3 top-9 cursor-pointer text-gray-500 dark:text-gray-400"
              onClick={() => setShowSignupPassword(!showSignupPassword)}
            >
              {showSignupPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </span>
          </div>
          <Button
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:opacity-90"
            disabled={registerIsLoading}
            onClick={() => handleRegistration("signup")}
          >
            {registerIsLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Signing up...
              </>
            ) : (
              "Signup"
            )}
          </Button>
        </motion.div>
      )}

      {/* Login Form */}
      {activeTab === "login" && (
        <motion.div
          className="w-full max-w-sm space-y-4 p-6 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg bg-white dark:bg-gray-900"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          <h2 className="text-xl font-semibold text-center text-gray-800 dark:text-gray-200">
            Welcome Back
          </h2>
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              type="email"
              name="email"
              value={loginInput.email}
              onChange={(e) => changeInputHandler(e, "login")}
              placeholder="Enter your email (e.g., john.doe@gmail.com)"
              required
            />
          </div>
          <div className="space-y-2 relative">
            <Label htmlFor="password">Password</Label>
            <Input
              type={showLoginPassword ? "text" : "password"}
              name="password"
              value={loginInput.password}
              onChange={(e) => changeInputHandler(e, "login")}
              placeholder="Enter your password"
              required
            />
            <span
              className="absolute right-3 top-9 cursor-pointer text-gray-500 dark:text-gray-400"
              onClick={() => setShowLoginPassword(!showLoginPassword)}
            >
              {showLoginPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </span>
          </div>
          <Button
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:opacity-90"
            disabled={loginIsLoading}
            onClick={() => handleRegistration("login")}
          >
            {loginIsLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Logging in...
              </>
            ) : (
              "Login"
            )}
          </Button>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Login;
