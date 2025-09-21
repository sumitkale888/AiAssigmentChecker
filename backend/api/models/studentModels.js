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
    SELECT students.student_id, first_name, last_name, email, url_dp
    FROM students
    INNER JOIN class_students 
      ON students.student_id = class_students.student_id
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





/////////////////Analytics PageModels////////////

const getOverallAttendanceAnalytics = async (student_id, period = 'current-month') => {
  // Determine date range based on period
  let dateCondition = '';
  let dateParams = [student_id];
  
  switch(period) {
    case 'current-month':
      dateCondition = `AND a.date >= date_trunc('month', CURRENT_DATE)`;
      break;
    case 'last-month':
      dateCondition = `AND a.date >= date_trunc('month', CURRENT_DATE - INTERVAL '1 month') 
                       AND a.date < date_trunc('month', CURRENT_DATE)`;
      break;
    case 'semester':
      // Adjust this based on your semester definition
      dateCondition = `AND a.date >= CURRENT_DATE - INTERVAL '6 months'`;
      break;
    default:
      dateCondition = '';
  }
  
  const query = `
    SELECT 
      -- Total attended classes
      COUNT(a.attendance_id) FILTER (WHERE a.status = 'Present') AS attended_classes,
      -- Total missed classes
      COUNT(a.attendance_id) FILTER (WHERE a.status = 'Absent') AS missed_classes,
      -- Total classes with attendance taken
      COUNT(a.attendance_id) AS total_classes_with_attendance,
      -- Total classes enrolled (regardless of attendance taken)
      COUNT(DISTINCT cs.class_id) AS total_enrolled_classes,
      -- Classes that have had attendance taken
      COUNT(DISTINCT CASE WHEN a.attendance_id IS NOT NULL THEN cs.class_id END) AS classes_with_attendance
    FROM class_students cs
    LEFT JOIN attendance a 
      ON a.class_id = cs.class_id 
      AND a.student_id = cs.student_id
      ${dateCondition}
    WHERE cs.student_id = $1
  `;
  
  try {
    const { rows } = await pool.query(query, [student_id]);
    const data = rows[0];
    
    // Calculate percentages only for classes that have attendance records
    const attendancePercentage = data.total_classes_with_attendance > 0 
      ? (data.attended_classes / data.total_classes_with_attendance) * 100 
      : 0;
    
    return {
      attended: parseInt(data.attended_classes) || 0,
      missed: parseInt(data.missed_classes) || 0,
      total_classes: parseInt(data.total_classes_with_attendance) || 0,
      enrolled_classes: parseInt(data.total_enrolled_classes) || 0,
      classes_with_attendance: parseInt(data.classes_with_attendance) || 0,
      percentage: parseFloat(attendancePercentage.toFixed(1))
    };
  } catch (error) {
    console.error('Error in getOverallAttendanceAnalytics:', error);
    throw error;
  }
};

