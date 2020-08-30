const mongoose = require('mongoose')

var Schema = mongoose.Schema

let taskSchema = new mongoose.Schema({
    name : {type : String},
    description : {type : String},
    notes : {type : String},
    dueDate : {type : String},
    author : {type : String},
    status : {type : String , default : "TODO"},
    assignedTo : {type : String}
})

module.exports = mongoose.model("Tasks", taskSchema)