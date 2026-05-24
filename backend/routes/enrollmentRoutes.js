const express = require("express");

const router = express.Router();

const {
    verifyToken,
    authorizeRoles
} = require("../middleware/authMiddleware");

const {
    enrollCourse,
    getStudentAnalytics,
    getEnrolledCourses
} = require("../controllers/enrollmentController");

// Enroll in course
router.post(
    "/",
    verifyToken,
    authorizeRoles("student"),
    enrollCourse
);

// Student analytics
router.get(
    "/analytics",
    verifyToken,
    authorizeRoles("student"),
    getStudentAnalytics
);

// Get enrolled courses
router.get(
    "/my-courses",
    verifyToken,
    authorizeRoles("student"),
    getEnrolledCourses
);

module.exports = router;