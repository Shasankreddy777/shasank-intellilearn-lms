const express = require("express");

const router = express.Router();

const {
    verifyToken,
    authorizeRoles
} = require("../middleware/authMiddleware");

const {
    createAssignment,
    getAssignments
} = require("../controllers/assignmentController");

// Get Assignments
router.get(
    "/",
    verifyToken,
    getAssignments
);

// Create Assignment
router.post(
    "/",
    verifyToken,
    authorizeRoles("instructor"),
    createAssignment
);

module.exports = router;