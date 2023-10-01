const express = require('express');
const app = express();
app.use(express.static('public'));
app.set("view engine", "ejs")
const path = require('path');
const url = 'mongodb+srv://krima2992:OJ1ObsphkBkXSgTA@mongoclusteer.9zeswxv.mongodb.net/test'
const mongoose = require('mongoose');
const session=require('express-session');
const dotenv = require('dotenv');
dotenv.config();
const StudentRoutes=require('./routes/student.routes');

const multer = require('multer');

app.use('/', express.static(path.join(__dirname, 'static')))

app.use(
    express.urlencoded({ extended: true })
);

app.use(
    express.json()
);

app.use(
  session({
    secret: 'login_session', // Change this to a strong, secret key
    resave: false,
    saveUninitialized: false,
  })
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

require('./routes/student.routes')(app);
app.get('/signup', (err, res) => {
  res.render('index.ejs');
})

app.get('/signin', (err, res) => {
  res.render('login');
})

app.get('/signin-que4',(err, res)=>{
res.render('que4login.ejs')
})

app.get('/add-student',(err, res)=>{
  res.render('studentsadd.ejs')
})


app.listen(3000, () => {
    console.log('server is started on PORT 3000');
})