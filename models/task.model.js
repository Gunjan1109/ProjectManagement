const mongoose = require('mongoose')

var Schema = mongoose.Schema

let taskSchema = new mongoose.Schema({
    name : {type : String , required : true},
    description : {type : String , required : true},
    dueDate : {type : Date , required : true},
    status : {type : String , default : "pending" , required : true},
    assignedTo : {type : Schema.Types.ObjectId, ref : 'User',required : true}
})

module.exports = mongoose.model("Task", taskSchema)