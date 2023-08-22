const Student=require('../models/Students')

exports.signup=async(req,res)=>{
    // console.log(Student.student);
    console.log(req.body);
    const{fullname,email,phone_number,dob,gender,profile_pic,documents,address,state,city,password}=req.body;
    const student=new Student.student({
        fullname:fullname,
        email:email,
        phone_number:phone_number,
        dob:dob,
        gender:gender,
        profile_pic:profile_pic,
        documents:documents,
        address:address,
        state:state,
        city:city,
        password:password
    })
    console.log(student);
    student.save().then((data) => {
console.log(data);
        
    }).catch((err) => {
        
    });
}

exports.login=async(req,res)=>{

    const{email,password}=req.body;
    const student=await Student.findOne({email:email,password:password});
    if(student)
    {
        res.status(200).send({
            success:true,
            message:"User Login successfully",
            data:{}
        })
    }
}