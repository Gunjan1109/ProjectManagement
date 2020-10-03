const mongoose = require('mongoose')

var Schema = mongoose.Schema

let projectSchema = new mongoose.Schema({
    name : {type : String , required : true},
    accessType : {type : String , required : true},
    tasks : [{type : Schema.Types.ObjectId, ref : 'Tasks',required : true}],
    members : [{type : Schema.Types.ObjectId, ref : 'User'}],
    owners :  [{type : Schema.Types.ObjectId, ref : 'User',required : true}],
    creationDate : {type : Date , required : true},

},
{
    timestamps : true
})

module.exports = mongoose.model("Project", projectSchema)