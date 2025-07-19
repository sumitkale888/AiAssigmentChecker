require('dotenv').config();
const express = require('express');
const { Queue } = require('bullmq');
const Redis = require('ioredis');

const cors  = require('cors')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');


const app = express();
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Redis connection
const connection = new Redis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  maxRetriesPerRequest: null, 
});


const allowedOrigins = [
  'http://localhost',
  'https://myfrontend.com',
  'https://another-frontend.netlify.app',
  'https://schoolmanagementsystem-1-i1d8.onrender.com',
  'https://school-management-system-black-one.vercel.app',
  'https://school-management-system-git-main-parthakadam2007s-projects.vercel.app',
  'https://school-management-system-black-one.vercel.app',
  'http://localhost:5173',
  'http://localhost:80',
  'http://localhost',

];

app.use(cors({
  origin:allowedOrigins,
   credentials: true
}))
app.use(cookieParser());
app.use(bodyParser.json())

app.use(express.json()); // ✅ parses JSON
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

const {authMiddleware}= require('./middleware/authMiddleware');

const authRoutes = require('./routes/authRoute');
const teacherRoutes = require('./routes/teacherRoutes');
const classRoutes = require('./routes/classRoutes');
app.use('/api/auth', authRoutes);
app.use('/api/teacher', authMiddleware('teacher'), teacherRoutes);
app.use('/api/class', authMiddleware('student'), classRoutes);
//TESTING
// app.use('/api/teacher', teacherRoutes);
// app.use('/api/class', classRoutes);

// Create BullMQ queue
const assignmentQueue = new Queue('assignments', { connection });

// Test endpoint: enqueue a job
// app.post('/api/check-assignment', async (req, res) => {
//   const { studentId, assignmentId } = req.body;
//   const job = await assignmentQueue.add('evaluate', { studentId, assignmentId });
//   res.json({ obId: job.id, status: 'Queued for AI evaluation' });
// });

// Simple health check
app.get('/api/health', (req, res) => {
  res.send('API is healtdsdhy asf new!sasasas  again!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API running on port ${PORT}`);
});