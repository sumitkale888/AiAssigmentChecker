///////////////////PUT Endpoints///////////////////////////////
const { studentClass, submissionUpload, createAssignments_attachments, createAssigment, getSubmissionAndEvaluation, joinClass } = require('../models/classModels')
const upload = require('../services/myMulter')
const Redis = require('ioredis');
const { Queue } = require('bullmq');

require('dotenv').config();

// handleJoinClasses = async (req, res) => {
//   try {
//     const classData = req.body;
//     const studentId = req.user.student_id; // Assuming user info is attached to request by auth middleware
//     if (!studentId) {
//       return res.status(401).json({ error: 'Unauthorized' });
//     }

//     const newClass = await studentClass({ ...classData, student_id: studentId });
//     res.status(201).json(newClass);
//   } catch (error) {
//     console.error('Error joining class:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// }
handleJoinClasses = async (req, res) => {
  try {
    const studentId = req.user.student_id;
    const { joining_code } = req.body
    if (!studentId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    if (!joining_code) {
      return res.status(400).json({ error: 'Joining code is required' });
    }
    const newClass = await joinClass(joining_code, studentId);
    res.status(201).json(newClass);
  }
  catch (err) {
    console.error('Error joining class:', err);
    res.status(500).json({ error: err });

  }
}

// ===============================
// 1️ Imports and Setup
// ===============================
const { createClient } = require('@supabase/supabase-js');

// --- Supabase Setup ---
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
const bucketName = 'test-bucket'; // Make sure this bucket exists in Supabase

// --- BullMQ Queue Setup ---
const connection = {
  host: process.env.REDIS_HOST || 'localhost',
  port: process.env.REDIS_PORT || 6379
};
const assignmentQueue = new Queue('assignments', { connection });



// ===============================
// 2️ Controller Function
// ===============================
const handleSubmissionUpload = async (req, res) => {
  const files = req.files;

  if (!files || files.length === 0) {
    return res.status(400).json({ error: 'No files uploaded' });
  }

  try {
    let uploadedFiles = [];

    for (const file of files) {
      const fileName = `${Date.now()}-${file.originalname}`;

      // 1️ Upload file buffer to Supabase Storage
      const { data, error } = await supabase
        .storage
        .from(bucketName)
        .upload(fileName, file.buffer, {
          contentType: file.mimetype,
          upsert: false // prevent overwriting
        });

      if (error) throw error;

      // 2️ Generate a signed URL (private & time-limited)
      const { data: signedUrlData, error: signedUrlError } =
        await supabase
          .storage
          .from(bucketName)
          .createSignedUrl(fileName, 60 * 60); // 1 hour expiry

      if (signedUrlError) throw signedUrlError;

      const fileUrl = signedUrlData.signedUrl;

      // 3️ Save metadata in your database
      const response = await submissionUpload({
        file_link: fileUrl,
        file_original_name: file.originalname,
        student_id: req.user.student_id,
        assignment_id: req.params.assignment_id
      });

      // 4️ Fetch submission + evaluation data
      const submissionEvaluation = await getSubmissionAndEvaluation(response.submission_id);

      console.log("submissionEvaluation", JSON.stringify(submissionEvaluation));

      // 5️ Add evaluation job to queue
      await assignmentQueue.add('evaluate', submissionEvaluation);

      uploadedFiles.push(file.originalname);
    }

    // 6️ Send success response
    res.json({
      message: 'Files uploaded to Supabase and queued for evaluation!',
      files: uploadedFiles
    });

  } catch (error) {
    console.error('Supabase upload error:', error);
    res.status(500).json({ error: 'File upload failed' });
  }
};


handleCreateAssigment = async (req, res) => {
  const newAssignment = await createAssigment(req.body);
  res.status(201).json(newAssignment);
  if (!newAssignment) {
    return res.status(400).json({ error: 'Failed to create assignment' });
  }
}







const handleAssignments_attachments = async (req, res) => {
  const files = req.files;

  if (!files || files.length === 0) {
    return res.status(400).json({ error: 'No files uploaded' });
  }

  try {
    const uploadedFiles = [];

    for (const file of files) {
      // Generate unique file name (in "attachments" folder)
      const fileName = `attachments/${Date.now()}-${file.originalname}`;

      // 1️⃣ Upload file to Supabase Storage
      const { data, error } = await supabase
        .storage
        .from(bucketName)
        .upload(fileName, file.buffer, {
          contentType: file.mimetype,
          upsert: false, // prevent overwriting existing files
        });

      if (error) throw error;

      // 2️⃣ Create signed URL (so attachments are private but accessible for a limited time)
      const { data: signedUrlData, error: signedUrlError } =
        await supabase.storage
          .from(bucketName)
          .createSignedUrl(fileName, 60 * 60); // 1 hour expiry

      if (signedUrlError) throw signedUrlError;

      const fileUrl = signedUrlData.signedUrl;

      // 3️⃣ Save metadata in DB
      await createAssignments_attachments({
        file_link: fileUrl,
        file_original_name: file.originalname,
        assignment_id: req.params.assignment_id,
      });

      uploadedFiles.push(file.originalname);
    }

    // ✅ Send response
    res.json({
      message: 'Files uploaded to Supabase successfully!',
      files: uploadedFiles,
    });

  } catch (error) {
    console.error('Attachment upload failed:', error.message);
    res.status(500).json({ error: 'File upload failed' });
  }
};

/////////////////GET Endpointsc//////////////////////////////

const { getClassByTeacher_id, getAssignmentsByClass_id, getAssignments_attachmentsByAssignment_id, getSubmissionsByAssignment_id, getGradesByAssignment_id, getGradesByStudent_id, getClassInfoByClass_id } = require('../models/classModels');

// handleGetClassByTeacher_id = async(req,res)=>{
//   const teacher_id = req.user.teacher_id; // Assuming user info is attached to request by auth middleware
//   if (!teacher_id) {
//     return res.status(401).json({ error: 'Unauthorized' });
//   }

//   const classes = await getClassByTeacher_id(teacher_id);
//   res.json(classes);
// }

handleGetClassInfoByClass_id = async (req, res) => {
  const class_id = req.params.class_id;
  if (!class_id) {
    return res.status(400).json({ error: 'Class ID is required' });
  }

  const classInfo = await getClassInfoByClass_id(class_id);
  if (!classInfo) {
    return res.status(404).json({ error: 'Class not found' });
  }

  res.json(classInfo);
}


handleGetAssignmentsByClass_id = async (req, res) => {
  const class_id = req.params.class_id;

  try {
    if (!class_id) {
      return res.status(400).json({ error: 'Class ID is required' });
    }

    const assignments = await getAssignmentsByClass_id(class_id);
    res.json(assignments);
  } catch (error) {
    res.status(500).json({ error: error })
  }


}

handleGetAssignments_attachmentsByAssignment_id = async (req, res) => {
  const assignment_id = req.params.assignment_id;
  if (!assignment_id) {
    return res.status(400).json({ error: 'Assignment ID is required' });
  }

  const attachments = await getAssignments_attachmentsByAssignment_id(assignment_id);
  if (!attachments) {
    return res.status(404).json({ error: 'No attachments found for this assignment' });
  }

  const attachmentsWithLinks = attachments.map(attachment => ({
    ...attachment,
    file_link: `${attachment.file_link}`
  }));

  res.json(attachmentsWithLinks);
}

handleGetSubmissionsByAssignment_id = async (req, res) => {
  const assignment_id = req.params.assignment_id;
  if (!assignment_id) {
    return res.status(400).json({ error: 'Assignment ID is required' });
  }

  const submissions = await getSubmissionsByAssignment_id(assignment_id);
  res.json(submissions);
}

handleGetGradesByAssignment_id = async (req, res) => {
  const assignment_id = req.params.assignment_id;
  if (!assignment_id) {
    return res.status(400).json({ error: 'Assignment ID is required' });
  }

  const grades = await getGradesByAssignment_id(assignment_id);
  res.json(grades);
}

handleGetGradesByStudent_id = async (req, res) => {
  const student_id = req.user.student_id; // Assuming user info is attached to request by auth middleware
  if (!student_id) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const grades = await getGradesByStudent_id(student_id);
  res.json(grades);
}


module.exports = {
  handleJoinClasses,

  handleSubmissionUpload,
  handleCreateAssigment,
  handleAssignments_attachments,

  handleGetClassInfoByClass_id,
  handleGetAssignmentsByClass_id,
  handleGetAssignments_attachmentsByAssignment_id,
  handleGetSubmissionsByAssignment_id,
  handleGetGradesByAssignment_id,
  handleGetGradesByStudent_id
}