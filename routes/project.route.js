const express = require("express")
const router = express.Router()
const project_controller = require("../controllers/project.controller")
const auth = require("../middlewares/auth")

router.post("/project",auth, project_controller.create)

router.put("/:pid",auth, project_controller.edit)

router.post("/invite/:pid", auth, project_controller.invite)

router.delete("/:pid", auth, project_controller.delete)

router.get("/:id",auth,project_controller.project)

module.exports = router 