// status code ref : https://developer.mozilla.org/en-US/docs/Web/HTTP/Status

const WorkSpace = require("../models/workspace.model")
const Token = require('../models/workspace.token.model')
const User = require('../models/user.model')
exports.create = async (req, res) => {
  
  var workspace = await WorkSpace.findOne({ name: req.body.name })
  if (workspace) {
    // 409 : Conflict
    return res.status(409).send({ message: "Same workspace name already exists" })
  }

  workspace = new WorkSpace({
    name: req.body.name,
    members : req.token.userId,
    owner : req.token.userId,
    accessType : req.body.accessType,
    creationDate : new Date()
  })

  workspace = await workspace.save()

  var token = new Token({workspaceId : workspace._id})

  token = await token.save()

  res.header("workspaceid",token._id)

  var user = await User.findByIdAndUpdate(req.token.userId,{"workspaces" : workspace._id},{ "new": true, "upsert": true })

  res.status(200).send(workspace)
}

exports.edit = async (req, res) => {
  var workspace = await WorkSpace.findByIdAndUpdate(req.token.workspaceId, {"name" :  req.body.name,"accessType" : req.body.accessType})
  
  if (!workspace) {
    // 404 Not Found
    return res.status(404).send({ message: "WorkSpace does not exists" })
  }

  res.status(200).send({message : "Updated Successfully"})
}

exports.delete = async (req, res) => {
    var workspace = await WorkSpace.findByIdAndDelete(req.token.workspaceId)
  console.log(workspace)
  res.status(200).send({ message: "WorkSpace deleted" })
}


exports.retrieveworkspace = async (req, res) => {
  var workspace = await WorkSpace.find();
  res.status(200).send(workspace)
}

