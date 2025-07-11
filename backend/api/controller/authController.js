const { createTeacher } = require('../models/teacherModels');
const { createStudent } = require('../models/studentModels');
const { generateToken } = require('../services/auth');


handleCreateTeacher = async (req, res) => {
    try {
        const teacherData = req.body;
        const newTeacher = await createTeacher(teacherData);
        const token = generateToken(newTeacher); // Generate token for the new teacher
        res.cookie('teacher', token, {
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

handleCreateStudent = async (req, res) => {
    try {
        const studentData = req.body;
        const newStudent = await createStudent(studentData);
        const token = generateToken(newStudent); // Generate token for the new student
        res.cookie('student', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'None'
        });
        res.status(201).json(newStudent);
    } catch (error) {
        console.error('Error creating student:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = {
    handleCreateTeacher,
    handleCreateStudent
}