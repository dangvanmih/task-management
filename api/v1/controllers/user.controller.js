const User = require("../models/user.model");
const md5 = require("md5");
//[POST] /api/v1/users/
module.exports.register = async (req, res) => {
  try {
    req.body.password = md5(req.body.password);

    const exitEmail = await User.findOne({
      email: req.body.email,
      deleted: false
    });

    if (exitEmail) {
      res.json({
        code: 400,
        message: "Email đã tồn tại!"
      })
    }

    else {
      const user = new User({
        fullName: req.body.fullName,
        email: req.body.email,
        password: req.body.password
      });

      await user.save();

      const token = user.token;
      res.cookie("token", token);
      res.json({
        code: 200,
        message: "Đăng ký thành công!",
        token: token
      });
    }


  } catch (error) {
    res.json("không tìm thấy");
  }
};
