const mongoose = require("mongoose");
// const Skill = require('./skill');
const Schema = mongoose.Schema;


const projectSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  technologies: [{ type: String, required: true }],
  skills: [{ type: Schema.Types.ObjectId, ref: "Skill" }],
  github: String,
  demo: String,
  image: String,
  status: {
    type: String,
    enum: ["In Progress", "Completed", "Maintenance"],
    default: "Completed",
  },
  startDate: Date,
  endDate: Date,
  featured: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});



const Project = mongoose.model("Project", projectSchema);
module.exports = Project;
