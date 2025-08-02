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
- Assign grades and feedback

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

- **Frontend**: React, Vite
- **Backend**: Node.js, Express.js
- **AI**: Language Model-based Evaluation
- **Database**: MongoDB / PostgreSQL (Your choice)
- **Cloud**: Azure (Deployment), Vercel (Frontend Hosting)
- **Others**: BullMQ, Redis, Docker, Multer (File Upload)

---

## 🧠 What I Learned

- Working with multi-role authentication systems
- Managing file uploads with Multer
- Building async job queues using BullMQ and Redis
- Deploying full-stack apps using Docker and Azure
- Integrating AI to evaluate open-ended student responses

---

## 📥 Local Setup
# ============================
# DATABASE CONFIGURATION
# ============================
POSTGRES_USER=your_postgres_user
POSTGRES_PASSWORD=your_postgres_password
POSTGRES_DB=your_postgres_db
DB_HOST=your_db_host
DB_PORT=5432

# Alternatively, use DATABASE_URL (preferred)
DATABASE_URL=postgresql://your_user:your_password@your_host:5432/your_database

# ============================
# EXPRESS / API SERVER CONFIG
# ============================
PORT=8000
NODE_ENV=development

# ============================
# REDIS (BullMQ Queue)
# ============================
REDIS_HOST=localhost
REDIS_PORT=6379
QUEUE_NAME=assignments

# ============================
# SECURITY SECRETS
# ============================
JWT_SECRET=your_jwt_secret_here
SESSION_SECRET=your_session_secret_here

# ============================
# FILE UPLOADS
# ============================
UPLOAD_DIR=/app/uploads

# ============================
# LOGGING
# ============================
LOG_LEVEL=debug

# ============================
# EXTERNAL SERVICES (OPTIONAL)
# ============================
GOOGLE_API_KEY=your_google_api_key_here
GEMINI_API_KEY=your_gemini_api_key_here


```bash
git clone https://github.com/your-username/ai-assignment-checker.git
cd ai-assignment-checker/backend
npm install
docker compose up

cd frontend 
npm install
npm run dev 
