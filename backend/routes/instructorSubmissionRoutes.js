const express = require("express");

const router = express.Router();

const {
    verifyToken,
    authorizeRoles
} = require("../middleware/authMiddleware");

const {
    getInstructorSubmissions
} = require(
    "../controllers/instructorSubmissionController"
);

// Get Instructor Submissions
router.get(
    "/",
    verifyToken,
    authorizeRoles("instructor"),
    getInstructorSubmissions
);

module.exports = router;