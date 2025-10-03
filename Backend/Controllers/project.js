const Project = require("../Models/project");
const SKill = require("../Models/skill");

module.exports.index =  async (req, res) => {
    const { skill, status, featured } = req.query;
    let query = {};

    if (skill) {
      const skillObj = await Skill.findOne({ name: new RegExp(skill, "i") });
      if (skillObj) {
        query.skills = skillObj._id;
      } else {
        query.technologies = new RegExp(skill, "i");
      }
    }

    if (status) query.status = status;
    if (featured !== undefined) query.featured = featured === "true";

    const projects = await Project.find(query)
      .populate("skills", "name category level")
      .sort({ featured: -1, createdAt: -1 });

    res.json(projects);
  };

module.exports.add = async (req, res) => {
    const project = new Project(req.body);
    await project.save();
    await project.populate("skills", "name category level");
    res.status(201).json(project);
}