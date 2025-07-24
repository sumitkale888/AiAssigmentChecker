const {pool} = require('./database')
const Redis= require('ioredis')
///////////////////////// CREATE MODELS //////////////////////
createClass = async (classData, res) => {
  const {
    class_name,
    section,
    subject,
    room,
    description,
    uploaded_photo_url,
    teacher_id
  } = classData;

  // Generate joining code
  const joining_code = Math.random().toString(36).substring(2, 10);

  if (!teacher_id) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const query = `
    INSERT INTO classes (
      class_name, section, subject, room, description, joining_code, uploaded_photo_url, teacher_id
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING *
  `;

  const values = [
    class_name ?? null,
    section ?? null,
    subject ?? null,
    room ?? null,
    description ?? null,
    joining_code,              
    uploaded_photo_url ?? null,
    teacher_id                
  ];

  try {
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error('Error creating class:', error);
    throw error;
  }
};

studentClass = async (classData, res) => {
  const { class_id, student_id } = classData;

  if (!class_id || !student_id) {
    return res.status(400).json({ error: 'Class ID and Student ID are required' });
  }
  

  const query = `
    INSERT INTO class_students (class_id, student_id)
    VALUES ($1, $2)
    RETURNING *
  `;

  const values = [class_id, student_id];

  try {
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error('Error enrolling student in class:', error);
    throw error;
  }
};

joinClass = async(joining_code, student_id) => {
  // Find class_id from joining_code
  const classQuery = `
    SELECT class_id FROM classes WHERE joining_code = $1
  `;
  const classResult = await pool.query(classQuery, [joining_code]);
  if (classResult.rows.length === 0) {
    throw new Error('Invalid joining code');
  }
  const class_id = classResult.rows[0].class_id;

  const query = `
    INSERT INTO class_students (class_id, student_id)
    VALUES ($1, $2)
    RETURNING *
  `;

  const values = [class_id, student_id];

  try {
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error('Error enrolling student in class:', error);
    throw error;
  }
};

submissionUpload = async (fileData) => {
  const {file_link,file_original_name,student_id,assignment_id} = fileData;

  const query = `
    INSERT INTO submissions (
      file_link, file_original_name, student_id, assignment_id
    ) VALUES ($1, $2, $3, $4)
    RETURNING *
  `;

  const values = [
    file_link,
    file_original_name,
    student_id,
    assignment_id
  ];

  try {
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error('Error uploading assignment files:', error);
    throw error;
  }
};

createAssigment = async (assignmentData) => {
  const {
  deadline,
  evalution_guideline,
  title,
  description,
  points,
  class_id,
  } = assignmentData;
    if (!class_id && !title) {
    throw new Error('Class ID and Title are required');
  }

  const query = `
    INSERT INTO assignments (
      deadline, evaluation_guideline, title, description, points, class_id
    ) VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *
  `;

  const values = [
    deadline ?? null,
    evalution_guideline ?? null,
    title ,
    description ?? null,
    points ?? null,
    class_id
  ];

  try {
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error('Error creating assignment:', error);
    throw error;
  }
};

createAssignments_attachments = async (attachmentData) => {
  const {file_link, file_original_name,assignment_id} = attachmentData;

  const query = `
    INSERT INTO assignments_attachments (
      file_link, file_original_name, assignment_id
    ) VALUES ($1, $2, $3)
    RETURNING *
  `;

  const values = [
    file_link,
    file_original_name,
    assignment_id
  ];

  try {
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error('Error creating assignment attachment:', error);
    throw error;
  }
}


// | [
// -- api-1       |   {
// -- api-1       |     file_link: 'files-1752915371760-879088583.docx',
// -- api-1       |     student_id: 3,
// -- api-1       |     submission_id: 107,
// -- api-1       |     evaluation_guideline: null
// -- api-1       |   }
// -- api-1       | ]

