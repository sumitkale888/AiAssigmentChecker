require('dotenv').config();

const { createGrade } = require('../models/classModels');

const { readFile } = require('node:fs/promises');
const { getTextExtractor } = require('office-text-extractor');
const path = require('path');
const extractor = getTextExtractor();

const { GoogleGenAI } = require("@google/genai");

// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({});

const { Worker } = require('bullmq');
const Redis = require('ioredis');

// Redis connection
const connection = new Redis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  maxRetriesPerRequest: null,
});
console.log(process.env.REDIS_HOST,
  process.env.REDIS_PORT,
)

// Create BullMQ Worker
const assignmentWorker = new Worker(
  'assignments',
  async (job) => {
    const data = job.data;
    console.log(
      `job data: ${JSON.stringify(job.data)}, current dir: ${path.join(
        process.cwd(),
        'uploads',
        data[0].file_link
      )}`
    );
    // const uploadPath = path.join(process.cwd(), 'uploads', data[0].file_link);

    // const text = await extractor.extractText({ input: data[0].file_link, type: 'file' });
    const text =`
    
    Here are 10 simple math questions for practice:

5 + 3 = ?

12 − 7 = ?

4 × 6 = ?

18 ÷ 3 = ?

9 + 10 = ?

15 − 9 = ?

7 × 2 = ?

20 ÷ 5 = ?

3 + 8 = ?

6 × 5 = ?
    
    `
    console.log("text",text)

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: text,
      config: {
              systemInstruction: `You are an assignment checker. Your task is to review and provide feedback on student assignments.
              You have to grade the assignment on a scale of 1 to 10 and provide feedback.
              The output should be in the following JSON format:

              {
                "grade": 8,
                "feedback": "The assignment is well-structured and covers the main points, but could benefit from more detailed examples.",
                "suggestions": "Consider adding more examples to support your arguments and improve clarity.",
                "strengths": "The assignment demonstrates a good understanding of the topic and is well-organized.",
                "weaknesses": "Some sections lack depth and could be expanded upon.",
                "improvementAreas": "Focus on providing more detailed explanations and examples in future assignments."
              }

              The feedback should be constructive and helpful for the student to improve their work.
              You will also be given an evaluation criteria which you must follow while grading:
              ${data[0]?.evaluation_guideline}`,
      },
    });
  console.log("response",response.text)
    const regex = /\{[\s\S]*?\}/;
    const match = response.text.match(regex);

    if (match) {
      const jsonResponse = JSON.parse(match[0]);
      console.log(jsonResponse);

      const feedback = jsonResponse.feedback || "No feedback provided";
      const rawGrade = jsonResponse.grade;
      let grade = parseInt(rawGrade);
      if (isNaN(grade)) {
        grade = 0;
      }

      console.log(`Feedback: ${feedback}, Grade: ${grade}, Submission ID: ${data[0].submission_id}`);

      await createGrade({
        obtained_grade: grade,
        student_id: data[0].student_id,
        feedback: feedback,
        submission_id: data[0].submission_id
      });

    } else {
      console.log("No JSON found in response!");
    }

  },
  { connection }
);

assignmentWorker.on('completed', (job) => {
  console.log(`Job ${job.id} completed!`);
});
