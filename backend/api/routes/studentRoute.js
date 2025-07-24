const {Router} = require("express");
const router = Router();

const {handleGetClassInfoByStudentID} = require("../controller/studentController")

router.get("/class",handleGetClassInfoByStudentID)
router.post("/class/join",handleJointClassByJoiningID)

module.exports = router;
