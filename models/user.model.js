const mongoose = require('mongoose')
//Name, Gender, DOB, Email id and Password
var Schema = mongoose.Schema
let userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    gender : {type : String , required : true},
    email: { type: String, required: true },
    password: { type: String, required: true },
    workspaces : [{type : Schema.Types.ObjectId , ref : "WorkSpace",required : true}],
    projects : [{type : Schema.Types.ObjectId , ref : "Project",required : true}],
    tasks : [{type : Schema.Types.ObjectId , ref : "Task",required : true}]
})

module.exports = mongoose.model("User", userSchema)