createGrade = async (evaluationData) => {
  console.log('Creating grade with data:');
  const { obtained_grade, student_id, feedback, submission_id } = evaluationData;
  console.log('Creating grade:', obtained_grade, student_id, feedback, submission_id);
  const query = `
    INSERT INTO grades (
       obtained_grade, student_id, feedback, submission_id
    ) VALUES ($1, $2, $3, $4)
    RETURNING *
  `;

  const values = [
    obtained_grade,
    student_id,
    feedback,
    submission_id
  ];

  try {
    const result = await pool.query(query, values);
    console.log('Grade created:', result.rows[0]);
    return result.rows[0];
  } catch (error) {
    console.error('Error creating evaluation:', error);
    throw error;
  }
}


///////////////////////////GET MODLELS///////////////////////////

getClassByTeacher_id = async (teacher_id)=>{
  const query = `
    SELECT * FROM classes WHERE teacher_id = $1
  `;

  try {
    const result = await pool.query(query, [teacher_id]);
    return result.rows;
  } catch (error) {
    console.error('Error fetching classes by teacher ID:', error);
    throw error;
  }
}

getClassInfoByClass_id = async (class_id) => {
  const query = `
    SELECT * FROM classes WHERE class_id = $1
  `;

  try {
    const result = await pool.query(query, [class_id]);
    return result.rows[0];
  } catch (error) {
    console.error('Error fetching class info by class ID:', error);
    throw error;
  }
}


getAssignmentsByClass_id = async (class_id) => {
  const query = `
    SELECT * FROM assignments WHERE class_id = $1
  `;

  try {
    const result = await pool.query(query, [class_id]);
    console.log(result)
    return result.rows;
  } catch (error) {
    console.error('Error fetching assignments by class ID:', error);
    throw error;
  }
}
getAssignments_attachmentsByAssignment_id = async (assignment_id) => {
  const query = `
    SELECT * FROM assignments_attachments WHERE assignment_id = $1
  `;

  try {
    const result = await pool.query(query, [assignment_id]);
    return result.rows;
  } catch (error) {
    console.error('Error fetching assignment attachments:', error);
    throw error;
  }
}
getSubmissionsByAssignment_id = async (assignment_id) => {
  const query = `
    SELECT * FROM submissions WHERE assignment_id = $1
  `;

  try {
    const result = await pool.query(query, [assignment_id]);
    return result.rows;
  } catch (error) {
    console.error('Error fetching submissions by assignment ID:', error);
    throw error;
  }
}

getGradesByStudent_id = async (student_id) => {
  const query = `
    SELECT * FROM grades WHERE student_id = $1
  `;

  try {
    const result = await pool.query(query, [student_id]);
    return result.rows;
  } catch (error) {
    console.error('Error fetching grades by student ID:', error);
    throw error;
  }
}

getGradesByAssignment_id = async (assignment_id) => {
  const query = `
    SELECT * FROM grades WHERE assignment_id = $1
  `;

  try {
    const result = await pool.query(query, [assignment_id]);
    return result.rows;
  } catch (error) {
    console.error('Error fetching grades by assignment ID:', error);
    throw error;
  }
}


getSubmissionAndEvaluation = async(submission_id)=>{
  const query = `
SELECT file_link,student_id,submission_id,evaluation_guideline
FROM submissions
INNER JOIN assignments ON submissions.assignment_id = assignments.assignment_id
WHERE submissions.submission_id = $1
  `

  try{
    const result = await pool.query(query,[submission_id]);
    console.log(result.rows)
    return result.rows;

  }catch(error){
        console.error('Error  getSubmissionAndEvaluation:', error);
    throw error;
  }
  
}


module.exports = {
  createClass,
  studentClass,
  joinClass,
  submissionUpload,
  createAssigment,
  createAssignments_attachments,
  createGrade,

  getClassByTeacher_id,
  getClassInfoByClass_id,
  getAssignmentsByClass_id,
  getAssignments_attachmentsByAssignment_id,
  getSubmissionsByAssignment_id,
  getGradesByAssignment_id,
  getGradesByStudent_id,
  getSubmissionAndEvaluation

};

