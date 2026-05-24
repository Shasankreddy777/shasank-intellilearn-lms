import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import { Toaster } from "react-hot-toast";

import Navbar from "./components/Navbar";

import ProtectedRoute from "./components/ProtectedRoute";

import LoginPage from "./pages/LoginPage";

import RegisterPage from "./pages/RegisterPage";

import CoursesPage from "./pages/CoursesPage";

import StudentDashboard from "./pages/StudentDashboard";

import InstructorDashboard from "./pages/InstructorDashboard";

import AssignmentsPage from "./pages/AssignmentsPage";

import LearningPage from "./pages/LearningPage";

function App() {

  return (
    <BrowserRouter>

      <div className="min-h-screen bg-dark text-white">

        <Toaster position="top-right" />

        <Navbar />

        <Routes>

          {/* Public Routes */}
          <Route
            path="/"
            element={<LoginPage />}
          />

          <Route
            path="/register"
            element={<RegisterPage />}
          />

          <Route
            path="/courses"
            element={<CoursesPage />}
          />

          {/* Assignments */}
          <Route
            path="/assignments"
            element={
              <ProtectedRoute
                allowedRoles={[
                  "student",
                  "instructor"
                ]}
              >

                <AssignmentsPage />

              </ProtectedRoute>
            }
          />

          {/* Student Dashboard */}
          <Route
            path="/student-dashboard"
            element={
              <ProtectedRoute
                allowedRoles={["student"]}
              >

                <StudentDashboard />

              </ProtectedRoute>
            }
          />

          {/* Instructor Dashboard */}
          <Route
            path="/instructor-dashboard"
            element={
              <ProtectedRoute
                allowedRoles={["instructor"]}
              >

                <InstructorDashboard />

              </ProtectedRoute>
            }
          />

          {/* Learning Page */}
          <Route
            path="/learn/:courseId"
            element={
              <ProtectedRoute
                allowedRoles={[
                  "student",
                  "instructor"
                ]}
              >

                <LearningPage />

              </ProtectedRoute>
            }
          />

        </Routes>

      </div>

    </BrowserRouter>
  );
}

export default App;