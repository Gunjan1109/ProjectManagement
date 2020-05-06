var express = require('express');
var router = express.Router();
var index_controller = require('../controllers/index.controller')
var auth = require('../middlewares/auth')
/* GET home page. */

router.get("/", index_controller.startpage)

router.get("/homepage" , index_controller.homepage)

router.get("/signinpage",index_controller.signinpage)

router.get("/signuppage" , index_controller.signuppage)

router.get("/projectpage" , index_controller.projectpage)

router.get("/homepage2/:pname" , index_controller.homepage2)

router.get("/taskpage" , index_controller.taskpage)

router.get("/addmembers",index_controller.addmembers)

router.get("/profile" , index_controller.profile)

router.get("/updatetask",auth, index_controller.updatetask)

router.get("/deletetaskpage",auth , index_controller.deletetaskpage)

module.exports = router;
