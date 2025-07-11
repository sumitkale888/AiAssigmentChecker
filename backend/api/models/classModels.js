const {pool} = require('./database')
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

module.exports = {
  createClass,
  studentClass,
  submissionUpload
};

