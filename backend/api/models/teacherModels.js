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
 

module.exports = {
  createTeacher,
  getTeacherByEmail,
  getContext
}