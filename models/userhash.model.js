const mongoose = require('mongoose')

var Schema = mongoose.Schema
mongoose.set('useFindAndModify', false);

let userhashSchema = new mongoose.Schema({
    userid : {type : mongoose.Schema.Types.ObjectId},
    hash : {type : String}
})

module.exports = mongoose.model('UserHash',userhashSchema);