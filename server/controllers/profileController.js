const Profile = require("../models/Profile");
const getProfile = async (req, res) => {
  console.log("REQ USER:", req.user);

  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate("user", "name email"); // 🔥 THIS IS THE FIX

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }

    res.status(200).json({
      success: true,
      profile,
    });
  } catch (error) {
    console.error("PROFILE ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
const updateProfile = async (req, res) => {
  try {
    const { bio } = req.body;

    const profile = await Profile.findOneAndUpdate(
      {
        user: req.user.id,
      },
      {
        bio,
      },
      {
        new: true,
      },
    );

    res.status(200).json({
      success: true,
      profile,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
module.exports = {
  getProfile,
  updateProfile,
};
