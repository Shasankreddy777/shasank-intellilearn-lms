import { motion } from "framer-motion";

function StudentsModal({
  students,
  onClose
}) {

  return (

    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 px-4">

      <motion.div
        initial={{
          opacity: 0,
          scale: 0.9
        }}
        animate={{
          opacity: 1,
          scale: 1
        }}
        className="w-full max-w-4xl bg-[#111827] border border-white/10 rounded-3xl overflow-hidden shadow-2xl"
      >

        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-white/10">

          <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-cyan-300 bg-clip-text text-transparent">

            Enrolled Students

          </h2>

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-2xl"
          >

            ✕

          </button>

        </div>

        {/* Table */}
        <div className="overflow-x-auto">

          <table className="w-full">

            <thead>

              <tr className="border-b border-white/10 text-left text-gray-400">

                <th className="px-8 py-5">
                  Student
                </th>

                <th className="px-8 py-5">
                  Email
                </th>

                <th className="px-8 py-5">
                  Course
                </th>

              </tr>

            </thead>

            <tbody>

              {students.map(
                (student, index) => (

                  <tr
                    key={index}
                    className="border-b border-white/5 hover:bg-white/5 transition"
                  >

                    {/* Name */}
                    <td className="px-8 py-5">

                      <div className="flex items-center gap-4">

                        {/* Avatar */}
                        <div className="w-11 h-11 rounded-full bg-gradient-to-r from-purple-600 to-cyan-500 flex items-center justify-center font-bold text-white">

                          {student.name
                            ?.charAt(0)}

                        </div>

                        <span className="font-medium text-white">

                          {student.name}

                        </span>

                      </div>

                    </td>

                    {/* Email */}
                    <td className="px-8 py-5 text-gray-300">

                      {student.email}

                    </td>

                    {/* Course */}
                    <td className="px-8 py-5">

                      <span className="bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 px-4 py-2 rounded-full text-sm">

                        {student.course_title}

                      </span>

                    </td>

                  </tr>

                )
              )}

            </tbody>

          </table>

        </div>

        {/* Footer */}
        <div className="px-8 py-5 border-t border-white/10 text-gray-500 text-sm">

          Total Enrollments:
          {" "}
          {students.length}

        </div>

      </motion.div>

    </div>

  );

}

export default StudentsModal;