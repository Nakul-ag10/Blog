const Post = require("../models/Post");
const User = require("../models/User");
const multer = require("multer");

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "/uploads/avatars");
  },
  filename(req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, `${req.user.id}${ext}`);
  },
});

exports.upload = multer({ storage });

exports.getUserProfile = async (req, res) => {
  res.json(req.user);
};

exports.updateUserProfile = async (req, res) => {
  const { name, email, bio, avatar } = req.body;
  const user = await User.findById(req.user._id);

  if (!user) return res.status(404).json({ message: "User not found" });

  user.name = name || user.name;
  user.email = email || user.email;
  user.bio = bio || user.bio;
  user.avatar = avatar || user.avatar;

  await user.save();
  res.json(user);
};

exports.getAllmyPosts = async (req, res) => {
  const posts = await Post.find({ author: req.user._id }).sort({
    createdAt: -1,
  });
  res.json(posts);
};

exports.uploadAvatar = async (req, res) => {
  const user = await User.findById(req.user.id);

  if (user) {
    user.avatar = `/uploads/avatars/${req.file.filename}`;
    await user.save();
    res.json({ avatar: user.avatar });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
};
