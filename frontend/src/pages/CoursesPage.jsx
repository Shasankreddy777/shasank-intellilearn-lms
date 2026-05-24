import { useEffect, useState } from "react";

import API from "../services/api";

import CourseCard from "../components/CourseCard";

function CoursesPage() {

  const [courses, setCourses] = useState([]);

  const [filteredCourses, setFilteredCourses] = useState([]);

  const [loading, setLoading] = useState(true);

  // Filters
  const [search, setSearch] = useState("");

  const [category, setCategory] = useState("");

  const [difficulty, setDifficulty] = useState("");

  // Fetch courses
  const fetchCourses = async () => {

    try {

      const response = await API.get("/courses");

      setCourses(response.data.courses);

      setFilteredCourses(response.data.courses);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    fetchCourses();

  }, []);

  // Filtering
  useEffect(() => {

    let updatedCourses = [...courses];

    // Search
    if (search) {

      updatedCourses = updatedCourses.filter((course) =>
        course.title
          .toLowerCase()
          .includes(search.toLowerCase())
      );

    }

    // Category
    if (category) {

      updatedCourses = updatedCourses.filter(
        (course) =>
          course.category === category
      );

    }

    // Difficulty
    if (difficulty) {

      updatedCourses = updatedCourses.filter(
        (course) =>
          course.difficulty === difficulty
      );

    }

    setFilteredCourses(updatedCourses);

  }, [search, category, difficulty, courses]);

  return (
    <div className="min-h-screen bg-dark text-white px-4 md:px-8 xl:px-12 py-8 md:py-10">

      {/* Header */}
      <div className="mb-12 md:mb-14">

        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 to-cyan-300 bg-clip-text text-transparent leading-tight">

          Explore Courses

        </h1>

        <p className="text-gray-400 mt-4 text-base md:text-lg max-w-2xl leading-7">

          Learn modern technologies with immersive premium learning experience.

        </p>

      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">

        {/* Search */}
        <input
          type="text"
          placeholder="Search courses..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-purple-500 transition"
        />

        {/* Category */}
        <select
          value={category}
          onChange={(e) =>
            setCategory(e.target.value)
          }
          className="bg-[#111827] text-white border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-cyan-500 transition"
        >

          <option
            value=""
            className="bg-[#111827] text-white"
          >
            All Categories
          </option>

          <option
            value="Programming"
            className="bg-[#111827] text-white"
          >
            Programming
          </option>

          <option
            value="Artificial Intelligence"
            className="bg-[#111827] text-white"
          >
            Artificial Intelligence
          </option>

          <option
            value="Web Development"
            className="bg-[#111827] text-white"
          >
            Web Development
          </option>

          <option
            value="Cybersecurity"
            className="bg-[#111827] text-white"
          >
            Cybersecurity
          </option>

          <option
            value="Cloud & DevOps"
            className="bg-[#111827] text-white"
          >
            Cloud & DevOps
          </option>

        </select>

        {/* Difficulty */}
        <select
          value={difficulty}
          onChange={(e) =>
            setDifficulty(e.target.value)
          }
          className="bg-[#111827] text-white border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-purple-500 transition"
        >

          <option
            value=""
            className="bg-[#111827] text-white"
          >
            All Difficulties
          </option>

          <option
            value="Beginner"
            className="bg-[#111827] text-white"
          >
            Beginner
          </option>

          <option
            value="Intermediate"
            className="bg-[#111827] text-white"
          >
            Intermediate
          </option>

          <option
            value="Advanced"
            className="bg-[#111827] text-white"
          >
            Advanced
          </option>

        </select>

      </div>

      {/* Loading */}
      {loading ? (

        <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-8">

          {[1, 2, 3].map((item) => (

            <div
              key={item}
              className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden animate-pulse"
            >

              <div className="h-40 bg-gray-800"></div>

              <div className="p-6">

                <div className="h-4 bg-gray-700 rounded w-20 mb-4"></div>

                <div className="h-8 bg-gray-700 rounded w-3/4 mb-4"></div>

                <div className="space-y-2 mb-6">

                  <div className="h-3 bg-gray-800 rounded"></div>

                  <div className="h-3 bg-gray-800 rounded"></div>

                  <div className="h-3 bg-gray-800 rounded w-2/3"></div>

                </div>

              </div>

            </div>

          ))}

        </div>

      ) : filteredCourses.length === 0 ? (

        <div className="flex flex-col items-center justify-center py-28 text-center">

          <div className="w-24 h-24 rounded-full bg-gradient-to-r from-purple-600 to-cyan-500 flex items-center justify-center text-4xl mb-8">

            📚

          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-gray-200 mb-4">

            No Courses Found

          </h2>

          <p className="text-gray-500 text-base md:text-lg max-w-md leading-7">

            Try changing your search or filters.

          </p>

        </div>

      ) : (

        <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-8">

          {filteredCourses.map((course) => (

            <CourseCard
              key={course.id}
              course={course}
            />

          ))}

        </div>

      )}

    </div>
  );
}

export default CoursesPage;