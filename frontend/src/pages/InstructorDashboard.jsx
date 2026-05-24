import { useEffect, useState } from "react";

import { motion } from "framer-motion";

import API from "../services/api";

import toast from "react-hot-toast";

import StudentsModal from "../components/StudentsModal";

import LessonManager from "../components/LessonManager";

import AssignmentManager from "../components/AssignmentManager";

import InstructorSubmissions from "../components/InstructorSubmissions";

function InstructorDashboard() {

  const user =
    JSON.parse(localStorage.getItem("user"));

  // Analytics
  const [analytics, setAnalytics] =
    useState({
      totalCourses: 0,
      totalStudents: 0,
      revenue: 0
    });

  // Students
  const [students, setStudents] =
    useState([]);

  const [showStudentsModal,
    setShowStudentsModal] =
    useState(false);

  // Form Data
  const [formData, setFormData] =
    useState({
      title: "",
      description: "",
      category: "",
      difficulty: "",
      thumbnail: ""
    });

  // Fetch Analytics
  const fetchAnalytics = async () => {

    try {

      const response = await API.get(
        "/courses/instructor/analytics"
      );

      setAnalytics(
        response.data.analytics
      );

    } catch (error) {

      console.log(error);

    }

  };

  // Fetch Students
  const fetchStudents = async () => {

    try {

      const response = await API.get(
        "/students/instructor/students"
      );

      setStudents(
        response.data.students
      );

      setShowStudentsModal(true);

    } catch (error) {

      console.log(error);

    }

  };

  useEffect(() => {

    fetchAnalytics();

  }, []);

  // Handle Input
  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value
    });

  };

  // Create Course
  const handleCreateCourse =
    async (e) => {

      e.preventDefault();

      try {

        const response =
          await API.post(
            "/courses",
            formData
          );

        toast.success(
          response.data.message
        );

        // Reset form
        setFormData({
          title: "",
          description: "",
          category: "",
          difficulty: "",
          thumbnail: ""
        });

        // Refresh analytics
        fetchAnalytics();

      } catch (error) {

        toast.error(
          error.response?.data
            ?.message ||
          "Failed to create course"
        );

      }

    };

  return (
    <div className="min-h-screen bg-dark text-white px-4 md:px-8 xl:px-12 py-8 md:py-10">

      {/* Students Modal */}
      {showStudentsModal && (

        <StudentsModal
          students={students}
          onClose={() =>
            setShowStudentsModal(false)
          }
        />

      )}

      {/* Header */}
      <div className="mb-12">

        <h1 className="text-3xl md:text-5xl font-bold mb-4">

          Welcome,

          <span className="bg-gradient-to-r from-purple-400 to-cyan-300 bg-clip-text text-transparent ml-3">

            {user?.name}

          </span>

        </h1>

        <p className="text-gray-400 text-base md:text-lg">

          Manage your courses and track platform growth.

        </p>

      </div>

      {/* Analytics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 mb-12">

        {/* Total Courses */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-xl"
        >

          <h2 className="text-xl md:text-2xl font-semibold">

            Total Courses

          </h2>

          <p className="text-4xl md:text-5xl mt-4 font-bold text-purple-400">

            {analytics.totalCourses}

          </p>

        </motion.div>

        {/* Students */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          onClick={fetchStudents}
          className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-xl cursor-pointer"
        >

          <h2 className="text-xl md:text-2xl font-semibold">

            Students

          </h2>

          <p className="text-4xl md:text-5xl mt-4 font-bold text-cyan-400">

            {analytics.totalStudents}

          </p>

          <p className="text-gray-500 mt-4 text-sm">

            Click to view enrolled students

          </p>

        </motion.div>

        {/* Revenue */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-xl"
        >

          <h2 className="text-xl md:text-2xl font-semibold">

            Revenue

          </h2>

          <p className="text-4xl md:text-5xl mt-4 font-bold text-green-400">

            ₹{analytics.revenue}

          </p>

        </motion.div>

      </div>

      {/* Create Course */}
      <div className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-xl max-w-4xl">

        <h2 className="text-3xl font-bold mb-8">

          Create New Course

        </h2>

        <form
          onSubmit={handleCreateCourse}
          className="space-y-6"
        >

          {/* Title */}
          <div>

            <label className="block mb-2 text-gray-300">

              Course Title

            </label>

            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter course title"
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-purple-500 transition"
              required
            />

          </div>

          {/* Description */}
          <div>

            <label className="block mb-2 text-gray-300">

              Course Description

            </label>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter course description"
              rows="5"
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-cyan-500 transition"
              required
            ></textarea>

          </div>

          {/* Category */}
          <div>

            <label className="block mb-2 text-gray-300">

              Category

            </label>

            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="Programming / AI / Cloud..."
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-purple-500 transition"
              required
            />

          </div>

          {/* Difficulty */}
          <div>

            <label className="block mb-2 text-gray-300">

              Difficulty

            </label>

            <select
              name="difficulty"
              value={formData.difficulty}
              onChange={handleChange}
              className="w-full bg-[#111827] text-white border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-cyan-500 transition"
              required
            >

              <option value="">
                Select Difficulty
              </option>

              <option value="Beginner">
                Beginner
              </option>

              <option value="Intermediate">
                Intermediate
              </option>

              <option value="Advanced">
                Advanced
              </option>

            </select>

          </div>

          {/* Thumbnail */}
          <div>

            <label className="block mb-2 text-gray-300">

              Thumbnail URL

            </label>

            <input
              type="text"
              name="thumbnail"
              value={formData.thumbnail}
              onChange={handleChange}
              placeholder="Paste image URL"
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-purple-500 transition"
            />

          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-cyan-500 py-4 rounded-2xl font-semibold hover:scale-[1.02] transition"
          >

            Create Course

          </button>

        </form>

      </div>

      {/* Lesson Manager */}
      <LessonManager />

      {/* Assignment Manager */}
      <AssignmentManager />

      {/* Instructor Submissions */}
      <InstructorSubmissions />

    </div>
  );
}

export default InstructorDashboard;