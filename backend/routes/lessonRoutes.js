const express = require("express");

const router = express.Router();

const {
    verifyToken,
    authorizeRoles
} = require("../middleware/authMiddleware");

const {
    createLesson,
    getLessonsByCourse
} = require("../controllers/lessonController");

// Create Lesson
router.post(
    "/",
    verifyToken,
    authorizeRoles("instructor"),
    createLesson
);

// Get Lessons By Course
router.get(
    "/:courseId",
    verifyToken,
    getLessonsByCourse
);

module.exports = router;