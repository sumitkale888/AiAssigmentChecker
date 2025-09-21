
///////////////////////POST ROUTES////////////////////////////////////////////////
const { createClass, getClassByTeacher_id } = require('../models/classModels');
const {createAttendance} = require('../models/teacherModels');
handleCreateClass = async (req, res) => {
    try {
        const classData = req.body;
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

//Attendance
handleCreateAttendance = async (req, res) => {
    // req.body = {
    //     class_id :1 ,
    //     students_id :[1,2,3,4],
    //     status :['Absent','Present','Present','Present']
    // }
    try{
        const attendanceData = req.body;
        for(let i = 0 ; i < attendanceData.students_id.length; i++){
            const student_id = attendanceData.students_id[i];
            const status = attendanceData.status[i];
            await createAttendance(attendanceData.class_id, student_id, status);
        }
        res.status(201).json({ message: 'Attendance created successfully' });

    }catch(error){
        console.error('Error creating class:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}



/////////////////////////GET ROUTES/////////////////////////

const { getStudentsByClass_id,getStudentByStudent_id } = require("../models/studentModels")
const {getJsonBuildObjectSubmission,getJsonBuildObjectStudentSubmission,getJsonAssignmentCheckInfo} = require("../models/classModels")
const {getAttendanceOfClassByClassId} = require("../models/teacherModels")
handleGetClassByTeacher_id = async (req, res) => {
    const teacher_id = req.user.teacher_id; // Assuming user info is attached to request by auth middleware
    if (!teacher_id) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    const classes = await getClassByTeacher_id(teacher_id);
    res.json(classes);
}
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

//Attendance

handleGetAttendanceOfClassByClassId = async (req, res) => {
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
    const class_id = req.params.class_id;
    try {
        if (!class_id) {
            return res.status(401).json({ error: 'class_id missing' });
        }
        const attendanceData = await getAttendanceOfClassByClassId(class_id);
        res.json(attendanceData);
    } catch (error) {
        res.json({ error: error });
    }
}

module.exports = {
    handleCreateClass,
    handleCreateAttendance,

    handleGetStudentsByClass_id,
    handleGetJsonBuildObjectSubmission,
    handleGetClassByTeacher_id,
    handleGetJsonBuildObjectStudentSubmission,
    handleGetStudentByStudent_id,
    handleGetJsonAssignmentCheckInfo,
    handleGetAttendanceOfClassByClassId
}