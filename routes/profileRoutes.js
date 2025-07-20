const express = require("express");
const router = express.Router();
const { getUserDetails, updateUserProfile } = require("../controllers/profileRouteController");
const authMiddleware = require("../middlewares/authMiddleware");
const upload = require("../middlewares/uploadMiddleware");

router.get("/profile", authMiddleware, getUserDetails);
router.put("/profile", authMiddleware, upload.single("profilePicture"), updateUserProfile);

module.exports = router;
