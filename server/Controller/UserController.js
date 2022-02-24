const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const User = require("../Models/UserModel");

const verifyAuth = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "Người dùng không tồn tại" });
    res.json({ success: true, user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Lỗi máy chủ" });
  }
};

const handleLogin = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Kiểm tra sự tồn tại của người dùng
    const user = await User.findOne({ username });
    if (!user)
      return res.status(400).json({
        success: false,
        message: "Tên đăng nhập hoặc mật khẩu không chính xác",
      });

    // Kiểm tra mật khẩu nhập vào
    const passwordValid = await argon2.verify(user.password, password);
    if (!passwordValid)
      return res.status(400).json({
        success: false,
        message: "Tên đăng nhập hoặc mật khẩu không chính xác",
      });

    //Trả lại token người dùng sau khi đăng nhập thành công
    const accessToken = jwt.sign(
      { userId: user._id },
      process.env.ACCESS_TOKEN_SECRET,
    );

    res.json({
      success: true,
      message: "Đăng nhập thành công",
      accessToken,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Lỗi máy chủ" });
  }
};

const handleRegister = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check for existing user
    const user = await User.findOne({ username });

    if (user)
      return res
        .status(400)
        .json({ success: false, message: "Tên đăng nhập đã được sử dụng" });

    // All good
    const hashedPassword = await argon2.hash(password);
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    // Return token
    const accessToken = jwt.sign(
      { userId: newUser._id },
      process.env.ACCESS_TOKEN_SECRET,
    );

    res.json({
      success: true,
      message: "Đăng kí tài khoản thành công",
      accessToken,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Lỗi máy chủ" });
  }
};

module.exports = { verifyAuth, handleLogin, handleRegister };