const getPerformanceAnalytics = async (student_id, period = 'current-semester') => {
  // Determine date range based on period
  let dateCondition = '';
  
  switch(period) {
    case 'current-semester':
      dateCondition = `AND a.created_date >= CURRENT_DATE - INTERVAL '6 months'`;
      break;
    case 'last-semester':
      dateCondition = `AND a.created_date >= CURRENT_DATE - INTERVAL '12 months' 
                       AND a.created_date < CURRENT_DATE - INTERVAL '6 months'`;
      break;
    case 'all-time':
      dateCondition = '';
      break;
    default:
      dateCondition = `AND a.created_date >= CURRENT_DATE - INTERVAL '6 months'`;
  }
  
  const query = `
    SELECT 
      c.class_id,
      c.class_name,
      c.subject,
      COUNT(DISTINCT a.assignment_id) AS total_assignments,
      COUNT(DISTINCT s.submission_id) AS submitted_assignments,
      COALESCE(AVG(g.obtained_grade), 0) AS average_grade,
      MAX(g.obtained_grade) AS highest_grade,
      MIN(g.obtained_grade) AS lowest_grade
    FROM class_students cs
    JOIN classes c ON c.class_id = cs.class_id
    LEFT JOIN assignments a ON a.class_id = c.class_id ${dateCondition}
    LEFT JOIN submissions s ON s.assignment_id = a.assignment_id AND s.student_id = cs.student_id
    LEFT JOIN grades g ON g.submission_id = s.submission_id
    WHERE cs.student_id = $1
    GROUP BY c.class_id, c.class_name, c.subject
    HAVING COUNT(DISTINCT a.assignment_id) > 0
    ORDER BY c.subject;
  `;
  
  try {
    const { rows } = await pool.query(query, [student_id]);
    
    // Calculate class average for each subject
    const classAveragesQuery = `
      SELECT 
        c.subject,
        COALESCE(AVG(g.obtained_grade), 0) AS class_average
      FROM classes c
      JOIN assignments a ON a.class_id = c.class_id ${dateCondition}
      JOIN submissions s ON s.assignment_id = a.assignment_id
      JOIN grades g ON g.submission_id = s.submission_id
      GROUP BY c.subject
    `;
    
    const classAveragesResult = await pool.query(classAveragesQuery);
    const classAverages = {};
    classAveragesResult.rows.forEach(row => {
      classAverages[row.subject] = parseFloat(row.class_average);
    });
    
    return {
      studentPerformance: rows.map(row => ({
        subject: row.subject || row.class_name,
        studentScore: parseFloat(row.average_grade) || 0,
        classAverage: classAverages[row.subject] || classAverages[row.class_name] || 0,
        totalAssignments: parseInt(row.total_assignments) || 0,
        submittedAssignments: parseInt(row.submitted_assignments) || 0
      })),
      summary: {
        overallAverage: rows.length > 0 ? 
          rows.reduce((sum, row) => sum + parseFloat(row.average_grade), 0) / rows.length : 0,
        totalClasses: rows.length,
        completedAssignments: rows.reduce((sum, row) => sum + parseInt(row.submitted_assignments), 0),
        totalAssignments: rows.reduce((sum, row) => sum + parseInt(row.total_assignments), 0)
      }
    };
  } catch (error) {
    console.error('Error in getPerformanceAnalytics:', error);
    throw error;
  }
};


const getRecentTestFeedback = async (student_id, limit = 3) => {
  const query = `
    SELECT 
      g.grade_id,
      g.obtained_grade,
      COALESCE(g.feedback, '') as feedback,
      COALESCE(g.corrections, '') as corrections,
      COALESCE(g.suggestions, '') as suggestions,
      COALESCE(g.weaknesses, '') as weaknesses,
      COALESCE(g.improvementAreas, '') as improvementAreas,
      a.title AS assignment_title,
      COALESCE(a.description, '') AS assignment_description,
      c.class_name,
      c.subject,
      g.submission_id,
      s.submission_date
    FROM grades g
    JOIN submissions s ON s.submission_id = g.submission_id
    JOIN assignments a ON a.assignment_id = s.assignment_id
    JOIN classes c ON c.class_id = a.class_id
    WHERE s.student_id = $1 
      AND (
        g.feedback IS NOT NULL OR 
        g.corrections IS NOT NULL OR 
        g.suggestions IS NOT NULL OR 
        g.weaknesses IS NOT NULL OR 
        g.improvementAreas IS NOT NULL
      )
    ORDER BY s.submission_date DESC
    LIMIT $2
  `;
  
  try {
    const { rows } = await pool.query(query, [student_id, limit]);
    
    return rows.map(row => ({
      grade_id: row.grade_id,
      obtained_grade: row.obtained_grade,
      feedback: row.feedback,
      corrections: row.corrections,
      suggestions: row.suggestions,
      weaknesses: row.weaknesses,
      improvementAreas: row.improvementAreas,
      assignment_title: row.assignment_title,
      assignment_description: row.assignment_description,
      class_name: row.class_name,
      subject: row.subject,
      submission_date: row.submission_date
    }));
  } catch (error) {
    console.error('Error in getRecentTestFeedback:', error);
    throw error;
  }
};


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
  getAttendanceByStudentAndClass,

  //analytics
  getOverallAttendanceAnalytics,
  getPerformanceAnalytics,
  getRecentTestFeedback

};

