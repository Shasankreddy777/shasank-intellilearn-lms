const db = require("../database/db");

// Enroll student
const enrollCourse = (req, res) => {

    try {

        const student_id = req.user.id;

        const { course_id } = req.body;

        // Validation
        if (!course_id) {

            return res.status(400).json({
                success: false,
                message: "Course ID is required"
            });

        }

        // Check already enrolled
        db.get(
            `
            SELECT * FROM enrollments
            WHERE student_id = ?
            AND course_id = ?
            `,
            [student_id, course_id],
            (err, existingEnrollment) => {

                if (err) {

                    return res.status(500).json({
                        success: false,
                        message: err.message
                    });

                }

                if (existingEnrollment) {

                    return res.status(400).json({
                        success: false,
                        message: "Already enrolled in this course"
                    });

                }

                // Insert enrollment
                db.run(
                    `
                    INSERT INTO enrollments
                    (student_id, course_id)
                    VALUES (?, ?)
                    `,
                    [student_id, course_id],
                    function (err) {

                        if (err) {

                            return res.status(500).json({
                                success: false,
                                message: err.message
                            });

                        }

                        res.status(201).json({
                            success: true,
                            message: "Enrolled successfully",
                            enrollmentId: this.lastID
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

// Student Dashboard Analytics
const getStudentAnalytics = (req, res) => {

    try {

        const student_id = req.user.id;

        db.get(
            `
            SELECT COUNT(*) AS enrolledCourses
            FROM enrollments
            WHERE student_id = ?
            `,
            [student_id],
            (err, courseData) => {

                if (err) {

                    return res.status(500).json({
                        success: false,
                        message: err.message
                    });

                }

                const enrolledCourses =
                    courseData.enrolledCourses;

                // Smart progress calculation
                let progress =
                    enrolledCourses * 20;

                if (progress > 100) {
                    progress = 100;
                }

                let certificates = 0;

                if (progress >= 100) {
                    certificates = 1;
                }

                res.status(200).json({
                    success: true,
                    analytics: {
                        enrolledCourses,
                        progress,
                        certificates
                    }
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

// Get Enrolled Courses
const getEnrolledCourses = (req, res) => {

    try {

        const student_id = req.user.id;

        db.all(
            `
            SELECT
                courses.*,
                users.name AS instructor_name
            FROM enrollments

            INNER JOIN courses
            ON enrollments.course_id = courses.id

            LEFT JOIN users
            ON courses.instructor_id = users.id

            WHERE enrollments.student_id = ?
            `,
            [student_id],
            (err, courses) => {

                if (err) {

                    return res.status(500).json({
                        success: false,
                        message: err.message
                    });

                }

                res.status(200).json({
                    success: true,
                    totalCourses: courses.length,
                    courses
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
    enrollCourse,
    getStudentAnalytics,
    getEnrolledCourses
};