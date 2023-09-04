const mongoose=require('mongoose');
var schema = mongoose.Schema(
    {
        fullname: {
            type: String,
            require:true
        },
        email: {
            type: String,
            require:true
        },
        phone_number: {
            type: String,
            require:true
        },
        // dob: {
        //     type: Date,
        //     require:true
        // },
        gender: {
            type: String,
            require:true
        },
        images: {
            type: Array,
            require:true
        },
        // documents: {
        //     type: String,
        //     require:true
        // },
        address:{
            type:String,
            require:true
        },
        state:{
            type:String,
            require:true
        },
        city:{
            type:String,
            require:true
        },
        password:{
            type:String,
            require:true
        }

    },
    { timestamps: true }
)

const student = mongoose.model("student", schema);

module.exports={student};