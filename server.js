const express=require('express');
const app =express();
app.use(express.static('public'));
app.set("view engine","ejs")
const path=require('path');
const url ='mongodb://127.0.0.1/keshvi'
const mongoose=require('mongoose');
const StudentController=require('./controller/student')

mongoose.connect(url,{useNewUrlParser:true})
const con = mongoose.connection

con.on('open',function(){  
    console.log('mongod connected ...');
})

const Student=require('./models/Students')


app.use('/',express.static(path.join(__dirname,'static')))

app.use(
    express.urlencoded({ extended: true })
  );
  
app.get('/signup',(err,res)=>{
    res.render('index.ejs');
})

app.post('/signup',StudentController.signup);
app.listen(3000,()=>{
    console.log('server is started on PORT 3000');
})