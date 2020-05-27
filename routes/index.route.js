var express = require('express');
var router = express.Router();
var index_controller = require('../controllers/index.controller')
/* GET home page. */

router.get("/", index_controller.startpage)

router.get("/homepage" , index_controller.homepage)

router.get("/signinpage",index_controller.signinpage)

router.get("/signuppage" , index_controller.signuppage)

router.get("/projectpage" , index_controller.projectpage)

router.get("/homepage2/:pname" , index_controller.homepage2)

router.get("/taskpage/:pname" , index_controller.taskpage)

// router.get("/members/:pname",index_controller.members)

router.get("/profile" , index_controller.profile)

router.get("/updatetask", index_controller.updatetask)

router.get("/deletetask/:id/:name",index_controller.deletetask)

module.exports = router;
