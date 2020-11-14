const express = require("express")
const router = express.Router()
const member_controller = require("../controllers/member.controller")
const auth = require("../middlewares/auth")

router.post("/signup", member_controller.signup)

router.post("/signin", member_controller.signin)

router.get("/confirm/:hash",member_controller.confirm)

// router.all("/*",auth,function(next){
//     next()
// })

router.post("/signout", auth, member_controller.signout)

router.post("/signoutall", auth, member_controller.signoutall)

router.put("/",auth,member_controller.edit)

router.put("/changePassword",auth,member_controller.changePassword)

router.get("/member",auth, member_controller.retrieveuser)

router.get("/projects",auth,member_controller.projects)

router.get("/projectmember/:pname",auth,member_controller.projectmember)

router.get("/privateprojects",auth,member_controller.privateprojects)

router.get("/:pname",auth,member_controller.project)

router.post("/",auth,member_controller.createOwnTask)

router.put("/:tid",auth,member_controller.editTask)

router.delete("/:tid", auth, member_controller.deleteTask)

router.get("/",auth,member_controller.task)

module.exports = router 