const db = require("../database/db");

// Get All Submissions For Instructor
const getInstructorSubmissions =
(req, res) => {

    try {

        const instructor_id =
            req.user.id;

        db.all(
            `
            SELECT
                submissions.id,
                submissions.student_id,
                assignments.course_id,
                submissions.submission_text,
                submissions.submitted_at,

                assignments.title
                AS assignment_title,

                users.name
                AS student_name,

                users.email
                AS student_email,

                courses.title
                AS course_title

            FROM submissions

            INNER JOIN assignments
            ON submissions.assignment_id =
            assignments.id

            INNER JOIN users
            ON submissions.student_id =
            users.id

            INNER JOIN courses
            ON assignments.course_id =
            courses.id

            WHERE courses.instructor_id = ?

            ORDER BY submissions.id DESC
            `,
            [instructor_id],
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
    getInstructorSubmissions
};