const express = require("express");

const router = express.Router();

const {
    verifyToken,
    authorizeRoles
} = require("../middleware/authMiddleware");

const {
    markLessonComplete,
    getCourseProgress
} = require("../controllers/progressController");

// Mark Lesson Complete
router.post(
    "/complete",
    verifyToken,
    authorizeRoles("student"),
    markLessonComplete
);

// Get Course Progress
router.get(
    "/:courseId",
    verifyToken,
    authorizeRoles("student"),
    getCourseProgress
);

module.exports = router;