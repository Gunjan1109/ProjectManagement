const Project = require("../models/project.model")
const WorkSpace = require('../models/workspace.model')
exports.create = async (req, res) => {
  
  var project = await WorkSpace.findOne({ name: req.body.name })
  if (project) {
    // 409 : Conflict
    return res.status(409).send({ message: "Same Project name already exists" })
  }

  project = new Project({
    name: req.body.name,
    members : req.token.userId,
    owner : req.token.userId,
    accessType : req.body.accessType,
    creationDate : new Date()
  })

  project = await project.save()

  var workspace = await WorkSpace.findByIdAndUpdate(req.params.wid,{"projects" : project._id},{ "new": true, "upsert": true })

  res.status(200).send(workspace)
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
  var project = await Project.findById(req.params.pid)
  console.log(project)
  if(!project)
  res.status(404).send({message : "Project Not found"})
  res.status(200).send({project})
}



