const express = require('express');
const app = express();
app.use(express.static('public'));
app.set("view engine", "ejs")
const path = require('path');
const url = 'mongodb+srv://krima2992:OJ1ObsphkBkXSgTA@mongoclusteer.9zeswxv.mongodb.net/test'
const mongoose = require('mongoose');
const StudentController = require('./controller/student');
const { body, validationResult } = require('express-validator');

const multer = require('multer');

app.use('/', express.static(path.join(__dirname, 'static')))

app.use(
    express.urlencoded({ extended: true })
);

app.use(
    express.json()
);

mongoose.connect(url, { useNewUrlParser: true })
const con = mongoose.connection

con.on('open', function () {
    console.log('mongod connected ...');
})

const Student = require('./models/Students');


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

app.get('/signup', (err, res) => {
    res.render('index.ejs');
})

app.get('/signin', (err, res) => {
    res.render('login');
})

app.post('/signup',upload.array('files', 5),[
    body('fullname').notEmpty().withMessage('Full name is required'),
    body('email').isEmail().withMessage('Invalid email address'),
    body('phone_number').isMobilePhone().withMessage('Invalid phone number'),
    body('dob').isDate().withMessage('Invalid date of birth'),
    body('gender').isIn(['Male', 'Female', 'Other']).withMessage('Invalid gender'),
    // Add more validation rules for other fields as needed
  ], StudentController.signup);

// app.post('/signup',StudentController.signup);
app.listen(3000, () => {
    console.log('server is started on PORT 3000');
})