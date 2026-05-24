import { useEffect, useState } from "react";

import toast from "react-hot-toast";

import API from "../services/api";

function LessonManager() {

  const [courses, setCourses] =
    useState([]);

  const [formData, setFormData] =
    useState({
      course_id: "",
      title: "",
      video_url: ""
    });

  // Fetch Courses
  const fetchCourses = async () => {

    try {

      const response = await API.get(
        "/courses"
      );

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

  // Create Lesson
  const handleCreateLesson =
    async (e) => {

      e.preventDefault();

      try {

        const response =
          await API.post(
            "/lessons",
            formData
          );

        toast.success(
          response.data.message
        );

        setFormData({
          course_id: "",
          title: "",
          video_url: ""
        });

      } catch (error) {

        toast.error(
          error.response?.data?.message ||
          "Failed to create lesson"
        );

      }

    };

  return (
    <div className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-xl max-w-4xl mt-10">

      <h2 className="text-3xl font-bold mb-8">

        Add Course Lesson

      </h2>

      <form
        onSubmit={handleCreateLesson}
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

        {/* Lesson Title */}
        <div>

          <label className="block mb-2 text-gray-300">

            Lesson Title

          </label>

          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter lesson title"
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-purple-500 transition"
            required
          />

        </div>

        {/* Video URL */}
        <div>

          <label className="block mb-2 text-gray-300">

            YouTube Video URL

          </label>

          <input
            type="text"
            name="video_url"
            value={formData.video_url}
            onChange={handleChange}
            placeholder="Paste YouTube link"
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-cyan-500 transition"
            required
          />

        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-purple-600 to-cyan-500 py-4 rounded-2xl font-semibold hover:scale-[1.02] transition"
        >

          Create Lesson

        </button>

      </form>

    </div>
  );
}

export default LessonManager;