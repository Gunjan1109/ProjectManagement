const express = require("express")
const router = express.Router()
const owner_controller = require("../controllers/owner.controller")
const auth = require("../middlewares/auth")

router.post("/signup", owner_controller.signup)

router.post("/signin", owner_controller.signin)

router.post("/signout", auth, owner_controller.signout)

router.post("/signoutall", auth, owner_controller.signoutall)

router.put("/",auth,owner_controller.edit)

router.put("/changePassword",auth,owner_controller.changePassword)

router.get("/confirm/:hash",owner_controller.confirm)

router.get("/owner", auth, owner_controller.retrieveuser)

router.post("/project/",auth, owner_controller.createProject)

router.put("/:pid",auth, owner_controller.editProject)

router.post("/invite/:pname", auth, owner_controller.invitemember)

router.post("/remove/:pname/:uid",auth,owner_controller.removemember)

router.delete("/:pid", auth, owner_controller.deleteProject)

router.delete("/private/:pid",auth,owner_controller.deletePrivateProject)

router.get("/project/:pname",auth,owner_controller.project)

router.get("/projectmember/:pname",auth,owner_controller.projectmember)

router.get("/projects",auth,owner_controller.projects)

router.get("/privateprojects",auth,owner_controller.privateprojects)

router.post("/task/:pname",auth, owner_controller.createTask)

router.post("/",auth,owner_controller.createOwnTask)

router.put("/task/:tid",auth,owner_controller.editTask)

router.delete("/task/:tid", owner_controller.deleteTask)

router.get("/task",auth,owner_controller.task)


module.exports = router 