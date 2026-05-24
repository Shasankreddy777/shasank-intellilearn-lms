const db = require("../database/db");

// Create Course
const createCourse = (req, res) => {

    try {

        const {
            title,
            description,
            category,
            difficulty,
            thumbnail
        } = req.body;

        const instructor_id = req.user.id;

        // Validation
        if (
            !title ||
            !description ||
            !category ||
            !difficulty
        ) {

            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });

        }

        db.run(
            `
            INSERT INTO courses
            (
                title,
                description,
                category,
                difficulty,
                thumbnail,
                instructor_id
            )
            VALUES (?, ?, ?, ?, ?, ?)
            `,
            [
                title,
                description,
                category,
                difficulty,
                thumbnail || "",
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
                    message: "Course created successfully",
                    courseId: this.lastID
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

// Get All Courses
const getAllCourses = (req, res) => {

    try {

        db.all(
            `
            SELECT
                courses.*,
                users.name AS instructor_name
            FROM courses

            LEFT JOIN users
            ON courses.instructor_id = users.id

            ORDER BY courses.created_at DESC
            `,
            [],
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

// Instructor Analytics
const getInstructorAnalytics = (req, res) => {

    try {

        const instructor_id = req.user.id;

        db.get(
            `
            SELECT COUNT(*) AS totalCourses
            FROM courses
            WHERE instructor_id = ?
            `,
            [instructor_id],
            (err, courseData) => {

                if (err) {

                    return res.status(500).json({
                        success: false,
                        message: err.message
                    });

                }

                db.get(
                    `
                    SELECT COUNT(*) AS totalStudents
                    FROM enrollments

                    INNER JOIN courses
                    ON enrollments.course_id = courses.id

                    WHERE courses.instructor_id = ?
                    `,
                    [instructor_id],
                    (err, studentData) => {

                        if (err) {

                            return res.status(500).json({
                                success: false,
                                message: err.message
                            });

                        }

                        const totalCourses =
                            courseData.totalCourses;

                        const totalStudents =
                            studentData.totalStudents;

                        // Simulated Revenue
                        const revenue =
                            totalStudents * 999;

                        res.status(200).json({
                            success: true,
                            analytics: {
                                totalCourses,
                                totalStudents,
                                revenue
                            }
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

module.exports = {
    createCourse,
    getAllCourses,
    getInstructorAnalytics
};