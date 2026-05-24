const db = require("../database/db");

// Create Lesson
const createLesson = (req, res) => {

    try {

        const {
            course_id,
            title,
            video_url
        } = req.body;

        // Validation
        if (
            !course_id ||
            !title ||
            !video_url
        ) {

            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });

        }

        db.run(
            `
            INSERT INTO lessons
            (
                course_id,
                title,
                video_url
            )
            VALUES (?, ?, ?)
            `,
            [
                course_id,
                title,
                video_url
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
                    message: "Lesson created successfully",
                    lessonId: this.lastID
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

// Get Lessons By Course
const getLessonsByCourse = (req, res) => {

    try {

        const { courseId } = req.params;

        db.all(
            `
            SELECT *
            FROM lessons
            WHERE course_id = ?
            ORDER BY id ASC
            `,
            [courseId],
            (err, lessons) => {

                if (err) {

                    return res.status(500).json({
                        success: false,
                        message: err.message
                    });

                }

                res.status(200).json({
                    success: true,
                    totalLessons:
                        lessons.length,
                    lessons
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
    createLesson,
    getLessonsByCourse
};