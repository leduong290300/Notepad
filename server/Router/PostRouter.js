const express = require("express");
const router = express.Router();
const verifyToken = require("../Middleware/auth");
const {
  getAllPosts,
  createPost,
  updatePost,
  deletePost,
} = require("../Controller/PostController");

router.route("/").get(verifyToken, getAllPosts);
router.route("/").post(verifyToken, createPost);
router.route("/:id").put(verifyToken, updatePost);
router.route("/:id").delete(verifyToken, deletePost);

module.exports = router;
