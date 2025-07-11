const {Router} = require('express');
const router = Router();
// const multer = require('multer');
// const path = require('path');


///////////////////////////

// const storage = multer.diskStorage({
//     destination: function(req,file,cb){
//         cb(null,path.join(__dirname, './uploads'))
//     },
//     filename: function(req,file,cb){
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//     const ext = path.extname(file.originalname);        
//     cb(null, file.fieldname + '-' + uniqueSuffix + ext);
//     }
// })

// // Create multer upload middleware
// const upload = multer({ storage: storage });

// app.post('/upload', upload.array('files', 5), async (req, res) => {
//   console.log(req.files); // info about uploaded files
//   const files = req.files
  

//     // Insert each file’s info into the DB
//     for (const file of files) {
//       await pool.query(
//         'INSERT INTO uploaded_files (original_name, stored_name) VALUES ($1, $2)',
//         [file.originalname, file.filename]
//       );
//     }

//   res.json({
//     message: 'Files uploaded successfully!',
//     files: req.files 
//   });
// });

/////////////////////////////////////

const {handleJoinClasses,handleSubmissionUpload}= require('../controller/classController')
const uploadMiddleware = require('../services/myMulter');
router.post('/join', handleJoinClasses);
router.post('/submissionUpload/:assignment_id', uploadMiddleware.array('files', 5), handleSubmissionUpload);

module.exports = router;