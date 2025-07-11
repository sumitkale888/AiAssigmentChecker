const {Router} = require('express')
const router = Router()

const {handleCreateClass} = require('../controller/teacherController')

router.post('/classes', handleCreateClass)
module.exports = router