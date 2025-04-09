import React, { useState } from "react";
import { motion } from "framer-motion";

const TeacherRegistration = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    experience: "",
    subjects: "",
    bio: "",
    resume: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, resume: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    alert(
      "Your registration has been submitted. Please wait for admin approval."
    );
  };

  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Title Section */}
      <motion.h1
        className="text-4xl md:text-5xl font-extrabold mb-8 text-center bg-gradient-to-r from-yellow-300 via-red-500 to-purple-500 text-transparent bg-clip-text"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        Teacher Registration
      </motion.h1>
      <motion.p
        className="text-lg md:text-xl text-center max-w-2xl mb-12 text-gray-100"
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        Join our team of expert educators and help students achieve their goals.
        Fill out the form below to apply.
      </motion.p>

      {/* Registration Form */}
      <motion.form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-lg"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        {/* Name */}
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 mb-2">
            Full Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none"
            placeholder="Enter your full name"
            required
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 mb-2">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none"
            placeholder="Enter your email"
            required
          />
        </div>

        {/* Phone */}
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 mb-2">
            Phone Number
          </label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none"
            placeholder="Enter your phone number"
            required
          />
        </div>

        {/* Experience */}
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 mb-2">
            Teaching Experience (in years)
          </label>
          <input
            type="number"
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none"
            placeholder="Enter your teaching experience"
            required
          />
        </div>

        {/* Subjects */}
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 mb-2">
            Subjects of Expertise
          </label>
          <input
            type="text"
            name="subjects"
            value={formData.subjects}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none"
            placeholder="Enter subjects you can teach"
            required
          />
        </div>

        {/* Bio */}
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 mb-2">
            Short Bio
          </label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none"
            placeholder="Tell us about yourself"
            required
          ></textarea>
        </div>

        {/* Resume Upload */}
        <div className="mb-6">
          <label className="block text-gray-700 dark:text-gray-300 mb-2">
            Upload Your Resume (PDF/DOC)
          </label>
          <input
            type="file"
            name="resume"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none bg-white"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 transition-all"
        >
          Submit Application
        </button>
      </motion.form>
    </motion.div>
  );
};

export default TeacherRegistration;
