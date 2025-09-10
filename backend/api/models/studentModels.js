const { pool, bcrypt } = require('./database');

////////////POST MODULES/////////////////////////
createStudent = async (studentData) => {
  const { first_name, last_name, email, password } = studentData;
  const hashedPassword = await bcrypt.hash(password, 10);
  const query = 'INSERT INTO students (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING *';
  const values = [first_name, last_name, email, hashedPassword];

  try {
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error('Error creating student:', error);
    throw error;
  }

}


getClassInfoByStudentId = async (student_id) => {
  const query = `
    SELECT 
      t.first_name || ' ' || t.last_name AS teacher_name,
      c.class_id,
      c.class_name,
      c.section,
      c.subject,
      c.room,
      c.description,
      c.uploaded_photo_url
    FROM 
      class_students cs
    JOIN 
      classes c ON c.class_id = cs.class_id
    JOIN 
      teachers t ON c.teacher_id = t.teacher_id
    WHERE 
      cs.student_id = $1;

  `
  try {
    const result = await pool.query(query, [student_id]);
    return result.rows;

  } catch (error) {
    console.error('Error fetching student by email:', error);
    throw error;
  }
}

getStudentByEmail = async (email) => {
  const query = 'SELECT * FROM students WHERE email = $1';

  try {
    const result = await pool.query(query, [email]);
    return result.rows[0];
  } catch (error) {
    console.error('Error fetching student by email:', error);
    throw error;
  }
}

getClass_idByStudent_id = async (student_id) => {
  const query = `
    SELECT class_id FROM class_students WHERE student_id = $1
  `;

  try {
    const result = await pool.query(query, [student_id]);
    return result.rows;
  } catch (error) {
    console.error('Error fetching class ID from student ID:', error);
    throw error;
  }
}

getStudentsByClass_id = async (class_id) => {
  const query = `
    SELECT first_name, last_name, email, url_dp
    FROM students
    INNER JOIN class_students ON students.student_id = class_students.student_id
    WHERE class_students.class_id = $1
  `;

  try {
    const result = await pool.query(query, [class_id]);
    return result.rows;
  } catch (error) {
    console.error('Error getStudentsByClass_id:', error);
    throw error;
  }
};

getSubmissionsByAssigment_idAndStudent_id = async (student_id,assignmnet_id) => {
  const query = `
    SELECT *
    FROM submissions
    WHERE student_id = $1
    AND assignment_id = $2
  `;

  try {
    const result = await pool.query(query, [student_id,assignmnet_id]);
    return result.rows;
  } catch (error) {
    console.error('Error getSubmissionsByAssigment_idAndStudent_id:', error);
    throw error;
  }
};

getStudentByStudent_id = async (student_id) => {
  const query = 'SELECT first_name , last_name FROM students WHERE student_id = $1';

  try {
    const result = await pool.query(query, [student_id]);
    return result.rows[0];
  } catch (error) {
    console.error('Error fetching student by ID:', error);
    throw error;
  }
};

//shaivi first sample

// Get classes + overall attendance for a student
// 1. Get summary: all classes + attendance %
const getClassesWithAttendanceByStudentId = async (student_id) => {
  const query = `
    SELECT 
      c.class_id,
      c.class_name,
      COUNT(a.attendance_id) AS total_classes,
      COUNT(a.attendance_id) FILTER (WHERE a.status = 'Present') AS present_count
    FROM classes c
    JOIN class_students cs ON cs.class_id = c.class_id
    LEFT JOIN attendance a 
      ON a.class_id = c.class_id AND a.student_id = cs.student_id
    WHERE cs.student_id = $1
    GROUP BY c.class_id, c.class_name
  `;
  const { rows } = await pool.query(query, [student_id]);
  return rows.map(r => ({
    class_id: r.class_id,
    class_name: r.class_name,
    total_classes: r.total_classes,
    present: r.present_count,
    attendance_percentage: r.total_classes > 0
      ? ((r.present_count / r.total_classes) * 100).toFixed(1)
      : 0
  }));
};

// 2. Get detail: date-wise attendance for one class
const getAttendanceByStudentAndClass = async (student_id, class_id) => {
  const query = `
    SELECT a.date, a.status
    FROM attendance a
    WHERE a.student_id = $1 AND a.class_id = $2
    ORDER BY a.date DESC
  `;
  const { rows } = await pool.query(query, [student_id, class_id]);
  return rows;
};


// end shaivi first sample


module.exports = {
  createStudent,
  getStudentByEmail,
  getClass_idByStudent_id,
  getStudentsByClass_id,
  getClassInfoByStudentId,
  getSubmissionsByAssigment_idAndStudent_id,
  getStudentByStudent_id,

  // NEW-shaivi
  getClassesWithAttendanceByStudentId,
  getAttendanceByStudentAndClass

};

