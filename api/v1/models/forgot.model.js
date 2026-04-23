const mongoose = require("mongoose");
const forgotPaswordSchema = new mongoose.Schema(
  {
    email: String,
    otp: String,
    expireAt: {
      type: Date,
      expires: 0 
    }
  },
  {
    timestamps: true
  }
);
const forgotPassword = mongoose.model("forgotPassword", forgotPaswordSchema, "forgot-password");
module.exports = forgotPassword;