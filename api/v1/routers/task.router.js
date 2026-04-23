const express = require("express");
const router = express.Router();
const controller = require("../controllers/task.controller");

router.get("/", controller.index)

router.get("/detail/:id", controller.taskDetail );

router.patch("/change-status/:id",controller.changeStatus);

router.patch("/change-multi/",controller.changeMulti);

router.post("/create/",controller.createPost);

router.patch("/edit/:id",controller.editPatch);

router.delete("/delete/:id",controller.delete);
module.exports = router;