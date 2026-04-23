const User = require("../models/user.model");
const md5 = require("md5");
//[POST] /api/v1/users/register
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

//[POST] /api/v1/users/login
module.exports.login = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const user = await User.findOne({
    email: email,
    deleted: false
  });

  if (!user) {
    res.json({
      code: 400,
      message: "email không tồn tại!"
    });
    return
  }

  if (md5(password) != user.password) {
    res.json({
      code: 400,
      message: "Mật khẩu không chính xác!"
    });
    return
  }

  const token = user.token;
  res.cookie("token", token);
  res.json({
    code: 200,
    message: "Đăng nhập thành công!",
    token: token
  });
};
