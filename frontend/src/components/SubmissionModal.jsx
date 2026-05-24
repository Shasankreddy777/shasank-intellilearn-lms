import { useState } from "react";

import toast from "react-hot-toast";

import API from "../services/api";

function SubmissionModal({
  assignment,
  onClose
}) {

  const [submissionText,
    setSubmissionText] =
    useState("");

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        const response =
          await API.post(
            "/submissions",
            {
              assignment_id:
                assignment.id,

              submission_text:
                submissionText
            }
          );

        toast.success(
          response.data.message
        );

        onClose();

      } catch (error) {

        toast.error(
          error.response?.data?.message ||
          "Submission failed"
        );

      }

    };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4">

      <div className="bg-[#111827] border border-white/10 rounded-3xl p-8 w-full max-w-2xl">

        {/* Header */}
        <div className="flex justify-between items-center mb-6">

          <h2 className="text-3xl font-bold text-white">

            Submit Assignment

          </h2>

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-2xl"
          >

            ×

          </button>

        </div>

        {/* Assignment Info */}
        <div className="mb-6">

          <h3 className="text-2xl font-semibold text-cyan-400 mb-3">

            {assignment.title}

          </h3>

          <p className="text-gray-400 leading-7">

            {assignment.description}

          </p>

        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          <div>

            <label className="block mb-2 text-gray-300">

              GitHub Link / Project Explanation

            </label>

            <textarea
              value={submissionText}
              onChange={(e) =>
                setSubmissionText(
                  e.target.value
                )
              }
              rows="6"
              placeholder="Paste GitHub repository link or explain your assignment submission..."
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white outline-none focus:border-cyan-500 transition"
              required
            ></textarea>

          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-cyan-500 py-4 rounded-2xl font-semibold hover:scale-[1.02] transition"
          >

            Submit Assignment

          </button>

        </form>

      </div>

    </div>
  );
}

export default SubmissionModal;