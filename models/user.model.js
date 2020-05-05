const mongoose = require('mongoose')
//Name, Gender, DOB, Email id and Password
var Schema = mongoose.Schema
let userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    isConfirmed : {type : Boolean , default : false,required : true},
    projects : [{type : Schema.Types.ObjectId , ref : "Project",required : true}],
   
})

module.exports = mongoose.model("User", userSchema)