///////////////////PUT Endpoints///////////////////////////////
const { studentClass, submissionUpload, createAssignments_attachments, createAssigment, getSubmissionAndEvaluation,joinClass} = require('../models/classModels')
const upload = require('../services/myMulter')
const Redis = require('ioredis');
const { Queue } = require('bullmq');

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

// Redis connectioned
const connection = new Redis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  maxRetriesPerRequest: null,
});
// Create BullMQ queue
const assignmentQueue = new Queue('assignments', { connection });

const { BlobServiceClient } = require('@azure/storage-blob');
const AZURE_STORAGE_CONNECTION_STRING = process.env.AZURE_STORAGE_CONNECTION_STRING;
const containerName = 'uplodeaiassignemntchecker'; // Replace this

const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);
const containerClient = blobServiceClient.getContainerClient(containerName);
handleSubmissionUpload = async (req, res) => {
  const files = req.files;

  if (!files || files.length === 0) {
    return res.status(400).json({ error: 'No files uploaded' });
  }

  try {
    for (const file of files) {
      const blobName = `${Date.now()}-${file.originalname}`;
      const blockBlobClient = containerClient.getBlockBlobClient(blobName);

      // Upload the file buffer to Azure
      await blockBlobClient.uploadData(file.buffer, {
        blobHTTPHeaders: {
          blobContentType: file.mimetype
        }
      });

      const azureBlobUrl = blockBlobClient.url;

      // Save metadata in your DB
      const response = await submissionUpload({
        file_link: azureBlobUrl,
        file_original_name: file.originalname,
        student_id: req.user.student_id,
        assignment_id: req.params.assignment_id
      });

      const submissionEvaluation = await getSubmissionAndEvaluation(response.submission_id);

      await assignmentQueue.add('evaluate', submissionEvaluation);
    }

    res.json({
      message: 'Files uploaded and queued for evaluation!',
      files: files.map(f => f.originalname)
    });

  } catch (error) {
    console.error('Upload error:', error);
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







handleAssignments_attachments = async (req, res) => {
  const files = req.files;

  if (!files || files.length === 0) {
    return res.status(400).json({ error: 'No files uploaded' });
  }

  try {
    for (const file of files) {
      // Unique blob name (can include folders if you want)
      const blobName = `attachments/${Date.now()}-${file.originalname}`;
      const blockBlobClient = containerClient.getBlockBlobClient(blobName);

      // Upload buffer to Azure Blob
      await blockBlobClient.uploadData(file.buffer, {
        blobHTTPHeaders: {
          blobContentType: file.mimetype,
        },
      });

      const azureBlobUrl = blockBlobClient.url;

      // Save metadata to your database
      await createAssignments_attachments({
        file_link: azureBlobUrl,
        file_original_name: file.originalname,
        assignment_id: req.params.assignment_id,
      });
    }

    res.json({
      message: 'Files uploaded successfully!',
      files: files.map(f => f.originalname),
    });

  } catch (error) {
    console.error('Attachment upload failed:', error.message);
    res.status(500).json({ error: 'File upload failed' });
  }
};

/////////////////GET Endpoints///////////////////////////////

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

// handleGetAssignmentsByClass_id = async (req, res) => {
//   const class_id = req.params.class_id;
//   if (!class_id) {
//     return res.status(400).json({ error: 'Class ID is required' });
//   }

//   const classInfo = await getClassById(class_id);
//   if (!classInfo) {
//     return res.status(404).json({ error: 'Class not found' });
//   }

//   res.json(classInfo);
// }

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