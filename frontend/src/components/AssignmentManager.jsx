import { useEffect, useState } from "react";

import toast from "react-hot-toast";

import API from "../services/api";

function AssignmentManager() {

  const [courses, setCourses] =
    useState([]);

  const [formData, setFormData] =
    useState({
      course_id: "",
      title: "",
      description: "",
      due_date: ""
    });

  // Fetch Courses
  const fetchCourses = async () => {

    try {

      const response =
        await API.get("/courses");

      setCourses(
        response.data.courses
      );

    } catch (error) {

      console.log(error);

    }

  };

  useEffect(() => {

    fetchCourses();

  }, []);

  // Handle Input
  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value
    });

  };

  // Create Assignment
  const handleCreateAssignment =
    async (e) => {

      e.preventDefault();

      try {

        const response =
          await API.post(
            "/assignments",
            formData
          );

        toast.success(
          response.data.message
        );

        setFormData({
          course_id: "",
          title: "",
          description: "",
          due_date: ""
        });

      } catch (error) {

        toast.error(
          error.response?.data?.message ||
          "Failed to create assignment"
        );

      }

    };

  return (
    <div className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-xl max-w-4xl mt-10">

      <h2 className="text-3xl font-bold mb-8">

        Create Assignment

      </h2>

      <form
        onSubmit={handleCreateAssignment}
        className="space-y-6"
      >

        {/* Course */}
        <div>

          <label className="block mb-2 text-gray-300">

            Select Course

          </label>

          <select
            name="course_id"
            value={formData.course_id}
            onChange={handleChange}
            className="w-full bg-[#111827] text-white border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-cyan-500 transition"
            required
          >

            <option value="">
              Select Course
            </option>

            {courses.map((course) => (

              <option
                key={course.id}
                value={course.id}
              >

                {course.title}

              </option>

            ))}

          </select>

        </div>

        {/* Title */}
        <div>

          <label className="block mb-2 text-gray-300">

            Assignment Title

          </label>

          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter assignment title"
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-purple-500 transition"
            required
          />

        </div>

        {/* Description */}
        <div>

          <label className="block mb-2 text-gray-300">

            Assignment Description

          </label>

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter assignment description"
            rows="5"
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-cyan-500 transition"
            required
          ></textarea>

        </div>

        {/* Due Date */}
        <div>

          <label className="block mb-2 text-gray-300">

            Due Date

          </label>

          <input
            type="date"
            name="due_date"
            value={formData.due_date}
            onChange={handleChange}
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-purple-500 transition"
            required
          />

        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-purple-600 to-cyan-500 py-4 rounded-2xl font-semibold hover:scale-[1.02] transition"
        >

          Create Assignment

        </button>

      </form>

    </div>
  );
}

export default AssignmentManager;