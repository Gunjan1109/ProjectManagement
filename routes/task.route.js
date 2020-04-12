const express = require("express")
const router = express.Router()
const task_controller = require("../controllers/task.controller")
const auth = require("../middlewares/auth")

router.post("/create",auth, task_controller.create)

router.put("/:id",auth, task_controller.edit)

router.delete("/:id", auth, task_controller.signoutall)

router.get("/", auth, task_controller.retrievetask)

module.exports = router