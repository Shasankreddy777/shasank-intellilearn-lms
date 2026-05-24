import { motion } from "framer-motion";

import toast from "react-hot-toast";

import { useNavigate } from "react-router-dom";

import API from "../services/api";

function CourseCard({ course }) {

  const navigate = useNavigate();

  const user =
    JSON.parse(localStorage.getItem("user"));

  // Enroll Function
  const handleEnroll = async () => {

    try {

      if (!user) {

        toast.error(
          "Please login first"
        );

        return;

      }

      if (user.role !== "student") {

        toast.error(
          "Only students can enroll"
        );

        return;

      }

      const response = await API.post(
        "/enroll",
        {
          course_id: course.id
        }
      );

      toast.success(
        response.data.message
      );

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Enrollment failed"
      );

    }

  };

  // Start Learning
  const handleStartLearning = () => {

    navigate(`/learn/${course.id}`);

  };

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 30
      }}
      animate={{
        opacity: 1,
        y: 0
      }}
      whileHover={{
        y: -10,
        scale: 1.02
      }}
      transition={{
        duration: 0.35
      }}
      className="group relative bg-white/5 border border-white/10 rounded-3xl overflow-hidden backdrop-blur-xl shadow-2xl"
    >

      {/* Glow Effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-r from-purple-500/10 to-cyan-500/10"></div>

      {/* Thumbnail */}
      <div className="relative h-52 overflow-hidden">

        {course.thumbnail ? (

          <img
            src={course.thumbnail}
            alt={course.title}
            className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
          />

        ) : (

          <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-indigo-600 to-cyan-500"></div>

        )}

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/30"></div>

        {/* Difficulty Badge */}
        <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-lg px-4 py-2 rounded-full text-sm font-medium border border-white/10 text-white">

          {course.difficulty}

        </div>

      </div>

      {/* Content */}
      <div className="relative p-6">

        {/* Category */}
        <span className="inline-block text-cyan-400 text-sm font-medium mb-3">

          {course.category}

        </span>

        {/* Title */}
        <h2 className="text-2xl font-bold mb-4 group-hover:text-cyan-300 transition">

          {course.title}

        </h2>

        {/* Description */}
        <p className="text-gray-400 leading-7 text-sm mb-6">

          {course.description}

        </p>

        {/* Instructor */}
        <div className="flex items-center justify-between mb-6">

          <div>

            <p className="text-gray-500 text-sm">
              Instructor
            </p>

            <p className="text-white font-medium mt-1">

              {course.instructor_name}

            </p>

          </div>

        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-3">

          {/* Enroll */}
          <button
            onClick={handleEnroll}
            className="w-full bg-gradient-to-r from-purple-600 to-cyan-500 py-3 rounded-2xl font-semibold hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-cyan-500/20"
          >

            Enroll Now

          </button>

          {/* Start Learning */}
          <button
            onClick={handleStartLearning}
            className="w-full bg-white/10 border border-white/10 py-3 rounded-2xl font-semibold hover:bg-white/20 transition-all duration-300"
          >

            Start Learning

          </button>

        </div>

      </div>

    </motion.div>
  );
}

export default CourseCard;