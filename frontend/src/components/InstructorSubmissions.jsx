import { useEffect, useState } from "react";

import API from "../services/api";

function InstructorSubmissions() {

  const [submissions,
    setSubmissions] =
    useState([]);

  // Fetch submissions
  const fetchSubmissions =
    async () => {

      try {

        const response =
          await API.get(
            "/instructor-submissions"
          );

        setSubmissions(
          response.data.submissions
        );

      } catch (error) {

        console.log(error);

      }

    };

  useEffect(() => {

    fetchSubmissions();

  }, []);

  return (
    <div className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-xl max-w-7xl mt-10">

      <h2 className="text-3xl font-bold mb-8">

        Student Assignment Submissions

      </h2>

      {submissions.length === 0 ? (

        <div className="text-gray-400 text-center py-10">

          No submissions yet.

        </div>

      ) : (

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {submissions.map(
            (submission) => (

              <div
                key={submission.id}
                className="bg-[#111827] border border-white/10 rounded-3xl p-6"
              >

                {/* Assignment */}
                <h3 className="text-2xl font-bold text-cyan-400 mb-4">

                  {submission.assignment_title}

                </h3>

                {/* Student */}
                <div className="mb-4">

                  <p className="text-lg font-semibold">

                    {submission.student_name}

                  </p>

                  <p className="text-gray-400 text-sm">

                    {submission.student_email}

                  </p>

                </div>

                {/* Course */}
                <p className="text-purple-400 mb-5">

                  Course:
                  {" "}
                  {submission.course_title}

                </p>

                {/* Submission */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-4 mb-5">

                  <p className="text-gray-300 break-all leading-7">

                    {submission.submission_text}

                  </p>

                </div>

                {/* Date */}
                <p className="text-gray-500 text-sm">

                  Submitted:
                  {" "}
                  {submission.submitted_at}

                </p>
                <button
  onClick={async () => {

    try {

      await API.post(
        "/certificates/issue",
        {
          student_id:
            submission.student_id,

          course_id:
            submission.course_id
        }
      );

      alert(
        "Certificate Issued Successfully"
      );

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Failed to issue certificate"
      );

    }

  }}
  className="w-full mt-5 bg-gradient-to-r from-green-500 to-emerald-600 py-3 rounded-2xl font-semibold hover:scale-[1.02] transition"
>

  Issue Certificate

</button>

              </div>

            )
          )}

        </div>

      )}

    </div>
  );
}

export default InstructorSubmissions;