const getProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    });

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
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
const updateProfile = async (req, res) => {
  try {
    const { bio, avatar } = req.body;

    const profile = await Profile.findOneAndUpdate(
      {
        user: req.user.id,
      },
      {
        bio,
        avatar,
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
