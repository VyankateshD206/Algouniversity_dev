const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        default:null,
        required:true,
    },
    lastName:{
        type:String,
        default:null,
        required:true,
    },
    email:{
        type:String,
        default:null,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
});

module.exports = mongoose.model("user",userSchema);  // creat3 a schema that is table with the heading name user and the 
// type of key value we provided
