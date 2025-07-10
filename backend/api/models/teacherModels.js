const {pool,bcrypt} = require('./database')

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


module.exports = {
  createTeacher 
}