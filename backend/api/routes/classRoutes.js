const { Router } = require('express');
const router = Router();

////////PUT Endpoints///////////////////////////////
const { handleJoinClasses, handleSubmissionUpload, handleCreateAssigment, handleAssignments_attachments } = require('../controller/classController')
const uploadMiddleware = require('../services/myMulter');
router.post('/join', handleJoinClasses);
router.post('/submissionUpload/:assignment_id', uploadMiddleware.array('files', 5), handleSubmissionUpload);
router.post('/assignment', handleCreateAssigment);
router.post('/assignmentAttachments/:assignment_id', uploadMiddleware.array('files', 5), handleAssignments_attachments);


////////GET Endpoints///////////////////////////////
const {
    handleGetAssignmentsByClass_id,
    handleGetAssignments_attachmentsByAssignment_id,
    handleGetSubmissionsByAssignment_id,
    handleGetGradesByAssignment_id,
    handleGetGradesByStudent_id,
    handleGetClassInfoByClass_id
} = require('../controller/classController')

router.get('/classInfo/:class_id', handleGetClassInfoByClass_id);
router.get('/submissions/:assignment_id', handleGetSubmissionsByAssignment_id);
router.get('/assignments/:class_id', handleGetAssignmentsByClass_id);
router.get('/assignmentAttachments/:assignment_id', handleGetAssignments_attachmentsByAssignment_id);


module.exports = router;