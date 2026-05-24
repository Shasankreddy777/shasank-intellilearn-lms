const db = require("../database/db");

// Create Assignment
const createAssignment = (req, res) => {

    try {

        const {
            course_id,
            title,
            description,
            due_date
        } = req.body;

        // Validation
        if (
            !course_id ||
            !title ||
            !description
        ) {

            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });

        }

        db.run(
            `
            INSERT INTO assignments
            (
                course_id,
                title,
                description,
                due_date
            )
            VALUES (?, ?, ?, ?)
            `,
            [
                course_id,
                title,
                description,
                due_date
            ],
            function (err) {

                if (err) {

                    return res.status(500).json({
                        success: false,
                        message: err.message
                    });

                }

                res.status(201).json({
                    success: true,
                    message: "Assignment created successfully",
                    assignmentId: this.lastID
                });

            }
        );

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// Get Assignments
const getAssignments = (req, res) => {

    try {

        const user = req.user;

        // STUDENT → only enrolled course assignments
        if (user.role === "student") {

            db.all(
                `
                SELECT
                    assignments.*,
                    courses.title AS course_title
                FROM assignments

                INNER JOIN courses
                ON assignments.course_id = courses.id

                INNER JOIN enrollments
                ON enrollments.course_id = courses.id

                WHERE enrollments.student_id = ?
                `,
                [user.id],
                (err, assignments) => {

                    if (err) {

                        return res.status(500).json({
                            success: false,
                            message: err.message
                        });

                    }

                    res.status(200).json({
                        success: true,
                        totalAssignments:
                            assignments.length,
                        assignments
                    });

                }
            );

        }

        // INSTRUCTOR → all assignments
        else {

            db.all(
                `
                SELECT
                    assignments.*,
                    courses.title AS course_title
                FROM assignments

                LEFT JOIN courses
                ON assignments.course_id = courses.id
                `,
                [],
                (err, assignments) => {

                    if (err) {

                        return res.status(500).json({
                            success: false,
                            message: err.message
                        });

                    }

                    res.status(200).json({
                        success: true,
                        totalAssignments:
                            assignments.length,
                        assignments
                    });

                }
            );

        }

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

module.exports = {
    createAssignment,
    getAssignments
};