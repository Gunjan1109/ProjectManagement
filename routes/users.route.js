const express = require("express")
const router = express.Router()
const user_controller = require("../controllers/user.controller")
const auth = require("../middlewares/auth")

router.post("/signup", user_controller.signup)

router.post("/signin", user_controller.signin)

router.post("/signout", auth, user_controller.signout)

router.post("/signoutall", auth, user_controller.signoutall)

router.put("/edit",auth,user_controller.edit)

router.put("/changePassword",auth,user_controller.changePassword)

router.get("/confirm/:email",user_controller.confirm)

router.post("/join",auth,user_controller.join)

router.get("/user", auth, user_controller.retrieveuser)

module.exports = router