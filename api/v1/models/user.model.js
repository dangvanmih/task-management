const mongoose = require("mongoose");
const generate = require("../../../helper/generate");
const userSchema = new mongoose.Schema(
  {
    fullName: String,
    email: String,
    password: String,
    token: String,
    phone: String,
    avatar: String,
    status:{
      type: String,
      default: "active"
    },
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
const User = mongoose.model("User", userSchema, "users");
// tham số thứ nhất là tên của model
// tham số thứ 2 là cấu trúc document bên trên nó sẽ quyết định file, kiểu dữ liệu
// tham số thứ 3 Đây là tên collection thật trong MongoDB
module.exports = User;