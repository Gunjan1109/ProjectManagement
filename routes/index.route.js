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

router.get("/taskpage" , index_controller.taskpage)

router.get("/addmembers",index_controller.addmembers)

router.get("/profile" , function (req,res) {
    console.log("in profile")
    res.render("profile")
})

module.exports = router;
