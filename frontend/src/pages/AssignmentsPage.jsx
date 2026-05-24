import { useEffect, useState } from "react";

import { motion } from "framer-motion";

import API from "../services/api";

import SubmissionModal from "../components/SubmissionModal";

function AssignmentsPage() {

  const [assignments, setAssignments] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [selectedAssignment,
    setSelectedAssignment] =
    useState(null);

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

      } finally {

        setLoading(false);

      }

    };

  useEffect(() => {

    fetchAssignments();

  }, []);

  return (
    <div className="min-h-screen bg-dark text-white px-6 md:px-10 py-10">

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
      <div className="mb-12">

        <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-cyan-300 bg-clip-text text-transparent">

          Assignments

        </h1>

        <p className="text-gray-400 mt-4 text-lg">

          Complete assignments and improve your practical skills.

        </p>

      </div>

      {/* Loading */}
      {loading ? (

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

          {[1, 2, 3].map((item) => (

            <div
              key={item}
              className="bg-white/5 border border-white/10 rounded-3xl p-8 animate-pulse"
            >

              <div className="h-5 bg-gray-700 rounded w-32 mb-5"></div>

              <div className="h-8 bg-gray-700 rounded w-3/4 mb-5"></div>

              <div className="space-y-3">

                <div className="h-3 bg-gray-800 rounded"></div>

                <div className="h-3 bg-gray-800 rounded"></div>

                <div className="h-3 bg-gray-800 rounded w-2/3"></div>

              </div>

            </div>

          ))}

        </div>

      ) : assignments.length === 0 ? (

        <div className="bg-white/5 border border-white/10 rounded-3xl p-14 text-center">

          <h2 className="text-3xl font-bold text-gray-300 mb-4">

            No Assignments Available

          </h2>

          <p className="text-gray-500">

            Assignments created by instructors will appear here.

          </p>

        </div>

      ) : (

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

          {assignments.map(
            (assignment, index) => (

              <motion.div
                key={assignment.id}
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

                {/* Banner */}
                <div className="h-36 bg-gradient-to-br from-purple-600 via-indigo-600 to-cyan-500"></div>

                {/* Content */}
                <div className="p-6">

                  <span className="text-cyan-400 text-sm">

                    {assignment.course_title}

                  </span>

                  <h2 className="text-2xl font-bold mt-3 mb-4">

                    {assignment.title}

                  </h2>

                  <p className="text-gray-400 text-sm leading-7 mb-6">

                    {assignment.description}

                  </p>

                  {/* Due Date */}
                  <div className="flex justify-between items-center mb-6">

                    <span className="text-gray-500">

                      Due Date

                    </span>

                    <span className="text-red-400 font-medium">

                      {assignment.due_date}

                    </span>

                  </div>

                  {/* Button */}
                  <button
                    onClick={() =>
                      setSelectedAssignment(
                        assignment
                      )
                    }
                    className="w-full bg-gradient-to-r from-purple-600 to-cyan-500 py-3 rounded-2xl font-semibold hover:scale-[1.02] transition"
                  >

                    View Assignment

                  </button>

                </div>

              </motion.div>

            )
          )}

        </div>

      )}

    </div>
  );
}

export default AssignmentsPage;