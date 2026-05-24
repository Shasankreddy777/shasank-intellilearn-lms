const express = require("express");

const router = express.Router();

const {
    verifyToken,
    authorizeRoles
} = require("../middleware/authMiddleware");

const {
    submitAssignment,
    getMySubmissions
} = require("../controllers/submissionController");

// Submit Assignment
router.post(
    "/",
    verifyToken,
    authorizeRoles("student"),
    submitAssignment
);

// Get Student Submissions
router.get(
    "/my-submissions",
    verifyToken,
    authorizeRoles("student"),
    getMySubmissions
);

module.exports = router;