const {Router} = require('express')
const router = Router()

const {handleCreateTeacher} = require('../controller/authController')

router.post('/signupTeacher', handleCreateTeacher)
module.exports = router