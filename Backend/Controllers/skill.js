const Skill = require('../Models/skill');


module.exports.create = async (req, res) => {
    const skill = new Skill(req.body);
    await skill.save();
    res.status(201).json(skill);
};


module.exports.index =  async (req, res) => {
    const { category, level } = req.query;
    let query = {};

    if (category) query.category = new RegExp(category, "i");
    if (level) query.level = level;

    const skills = await Skill.find(query).sort({ category: 1, name: 1 });
    res.json(skills);
};