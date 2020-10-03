const User = require("../models/user.model")
const UserHash = require('../models/userhash.model')
const Token = require("../models/user.token.model")
const PasswordHash = require("password-hash")
const nodemailer = require("nodemailer");
var crypto = require ('crypto'); //node module to create hashes
var Project = require('../models/project.model')
var Task = require('../models/task.model');

exports.signup = async (req,res) => {
    console.log("in Signup")

    var user = await User.findOne({ email: req.body.email })
    if (user) {
      // 409 : Conflict
      return res.status(409).send({ message: "User already exists" })
    }

    user = new User({
        email: req.body.email,
        password: PasswordHash.generate(req.body.password),
        name: req.body.name,
        isOwner : req.body.isOwner
      })

      User.create(user,async function(err,user){
        if(err){
            res.status(500).send({message : "Error in creating account"})
        }
            hash = crypto.createHash('sha256').update(user._id.toString(),'utf8').digest('hex')
            UserHash.create({userid : user._id , hash : hash}).then(userhash => {
                console.log("Hash Generated")
            }).catch(err => {
                console.log("Error in creating hash")
            })

            sendEmail(hash,req.body.email)
            var token = new Token({ userId: user._id })
            token = await token.save()
          
            res.header("authorization", token._id)
         // res.cookie("authorization",token._id,{signed : true,path : "/"})
            res.status(200).send({
                message : "Account created successfully. Verification link sent on email",
                data : user
            })
      })

    
}

    function sendEmail(hash,email){
        console.log(process.env.EMAIL + process.env.PASS)
        let smtpTransport = nodemailer.createTransport({
            service: "Gmail",
            auth: {
              user: process.env.EMAIL,
              pass: process.env.PASS
            }
          });
        
          let link = "http://localhost:3000/api/owner/confirm/"+hash
          let mailOptions = {
            to: email,
            subject: process.env.EMAIL_SUB,
            html: process.env.EMAIL_MSG + " " + link
          }
        
          smtpTransport.sendMail(mailOptions, function (err, msg) {
            if (err) {
              console.log(err);
            }
            else {
              console.log("mail sent");
            }
          });
    }

    exports.confirm = async(req,res) => {
        await UserHash.findOne({hash : req.params.hash},async (err, result) => {
            if(err){
                console.log("Hash was not found")
            }
            console.log(result)
           await User.findByIdAndUpdate(result.userid._id,{isConfirmed : true},{new : true},async(err,user) => {
                if (err) {
                    res
                      .status (500)
                      .send ({msg: 'Error occured while updating user document'});
                  }
                  deleteHash(user)
                  res.redirect("/ownerhomepage")
            })
        })
    }

     deleteHash =  async(user) => {
        await UserHash.findOneAndDelete({userid : user._id},async(err,res) => {
            if (err) console.log ('Hash could not be deleted');
             else console.log ('Hash deleted successfully!');
        })
    }

    exports.signin = async(req,res) => {
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
       // res.cookie("authorization",token._id,{signed : true,path : "/"})
        res.status(200).send({user : user})
    }

    exports.signout = async (req, res) => {
        // Remove token from database
        await Token.findByIdAndDelete(req.token._id,async(err,result)=>{
            if(err){
                console.log("Error in deleting token")
                res.status(500).send({message : "Error in sign out"})
            }
            console.log(result)
            res.status(200).send("Sign out Done")
        })
        
      }
      
      exports.signoutall = async (req, res) => {
        // Remove all tokens associated with the userId
        var tokens = await Token.deleteMany({ userId: req.token.userId },async(err,result)=>{
            if(err){
                console.log("Error in deleting token")
                res.status(500).send({message : "Error in sign out"})
            }
            console.log(tokens)
            res.status(200).send({ message: "Signout all success" })
        })
       
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
      
exports.retrieveuser = async (req, res) => {
// Send user associated with userId
console.log("......................... ",req.baseUrl);
console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!",req.originalUrl);
console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`",req.url);
console.log("````````````````````````````````",req.path);
console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>",req.fresh);
console.log("::::::::::::::::::::::::::::",req.hostname);
console.log("???????????????????????????",req.ip);
console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@22",req.route);
console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$",req.signedCookies);
console.log("in retrieve")
var user =(await User.findById(req.token.userId)).populate("tasks")
if (!user) {
    res.status(404).send({ message: "User not found" })
}
res.status(200).send(user)
}
      

exports.createProject = async (req, res) => {
  
    var project = await Project.findOne({ name: req.body.name })
    if (project) {
      // 409 : Conflict
      return res.status(409).send({ message: "Same Project name already exists" })
    }
  
    project = new Project({
      name: req.body.name,
      owners : req.token.userId,
      accessType : req.body.accessType,
      creationDate : new Date()
    })
    
      project = await project.save()
      res.status(200).send(project)
    
  }

  exports.invitemember = async(req,res) => {

    let candidatesEmail = req.body.candidates
    let count = 0
    console.log(candidatesEmail);
    let rejectedEmails = []
    await Project.findOne({name : req.params.pname},async (err,project)=>{
        if(err){
            console.log("project not found")
        }
        for (let i = 0; i < candidatesEmail.length; i++) {
            await User.findOne({email : candidatesEmail[i]},async(err,user)=>{
                if(err){
                    console.log("user not found")
                   
                }
                if(!user)
                count++
                if(project.members.includes(user._id)){
                    rejectedEmails.push(candidatesEmail[i])
                }

            })
           if(count > 0)
           res.status(404).send({message : "Some of the email-ids are not registered with us"})
            
        }
        console.log(rejectedEmails);
        let remainingCandidates = candidatesEmail.filter(function(x){
          if(!rejectedEmails.includes(x))
          return x
        })
        console.log(remainingCandidates)

        for (let i = 0; i < remainingCandidates.length; i++) {
                await User.findOne({email : remainingCandidates[i]},async (err,user)=>{
                    if(err){
                        console.log("user not found")
                        res.status(404).send({message : "Some of email are not registered with us"})
                    }
                    console.log("user is ................................." + user);
                    await project.update({"$push" : {"members" : user._id}},{"new" : true,"upsert" : true})
                })
            
        }
    })

    res.status(200).send({message : "Members Added"})
  
  }

  exports.editProject = async (req, res) => {
    var project = await Project.findByIdAndUpdate(req.params.pid, {"name" :  req.body.name,"accessType" : req.body.accessType})
    
    if (!project) {
      // 404 Not Found
      return res.status(404).send({ message: "Project does not exists" })
    }
  
    res.status(200).send({message : "Updated Successfully"})
  }
  
  exports.removemember = async (req,res) => {
    console.log(req.params.pname + req.params.uid);
        await Project.findOne({ name : req.params.pname},async (err,project) => {
            if(err){
                console.log("Project not found")
                res.status(404).send({message : "Project not found"})
            }
            if(!project){
              console.log("Project not found.........................................");
            }
            var index = project.members.indexOf(req.params.uid)
            if(index < 0){
                console.log("User not found")
                res.status(404).send({message : "User not found"})
            }
            else{
                project.members.splice(index,1)
                await project.save()
                res.status(200).send({message : "Deleted Succesfully"})
            }
        })
  }

  exports.deleteProject = async(req,res) => {
    console.log("In delete")
    var project = await Project.findByIdAndDelete(req.params.pid)
  console.log(project)
  res.status(200).send({ message: "Project deleted" })
  }

  exports.deletePrivateProject = async(req,res) => {
    
  }

  exports.project = async(req,res) => {
    var project = await Project.findOne({name : req.params.pname}).populate("tasks").populate("members")
    console.log(project)  
    if(!project)
    res.status(404).send({message : "Project Not found"})
    res.status(200).send({project})
  }

  exports.projectmember = async(req,res) => {
    console.log("in project member");
    var project = await Project.findOne({name : req.params.pname}).populate("members").populate("owners")
    let owners = []
    for (let i = 0; i < project.owners.length; i++) {
      owners.push(project.owners[i])
    }
    let members = []

    for (let i = 0; i < project.members.length; i++) {
      members.push(project.members[i])
    }
 
    if(!project)
    res.status(404).send({message : "Project Not found"})
    res.status(200).send({owners : owners , members : members , name : project.name})
  }
  
  
  exports.projects = async(req,res) => {
    var projects = await Project.find({accessType : "Public"}).populate("tasks").populate("members")
    console.log(projects)
    res.status(200).send({projects})
  }

  exports.privateprojects = async(req,res) => {
      var privateprojects = await Project.find({accessType : "Private"}).populate("tasks").populate("members")
      console.log(privateprojects)
    res.status(200).send({privateprojects})
  }

  exports.createTask = async(req,res) => {
    console.log(req.body)
    if (!(req.body.file == undefined)) {
    req.body.file = 'upload/' + req.body.file;
  }
    await Project.findOne({name : req.params.pname},async(err,project) => {
        if(err){
            console.log("Project Not found")
            res.status(404).send({message : "Project not found"})
        }

        await User.findById(req.token.userId,async(err,user) => {
            if(err){
                console.log("Wrong Token")
                res.status(404).send({message : "User not found"})
            }
            task = new Task({
                name: req.body.name,
                description : req.body.description,
                assignedTo : req.body.assignedTo, 
                author : user.name,
                file : req.body.file,
                dueDate : req.body.dueDate,
                notes : req.body.notes
            })
            await task.save()

            project.tasks.push(task._id)
            await project.save()
        })
        res.status(200).send({project})
    })
    
  }

  exports.createOwnTask = async(req,res) => {
      await User.findById(req.token.userId,async(err,user) => {
        if(err){
            console.log("Wrong Token")
            res.status(404).send({message : "User not found"})
        }
        task = new Task({
            name: req.body.name,
            description : req.body.description,
            author : user.name,
            dueDate : req.body.dueDate,
            assignedTo : req.body.assigned,
            notes : req.body.notes
        })
        await task.save()

        user.tasks.push(task._id)
        await user.save()
      })
  }

  exports.editTask = async(req,res) => {
      await Task.findById(req.params.tid, async(err,task) => {
            if(err){
                console.log("Wrong Task id")
            res.status(404).send({message : "Task not found"})
            }
           await task.update({name: req.body.name,
              description : req.body.description,
              author : req.body.author,
              dueDate : req.body.dueDate,
              notes : req.body.notes,
              status : req.body.status,
              assignedTo : req.body.assignedTo})
            
            
            res.status(200).send({task})
      })

      
  }

  exports.deleteTask = async (req, res) => {
    console.log("In delete task")
      var task = await Task.findByIdAndDelete(req.params.tid)
    console.log(task)
    res.status(200).send({ message: "Task deleted" })
  }

  exports.task = async(req,res) => {
    var task = await Task.findById(req.params.tid)
    console.log(task)
    if(!task)
    res.status(404).send({message : "Task Not found"})
    res.status(200).send({task})
  }
  
  