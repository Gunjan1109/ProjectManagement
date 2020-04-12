const mongoose = require('mongoose')

var Schema = mongoose.Schema

let workspaceSchema = new mongoose.Schema({
    name : {type : String , required : true},
    projects : [{type : Schema.Types.ObjectId, ref : 'Project',required : true}],
    members : [{type : Schema.Types.ObjectId, ref : 'User',required : true}],
    accessType : {type : String , required : true},
    owner : [{type : Schema.Types.ObjectId, ref : 'User',required : true}],
    creationDate : {type : Date , required : true}
})

module.exports = mongoose.model("WorkSpace", workspaceSchema)