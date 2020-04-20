
const User = require("../models/user.model")
const Token = require("../models/user.token.model")
const PasswordHash = require("password-hash")
const nodemailer = require("nodemailer");
exports.signup = async (req, res) => {
  console.log("in signup")
  console.log(req.body)
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


  // create reusable transporter object using the default SMTP transport
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
  console.log("after email")
 
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account

  // save user in database
  user = await user.save()

  // create new token
  var token = new Token({ userId: user._id })

  // save token in database
  token = await token.save()

  res.header("authorization", token._id)
  res.status(200).send({ message: "Account created successfully . Verify your email first to login" })
}

exports.confirm = async(req,res) => {
  console.log("in confirm")
    var user = await User.findOne({email : req.params.email})

    if(!user){
      res.send({message : "Wrong URL"})
    }
    if(user){
      var user = await User.findByIdAndUpdate(user._id,{isConfirmed : true})
      let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
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
    to: req.params.email, // list of receivers
    subject: "Email Verified", // Subject line
    text: "Congratulations You are verified now", // plain text body
    
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    }

    res.send({message : "Verified"})
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

  if(!user.isConfirmed){
    return res.status(405).send({message : "Email not Verified"})
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
  var user = await User.findByIdAndUpdate(req.token.userId,{"name" : req.body.name , "gender" : req.body.gender})

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
  var user = await User.findByIdAndUpdate(req.token.userId, {"password" : PasswordHash.generate(req.body.newpassword)})

  res.status(200).send({message : 'password Updated'})
}

exports.join = async(req,res) => {

}


exports.retrieveuser = async (req, res) => {
  // Send user associated with userId
  var user = await User.findById(req.token.userId).populate("workspaces","projects","tasks")
  if (!user) {
    res.status(404).send({ message: "User not found" })
  }
  res.status(200).send(user)
}

