const StudentController = require('../controller/student');
const multer = require('multer');
const { body, validationResult } = require('express-validator');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/uploads'); // Set the destination folder for uploaded files
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, file.fieldname + '-' + uniqueSuffix + '-' + file.originalname);
    },
  });
  
const upload = multer({ storage: storage });

module.exports = app => {
    
    var router = require("express").Router();
  
  
    
   
    router.post('/signup',upload.array('files', 5),[
        body('fullname').notEmpty().withMessage('Full name is required'),
        body('email').isEmail().withMessage('Invalid email address'),
        body('phone_number').isMobilePhone().withMessage('Invalid phone number'),
        body('gender').isIn(['male', 'female', 'other']).withMessage('Invalid gender'),
         //Add more validation rules for other fields as needed
      ], StudentController.signup);
    
      router.post('/signin',StudentController.login);
      router.post('/signin-que4',StudentController.signin);
      router.post('/add-student',StudentController.addStudent);
      router.post('/edit-student',StudentController.verifyToken,StudentController.editStudent);
      router.get('/delete-student',StudentController.deleteStudent);
      router.get('/get-student',StudentController.getStudentById);
      router.get('/home',StudentController.getStudent);
      router.get('/get-all-student',StudentController.getStudents);

  
  
    app.use("/Student", router);
  };