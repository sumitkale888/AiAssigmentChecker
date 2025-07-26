const {Router} = require("express");
const router = Router();

const {
    handleGetClassInfoByStudentID,
    handleGetAssignmentsByAssignment_id,
    handleGetSubmissionsByAssigment_idAndStudent_id,
} = require("../controller/studentController")

const {
    handleGetAssignmentsByClass_id,
    handleGetClassInfoByClass_id,
    handleGetAssignments_attachmentsByAssignment_id,
    getAssignmentInfoByAssignment_id
} = require("../controller/classController")
////////////////GET ROUTES//////////////////////////////

router.get("/class",handleGetClassInfoByStudentID)
router.get("/class/:class_id",handleGetClassInfoByClass_id)
router.get("/class/assignments/:class_id",handleGetAssignmentsByClass_id)
router.get("/class/assignment/attachment/:assignment_id",handleGetAssignments_attachmentsByAssignment_id)
router.get("/class/assignment/:assignment_id",handleGetAssignmentsByAssignment_id)
router.get("/class/assignment/:assignment_id/submissions",handleGetSubmissionsByAssigment_idAndStudent_id)


//////////////////POST ROUTES/////////////////////////

const {handleSubmissionUpload}  = require("../controller/classController")
const {handleJointClassByJoiningID} =require("../controller/studentController")
router.post("/class/join",handleJointClassByJoiningID)
router.post("/class/assignment/:assignment_id/submissions",handleSubmissionUpload)

module.exports = router;
