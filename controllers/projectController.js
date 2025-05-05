const Project = require('../models/Project');
const User = require('../models/User');

exports.createProject = async (req, res) => {
  const { name } = req.body;
  try {
    const user = await User.findById(req.user.id).populate('projects');
    if (user.projects.length >= 4) return res.status(400).json({ message: 'Project limit reached' });

    const project = new Project({ name, user: req.user.id });
    await project.save();

    user.projects.push(project._id);
    await user.save();

    res.status(201).json(project);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find({ user: req.user.id });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
