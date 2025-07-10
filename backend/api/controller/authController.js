const { createTeacher } = require('../models/teacherModels');
const { generateToken } = require('../services/auth');


handleCreateTeacher = async (req, res) => {
    try {
        const teacherData = req.body;
        const newTeacher = await createTeacher(teacherData);
        const token = generateToken(newTeacher); // Generate token for the new teacher
        res.cookie('admin', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'None'
        });
        res.status(201).json(newTeacher);
    } catch (error) {
        console.error('Error creating teacher:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = {
    handleCreateTeacher
}