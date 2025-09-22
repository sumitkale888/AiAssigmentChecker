
///////////////////GET CONTROLLER////////////////////
const { getClassInfoByStudentId } = require("../models/studentModels")
const {
        getAssignments_attachmentsByAssignment_id,
        getSubmissionsByAssigment_idAndStudent_id,

        getClassesWithAttendanceByStudentId,
        getAttendanceByStudentAndClass,

        getOverallAttendanceAnalytics,
        getPerformanceAnalytics,
        getRecentTestFeedback,
        getActiveSessionByClassId
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

//////Analytics//////

handleGetOverallAttendanceAnalytics = async (req, res) => {
  try {
    const student_id = req.user.student_id;
    const period = req.query.period || 'current-month'; // Get period from query params
    
    const result = await getOverallAttendanceAnalytics(student_id, period);
    res.status(200).json(result);
  } catch (err) {
    console.error('Error fetching overall attendance analytics:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}


handleGetPerformanceAnalytics = async (req, res) => {
  try {
    const student_id = req.user.student_id;
    const period = req.query.period || 'current-semester';
    
    const result = await getPerformanceAnalytics(student_id, period);
    res.status(200).json(result);
  } catch (err) {
    console.error('Error fetching performance analytics:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

handleGetRecentTestFeedback = async (req, res) => {
  try {
    const student_id = req.user.student_id;
    const limit = parseInt(req.query.limit) || 3;
    
    const result = await getRecentTestFeedback(student_id, limit);
    res.status(200).json(result);
  } catch (err) {
    console.error('Error fetching recent test feedback:', err);
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

// inform student with session_id

// Student: Get active session info for a class
// handleGetActiveSessionByClassId = async (req, res) => {
//     try {
//         const { class_id } = req.params;
//         const session = await getActiveSessionByClassId(class_id);

//         if (!session) {
//             return res.json({ active: false });
//         }

//         res.json({
//             active: true,
//             ...session, // contains session_id, start_time, end_time, method
//         });
//     } catch (err) {
//         console.error("Error fetching active session:", err);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// };


handleMarkAttendanceByStudent = async (req, res) => {
    try {
        const student_id = req.user.student_id;
        const { session_id } = req.params;
        const { status, method } = req.body; // e.g., { "status": "Present", "method": "self_mark" }

        const result = await markAttendanceForSession(student_id, session_id, status, method);

        res.status(200).json({ success: true, result });
    } catch (err) {
        console.error("Error marking attendance:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


// GET active session for a class
handleGetActiveSessionByClassId = async (req, res) => {
    try {
        const { class_id } = req.params;
        const session = await getActiveSessionByClassId(class_id);

        if (!session) {
            return res.status(200).json({ active: false });
        }

        res.status(200).json({
            active: true,
            session_id: session.session_id
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


module.exports = {
    handleGetClassInfoByStudentID,
    handleGetAssignmentsByAssignment_id,
    handleGetSubmissionsByAssigment_idAndStudent_id,
    handleGetClassesWithAttendanceByStudentId,
    handleGetAttendanceByStudentAndClass,

    handleGetOverallAttendanceAnalytics,
    handleGetPerformanceAnalytics,
    handleGetRecentTestFeedback,
    handleJointClassByJoiningID,

    handleMarkAttendanceByStudent,
    handleGetActiveSessionByClassId,
    handleMarkAttendanceByStudent
}