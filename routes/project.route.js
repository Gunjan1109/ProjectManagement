const express = require("express")
const router = express.Router()
const project_controller = require("../controllers/project.controller")
const auth = require("../middlewares/auth")

router.post("/create",auth, project_controller.create)

router.put("/:id",auth, project_controller.edit)

// router.post("/invite", auth, project_controller.invite)

router.delete("/:id", auth, project_controller.delete)

router.get("/", auth, project_controller.retrieveproject)

module.exports = router