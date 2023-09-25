const mongoose=require('mongoose');
var schema = mongoose.Schema(
    {
        name: {
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
        dob: {
            type: Date,
            require:true
        },
        gender: {
            type: String,
            require:true
        }
    },
    { timestamps: true }
)

const student = mongoose.model("studenttb", schema);

module.exports={student};