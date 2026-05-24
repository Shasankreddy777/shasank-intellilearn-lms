const express = require("express");

const router = express.Router();

const {
    verifyToken,
    authorizeRoles
} = require("../middleware/authMiddleware");

const db = require("../database/db");

// Get instructor students
router.get(
    "/instructor/students",
    verifyToken,
    authorizeRoles("instructor"),
    (req, res) => {

        try {

            const instructor_id =
                req.user.id;

            db.all(
                `
                SELECT
                    users.id,
                    users.name,
                    users.email,
                    courses.title AS course_title

                FROM enrollments

                INNER JOIN users
                ON enrollments.student_id = users.id

                INNER JOIN courses
                ON enrollments.course_id = courses.id

                WHERE courses.instructor_id = ?
                `,
                [instructor_id],
                (err, students) => {

                    if (err) {

                        return res.status(500).json({
                            success: false,
                            message: err.message
                        });

                    }

                    res.status(200).json({
                        success: true,
                        totalStudents:
                            students.length,
                        students
                    });

                }
            );

        } catch (error) {

            res.status(500).json({
                success: false,
                message: error.message
            });

        }

    }
);

module.exports = router;