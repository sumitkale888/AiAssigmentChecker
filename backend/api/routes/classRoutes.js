const {Router} = require('express');
const router = Router();


const {handleJoinClasses,handleSubmissionUpload}= require('../controller/classController')
const uploadMiddleware = require('../services/myMulter');
router.post('/join', handleJoinClasses);
router.post('/submissionUpload/:assignment_id', uploadMiddleware.array('files', 5), handleSubmissionUpload);

module.exports = router;