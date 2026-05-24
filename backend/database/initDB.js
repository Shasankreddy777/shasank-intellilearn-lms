const sqlite3 =
require("sqlite3").verbose();

const path = require("path");

// Database Path
const dbPath = path.join(
    __dirname,
    "lms.db"
);

// Connect Database
const db = new sqlite3.Database(
    dbPath,
    (err) => {

        if (err) {

            console.log(
                "Database Connection Error:",
                err.message
            );

        } else {

            console.log(
                "Connected to SQLite database"
            );

        }

    }
);

// USERS TABLE
db.run(
    `
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        role TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
`
);

// COURSES TABLE
db.run(
    `
    CREATE TABLE IF NOT EXISTS courses (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        category TEXT NOT NULL,
        difficulty TEXT NOT NULL,
        thumbnail TEXT,
        instructor_id INTEGER,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

        FOREIGN KEY (instructor_id)
        REFERENCES users(id)
    )
`
);

// ENROLLMENTS TABLE
db.run(
    `
    CREATE TABLE IF NOT EXISTS enrollments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        student_id INTEGER,
        course_id INTEGER,
        enrolled_at DATETIME DEFAULT CURRENT_TIMESTAMP,

        FOREIGN KEY (student_id)
        REFERENCES users(id),

        FOREIGN KEY (course_id)
        REFERENCES courses(id)
    )
`
);

// ASSIGNMENTS TABLE
db.run(
    `
    CREATE TABLE IF NOT EXISTS assignments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        course_id INTEGER,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        due_date TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

        FOREIGN KEY (course_id)
        REFERENCES courses(id)
    )
`
);

// LESSONS TABLE
db.run(
    `
    CREATE TABLE IF NOT EXISTS lessons (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        course_id INTEGER,
        title TEXT NOT NULL,
        video_url TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

        FOREIGN KEY (course_id)
        REFERENCES courses(id)
    )
`
);

// PROGRESS TABLE
db.run(
    `
    CREATE TABLE IF NOT EXISTS progress (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        student_id INTEGER,
        lesson_id INTEGER,
        completed INTEGER DEFAULT 0,
        completed_at DATETIME DEFAULT CURRENT_TIMESTAMP,

        FOREIGN KEY (student_id)
        REFERENCES users(id),

        FOREIGN KEY (lesson_id)
        REFERENCES lessons(id)
    )
`
);

// SUBMISSIONS TABLE
db.run(
    `
    CREATE TABLE IF NOT EXISTS submissions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        assignment_id INTEGER,
        student_id INTEGER,
        submission_text TEXT,
        submitted_at DATETIME DEFAULT CURRENT_TIMESTAMP,

        FOREIGN KEY (assignment_id)
        REFERENCES assignments(id),

        FOREIGN KEY (student_id)
        REFERENCES users(id)
    )
`
);

// CERTIFICATES TABLE
db.run(
    `
    CREATE TABLE IF NOT EXISTS certificates (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        student_id INTEGER,
        course_id INTEGER,
        issued_by INTEGER,
        issued_at DATETIME DEFAULT CURRENT_TIMESTAMP,

        FOREIGN KEY (student_id)
        REFERENCES users(id),

        FOREIGN KEY (course_id)
        REFERENCES courses(id),

        FOREIGN KEY (issued_by)
        REFERENCES users(id)
    )
`
);

console.log(
    "Database tables initialized"
);

module.exports = db;