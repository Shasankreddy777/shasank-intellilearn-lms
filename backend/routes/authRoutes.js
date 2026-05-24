const express = require("express");

const router = express.Router();

const {
    registerUser,
    loginUser
} = require("../controllers/authController");

const {
    verifyToken,
    authorizeRoles
} = require("../middleware/authMiddleware");

// Register Route
router.post("/register", registerUser);

// Login Route
router.post("/login", loginUser);

// Protected Profile Route
router.get(
    "/profile",
    verifyToken,
    (req, res) => {

        res.json({
            success: true,
            message: "Protected profile accessed",
            user: req.user
        });

    }
);

// Instructor Only Route
router.get(
    "/instructor-only",
    verifyToken,
    authorizeRoles("instructor"),
    (req, res) => {

        res.json({
            success: true,
            message: "Welcome Instructor"
        });

    }
);

module.exports = router;