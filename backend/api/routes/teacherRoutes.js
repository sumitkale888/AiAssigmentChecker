const {Router} = require('express')
const router = Router()

const {handleCreateClass,handleGetClassByTeacher_id,handleGetStudentsByClass_id,handleGetJsonBuildObjectSubmission} = require('../controller/teacherController')

router.post('/classes', handleCreateClass)
router.get('/classes', handleGetClassByTeacher_id)
router.get('/class/students/:class_id',handleGetStudentsByClass_id)
router.get('/class/submissions/:class_id', handleGetJsonBuildObjectSubmission)

module.exports = router