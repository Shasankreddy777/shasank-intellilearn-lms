const db = require("../database/db");

// Mark Lesson Complete
const markLessonComplete = (req, res) => {

    try {

        const student_id =
            req.user.id;

        const { lesson_id } =
            req.body;

        // Validation
        if (!lesson_id) {

            return res.status(400).json({
                success: false,
                message: "Lesson ID is required"
            });

        }

        // Check if already completed
        db.get(
            `
            SELECT *
            FROM progress
            WHERE student_id = ?
            AND lesson_id = ?
            `,
            [
                student_id,
                lesson_id
            ],
            (err, existing) => {

                if (err) {

                    return res.status(500).json({
                        success: false,
                        message: err.message
                    });

                }

                // Already completed
                if (existing) {

                    return res.status(200).json({
                        success: true,
                        message: "Lesson already completed"
                    });

                }

                // Insert Progress
                db.run(
                    `
                    INSERT INTO progress
                    (
                        student_id,
                        lesson_id,
                        completed
                    )
                    VALUES (?, ?, ?)
                    `,
                    [
                        student_id,
                        lesson_id,
                        1
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
                            message: "Lesson marked as completed"
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

// Get Course Progress
const getCourseProgress = (req, res) => {

    try {

        const student_id =
            req.user.id;

        const { courseId } =
            req.params;

        // Total Lessons
        db.get(
            `
            SELECT COUNT(*) AS totalLessons
            FROM lessons
            WHERE course_id = ?
            `,
            [courseId],
            (err, lessonData) => {

                if (err) {

                    return res.status(500).json({
                        success: false,
                        message: err.message
                    });

                }

                // Completed Lessons
                db.get(
                    `
                    SELECT COUNT(*) AS completedLessons
                    FROM progress

                    INNER JOIN lessons
                    ON progress.lesson_id = lessons.id

                    WHERE progress.student_id = ?
                    AND lessons.course_id = ?
                    `,
                    [
                        student_id,
                        courseId
                    ],
                    (err, progressData) => {

                        if (err) {

                            return res.status(500).json({
                                success: false,
                                message: err.message
                            });

                        }

                        const totalLessons =
                            lessonData.totalLessons;

                        const completedLessons =
                            progressData.completedLessons;

                        const percentage =
                            totalLessons > 0
                            ? Math.round(
                                (completedLessons /
                                totalLessons) * 100
                              )
                            : 0;

                        res.status(200).json({
                            success: true,
                            progress: {
                                totalLessons,
                                completedLessons,
                                percentage
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
    markLessonComplete,
    getCourseProgress
};