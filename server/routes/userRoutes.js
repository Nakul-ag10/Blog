const express = require('express')
const router = express.Router();
const protect = require("../middleware/authMiddleware")
const {getUserProfile, updateUserProfile, getAllmyPosts, upload, uploadAvatar} = require("../controller/userController")

router.get('/profile', protect, getUserProfile);
router.put('/profile', protect, updateUserProfile);
router.get('/my-posts', protect, getAllmyPosts);
router.post('/avatar', protect, upload.single('avatar'), uploadAvatar );

module.exports = router;