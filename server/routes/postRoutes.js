const express = require("express");
const router = express.Router();

const {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
} = require("../controller/postcontrols");
const protect = require("../middleware/authMiddleware");

//Public routes
router.get("/", getAllPosts);
router.get("/:id", getPostById);

//Protected routes
router.post("/", protect, createPost);
router.put("/:id", protect, updatePost);
router.delete("/:id", protect, deletePost);

module.exports = router;
