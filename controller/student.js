const Student = require('../models/Students')
const StudentTB = require('../models/studenttb');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const moment = require('moment-timezone')

exports.signup = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    console.log();
    console.log(req.files);
    let element = [];
    for (let index = 0; index < req.files.length; index++) {
        element.push(req.files[index].filename);

    }
    const { fullname, email, phone_number, dob, gender, files, address, state, city, password } = req.body;
    const student = new Student.student({
        fullname: fullname,
        email: email,
        phone_number: phone_number,
        dob: dob,
        gender: gender,
        images: element,
        address: address,
        state: state,
        city: city,
        password: password
    })
    console.log(student);
    await student.save(student).then((data) => {
        if (data) {
            console.log('hello');
            res.status(200).send({
                message: "signup"
            })

        }
    }).catch((err) => {
        console.log(err);
        res.status(401).send({
            message: "error"
        })
    });
}

// exports.signup=[]

exports.login = async (req, res) => {

    const { email, password } = req.body;
    console.log(req.body);
    console.log(Student);
    const student = await Student.student.findOne({ email: email });
    if (student) {
        if (student.password == password) {
            req.session.user = { username: email }
            res.status(200).send({
                success: true,
                message: "User Login successfully",
                data: {}
            })
        }
        else {
            res.status(200).send({
                success: false,
                error: "Your password is wrong",
                data: {}
            })
        }
    }
    else {
        res.status(200).send({
            success: false,
            error: "Email not registered",
            data: {}
        })
    }
}


exports.verifyToken=async(req, res, next)=> {
    // Get the token from the Authorization header
    const token = req.headers.authorization;
  
    if (!token) {
      return res.status(200).json({ 
        success:false,
        message: 'No token provided' });
    }
  
    // Verify the token
    console.log(token.replace('Bearer ', ''));
    jwt.verify(token.replace('Bearer ', ''), process.env.SECERT_KEY, (err, decoded) => {
      if (err) {
        return res.status(200).json({ 
            success:false,
            message: 'Failed to authenticate token' 
        });
      }
      
      // Token is valid, store user information in request for future use if needed
      req.email = decoded.email; // or any other relevant user information
  
      next(); // Continue to the next middleware or route
    });
  }
exports.signin = async (req, res) => {

    const { email, password } = req.body;
    if (email == "admin@gmail.com" && password == "admin@123") {
        const token = jwt.sign({ email: email }, process.env.SECERT_KEY, { expiresIn: '1h' })
        console.log(token);
        res.status(200).send({
            success: true,
            message: "User Login successfully",
            data: token
        })
    }
    else {
        res.status(200).send({
            success: false,
            message: "your email or password is incorrect",
            data: {}
        })
    }

}

exports.addStudent = async (req, res) => {

    console.log(req.body);
    const { name, email, phone_number, dob, gender } = req.body;
    const student = new StudentTB.student({
        name: name,
        email: email,
        phone_number: phone_number,
        dob: dob,
        gender: gender

    })
    console.log(student);
    await student.save(student).then((data) => {
        if (data) {
            res.status(200).send({
                success: true,
                message: "Student inserted successfully",
                data: {}
            })

        }
    }).catch((err) => {
        console.log(err);
        res.status(401).send({
            message: "error"
        })
    });
}

exports.getStudent = async (req, res) => {

    await StudentTB.student.find({}).lean().then((data) => {
        if (data.length > 0) {
            const dt = data.map((e) => {
                // console.log(e.dob);
                var newDateObject = moment(e.dob);
                var newDate = newDateObject.format("YYYY-MM-DD");
                // console.log(newDate);
                e.dob = newDate;
                return { ...e }
            })
            console.log(dt);
            // let dt= data.map((e)=>{
            //     console.log(e.dob);
            //     var newDateObject = moment(e.dob);
            //     var newDate = newDateObject.format("dd/mm/yyyy");
            //     console.log(newDate);
            //     e.dob=newDate;
            //     return e;
            //  })

            res.render('home', {
                data: dt
            })
        }
    })

}


exports.getStudents = async (req, res) => {

    await StudentTB.student.find({}).lean().then((data) => {
        if (data.length > 0) {
            const dt = data.map((e) => {
                // console.log(e.dob);
                var newDateObject = moment(e.dob);
                var newDate = newDateObject.format("YYYY-MM-DD");
                // console.log(newDate);
                e.dob = newDate;
                return { ...e }
            })
            console.log(dt);
            res.status(200).send({
                success: true,
                message: "Student fetch successfully",
                data: dt
            })

           
        }
        else{
            res.status(200).send({
                success: false,
                message: "record not found",
                data: {}
            })
        }
    })

}



exports.editStudent = async (req, res) => {

    const { id, name, email, phone_number, gender, dob } = req.body;
    await StudentTB.student.findByIdAndUpdate(id, { name: name, email: email, phone_number: phone_number, gender: gender, dob: dob }).then((data) => {
        if (data) {
            res.status(200).send({
                success: true,
                message: "Student updated successfully",
                data: {}
            })

        }
    }).catch((err) => {
        console.log(err);
        res.status(401).send({
            message: "error"
        })
    });
}

exports.editStudent = async (req, res) => {

    const { id, name, email, phone_number, gender, dob } = req.body;
    await StudentTB.student.findByIdAndUpdate(id, { name: name, email: email, phone_number: phone_number, gender: gender, dob: dob }).then((data) => {
        if (data) {
            res.status(200).send({
                success: true,
                message: "Student updated successfully",
                data: {}
            })

        }
    }).catch((err) => {
        console.log(err);
        res.status(401).send({
            message: "error"
        })
    });
}

exports.deleteStudent = async (req, res) => {

console.log(req.query.id);
    await StudentTB.student.findByIdAndDelete(req.query.id).then((data) => {
        if (data) {
            
            res.status(200).send({
                success: true,
                message: "Student deleted successfully",
                data: {}
            })

        }
    }).catch((err) => {
        console.log(err);
        res.status(401).send({
            message: "error"
        })
    });
}

exports.getStudentById = async (req, res) => {

    await StudentTB.student.findById({ _id: req.query.id }).lean().then((data) => {
        if (data) {
            console.log(data);
            var newDateObject = moment(data.dob);
            var newDate = newDateObject.format("YYYY-MM-DD");
            data.dob = newDate;
            console.log(data);

            res.render('Edit', {
                data: data
            })
        }
    }).catch((err) => {
        console.log(err);
        res.status(401).send({
            message: "error"
        })
    });
}

