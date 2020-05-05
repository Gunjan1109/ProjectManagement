// status code ref : https://developer.mozilla.org/en-US/docs/Web/HTTP/Status

const Task = require("../models/task.model")
const Project = require('../models/project.model')
const User = require('../models/user.model')
exports.create = async (req, res) => {
  console.log(req.body)
  var user = await User.findOne({email : req.body.assignedTo})
  if(!user)
  res.status(404).send({message : "Email id has not registered with us"})
  var project = await Project.findOne({name : req.body.pname})
  var user = await Project.findOne({members : user._id})
  if(!user)
  res.status(404).send({message : "User is not added in project"})
  if(!project)
  res.status(404).send("Project is not created")
  task = new Task({
    name: req.body.name,
    description : req.body.description,
    assignedTo : req.body.assignedTo
  })

  task = await task.save()

  var project = await Project.findByIdAndUpdate(project._id,{ $push: { "tasks": task._id } },{ "new": true, "upsert": true })

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
  var task = await Task.findById(req.params.tid)
  console.log(task)
  if(!task)
  res.status(404).send({message : "Task Not found"})
  res.status(200).send({task})
}


