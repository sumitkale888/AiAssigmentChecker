const {Router} = require('express')
const router = Router()

const {handleCreateTeacher,handleCreateStudent} = require('../controller/authController')
const {handleLoginTeacher, handleLoginStudent} = require('../controller/authController')
router.post('/signupTeacher', handleCreateTeacher)
router.post('/signupStudent', handleCreateStudent)
router.post('/loginTeacher', handleLoginTeacher)
router.post('/loginStudent', handleLoginStudent)

module.exports = router