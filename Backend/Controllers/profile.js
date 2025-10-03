const Profile = require('../Models/profile');


module.exports.index = async (req, res) => {
      const profile = await Profile.findOne().sort({ updatedAt: -1 });
      if (!profile) {
        return res.status(404).json({ message: "Profile not found" });
      }
      res.json(profile);
  }

module.exports.update = async (req, res) => {
      const profileData = { ...req.body, updatedAt: new Date() };
  
      let profile = await Profile.findOne();
      if (profile) {
        profile = await Profile.findByIdAndUpdate(profile._id, profileData, {
          new: true,
        });
      } else {
        profile = new Profile(profileData);
        await profile.save();
      }
  
      res.json(profile);
  };

