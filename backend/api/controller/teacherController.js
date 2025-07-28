const { createClass, getClassByTeacher_id } = require('../models/classModels');

handleCreateClass = async (req, res) => {
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

handleGetClassByTeacher_id = async (req, res) => {
    const teacher_id = req.user.teacher_id; // Assuming user info is attached to request by auth middleware
    if (!teacher_id) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    const classes = await getClassByTeacher_id(teacher_id);
    res.json(classes);
}

/////////////////////////GET ROUTES/////////////////////////

const { getStudentsByClass_id,getStudentByStudent_id } = require("../models/studentModels")
const {getJsonBuildObjectSubmission,getJsonBuildObjectStudentSubmission,getJsonAssignmentCheckInfo} = require("../models/classModels")

handleGetStudentsByClass_id = async (req, res) => {
    const class_id = req.params.class_id;
    try {
        if (!class_id) {
            return res.status(401).json({ error: 'class_id missing' });
        }
        const students = await getStudentsByClass_id(class_id);
        res.json(students)
    } catch (error) {
        res.json({ error: error })
    }

}

handleGetStudentByStudent_id = async (req, res) => {
        const student_id = req.params.student_id;
    try {
        if (!student_id) {
            return res.status(401).json({ error: 'student_id missing' });
        }
        const student = await getStudentByStudent_id(student_id);
        res.json(student)
    } catch (error) {
        res.json({ error: error })
    }
}
handleGetJsonBuildObjectSubmission = async (req, res) => {
    const class_id = req.params.class_id;
    try {
        if (!class_id) {
            return res.status(401).json({ error: 'class_id missing' });
        }
        const submissionData = await getJsonBuildObjectSubmission(class_id);
        res.json(submissionData);
    } catch (error) {
        res.json({ error: error });
    }
}
handleGetJsonBuildObjectStudentSubmission = async (req, res) => {
    const class_id = req.params.class_id;
    const student_id = req.params.student_id;
    try {
        if (!class_id) {
            return res.status(401).json({ error: 'class_id missing' });
        }
        const submissionData = await getJsonBuildObjectStudentSubmission(class_id, student_id);
        res.json(submissionData);
    } catch (error) {
        res.json({ error: error });
    }
}

handleGetJsonAssignmentCheckInfo = async (req, res) => {
    const submission_id = req.params.submission_id;
    const student_id = req.params.student_id;
    try {
        if (!student_id & !submission_id) {
            return res.status(401).json({ error: 'student_id and submission_id are required' });
        }
        const submissionData = await getJsonAssignmentCheckInfo( student_id,submission_id);
        res.json(submissionData);
    } catch (error) {
        res.json({ error: error });
    }
}


module.exports = {
    handleCreateClass,

    handleGetStudentsByClass_id,
    handleGetJsonBuildObjectSubmission,
    handleGetClassByTeacher_id,
    handleGetJsonBuildObjectStudentSubmission,
    handleGetStudentByStudent_id,
    handleGetJsonAssignmentCheckInfo
}