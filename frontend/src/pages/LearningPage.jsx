import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import toast from "react-hot-toast";

import API from "../services/api";

function LearningPage() {

  const { courseId } = useParams();

  const [lessons, setLessons] =
    useState([]);

  const [currentLesson,
    setCurrentLesson] =
    useState(null);

  const [progress, setProgress] =
    useState({
      totalLessons: 0,
      completedLessons: 0,
      percentage: 0
    });

  const [loading, setLoading] =
    useState(true);

  // Fetch Lessons
  const fetchLessons = async () => {

    try {

      const response = await API.get(
        `/lessons/${courseId}`
      );

      setLessons(
        response.data.lessons
      );

      if (
        response.data.lessons.length > 0
      ) {

        setCurrentLesson(
          response.data.lessons[0]
        );

      }

    } catch (error) {

      console.log(error);

    }

  };

  // Fetch Progress
  const fetchProgress = async () => {

    try {

      const response = await API.get(
        `/progress/${courseId}`
      );

      setProgress(
        response.data.progress
      );

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    fetchLessons();

    fetchProgress();

  }, []);

  // Convert YouTube URL to embed URL
  const getEmbedUrl = (url) => {

    if (!url) return "";

    const videoId =
      url.split("v=")[1];

    return `https://www.youtube.com/embed/${videoId}`;

  };

  // Mark Lesson Complete
  const markComplete = async () => {

    try {

      const response =
        await API.post(
          "/progress/complete",
          {
            lesson_id:
              currentLesson.id
          }
        );

      toast.success(
        response.data.message
      );

      fetchProgress();

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Failed to update progress"
      );

    }

  };

  if (loading) {

    return (

      <div className="min-h-screen bg-dark text-white flex items-center justify-center text-2xl">

        Loading lessons...

      </div>

    );

  }

  return (
    <div className="min-h-screen bg-dark text-white flex flex-col lg:flex-row">

      {/* Sidebar */}
      <div className="w-full lg:w-80 bg-white/5 border-r border-white/10 p-6 overflow-y-auto">

        <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-cyan-300 bg-clip-text text-transparent">

          Course Lessons

        </h2>

        {/* Progress */}
        <div className="mb-8">

          <div className="flex justify-between mb-2 text-sm">

            <span>Course Progress</span>

            <span>
              {progress.percentage}%
            </span>

          </div>

          <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">

            <div
              className="h-full bg-gradient-to-r from-purple-500 to-cyan-500 transition-all duration-500"
              style={{
                width:
                  `${progress.percentage}%`
              }}
            ></div>

          </div>

          <p className="text-gray-400 text-sm mt-2">

            {progress.completedLessons}
            /
            {progress.totalLessons}
            {" "}
            lessons completed

          </p>

        </div>

        {/* Lessons */}
        <div className="space-y-4">

          {lessons.map((lesson) => (

            <button
              key={lesson.id}
              onClick={() =>
                setCurrentLesson(lesson)
              }
              className={`w-full text-left p-5 rounded-2xl transition border ${
                currentLesson?.id ===
                lesson.id
                  ? "bg-gradient-to-r from-purple-600 to-cyan-500 border-transparent"
                  : "bg-white/5 border-white/10 hover:bg-white/10"
              }`}
            >

              <p className="font-semibold text-lg">

                {lesson.title}

              </p>

            </button>

          ))}

        </div>

      </div>

      {/* Video Section */}
      <div className="flex-1 p-6 md:p-10">

        {currentLesson ? (

          <>

            <h1 className="text-3xl md:text-5xl font-bold mb-8">

              {currentLesson.title}

            </h1>

            {/* Video */}
            <div className="relative w-full aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-2xl">

              <iframe
                width="100%"
                height="100%"
                src={getEmbedUrl(
                  currentLesson.video_url
                )}
                title="Lesson Video"
                frameBorder="0"
                allowFullScreen
                className="absolute inset-0"
              ></iframe>

            </div>

            {/* Actions */}
            <div className="mt-8 flex gap-4">

              <button
                onClick={markComplete}
                className="bg-gradient-to-r from-purple-600 to-cyan-500 px-8 py-4 rounded-2xl font-semibold hover:scale-[1.02] transition"
              >

                Mark As Completed

              </button>

            </div>

            {/* Info */}
            <div className="mt-8 bg-white/5 border border-white/10 rounded-3xl p-6">

              <h2 className="text-2xl font-bold mb-4">

                Lesson Overview

              </h2>

              <p className="text-gray-400 leading-8">

                Watch this lesson carefully and continue learning through the complete course journey.

              </p>

            </div>

          </>

        ) : (

          <div className="flex items-center justify-center h-full text-2xl text-gray-500">

            No lessons available.

          </div>

        )}

      </div>

    </div>
  );
}

export default LearningPage;