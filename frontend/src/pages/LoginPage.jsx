import { useState } from "react";

import { motion } from "framer-motion";

import toast from "react-hot-toast";

import {
  useNavigate,
  Link,
} from "react-router-dom";

import API from "../services/api";

function LoginPage() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  // Handle input changes
  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  // Login
  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      const response = await API.post(
        "/auth/login",
        formData
      );

      // Save token
      localStorage.setItem(
        "token",
        response.data.token
      );

      // Save user
      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      toast.success("Login successful");

      // Redirect based on role
      if (response.data.user.role === "student") {

        navigate("/student-dashboard");

      } else {

        navigate("/instructor-dashboard");

      }

      window.location.reload();

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Login failed"
      );

    } finally {

      setLoading(false);

    }

  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-dark px-4">

      <motion.form
        onSubmit={handleLogin}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-10 shadow-glow"
      >

        <h2 className="text-4xl font-bold text-center mb-4 bg-gradient-to-r from-purple-400 to-cyan-300 bg-clip-text text-transparent">

          Welcome Back

        </h2>

        <p className="text-center text-cyan-300 mb-8 text-lg font-medium">

          Shasank IntelliLearn

        </p>

        <div className="space-y-5">

          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="w-full bg-black/30 border border-white/10 rounded-xl px-5 py-4 text-white outline-none focus:border-purple-500"
          />

          {/* Password */}
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full bg-black/30 border border-white/10 rounded-xl px-5 py-4 text-white outline-none focus:border-cyan-500"
          />

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-600 to-cyan-500 py-4 rounded-xl font-semibold hover:scale-[1.02] transition"
          >

            {loading
              ? "Logging in..."
              : "Login"}

          </button>

          {/* Register Link */}
          <p className="text-center text-gray-400 mt-6">

            Don't have an account?

            <Link
              to="/register"
              className="text-cyan-400 ml-2 hover:underline"
            >
              Register
            </Link>

          </p>

        </div>

      </motion.form>

    </div>
  );
}

export default LoginPage;