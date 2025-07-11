const {Router} = require('express')
const router = Router()

const {handleCreateTeacher,handleCreateStudent} = require('../controller/authController')

router.post('/signupTeacher', handleCreateTeacher)
router.post('/signupStudent', handleCreateStudent)

module.exports = router