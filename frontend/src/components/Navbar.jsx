import {
  GraduationCap,
  LogOut,
  Menu,
  X
} from "lucide-react";

import {
  Link,
  useNavigate
} from "react-router-dom";

import { useState } from "react";

function Navbar() {

  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] =
    useState(false);

  const user =
    JSON.parse(localStorage.getItem("user"));

  // Logout
  const handleLogout = () => {

    localStorage.removeItem("token");

    localStorage.removeItem("user");

    navigate("/");

    window.location.reload();

  };

  return (
    <nav className="w-full bg-black/20 backdrop-blur-lg border-b border-white/10 sticky top-0 z-50">

      <div className="flex items-center justify-between px-6 md:px-10 py-5">

        {/* Logo */}
        <Link
          to="/courses"
          className="flex items-center gap-3"
        >

          <div className="bg-gradient-to-r from-purple-500 to-cyan-400 p-2 rounded-xl">

            <GraduationCap size={24} />

          </div>

          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-300 bg-clip-text text-transparent">

            Shasank IntelliLearn

          </h1>

        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6 text-gray-300">

          <Link
            to="/courses"
            className="hover:text-white transition"
          >
            Courses
          </Link>

          <Link
            to="/assignments"
            className="hover:text-white transition"
          >
            Assignments
          </Link>

          {/* Student Dashboard */}
          {user?.role === "student" && (

            <Link
              to="/student-dashboard"
              className="hover:text-white transition"
            >
              Dashboard
            </Link>

          )}

          {/* Instructor Dashboard */}
          {user?.role === "instructor" && (

            <Link
              to="/instructor-dashboard"
              className="hover:text-white transition"
            >
              Dashboard
            </Link>

          )}

          {/* Login */}
          {!user && (

            <Link
              to="/"
              className="bg-gradient-to-r from-purple-600 to-cyan-500 px-5 py-2 rounded-xl font-medium hover:scale-105 transition"
            >
              Login
            </Link>

          )}

          {/* User */}
          {user && (

            <div className="flex items-center gap-4">

              {/* Avatar */}
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-cyan-500 flex items-center justify-center font-bold text-white">

                {user.name?.charAt(0)}

              </div>

              {/* Name */}
              <span className="text-white font-medium">

                {user.name}

              </span>

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="bg-red-500/20 border border-red-500/30 p-2 rounded-xl hover:bg-red-500/30 transition"
              >

                <LogOut size={18} />

              </button>

            </div>

          )}

        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() =>
            setMenuOpen(!menuOpen)
          }
          className="md:hidden text-white"
        >

          {menuOpen
            ? <X size={28} />
            : <Menu size={28} />}

        </button>

      </div>

      {/* Mobile Menu */}
      {menuOpen && (

        <div className="md:hidden px-6 pb-6 flex flex-col gap-5 text-gray-300">

          <Link
            to="/courses"
            onClick={() =>
              setMenuOpen(false)
            }
            className="hover:text-white transition"
          >
            Courses
          </Link>

          <Link
            to="/assignments"
            onClick={() =>
              setMenuOpen(false)
            }
            className="hover:text-white transition"
          >
            Assignments
          </Link>

          {/* Student Dashboard */}
          {user?.role === "student" && (

            <Link
              to="/student-dashboard"
              onClick={() =>
                setMenuOpen(false)
              }
              className="hover:text-white transition"
            >
              Dashboard
            </Link>

          )}

          {/* Instructor Dashboard */}
          {user?.role === "instructor" && (

            <Link
              to="/instructor-dashboard"
              onClick={() =>
                setMenuOpen(false)
              }
              className="hover:text-white transition"
            >
              Dashboard
            </Link>

          )}

          {/* Login */}
          {!user && (

            <Link
              to="/"
              onClick={() =>
                setMenuOpen(false)
              }
              className="bg-gradient-to-r from-purple-600 to-cyan-500 px-5 py-3 rounded-xl font-medium text-center"
            >
              Login
            </Link>

          )}

          {/* User */}
          {user && (

            <div className="flex items-center justify-between mt-4">

              <div className="flex items-center gap-3">

                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-cyan-500 flex items-center justify-center font-bold text-white">

                  {user.name?.charAt(0)}

                </div>

                <span className="text-white font-medium">

                  {user.name}

                </span>

              </div>

              <button
                onClick={handleLogout}
                className="bg-red-500/20 border border-red-500/30 p-2 rounded-xl"
              >

                <LogOut size={18} />

              </button>

            </div>

          )}

        </div>

      )}

    </nav>
  );
}

export default Navbar;