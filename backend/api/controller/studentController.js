const {getClassInfoByStudentId} =require("../models/studentModels")
const {joinClass} = require("../models/classModels")
handleGetClassInfoByStudentID = async(req,res)=>{
    try{
        const student_id = req.user.student_id;
        const result = await getClassInfoByStudentId(student_id);
        res.status(200).json(result)
    }catch(err){

        console.error('Error creating class:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

handleJointClassByJoiningID=async(req,res)=>{
        try{
        const student_id = req.user.student_id;
        const {joining_code} = req.body
        const result = await joinClass(joining_code,student_id);
        res.status(200).json(result)
    }catch(err){

        console.error('Error creating class:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports ={
    handleGetClassInfoByStudentID,
    handleJointClassByJoiningID
}