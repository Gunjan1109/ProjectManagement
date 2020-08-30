var express = require('express');
var router = express.Router();
var index_controller = require('../controllers/index.controller')
/* GET home page. */

router.get("/", index_controller.startpage)

router.get("/verify", index_controller.verify)

router.get("/ownerhomepage", index_controller.ownerhomepage)

router.get("/memberhomepage", index_controller.memberhomepage)

router.get("/newproject", index_controller.newproject)

router.get("/signuppageOwner", index_controller.signuppageOwner)

router.get("/signuppageMember", index_controller.signuppageMember)

router.get("/signinpageOwner", index_controller.signinpageOwner)

router.get("/signinpageMember", index_controller.signinpageMember)

router.get("/ownerhomepage2/:pname", index_controller.ownerhomepage2)

router.get("/memberhomepage2/:pname", index_controller.memberhomepage2)

router.get("/newTask/:pname", index_controller.newTask)

router.get("/newTask", index_controller.myNewTask)

router.get("/members/:name", index_controller.members)

router.get("/viewmembers/:name" , index_controller.viewmembers)

router.get("/addmemberpage/:pname", index_controller.addmember)


// router.get("/profile" , index_controller.profile)

router.get("/updatetask/:id/:name/:description/:author/:notes/:assignedTo/:pname/:dueDate/:status", index_controller.updatetask)

router.get("/updatetaskmember/:id/:name/:status" , index_controller.updatetaskmember)

// router.get("/deletetask/:id/:name",index_controller.deletetask)

module.exports = router
