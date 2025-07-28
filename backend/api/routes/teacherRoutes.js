const {Router} = require('express')
const router = Router()

const {handleCreateClass,handleGetClassByTeacher_id,handleGetStudentsByClass_id,handleGetJsonBuildObjectSubmission,handleGetJsonBuildObjectStudentSubmission} = require('../controller/teacherController')

router.post('/classes', handleCreateClass)
router.get('/classes', handleGetClassByTeacher_id)
router.get('/class/students/:class_id',handleGetStudentsByClass_id)
router.get('/class/submissions/:class_id', handleGetJsonBuildObjectSubmission)
router.get('/class/submissions/:class_id/student/:student_id', handleGetJsonBuildObjectStudentSubmission)

module.exports = router