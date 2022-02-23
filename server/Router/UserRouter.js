const express = require("express");
const router = express.Router();
const verifyToken = require("../Middleware/auth");
const {
  verifyAuth,
  handleLogin,
  handleRegister,
} = require("../Controller/UserController");

router.route("/").get(verifyToken, verifyAuth);
router.route("/login").post(handleLogin);
router.route("/register").post(handleRegister);

module.exports = router;
