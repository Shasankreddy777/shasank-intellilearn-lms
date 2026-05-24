const db = require("../database/db");

// Issue Certificate
const issueCertificate =
(req, res) => {

    try {

        const instructor_id =
            req.user.id;

        const {
            student_id,
            course_id
        } = req.body;

        // Validation
        if (
            !student_id ||
            !course_id
        ) {

            return res.status(400).json({
                success: false,
                message:
                    "All fields are required"
            });

        }

        // Prevent duplicate certificate
        db.get(
            `
            SELECT *
            FROM certificates
            WHERE student_id = ?
            AND course_id = ?
            `,
            [
                student_id,
                course_id
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
                        message:
                            "Certificate already issued"
                    });

                }

                // Insert certificate
                db.run(
                    `
                    INSERT INTO certificates
                    (
                        student_id,
                        course_id,
                        issued_by
                    )
                    VALUES (?, ?, ?)
                    `,
                    [
                        student_id,
                        course_id,
                        instructor_id
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
                            message:
                                "Certificate issued successfully"
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

// Get Student Certificates
const getMyCertificates =
(req, res) => {

    try {

        const student_id =
            req.user.id;

        db.all(
            `
            SELECT
                certificates.*,
                courses.title
                AS course_title

            FROM certificates

            INNER JOIN courses
            ON certificates.course_id =
            courses.id

            WHERE certificates.student_id = ?

            ORDER BY certificates.id DESC
            `,
            [student_id],
            (err, certificates) => {

                if (err) {

                    return res.status(500).json({
                        success: false,
                        message: err.message
                    });

                }

                res.status(200).json({
                    success: true,
                    certificates
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
    issueCertificate,
    getMyCertificates
};