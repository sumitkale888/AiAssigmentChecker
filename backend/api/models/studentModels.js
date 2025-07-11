const {pool,bcrypt} = require('./database'); 

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





module.exports = {
  createStudent,
  getClass_idByStudent_id
}

