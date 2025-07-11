const {studentClass,submissionUpload} = require('../models/classModels')
const upload= require('../services/myMulter')
handleJoinClasses = async (req, res) => {
  try {
    const classData = req.body;
    const studentId = req.user.student_id; // Assuming user info is attached to request by auth middleware
    if (!studentId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    
    const newClass = await studentClass({ ...classData, student_id: studentId });
    res.status(201).json(newClass);
  } catch (error) {
    console.error('Error joining class:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}



handleSubmissionUpload = async (req, res) => {
  const files = req.files
  if (!files || files.length === 0) {
    return res.status(400).json({ error: 'No files uploaded' });
  }
  for (const file of files) {
    await submissionUpload({
      file_link:file.filename, 
      file_original_name:file.originalname, 
      student_id: req.user.student_id, 
      assignment_id: req.params.assignment_id
    });
  }

  res.json({
    message: 'Files uploaded successfully!',
    files: req.files 
  });
}

handleCreateAssigment = async(req,res)=>{
  const newAssignment  = await createAssigment(req.body);
  if (!newAssignment) {
    return res.status(400).json({ error: 'Failed to create assignment' });
  }
}

handleAssigmnets_attachments = async(req,res)=>{
  const files = req.files;
  if (!files || files.length === 0) {
    return res.status(400).json({ error: 'No files uploaded' });
  }


  for (const file of files) {
    await createAssignments_attachments({
      file_link:file.filename, 
      file_original_name:file.originalname, 
      assignment_id: req.params.assignment_id
    });
  }

  res.json({
    message: 'Files uploaded successfully!',
    files: req.files 
  });
}
///////////////////////////////////
/////////////////////////////////////
// GET 




module.exports = {
  handleJoinClasses,
  handleSubmissionUpload,
  handleCreateAssigment,
  handleAssigmnets_attachments
}