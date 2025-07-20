const User = require("../models/User");
const cloudinary = require("../utils/cloudinary");

// Get user details
const getUserDetails = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ error: "User not found" });
    res.status(200).json(user);
  } catch (error) {
    console.error("Get user error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Update user profile
const updateUserProfile = async (req, res) => {
  try {
    const updates = {
      name: req.body.name,
      countryCode: req.body.countryCode,
      mobile: req.body.mobile,
    };

    if (req.file && req.file.path) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "user_profiles",
      });

      updates.profilePicture = result.secure_url;
    }

    const updatedUser = await User.findByIdAndUpdate(req.user.id, updates, {
      new: true,
    }).select("-password");

    res.status(200).json({ message: "Profile updated", user: updatedUser });
  } catch (error) {
    console.error("Update profile error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  getUserDetails,
  updateUserProfile,
};
