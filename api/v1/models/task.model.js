const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: String,
    createdBy:String,
    listUser: Array,
    status: String,
    content: String,
    timeStart: Date,
    timeFinish: Date,
    deleted: {
      type: Boolean,
      default: false
    },
    deletedAt: Date
  },
  {
    timestamps: true
  }
);
const Task = mongoose.model("Task", taskSchema, "tasks");
module.exports = Task;