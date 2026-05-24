const express = require("express");

const cors = require("cors");

require("dotenv").config();

require("./database/initDB");

// Routes
const authRoutes =
require("./routes/authRoutes");

const courseRoutes =
require("./routes/courseRoutes");

const enrollmentRoutes =
require("./routes/enrollmentRoutes");

const assignmentRoutes =
require("./routes/assignmentRoutes");

const studentRoutes =
require("./routes/studentRoutes");

const lessonRoutes =
require("./routes/lessonRoutes");

const progressRoutes =
require("./routes/progressRoutes");

const submissionRoutes =
require("./routes/submissionRoutes");

const certificateRoutes =
require("./routes/certificateRoutes");

const instructorSubmissionRoutes =
require("./routes/instructorSubmissionRoutes");

const app = express();

// Middleware
app.use(cors());

app.use(express.json());

// Home Route
app.get("/", (req, res) => {

    res.send("Smart LMS Backend Running");

});

// API Routes
app.use("/api/auth", authRoutes);

app.use("/api/courses", courseRoutes);

app.use("/api/enroll", enrollmentRoutes);

app.use("/api/assignments", assignmentRoutes);

app.use("/api/students", studentRoutes);

app.use("/api/lessons", lessonRoutes);

app.use("/api/progress", progressRoutes);

app.use("/api/submissions", submissionRoutes);

app.use("/api/certificates", certificateRoutes);

app.use(
    "/api/instructor-submissions",
    instructorSubmissionRoutes
);

// Server
const PORT =
process.env.PORT || 5000;

app.listen(PORT, () => {

    console.log(
        `Server running on port ${PORT}`
    );

});