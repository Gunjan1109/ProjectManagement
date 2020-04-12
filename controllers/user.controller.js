// status code ref : https://developer.mozilla.org/en-US/docs/Web/HTTP/Status

const User = require("../models/user.model")
const Token = require("../models/user.token.model")
const PasswordHash = require("password-hash")

exports.signup = async (req, res) => {
  
  // First check if account exists with this email id
  var user = await User.findOne({ email: req.body.email })
  if (user) {
    // 409 : Conflict
    return res.status(409).send({ message: "User already exists" })
  }

  // Create a new user with the data client has sent
  // Make sure to hash the password
  user = new User({
    email: req.body.email,
    gender : req.body.gender,
    password: PasswordHash.generate(req.body.password),
    name: req.body.name
  })

  // save user in database
  user = await user.save()

  // create new token
  var token = new Token({ userId: user._id })

  // save token in database
  token = await token.save()

  res.header("authorization", token._id)
  res.status(200).send({ message: "Account created successfully" })
}

exports.signin = async (req, res) => {
  // First check if account exists with this email id
  var user = await User.findOne({ email: req.body.email })
  
  if (!user) {
    // 404 Not Found
    return res.status(404).send({ message: "Account does not exists" })
  }

  // verify password
  if (!PasswordHash.verify(req.body.password, user.password)) {
    // 403 : Forbidden
    return res.status(403).send({ message: "Invalid password" })
  }

  // create new token
  var token = new Token({ userId: user._id })

  // save token in database
  token = await token.save()

  res.header("authorization", token._id)
  res.status(200).send(user)
}

exports.signout = async (req, res) => {
  // Remove token from database
  var token = await Token.findByIdAndDelete(req.token._id)
  console.log(token)
  res.status(200).send({ message: "Signout success" })
}

exports.signoutall = async (req, res) => {
  // Remove all tokens associated with the userId
  var tokens = await Token.deleteMany({ userId: req.token.userId })
  console.log(tokens)
  res.status(200).send({ message: "Signout all success" })
}

exports.edit = async (req,res) => {
  console.log("in edit")
  console.log(req.token.userId)
  var user = await User.findByIdAndUpdate(req.token.userId,{"name" : req.body.name , "gender" : req.body.gender},{useFindAndModify: false})

  console.log(user)
  if(!user){
    res.status(404).send({message : "User not found"})
  }

  res.status(200).send({message : "User updated"})

}

exports.changePassword = async (req,res) => {
  var user = await User.findById(req.token.userId)
  console.log(user)
  if(!user){
    res.status(404).send({message : "User not found"})
  }
  console.log(req.body.oldpassword)
  console.log(PasswordHash.verify(req.body.oldpassword, user.password))
  if (!PasswordHash.verify(req.body.oldpassword, user.password)) {
    // 403 : Forbidden
    return res.status(403).send({ message: "Entered password is wrong" })
  }
  
  console.log("After checking password")
  var user = await User.findByIdAndUpdate(req.token.userId, {"password" : PasswordHash.generate(req.body.newpassword)},{useFindAndModify: false})

  res.status(200).send({message : 'password Updated'})
}

exports.join = async(req,res) => {

}


exports.retrieveuser = async (req, res) => {
  // Send user associated with userId
  var user = await User.findById(req.token.userId)
  if (!user) {
    res.status(404).send({ message: "User not found" })
  }
  res.status(200).send(user)
}

