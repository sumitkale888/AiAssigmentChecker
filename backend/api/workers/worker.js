const { Worker } = require('bullmq');
const Redis = require('ioredis');

require('dotenv').config();

// Redis connection
const connection = new Redis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  maxRetriesPerRequest: null, 
});

// Create BullMQ Worker
const assignmentWorker = new Worker(
  'assignments',
  async job => {
    console.log(`Processing Job ID: ${job.id}`);
    console.log(`Student: ${job.data.studentId} | Assignment: ${job.data.assignmentId}`);

    // Here you’d run your AI grading, plagiarism check, etc.
    await new Promise(resolve => setTimeout(resolve, 3000)); // Simulate time-consuming task

    console.log(`Finished processing Job ID: ${job.id}`);
  },
  { connection }
);

assignmentWorker.on('completed', job => {
  console.log(`Job ${job.id} completed!`);
});