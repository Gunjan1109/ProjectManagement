// status code ref : https://developer.mozilla.org/en-US/docs/Web/HTTP/Status

const Task = require("../models/task.model")
const Project = require('../models/project.model')
const User = require('../models/user.model')
const Token = require('../models/user.token.model')
exports.create = async (req, res) => {
  console.log(req.body)
  var user = await User.findOne({email : req.body.assignedTo})
  if(!user)
  res.status(404).send({message : "Email id has not registered with us"})
  var project = await Project.findOne({name : req.body.pname})
  var user2 = await User.findById(req.token.userId)
  console.log("req.token.user is ==" + req.token.userId)
  console.log(user2)
  if(!user)
  res.status(404).send({message : "User is not added in project"})
  if(!project)
  res.status(404).send("Project is not created")
  task = new Task({
    name: req.body.name,
    description : req.body.description,
    assignedTo : req.body.assignedTo,
    author : user2.name,
    dueDate : req.body.dueDate

  })

  task = await task.save()

  var project = await Project.findByIdAndUpdate(project._id,{ $push: { "tasks": task._id } },{ "new": true, "upsert": true })

  res.status(200).send(project)
}

exports.edit = async (req, res) => {
  console.log(req.body.name)
  console.log("in edit")
  var t = await Task.findOne({name : req.body.name})
  console.log("::::::::::::::::::::::::::::" + t.name + ":::::::::::::::::::::::::::::::::")
  console.log("Id is ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::" + t._id)
  var task = await Task.findByIdAndUpdate(t._id,{"status": req.body.status})

  if (!task) {
    // 404 Not Found
    return res.status(404).send({ message: "Task does not exists" })
  }

  res.status(200).send({message : "Updated Successfully"})
}

exports.delete = async (req, res) => {
  var t = await Task.findOne({name : req.body.name})
    var task = await Task.findByIdAndDelete(t._id)
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


