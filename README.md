# 🧠 AI Assignment Checker

An AI-powered platform for automating assignment checking, submission tracking, and grading for teachers and students.

🚀 **Live Demo**: [https://ai-assigment-checker-rho.vercel.app](https://ai-assigment-checker-rho.vercel.app)

---

## 📚 Features

### 👩‍🏫 Teachers
- Create classes and assignments
- Upload assignment attachments
- View student submissions
- Automatically evaluate assignments with AI
- Assign grades and feedbacks

### 👨‍🎓 Students
- Sign up and join classes using a class code
- Submit assignments with multiple file support
- View feedback and grades

---

## 🌐 Routes Overview

### 🧾 Auth Routes
| Path | Component |
|------|-----------|
| `/auth/signup` | Signup Page |
| `/auth/signin` | Signin Page |

---

### 👨‍🏫 Teacher Routes
| Path | Description |
|------|-------------|
| `/teacher` | Dashboard |
| `/teacher/class/:class_id` | View Class Details |
| `/teacher/class/:class_id/assignment/create` | Create Assignment |
| `/teacher/class/:class_id/submission` | View Submissions |
| `/teacher/class/:class_id/student/:student_id` | Student Submission View |
| `/teacher/student/:student_id/submission/:submission_id` | AI Grading Interface |

---

### 👨‍🎓 Student Routes
| Path | Description |
|------|-------------|
| `/student` | Dashboard |
| `/student/class/:class_id` | View Class |
| `/student/class/:class_id/assignment/:assignment_id` | Submit/View Assignment |

---

## 🔌 API Endpoints

### 🧑‍🏫 Teacher APIs
- `POST /signupTeacher` - Register Teacher
- `POST /loginTeacher` - Login Teacher
- `POST /assignment` - Create Assignment
- `POST /assignmentAttachments/:assignment_id` - Upload Attachments
- `GET /assignments/:class_id` - Get Assignments by Class
- `GET /submissions/:assignment_id` - Get Submissions
- `GET /assignmentAttachments/:assignment_id` - Get Attachments

### 👨‍🎓 Student APIs
- `POST /signupStudent` - Register Student
- `POST /loginStudent` - Login Student
- `POST /class/join` - Join Class
- `POST /class/assignment/:assignment_id/submissions` - Upload Submissions
- `GET /class` - Get Joined Classes
- `GET /class/:class_id` - Get Class Info
- `GET /class/assignments/:class_id` - Get Assignments
- `GET /class/assignment/:assignment_id/submissions` - Get Student Submissions

---

## ⚙️ Tech Stack

- **Frontend**: React, Vite, redux
- **Backend**: Node.js, Express.js,python Fastapi
- **AI**: Language Model-based Evaluation gemini flash 2.5
- **Database**: PostgreSQL / SupaBase
- **Cloud**: AWS (Backend), Vercel (Frontend)
- **Others**: Docker, Redis, BullMQ, Multer,nginx, 

---

## 📥 Local Setup

Clone and run both backend and frontend locally using Docker:

set up env
```bash
# Clone the repo
git clone https://github.com/your-username/ai-assignment-checker.git
cd ai-assignment-checker

# Setup backend
cd backend
npm install
docker-compose up

# Setup frontend
cd ../frontend
npm install
npm run dev
