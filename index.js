const express = require("express");
const app = express();
require("dotenv").config();
const database = require("./config/database");
const port = process.env.PORT;

database.connect();
const Task = require("./models/task.model");

app.get("/task", async (req, res) => {
  const task = await Task.find({
    deleted: false
  });

  res.json(task)
})

app.get("/task/detail/:id", async (req, res) => {

  try {
    const id = req.params.id;
    const task = await Task.findOne({
      _id: id,
      deleted: false
    });

    res.json(task)
  } catch (error) {
      res.json("không tìm thấy") 
  }
})



app.listen(port, () => {
  console.log(`App listening on port ${port}`);
})