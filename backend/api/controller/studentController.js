
///////////////////GET CONTROLLER////////////////////
const { getClassInfoByStudentId } = require("../models/studentModels")
const {
        getAssignments_attachmentsByAssignment_id,
        getSubmissionsByAssigment_idAndStudent_id,
        //new
        getClassesWithAttendanceByStudentId,
        getAttendanceByStudentAndClass
        //new end
        } = require("../models/studentModels");
const {
        getAssignmentInfoByAssignment_id,

} = require("../models/classModels");


handleGetClassInfoByStudentID = async (req, res) => {
    try {
        const student_id = req.user.student_id;
        const result = await getClassInfoByStudentId(student_id);
        res.status(200).json(result)
    } catch (err) {

        console.error('Error creating class:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

handleGetAssignmentsByAssignment_id = async (req, res) => {
    try {
        const assignment_id = req.params.assignment_id;
        const result = await getAssignmentInfoByAssignment_id(assignment_id);
        res.status(200).json(result)
    } catch (err) {

        console.error('Error fetching assignments:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
handleGetSubmissionsByAssigment_idAndStudent_id = async (req, res) => {
    try {
        const assignment_id = req.params.assignment_id;
        const student_id = req.user.student_id;
        const result = await getSubmissionsByAssigment_idAndStudent_id(student_id, assignment_id);
        res.status(200).json(result)
    } catch (err) {

        console.error('Error fetching assignments handleGetSubmissionsByAssigment_idAndStudent_id:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


// handleGetAssignmentsAttachmentsByAssignment_id = async (req, res) => {
//     try {
//         const assignment_id = req.params.assignment_id;
//         const result = await getAssignments_attachmentsByAssignment_id(assignment_id);
//         res.status(200).json(result)
//     } catch (err) {

//         console.error('Error fetching assignments:', err);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// }




///////////////////POST CONTROLLER////////////////////
const { joinClass } = require("../models/classModels");
const { handleGetAssignmentsByClass_id } = require("./classController");
handleJointClassByJoiningID = async (req, res) => {
    try {
        const student_id = req.user.student_id;
        const { joining_code } = req.body
        const result = await joinClass(joining_code, student_id);
        res.status(200).json(result)
    } catch (err) {

        console.error('Error creating class:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

// Overall summary: all classes with attendance %
handleGetClassesWithAttendanceByStudentId = async (req, res) => {
  try {
    const student_id = req.user.student_id; 
    const result = await getClassesWithAttendanceByStudentId(student_id);
    res.status(200).json(result);
  } catch (err) {
    console.error("Error fetching attendance summary:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Detail: date-wise attendance for a single class
handleGetAttendanceByStudentAndClass = async (req, res) => {
  try {
    const student_id = req.user.student_id;
    const class_id = req.params.class_id;
    const result = await getAttendanceByStudentAndClass(student_id, class_id);
    res.status(200).json(result);
  } catch (err) {
    console.error("Error fetching class attendance detail:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//end new attendance

module.exports = {
    handleGetClassInfoByStudentID,
    handleGetAssignmentsByAssignment_id,
    handleGetSubmissionsByAssigment_idAndStudent_id,
    handleGetClassesWithAttendanceByStudentId,
    handleGetAttendanceByStudentAndClass,


    handleJointClassByJoiningID
}