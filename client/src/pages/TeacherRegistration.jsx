import React, { useState } from "react";
import { motion } from "framer-motion";
import { useRegisterTeacherMutation } from "../features/api/teacherRegistrationApi";

const TeacherRegistration = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    photo: null,
    gender: "",
    age: "",
    email: "",
    phone: "",
    address: {
      street1: "",
      street2: "",
      city: "",
      state: "",
      zip: "",
    },
    qualification: "",
    teachingArea: "",
    classes: "",
    subjects: "",
    experience: "",
    location: "",
    referral: "",
    comments: "",
    cv: null,
    agree: false,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const maxResumeSize = 2 * 1024 * 1024;

  const [registerTeacher] = useRegisterTeacherMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      address: { ...formData.address, [name]: value },
    });
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

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, photo: file });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required.";
    if (!formData.lastName.trim())
      newErrors.lastName = "Last name is required.";
    if (!formData.gender) newErrors.gender = "Gender is required.";
    if (!formData.age || isNaN(formData.age))
      newErrors.age = "Valid age is required.";
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
      newErrors.email = "Please enter a valid email address.";
    if (!formData.phone.match(/^\d+$/))
      newErrors.phone = "Phone number must contain only numbers.";
    if (!formData.cv) newErrors.cv = "Please upload your CV.";
    if (!formData.referral)
      newErrors.referral = "Please select how you found about us.";
    if (!formData.agree)
      newErrors.agree = "You must agree to the terms and conditions.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => { 
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      const formDataToSend = new FormData();
      formDataToSend.append("firstName", formData.firstName);
      formDataToSend.append("lastName", formData.lastName);
      formDataToSend.append("gender", formData.gender);
      formDataToSend.append("age", formData.age);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("phone", formData.phone);
      formDataToSend.append("address[street1]", formData.address.street1);
      formDataToSend.append("address[street2]", formData.address.street2);
      formDataToSend.append("address[city]", formData.address.city);
      formDataToSend.append("address[state]", formData.address.state);
      formDataToSend.append("address[zip]", formData.address.zip);
      formDataToSend.append("qualification", formData.qualification);
      formDataToSend.append("teachingArea", formData.teachingArea);
      formDataToSend.append("classes", formData.classes);
      formDataToSend.append("subjects", formData.subjects);
      formDataToSend.append("experience", formData.experience);
      formDataToSend.append("location", formData.location);
      formDataToSend.append("referral", formData.referral);
      formDataToSend.append("comments", formData.comments);
      formDataToSend.append("agree", formData.agree);
      if (formData.photo) {
        formDataToSend.append("photo", formData.photo);
      }
      if (formData.cv) {
        formDataToSend.append("cv", formData.cv);
      }

      try {
        const result = await registerTeacher(formDataToSend).unwrap();
        if (result.success) {
          console.log("Response from backend:", result.message);
          setShowPopup(true);
        } else {
          console.error("Backend error:", result.message);
          alert("Error: " + result.message);
        }
      } catch (error) {
        console.error("Error submitting the form:", error);
        alert("An error occurred while submitting the form. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 text-gray-800 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Registration Form */}
      <motion.form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        {/* Title Section */}
        <h1 className="text-2xl md:text-3xl font-bold mb-4 text-center text-gray-800">
          Teacher's Registration Form
        </h1>
        <p className="text-sm md:text-base text-center mb-6 text-gray-600">
          Fill out the form carefully for registration.
        </p>

        {/* Personal Information */}
        <h2 className="text-lg font-semibold mb-4">
          Personal Information <span className="text-red-500">*</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-gray-700 mb-2">First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
              placeholder="Enter your first name"
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm">{errors.firstName}</p>
            )}
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
              placeholder="Enter your last name"
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm">{errors.lastName}</p>
            )}
          </div>
        </div>

        {/* Recent Photo with Drag-and-Drop */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">
            Recent Photo <span className="text-red-500">*</span>
          </label>
          <div
            className="w-full border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-blue-500 focus-within:border-blue-500 flex flex-col items-center justify-center"
            onClick={() => document.getElementById("photoInput").click()}
            onDrop={(e) => {
              e.preventDefault();
              const file = e.dataTransfer.files[0];
              setFormData({ ...formData, photo: file });
            }}
            onDragOver={(e) => e.preventDefault()}
          >
            {formData.photo ? (
              <div className="flex flex-col items-center">
                <img
                  src={URL.createObjectURL(formData.photo)}
                  alt="Uploaded"
                  className="h-32 w-32 object-cover rounded-lg mb-2"
                />
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, photo: null })}
                  className="text-red-500 text-sm underline"
                >
                  Discard Photo
                </button>
              </div>
            ) : (
              <>
                <input
                  type="file"
                  id="photoInput"
                  name="photo"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    setFormData({ ...formData, photo: file });
                  }}
                  className="hidden"
                />
                {/* Upload Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 text-gray-400 mb-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M16 10l-4-4m0 0l-4 4m4-4v12"
                  />
                </svg>
                <p className="text-black font-semibold mb-2">Browse Files</p>
                <p className="text-gray-500 text-sm">
                  Drag and drop your photo here
                </p>
              </>
            )}
          </div>
          {errors.photo && (
            <p className="text-red-500 text-sm">{errors.photo}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-gray-700 mb-2">
              Gender <span className="text-red-500">*</span>
            </label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
            >
              <option value="" className="text-gray-400">
                Please Select
              </option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            {errors.gender && (
              <p className="text-red-500 text-sm">{errors.gender}</p>
            )}
          </div>
          <div>
            <label className="block text-gray-700 mb-2">
              Age <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
              placeholder="e.g., 23"
            />
            {errors.age && <p className="text-red-500 text-sm">{errors.age}</p>}
          </div>
        </div>

        {/* Contact Information */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">
            E-mail Address <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
            placeholder="example@example.com"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">
            Contact <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
            placeholder="(000) 000-0000"
          />
          {errors.phone && (
            <p className="text-red-500 text-sm">{errors.phone}</p>
          )}
        </div>

        {/* Address Section */}
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Address</label>

          {/* Street Address */}
          <div className="mb-4">
            <input
              type="text"
              name="street1"
              value={formData.address.street1}
              onChange={handleAddressChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
              placeholder="Street Address"
            />
          </div>

          {/* Street Address Line 2 */}
          <div className="mb-4">
            <input
              type="text"
              name="street2"
              value={formData.address.street2}
              onChange={handleAddressChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
              placeholder="Street Address Line 2"
            />
          </div>

          {/* City and State/Province */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <input
                type="text"
                name="city"
                value={formData.address.city}
                onChange={handleAddressChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                placeholder="City"
              />
            </div>
            <div>
              <input
                type="text"
                name="state"
                value={formData.address.state}
                onChange={handleAddressChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                placeholder="State / Province"
              />
            </div>
          </div>

          {/* Postal/Zip Code */}
          <div className="mb-4">
            <input
              type="text"
              name="zip"
              value={formData.address.zip}
              onChange={handleAddressChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
              placeholder="Postal / Zip Code"
            />
          </div>
        </div>

        {/* Qualification and Teaching Preferences Section */}
        <div className="mb-6">
          {/* Qualification */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Qualification</label>
            <select
              name="qualification"
              value={formData.qualification}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
            >
              <option value="" className="text-gray-400">
                Select Qualification
              </option>
              <option value="High School">High School</option>
              <option value="Bachelor's Degree">Bachelor's Degree</option>
              <option value="Master's Degree">Master's Degree</option>
              <option value="PhD">PhD</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Classes You Can Teach */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">
              Classes You Can Teach
            </label>
            <select
              name="classes"
              value={formData.classes}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
            >
              <option value="" className="text-gray-400">
                Select Classes
              </option>
              <option value="Primary">Primary</option>
              <option value="Middle School">Middle School</option>
              <option value="High School">High School</option>
              <option value="Undergraduate">Undergraduate</option>
              <option value="Postgraduate">Postgraduate</option>
            </select>
          </div>

          {/* Subjects You Can Teach */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">
              Subjects You Can Teach
            </label>
            <select
              name="subjects"
              value={formData.subjects}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
            >
              <option value="" className="text-gray-400">
                Select Subjects
              </option>
              <option value="Math">Math</option>
              <option value="Science">Science</option>
              <option value="English">English</option>
              <option value="History">History</option>
              <option value="Geography">Geography</option>
              <option value="Computer Science">Computer Science</option>
              <option value="Physics">Physics</option>
              <option value="Chemistry">Chemistry</option>
              <option value="Biology">Biology</option>
              <option value="Economics">Economics</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Any Experience of Teaching */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">
              Any Experience of Teaching
            </label>
            <textarea
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
              placeholder="Describe your teaching experience (if any)"
              rows="3"
            ></textarea>
          </div>
        </div>

        {/* How Did You Find About Us Section */}
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">
            How did you find about us? <span className="text-red-500">*</span>
          </label>
          <select
            name="referral"
            value={formData.referral}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
          >
            <option value="" className="text-gray-400">
              Select an option
            </option>
            <option value="Ads">Ads</option>
            <option value="Friend">Friend</option>
            <option value="Internet">Internet</option>
            <option value="Newspaper">Newspaper</option>
            <option value="Other">Other</option>
          </select>
          {errors.referral && (
            <p className="text-red-500 text-sm">{errors.referral}</p>
          )}
        </div>

        {/* CV Upload Section */}
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">
            Upload Your CV <span className="text-red-500">*</span>
          </label>
          <div
            className="w-full border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-blue-500 focus-within:border-blue-500 flex flex-col items-center justify-center"
            onClick={() => document.getElementById("cvInput").click()}
            onDrop={(e) => {
              e.preventDefault();
              const file = e.dataTransfer.files[0];
              if (file && file.size > maxResumeSize) {
                setErrors({ ...errors, cv: "File size exceeds 2 MB." });
              } else {
                setFormData({ ...formData, cv: file });
                setErrors({ ...errors, cv: null });
              }
            }}
            onDragOver={(e) => e.preventDefault()}
          >
            {formData.cv ? (
              <div className="flex flex-col items-center">
                <p className="text-black font-semibold mb-2">
                  {formData.cv.name}
                </p>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, cv: null })}
                  className="text-red-500 text-sm underline"
                >
                  Discard File
                </button>
              </div>
            ) : (
              <>
                <input
                  type="file"
                  id="cvInput"
                  name="cv"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file && file.size > maxResumeSize) {
                      setErrors({ ...errors, cv: "File size exceeds 2 MB." });
                    } else {
                      setFormData({ ...formData, cv: file });
                      setErrors({ ...errors, cv: null });
                    }
                  }}
                  className="hidden"
                />
                {/* Upload Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 text-gray-400 mb-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M16 10l-4-4m0 0l-4 4m4-4v12"
                  />
                </svg>
                <p className="text-black font-semibold mb-2">Browse Files</p>
                <p className="text-gray-500 text-sm">
                  Drag and drop your CV here
                </p>
              </>
            )}
          </div>
          {errors.cv && <p className="text-red-500 text-sm">{errors.cv}</p>}
        </div>

        {/* Terms and Conditions Section */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Terms and Conditions</h3>
          <ol className="list-decimal list-inside text-gray-600 text-sm mb-4">
            <li className="pl-2">
              We only inform the registered teachers/tutors for any teaching
              vacancy through phone call, or via email, SMS.
            </li>
            <li className="pl-2">
              More details will be provided depending upon the teacher's
              interest.
            </li>
            <li className="pl-2">
              Every teacher/tutor will be charged 50% of his/her first month's
              salary/tuition fees.
            </li>
          </ol>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="agree"
              name="agree"
              checked={formData.agree || false}
              onChange={(e) =>
                setFormData({ ...formData, agree: e.target.checked })
              }
              className="w-5 h-5 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="agree" className="ml-2 text-gray-700">
              I agree to the terms and conditions
            </label>
          </div>
          {errors.agree && (
            <p className="text-red-500 text-sm mt-2">{errors.agree}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className={`bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-lg shadow-md transition-all ${
            isSubmitting ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
          }`}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit Application"}
        </button>
      </motion.form>

      {/* Success Popup */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-xl font-bold mb-4">Thank You!</h2>
            <p className="text-gray-700 mb-4">
              Your registration has been submitted successfully. Our admin will
              soon email you with your username and password.
            </p>
            <button
              onClick={() => setShowPopup(false)}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default TeacherRegistration;
