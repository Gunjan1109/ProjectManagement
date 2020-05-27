const express = require("express")
const router = express.Router()
const task_controller = require("../controllers/task.controller")
const auth = require("../middlewares/auth")

router.post("/",auth, task_controller.create)

router.put("/",auth, task_controller.edit)

router.delete("/:id", auth, task_controller.delete)

router.get("/",auth,task_controller.task)

module.exports = router