const Project = require("../models/project.model")
const User = require('../models/user.model')

exports.create = async (req, res) => {
  
  var project = await Project.findOne({ name: req.body.name })
  if (project) {
    // 409 : Conflict
    return res.status(409).send({ message: "Same Project name already exists" })
  }

  project = new Project({
    name: req.body.name,
    members : req.token.userId,
    owners : req.token.userId,
    accessType : req.body.accessType,
    creationDate : new Date()
  })

  project = await project.save()

  var user = await User.findByIdAndUpdate(req.token.userId, { $push: { "projects": project._id } }, { "new": true, "upsert": true })
  res.status(200).send(user)
}

exports.invite = async (req,res) => {
  var user = await User.findOne({email : req.body.email})
  var project = await Project.findOne({name : req.body.name})
  user = await User.findByIdAndUpdate(user._id,{ $push: { "projects": project._id } });
  project = await Project.findByIdAndUpdate(project._id,{ $push: { "members": user._id } }) 
  res.status(200).send("Member Added") 
}

exports.edit = async (req, res) => {
  var project = await Project.findByIdAndUpdate(req.params.pid, {"name" :  req.body.name,"accessType" : req.body.accessType})
  
  if (!project) {
    // 404 Not Found
    return res.status(404).send({ message: "Project does not exists" })
  }

  res.status(200).send({message : "Updated Successfully"})
}

exports.delete = async (req, res) => {
    var project = await Project.findByIdAndDelete(req.params.pid)
  console.log(project)
  res.status(200).send({ message: "Project deleted" })
}

exports.project = async(req,res) => {
  var project = await Project.findOne({name : req.params.pname}).populate("tasks")
  console.log(project)  
  if(!project)
  res.status(404).send({message : "Project Not found"})
  res.status(200).send({project})
}
