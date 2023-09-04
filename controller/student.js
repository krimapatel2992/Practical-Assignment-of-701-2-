const Student=require('../models/Students')

exports.signup=async(req,res)=>{
    console.log();
    console.log(req.files);
let element=[];
    for (let index = 0; index < req.files.length; index++) {
        element.push(req.files[index].filename);
        
    }
    const{fullname,email,phone_number,dob,gender,files,address,state,city,password}=req.body;
    const student=new Student.student({
        fullname:fullname,
        email:email,
        phone_number:phone_number,
        dob:dob,
        gender:gender,
        images:element,
             address:address,
        state:state,
        city:city,
        password:password
    })
    console.log(student);
   await student.save(student).then((data) => {
        if(data){
            console.log('hello');
res.status(200).send({
    message:"signup"
})
}    
    }).catch((err) => {
        console.log(err);
        res.status(401).send({
            message:"error"
        })
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