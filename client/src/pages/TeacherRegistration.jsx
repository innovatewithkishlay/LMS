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

  const [errors, setErrors] = useState({});
  const maxResumeSize = 2 * 1024 * 1024;
  const availableSubjects = [
    "Math",
    "Science",
    "English",
    "Hindi",
    "Social Studies",
    "Computer Science",
    "Biology",
    "Physics",
    "Chemistry",
    "Economics",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size > maxResumeSize) {
      setErrors({ ...errors, resume: "File size exceeds 2 MB." });
    } else {
      setFormData({ ...formData, resume: file });
      setErrors({ ...errors, resume: null });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
      newErrors.email = "Please enter a valid email address.";
    if (!formData.phone.match(/^\d+$/))
      newErrors.phone = "Phone number must contain only numbers.";
    if (!formData.experience || formData.experience <= 0)
      newErrors.experience = "Please enter valid teaching experience.";
    if (!formData.subjects)
      newErrors.subjects = "Please select at least one subject.";
    if (!formData.bio.trim()) newErrors.bio = "Bio is required.";
    if (!formData.resume) newErrors.resume = "Please upload your resume.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log(formData);
      alert(
        "Your registration has been submitted. Please wait for admin approval."
      );
    }
  };

  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 text-white px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Title Section */}
      <motion.h1
        className="text-4xl md:text-5xl font-extrabold mb-8 text-center bg-gradient-to-r from-yellow-400 via-red-500 to-purple-600 text-transparent bg-clip-text"
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
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none text-gray-800"
            placeholder="Enter your full name"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 mb-2">
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none text-gray-800"
            placeholder="Enter your email"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}
        </div>

        {/* Phone */}
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 mb-2">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none text-gray-800"
            placeholder="Enter your phone number"
          />
          {errors.phone && (
            <p className="text-red-500 text-sm">{errors.phone}</p>
          )}
        </div>

        {/* Experience */}
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 mb-2">
            Teaching Experience (in years){" "}
            <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none text-gray-800"
            placeholder="Enter your teaching experience"
          />
          {errors.experience && (
            <p className="text-red-500 text-sm">{errors.experience}</p>
          )}
        </div>

        {/* Subjects */}
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 mb-2">
            Subjects of Expertise <span className="text-red-500">*</span>
          </label>
          <select
            name="subjects"
            value={formData.subjects}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none text-gray-800"
          >
            <option value="">Select a subject</option>
            {availableSubjects.map((subject) => (
              <option key={subject} value={subject}>
                {subject}
              </option>
            ))}
          </select>
          {errors.subjects && (
            <p className="text-red-500 text-sm">{errors.subjects}</p>
          )}
        </div>

        {/* Bio */}
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 mb-2">
            Short Bio <span className="text-red-500">*</span>
          </label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none text-gray-800"
            placeholder="Tell us about yourself"
          ></textarea>
          {errors.bio && <p className="text-red-500 text-sm">{errors.bio}</p>}
        </div>

        {/* Resume Upload */}
        <div className="mb-6">
          <label className="block text-gray-700 dark:text-gray-300 mb-2">
            Upload Your Resume (PDF/DOC) <span className="text-red-500">*</span>
          </label>
          <input
            type="file"
            name="resume"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none bg-white"
          />
          {errors.resume && (
            <p className="text-red-500 text-sm">{errors.resume}</p>
          )}
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
