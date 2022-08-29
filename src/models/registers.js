const mongoose = require("mongoose");

const registerSchema =new mongoose.Schema({
    firstname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true,
        
    },
    password:{
        type:String,
        required:true
    },
    
})
// /Collections:
const Register = new mongoose.model("Register",registerSchema);
module.exports=Register;


