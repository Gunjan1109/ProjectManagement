const express = require("express")
const router = express.Router()
const workSpace_controller = require("../controllers/workspace.controller")
const auth = require("../middlewares/auth")
const workspaceAuth = require('../middlewares/workspaceAuth')

router.post("/create",auth, workSpace_controller.create)

router.put("/edit",auth,workspaceAuth, workSpace_controller.edit)

router.delete("/delete", auth,workspaceAuth, workSpace_controller.delete)

router.get("/", auth, workSpace_controller.retrieveworkspace)

module.exports = router