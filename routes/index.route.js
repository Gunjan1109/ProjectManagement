var express = require('express');
var router = express.Router();
var index_controller = require('../controllers/index.controller')

/* GET home page. */

router.get("/", index_controller.homepage)

router.get("/signinpage",index_controller.signinpage)

router.get("/signuppage" , index_controller.signuppage)


module.exports = router;
