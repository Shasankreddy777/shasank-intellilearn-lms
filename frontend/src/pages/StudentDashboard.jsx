import { useEffect, useState } from "react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

import { motion } from "framer-motion";

import { useNavigate } from "react-router-dom";

import API from "../services/api";

import SubmissionModal from "../components/SubmissionModal";

function StudentDashboard() {

  const navigate = useNavigate();

  const user =
    JSON.parse(localStorage.getItem("user"));

  // Analytics
  const [analytics, setAnalytics] =
    useState({
      enrolledCourses: 0,
      progress: 0,
      certificates: 0,
    });

  // Courses
  const [myCourses, setMyCourses] =
    useState([]);

  // Assignments
  const [assignments, setAssignments] =
    useState([]);

  // Certificates
  const [certificates, setCertificates] =
    useState([]);

  // Progress
  const [overallProgress,
    setOverallProgress] =
    useState(0);

  // Submission Modal
  const [selectedAssignment,
    setSelectedAssignment] =
    useState(null);

  // Fetch analytics
  const fetchAnalytics = async () => {

    try {

      const response = await API.get(
        "/enroll/analytics"
      );

      setAnalytics(
        response.data.analytics
      );

    } catch (error) {

      console.log(error);

    }

  };

  // Fetch courses
  const fetchMyCourses = async () => {

    try {

      const response = await API.get(
        "/enroll/my-courses"
      );

      setMyCourses(
        response.data.courses
      );

    } catch (error) {

      console.log(error);

    }

  };

  // Fetch assignments
  const fetchAssignments =
    async () => {

      try {

        const response =
          await API.get(
            "/assignments"
          );

        setAssignments(
          response.data.assignments
        );

      } catch (error) {

        console.log(error);

      }

    };

  // Fetch certificates
  const fetchCertificates =
    async () => {

      try {

        const response =
          await API.get(
            "/certificates/my-certificates"
          );

        setCertificates(
          response.data.certificates
        );

      } catch (error) {

        console.log(error);

      }

    };

  // Fetch progress
  const fetchRealProgress =
    async () => {

      try {

        const coursesResponse =
          await API.get(
            "/enroll/my-courses"
          );

        const courses =
          coursesResponse.data.courses;

        if (
          courses.length === 0
        ) {

          setOverallProgress(0);

          return;

        }

        let totalPercentage = 0;

        for (let course of courses) {

          const progressResponse =
            await API.get(
              `/progress/${course.id}`
            );

          totalPercentage +=
            progressResponse.data
            .progress.percentage;

        }

        const avg =
          Math.round(
            totalPercentage /
            courses.length
          );

        setOverallProgress(avg);

      } catch (error) {

        console.log(error);

      }

    };

  useEffect(() => {

    fetchAnalytics();

    fetchMyCourses();

    fetchAssignments();

    fetchCertificates();

    fetchRealProgress();

  }, []);

  // Graph Data
  const progressData = [
    { week: "Week 1", progress: 0 },

    {
      week: "Week 2",
      progress:
        overallProgress * 0.25,
    },

    {
      week: "Week 3",
      progress:
        overallProgress * 0.5,
    },

    {
      week: "Week 4",
      progress:
        overallProgress * 0.75,
    },

    {
      week: "Week 5",
      progress:
        overallProgress,
    },
  ];

  // Pie Chart Data
  const courseStats = [
    {
      name: "Completed",
      value:
        certificates.length,
    },

    {
      name: "In Progress",
      value:
        analytics.enrolledCourses,
    },

    {
      name: "Pending",
      value:
        analytics.enrolledCourses === 0
          ? 0
          : 5 -
            analytics.enrolledCourses,
    },
  ];

  const COLORS = [
    "#8B5CF6",
    "#06B6D4",
    "#22C55E",
  ];

  return (
    <div className="min-h-screen bg-dark text-white px-4 md:px-8 xl:px-12 py-8 md:py-10">

      {/* Submission Modal */}
      {selectedAssignment && (

        <SubmissionModal
          assignment={
            selectedAssignment
          }
          onClose={() =>
            setSelectedAssignment(null)
          }
        />

      )}

      {/* Header */}
      <motion.div
        initial={{
          opacity: 0,
          y: 20
        }}
        animate={{
          opacity: 1,
          y: 0
        }}
        transition={{
          duration: 0.5
        }}
        className="mb-12"
      >

        <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">

          Welcome,

          <span className="bg-gradient-to-r from-purple-400 to-cyan-300 bg-clip-text text-transparent ml-3">

            {user?.name}

          </span>

        </h1>

        <p className="text-gray-400 text-base md:text-lg">

          Track your learning journey and course progress.

        </p>

      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 mb-12">

        {/* Enrolled */}
        <motion.div
          whileHover={{
            scale: 1.03
          }}
          className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-xl"
        >

          <h2 className="text-xl md:text-2xl font-semibold">

            Enrolled Courses

          </h2>

          <p className="text-4xl md:text-5xl mt-4 font-bold text-purple-400">

            {analytics.enrolledCourses}

          </p>

        </motion.div>

        {/* Progress */}
        <motion.div
          whileHover={{
            scale: 1.03
          }}
          className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-xl"
        >

          <h2 className="text-xl md:text-2xl font-semibold">

            Progress

          </h2>

          <p className="text-4xl md:text-5xl mt-4 font-bold text-cyan-400">

            {overallProgress}%

          </p>

        </motion.div>

        {/* Certificates */}
        <motion.div
          whileHover={{
            scale: 1.03
          }}
          className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-xl"
        >

          <h2 className="text-xl md:text-2xl font-semibold">

            Certificates

          </h2>

          <p className="text-4xl md:text-5xl mt-4 font-bold text-green-400">

            {certificates.length}

          </p>

        </motion.div>

      </div>

      {/* My Learning */}
      <div className="mb-14">

        <h2 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-cyan-300 bg-clip-text text-transparent">

          My Learning

        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-8">

          {myCourses.map((course, index) => (

            <motion.div
              key={course.id}
              initial={{
                opacity: 0,
                y: 20
              }}
              animate={{
                opacity: 1,
                y: 0
              }}
              transition={{
                delay:
                  index * 0.1
              }}
              whileHover={{
                scale: 1.03
              }}
              className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden backdrop-blur-xl"
            >

              {/* Thumbnail */}
              {course.thumbnail ? (

                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-48 object-cover"
                />

              ) : (

                <div className="h-40 bg-gradient-to-br from-purple-600 via-indigo-600 to-cyan-500"></div>

              )}

              {/* Content */}
              <div className="p-6">

                <span className="text-cyan-400 text-sm">

                  {course.category}

                </span>

                <h3 className="text-2xl font-bold mt-2 mb-3">

                  {course.title}

                </h3>

                <p className="text-gray-400 text-sm mb-5 leading-7">

                  {course.description}

                </p>

                {/* Progress */}
                <div className="mb-5">

                  <div className="flex justify-between text-sm mb-2">

                    <span>Progress</span>

                    <span>
                      {overallProgress}%
                    </span>

                  </div>

                  <div className="w-full h-3 bg-gray-800 rounded-full overflow-hidden">

                    <div
                      className="h-full bg-gradient-to-r from-purple-500 to-cyan-400 rounded-full"
                      style={{
                        width:
                          `${overallProgress}%`
                      }}
                    ></div>

                  </div>

                </div>

                <button
                  onClick={() =>
                    navigate(
                      `/learn/${course.id}`
                    )
                  }
                  className="w-full bg-gradient-to-r from-purple-600 to-cyan-500 py-3 rounded-2xl font-semibold hover:scale-[1.02] transition"
                >

                  Continue Learning

                </button>

              </div>

            </motion.div>

          ))}

        </div>

      </div>

      {/* Assignments */}
      <div className="mb-14">

        <h2 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-cyan-300 bg-clip-text text-transparent">

          Pending Assignments

        </h2>

        {assignments.length === 0 ? (

          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 text-center text-gray-400">

            No assignments available.

          </div>

        ) : (

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {assignments.map((assignment) => (

              <div
                key={assignment.id}
                className="bg-white/5 border border-white/10 rounded-3xl p-6"
              >

                <h3 className="text-2xl font-bold mb-3">

                  {assignment.title}

                </h3>

                <p className="text-gray-400 mb-4 leading-7">

                  {assignment.description}

                </p>

                <p className="text-cyan-400 mb-5">

                  Due:
                  {" "}
                  {assignment.due_date}

                </p>

                <button
                  onClick={() =>
                    setSelectedAssignment(
                      assignment
                    )
                  }
                  className="w-full bg-gradient-to-r from-purple-600 to-cyan-500 py-3 rounded-2xl font-semibold hover:scale-[1.02] transition"
                >

                  Submit Assignment

                </button>

              </div>

            ))}

          </div>

        )}

      </div>

      {/* Certificates */}
      {certificates.length > 0 && (

        <div className="mb-14">

          <h2 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-green-400 to-emerald-300 bg-clip-text text-transparent">

            My Certificates

          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

            {certificates.map(
              (certificate) => (

                <div
                  key={certificate.id}
                  className="bg-gradient-to-br from-green-500 via-emerald-600 to-teal-700 rounded-3xl p-10 shadow-2xl border border-white/10"
                >

                  <div className="text-center">

                    <h2 className="text-4xl font-bold text-white mb-6">

                      Certificate of Completion

                    </h2>

                    <p className="text-lg text-white/80 mb-4">

                      This certifies that

                    </p>

                    <h3 className="text-3xl font-bold text-yellow-300 mb-6">

                      {user?.name}

                    </h3>

                    <p className="text-lg text-white/80 mb-4">

                      has successfully completed

                    </p>

                    <h4 className="text-2xl font-bold text-white mb-8">

                      {certificate.course_title}

                    </h4>

                    <p className="text-white/70">

                      Issued on:
                      {" "}
                      {new Date(
                        certificate.issued_at
                      ).toLocaleDateString()}

                    </p>

                  </div>

                </div>

              )
            )}

          </div>

        </div>

      )}

      {/* Charts */}
      <div className="grid grid-cols-1 2xl:grid-cols-2 gap-8">

        {/* Line Chart */}
        <motion.div
          initial={{
            opacity: 0
          }}
          animate={{
            opacity: 1
          }}
          className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-xl"
        >

          <h2 className="text-2xl md:text-3xl font-bold mb-8">

            Weekly Progress

          </h2>

          <div className="h-72 md:h-80">

            <ResponsiveContainer width="100%" height="100%">

              <LineChart
                data={progressData}
              >

                <XAxis
                  dataKey="week"
                  stroke="#9CA3AF"
                />

                <YAxis stroke="#9CA3AF" />

                <Tooltip />

                <Line
                  type="monotone"
                  dataKey="progress"
                  stroke="#8B5CF6"
                  strokeWidth={4}
                />

              </LineChart>

            </ResponsiveContainer>

          </div>

        </motion.div>

        {/* Pie Chart */}
        <motion.div
          initial={{
            opacity: 0
          }}
          animate={{
            opacity: 1
          }}
          className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-xl"
        >

          <h2 className="text-2xl md:text-3xl font-bold mb-8">

            Course Status

          </h2>

          <div className="h-72 md:h-80 flex items-center justify-center">

            <ResponsiveContainer width="100%" height="100%">

              <PieChart>

                <Pie
                  data={courseStats}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="value"
                  label
                >

                  {courseStats.map(
                    (entry, index) => (

                      <Cell
                        key={`cell-${index}`}
                        fill={
                          COLORS[
                            index %
                            COLORS.length
                          ]
                        }
                      />

                    )
                  )}

                </Pie>

                <Tooltip />

              </PieChart>

            </ResponsiveContainer>

          </div>

        </motion.div>

      </div>

    </div>
  );
}

export default StudentDashboard;