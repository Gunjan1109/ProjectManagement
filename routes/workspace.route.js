const express = require("express")
const router = express.Router()
const workSpace_controller = require("../controllers/workspace.controller")
const auth = require("../middlewares/auth")

router.post("/workspace",auth, workSpace_controller.create)

router.put("/:wid",auth, workSpace_controller.edit)

router.post("/invite/:wid",auth,workSpace_controller.invite)

router.delete("/:wid", auth, workSpace_controller.delete)

router.get("/workspace/:wid",auth,workSpace_controller.workspace)


module.exports = router