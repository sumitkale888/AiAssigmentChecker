const {Router} = require('express')
const router = Router()

const {handleCreateClass,handleGetClassByTeacher_id} = require('../controller/teacherController')

router.post('/classes', handleCreateClass)
router.get('/classes', handleGetClassByTeacher_id)

module.exports = router