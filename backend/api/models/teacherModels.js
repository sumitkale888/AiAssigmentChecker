const {pool,bcrypt} = require('./database')

//////////////////PUT MODELS/////////////////

createTeacher = async (teacherData) => {
  const { first_name, last_name, email, password } = teacherData;
  const hashedPassword = await bcrypt.hash(password, 10);
  const query = 'INSERT INTO teachers (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING *';
  const values = [first_name, last_name, email, hashedPassword];

  try {
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error('Error creating teacher:', error);
    throw error;
  }
}

//Attendence From teacher side

createAttendance = async(class_id , student_id  , status )=>{
  const query = `
    INSERT INTO attendance(class_id, student_id, status)
    VALUES ($1, $2, $3)
    ON CONFLICT (class_id, student_id, date)
    DO UPDATE SET status = EXCLUDED.status
  `;

  const values = [class_id, student_id, status];


  try{
    await pool.query(query,values);
  }catch(error){
    console.error('Error creating student Attendance:', error);
    throw error;
  }

}


//////////////////GET MODELS/////////////////

getTeacherByEmail = async (email) => {
  const query = 'SELECT * FROM teachers WHERE email = $1';
  try {
    const result = await pool.query(query, [email]);
    return result.rows[0];
  } catch (error) {
    console.error('Error fetching teacher by email:', error);
    throw error;
  }
}

getContext =  async(assignment_id)=>{
  const query = 
  `  
    SELECT 
    a.title,
    a.description,
    a.evaluation_guideline,
    a.points,
    json_agg(aa.file_link) AS file_link_json
  FROM 
    assignments a 
  LEFT JOIN 
    assignments_attachments aa ON a.assignment_id = aa.assignment_id
  WHERE
      a.assignment_id = $1
  GROUP BY
      a.assignment_id;
  
  `;
  try {
    const result = await pool.query(query, [assignment_id]);
    console.log("result.rows[0]",result.rows[0])
    return result.rows[0];
  } catch (error) {
    console.error('Error fetching getContext:', error);
    throw error;
  }

}

//Attendance

getAttendanceOfClassByClassId = async (class_id) => {
  // result = 
//   [
//   {
//     "date": "2025-09-18",
//     "class_id": 101,
//     "lecture_number": 1,
//     "first_marked_time": "09:00:00",
//     "percentage_present": 95.00
//   },
//   {
//     "date": "2025-09-18",
//     "class_id": 101,
//     "lecture_number": 2,
//     "first_marked_time": "14:00:00",
//     "percentage_present": 88.00
//   }
// ]

  const query  =`
SELECT
  class_id,
  date,
  lecture_number,
  MIN(time_marked) AS first_marked_time,
  ROUND(
    (SUM(CASE WHEN status = 'Present' THEN 1 ELSE 0 END)::decimal 
     / COUNT(*)::decimal) * 100,
    2
  ) AS percentage_present
FROM attendance
WHERE class_id = $1
GROUP BY class_id, date, lecture_number
ORDER BY date, lecture_number;
  `
    try {
    const result = await pool.query(query, [class_id]);
    return result.rows;
  } catch (error) {
    console.error('Error fetching getContext:', error);
    throw error;
  }


}


 

module.exports = {
  createTeacher,
  createAttendance,

  getTeacherByEmail,
  getContext,
  getAttendanceOfClassByClassId
}