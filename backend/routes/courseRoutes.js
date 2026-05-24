const express = require("express");

const router = express.Router();

const {
    verifyToken,
    authorizeRoles
} = require("../middleware/authMiddleware");

const {
    createCourse,
    getAllCourses,
    getInstructorAnalytics
} = require("../controllers/courseController");

// Get All Courses
router.get("/", getAllCourses);

// Instructor Analytics
router.get(
    "/instructor/analytics",
    verifyToken,
    authorizeRoles("instructor"),
    getInstructorAnalytics
);

// Create Course
router.post(
    "/",
    verifyToken,
    authorizeRoles("instructor", "admin"),
    createCourse
);

module.exports = router;