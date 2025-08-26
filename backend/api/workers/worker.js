require('dotenv').config();

const { createGrade } = require('../models/classModels');
const {getContext} = require("../models/teacherModels")

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
    // data[0].file_link 
    console.log("job data: ",data);  

    const assignmentText = await extractor.extractText({ input: data[0].file_link, type: 'url' })
    console.log("assignmentText",assignmentText)
    const context = await getContext(data[0].assignment_id);
    console.log("context|",context )
    const  response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: assignmentText,
      config: {
              systemInstruction: `You are an assignment checker. Your task is to review and provide feedback on student assignments.
              You have to grade the assignment on a scale of 0 to points mensioned and provide feedback.
              The output should be in the following JSON format:
              make this json short and to the point.
              {
                "grade": 8,
                "correction":{
                            1:{
                            wrongAns:"2+2=9",
                            correctAns="2+2=4",
                            explanation = "2+2 is 4 or any explanation "
                            },
                            2:{
                            wrongAns:"answer which is wrong",
                            correctAns="correct answer",
                            explanation = "explanation of answer"
                            },
                          }
                if no correction "correction" :{1:{"null"}}           
                "feedback": "The assignment is well-structured and covers the main points, but could benefit from more detailed examples.",
                "suggestions": "Consider adding more examples to support your arguments and improve clarity.",
                "strengths": "The assignment demonstrates a good understanding of the topic and is well-organized.",
                "weaknesses": "Some sections lack depth and could be expanded upon.",
                "improvementAreas": "Focus on providing more detailed explanations and examples in future assignments."
              }

              The feedback should be constructive and helpful for the student to improve their work.
              You will also be given an evaluation criteria which you must follow while grading:
               ${context}
              `,
      },
    });
  console.log("response",response.text)
    const regex = /\{[\s\S]*?\}/;
    const match = response.text.match(regex);

    if (match) {
      const jsonResponse = JSON.parse(match[0]);
      console.log(jsonResponse);

      const feedback = jsonResponse|| "No feedback provided";
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
