const mongoose = require('mongoose')

var Schema = mongoose.Schema

let taskSchema = new mongoose.Schema({
    name : {type : String},
    description : {type : String},
    notes : {type : String},
    file : {type : String},
    dueDate : {type : String},
    author : {type : String},
    status : {type : String , default : "TODO"},
    assignedTo : {type : String}
},
{
    timestamps : true
})

module.exports = mongoose.model("Tasks", taskSchema)