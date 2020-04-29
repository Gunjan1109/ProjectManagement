const express = require("express")
const router = express.Router()
const task_controller = require("../controllers/task.controller")
const auth = require("../middlewares/auth")

router.post("/:pid",auth, task_controller.create)

router.put("/:tid",auth, task_controller.edit)

router.delete("/:tid", auth, task_controller.delete)

router.get("/:tid",auth,task_controller.task)

module.exports = router