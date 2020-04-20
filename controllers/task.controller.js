// status code ref : https://developer.mozilla.org/en-US/docs/Web/HTTP/Status

const Task = require("../models/task.model")
const Project = require('../models/project.model')
const User = require('../models/user.model')
exports.create = async (req, res) => {
  
  var task = await WorkSpace.findOne({ name: req.body.name })
  if (task) {
    // 409 : Conflict
    return res.status(409).send({ message: "Task already exists" })
  }

  var user = await User.findOne({email : req.body.assignedTo})

  task = new Task({
    name: req.body.name,
    description : req.body.description,
    dueDate : req.body.dueDate,
    assignedTo : user._id
  })

  task = await task.save()

  var project = await Project.findByIdAndUpdate(req.params.pid,{"projects" : task._id},{ "new": true, "upsert": true })

  res.status(200).send(project)
}

exports.edit = async (req, res) => {
  var task = await Task.findByIdAndUpdate(req.params.tid, (req.body),{ "new": true, "upsert": true })
  
  user = await User.findByIdAndUpdate(user._id,{"tasks" : task._id},{ "new": true, "upsert": true })

  if (!task) {
    // 404 Not Found
    return res.status(404).send({ message: "Task does not exists" })
  }

  res.status(200).send({message : "Updated Successfully"})
}

exports.delete = async (req, res) => {
    var task = await Task.findByIdAndDelete(req.params.tid)
  console.log(task)
  res.status(200).send({ message: "Project deleted" })
}

exports.task = async(req,res) => {
  var task = await Task.findById(req.params.wid)
  console.log(task)
  if(!task)
  res.status(404).send({message : "Task Not found"})
  res.status(200).send({task})
}


