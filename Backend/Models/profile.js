const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const profileSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  bio: { type: String },
  education: [
    {
      institution: String,
      degree: String,
      year: String,
      description: String,
    },
  ],
  experience: [
    {
      company: String,
      role: String,
      duration: String,
      description: String,
    },
  ],
  links: {
    github: String,
    linkedin: String,
    portfolio: String,
    resume: String,
    twitter: String,
  },
  location: String,
  phone: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Profile = mongoose.model("Profile", profileSchema);
module.exports = Profile;
