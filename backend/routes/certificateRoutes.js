const express = require("express");

const router = express.Router();

const {
    verifyToken,
    authorizeRoles
} = require("../middleware/authMiddleware");

const {
    issueCertificate,
    getMyCertificates
} = require(
    "../controllers/certificateController"
);

// Instructor issues certificate
router.post(
    "/issue",
    verifyToken,
    authorizeRoles("instructor"),
    issueCertificate
);

// Student views certificates
router.get(
    "/my-certificates",
    verifyToken,
    authorizeRoles("student"),
    getMyCertificates
);

module.exports = router;