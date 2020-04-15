// status code ref : https://developer.mozilla.org/en-US/docs/Web/HTTP/Status

const WorkSpace = require("../models/workspace.model")
const User = require('../models/user.model')
const nodemailer = require("nodemailer");

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

  var user = await User.findByIdAndUpdate(req.token.userId,{"workspaces" : workspace._id},{ "new": true, "upsert": true })

  res.status(200).send(workspace)
}

exports.edit = async (req, res) => {
  var workspace = await WorkSpace.findByIdAndUpdate(req.params.wid, {"name" :  req.body.name,"accessType" : req.body.accessType})
  
  if (!workspace) {
    // 404 Not Found
    return res.status(404).send({ message: "WorkSpace does not exists" })
  }

  res.status(200).send({message : "Updated Successfully"})
}

exports.delete = async (req, res) => {
    var workspace = await WorkSpace.findByIdAndDelete(req.params.wid)
  console.log(workspace)
  res.status(200).send({ message: "WorkSpace deleted" })
}

exports.invite = async (req,res) => {

  let transporter = nodemailer.createTransport({
    service: "gmail",
    port: 25,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "gunjangarg092000@gmail.com", // generated ethereal user
      pass: "7210476954" // generated ethereal password
    }
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"gunjangarg092000@gmail.com', // sender address
    to: req.body.email, // list of receivers
    subject: "Email Verifcation", // Subject line
    text: `Click this link for verification`, // plain text body
    html: `<a href = "http://localhost:3000/api/users/confirm/${req.body.email}">Click this link</a>` // html body
  });

  console.log("Message sent to " + req.body.email);
}

exports.workspace = async(req,res) => {
  var workspace = await WorkSpace.findById(req.params.wid)
  console.log(workspace)
  if(!workspace)
  res.status(404).send({message : "Workspace Not found"})
  res.status(200).send({workspace})
}

