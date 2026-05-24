# Shasank IntelliLearn LMS

A full-stack Smart Learning Management System (LMS) built using ReactJS, Node.js, Express, and SQLite.

## Live Demo

Frontend:
https://shasank-intellilearn-lms.vercel.app/

Backend:
https://shasank-intellilearn-backend.onrender.com

GitHub Repository:
https://github.com/Shasankreddy777/shasank-intellilearn-lms

---

# Features

## Student Features
- Register/Login
- Enroll in courses
- Track lesson progress
- Submit assignments
- View certificates
- Responsive dashboard

## Instructor Features
- Create courses
- Add lessons
- Create assignments
- Review student submissions
- Issue certificates

## Admin Features
- Role-based authentication
- Secure API routes
- Progress tracking

---

# Tech Stack

## Frontend
- ReactJS
- Tailwind CSS
- Axios
- Framer Motion
- Recharts

## Backend
- Node.js
- Express.js
- SQLite

## Deployment
- Frontend: Vercel
- Backend: Render

---

# Demo Credentials

## Instructor
Email:
instructor@test.com

Password:
123456

## Student
Email:
student@test.com

Password:
123456

---

# Installation Setup

## Backend Setup

```bash
cd backend
npm install
node server.js
```

## Frontend Setup

```bash
cd frontend
npm install
npm start
```

---

# Environment Variables

Backend `.env`

```env
JWT_SECRET=shasanksecretkey
```

---

# API Endpoints

## Authentication
- POST /api/auth/register
- POST /api/auth/login

## Courses
- GET /api/courses
- POST /api/courses

## Enrollment
- POST /api/enroll
- GET /api/enroll/my-courses

## Progress
- GET /api/progress/:courseId
- POST /api/progress/complete

## Assignments
- GET /api/assignments
- POST /api/assignments

## Certificates
- POST /api/certificates/issue
- GET /api/certificates/my-certificates

---

# Project Highlights

- Fully responsive UI
- SQLite database integration
- Role-based authentication
- Certificate generation workflow
- Assignment submission system
- Course progress tracking
- Production deployment

---

# Author

Shasank Reddy
