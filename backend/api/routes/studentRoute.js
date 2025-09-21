const {Router} = require("express");
const router = Router();

const {
    handleGetClassInfoByStudentID,
    handleGetAssignmentsByAssignment_id,
    handleGetSubmissionsByAssigment_idAndStudent_id,
    handleGetClassesWithAttendanceByStudentId,
    handleGetAttendanceByStudentAndClass,
    handleGetOverallAttendanceAnalytics,
} = require("../controller/studentController")

const {
    handleGetAssignmentsByClass_id,
    handleGetClassInfoByClass_id,
    handleGetAssignments_attachmentsByAssignment_id,
    getAssignmentInfoByAssignment_id
} = require("../controller/classController")
const{handleGetStudentsByClass_id} = require("../controller/teacherController")
////////////////GET ROUTES//////////////////////////////

router.get("/class",handleGetClassInfoByStudentID)
router.get("/class/:class_id",handleGetClassInfoByClass_id)
router.get("/class/assignments/:class_id",handleGetAssignmentsByClass_id)
router.get("/class/assignment/attachment/:assignment_id",handleGetAssignments_attachmentsByAssignment_id)
router.get("/class/assignment/:assignment_id",handleGetAssignmentsByAssignment_id)
router.get("/class/assignment/:assignment_id/submissions",handleGetSubmissionsByAssigment_idAndStudent_id)
router.get('/class/students/:class_id',handleGetStudentsByClass_id)

//ATTENDANCE ROUTES
router.get("/attendance/summary", handleGetClassesWithAttendanceByStudentId);
router.get("/attendance/detail/:class_id", handleGetAttendanceByStudentAndClass);

//ANALYTICS ROUTES
router.get("/analytics/attendance", handleGetOverallAttendanceAnalytics);

//////////////////POST ROUTES/////////////////////////
const uploadMiddleware = require('../services/myMulter');

const {handleSubmissionUpload}  = require("../controller/classController")
const {handleJointClassByJoiningID} =require("../controller/studentController")
router.post("/class/join",handleJointClassByJoiningID)
router.post("/class/assignment/:assignment_id/submissions", uploadMiddleware.array('files', 10),handleSubmissionUpload)


module.exports = router;
