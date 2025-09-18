const {Router} = require('express')
const router = Router()


///////////////////POST ROUTS////////////////////////
const {handleCreateClass,
    handleGetClassByTeacher_id,
    handleGetStudentsByClass_id,
    handleGetJsonBuildObjectSubmission,
    handleGetJsonBuildObjectStudentSubmission,
    handleGetStudentByStudent_id,
    handleGetJsonAssignmentCheckInfo,
    handleCreateAttendance
    } = require('../controller/teacherController')
const {handleGetAttendanceOfClassByClassId} = require("../controller/teacherController")

router.post('/classes', handleCreateClass);
router.post('/attendance',handleCreateAttendance);


///////////////////GET ROUTS////////////////////////
router.get('/classes', handleGetClassByTeacher_id)
router.get('/class/students/:class_id',handleGetStudentsByClass_id)
router.get('/class/submissions/:class_id', handleGetJsonBuildObjectSubmission)
router.get('/class/submissions/:class_id/student/:student_id', handleGetJsonBuildObjectStudentSubmission)
router.get('/student/:student_id', handleGetStudentByStudent_id)
router.get('/submission/:submission_id/student/:student_id', handleGetJsonAssignmentCheckInfo)
//Attendance route
router.get('/attendance/class/:class_id',handleGetAttendanceOfClassByClassId)

module.exports = router