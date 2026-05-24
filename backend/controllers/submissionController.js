const db = require("../database/db");

// Submit Assignment
const submitAssignment = (req, res) => {

    try {

        const student_id =
            req.user.id;

        const {
            assignment_id,
            submission_text
        } = req.body;

        // Validation
        if (
            !assignment_id ||
            !submission_text
        ) {

            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });

        }

        // Check existing submission
        db.get(
            `
            SELECT *
            FROM submissions
            WHERE assignment_id = ?
            AND student_id = ?
            `,
            [
                assignment_id,
                student_id
            ],
            (err, existing) => {

                if (err) {

                    return res.status(500).json({
                        success: false,
                        message: err.message
                    });

                }

                if (existing) {

                    return res.status(400).json({
                        success: false,
                        message: "Assignment already submitted"
                    });

                }

                // Insert submission
                db.run(
                    `
                    INSERT INTO submissions
                    (
                        assignment_id,
                        student_id,
                        submission_text
                    )
                    VALUES (?, ?, ?)
                    `,
                    [
                        assignment_id,
                        student_id,
                        submission_text
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
                            message: "Assignment submitted successfully",
                            submissionId: this.lastID
                        });

                    }
                );

            }
        );

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// Get Student Submissions
const getMySubmissions = (req, res) => {

    try {

        const student_id =
            req.user.id;

        db.all(
            `
            SELECT
                submissions.*,
                assignments.title AS assignment_title

            FROM submissions

            INNER JOIN assignments
            ON submissions.assignment_id = assignments.id

            WHERE submissions.student_id = ?

            ORDER BY submissions.id DESC
            `,
            [student_id],
            (err, submissions) => {

                if (err) {

                    return res.status(500).json({
                        success: false,
                        message: err.message
                    });

                }

                res.status(200).json({
                    success: true,
                    totalSubmissions:
                        submissions.length,
                    submissions
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

module.exports = {
    submitAssignment,
    getMySubmissions
};