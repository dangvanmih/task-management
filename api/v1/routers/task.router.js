const express = require("express");
const router = express.Router();
const Task = require("../models/task.model");
const controller = require("../controllers/task.controller");

router.get("/", controller.index)

router.get("/detail/:id", controller.taskDetail );

router.patch("/change-status/:id",controller.changeStatus);

router.patch("/change-multi/",controller.changeMulti);

module.exports = router;