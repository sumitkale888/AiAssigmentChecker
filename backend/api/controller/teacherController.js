const {createClass,getClassByTeacher_id} = require('../models/classModels');

handleCreateClass= async (req, res) => {
    try {
        const classData = req.body;
        console.log('Received class data:', req.user);
        const teacherId = req.user.teacher_id; // Assuming user info is attached to request by auth middleware
        if (!teacherId) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        const newClass = await createClass({ ...classData, teacher_id: teacherId });
        res.status(201).json(newClass);
    } catch (error) {
        console.error('Error creating class:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

handleGetClassByTeacher_id = async(req,res)=>{
  const teacher_id = req.user.teacher_id; // Assuming user info is attached to request by auth middleware
  if (!teacher_id) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const classes = await getClassByTeacher_id(teacher_id);
  res.json(classes);
}

module.exports = {
    handleCreateClass,
    handleGetClassByTeacher_id
}