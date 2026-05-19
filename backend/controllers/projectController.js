const Project = require("../models/Project");
const User = require("../models/User");

// GET /api/projects  — admin sees all; member sees only own
exports.getProjects = async (req, res, next) => {
  try {
    const filter = req.user.role === "admin" ? {} : { members: req.user._id };

    const projects = await Project.find(filter)
      .populate("members", "name email role")
      .populate("createdBy", "name email");

    res.json(projects);
  } catch (err) {
    next(err);
  }
};

// GET /api/projects/:id
exports.getProject = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate("members", "name email role")
      .populate("createdBy", "name email");

    if (!project) return res.status(404).json({ message: "Project not found" });

    // Members can only access their own projects
    if (
      req.user.role !== "admin" &&
      !project.members.some((m) => m._id.equals(req.user._id))
    ) {
      return res.status(403).json({ message: "Access denied" });
    }

    res.json(project);
  } catch (err) {
    next(err);
  }
};

// POST /api/projects  (admin)
exports.createProject = async (req, res, next) => {
  try {
    const { name, description, members = [] } = req.body;

    if (!name) return res.status(400).json({ message: "Name is required" });

    const project = await Project.create({
      name,
      description,
      createdBy: req.user._id,
      members,
    });

    res.status(201).json(project);
  } catch (err) {
    next(err);
  }
};

// POST /api/projects/:id/members  (admin)
// UPDATED: Add member by EMAIL instead of userId
exports.addMember = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email)
      return res.status(400).json({ message: "Email is required" });

    // Find user by email
    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ message: "User not found" });

    const project = await Project.findById(req.params.id);

    if (!project) return res.status(404).json({ message: "Project not found" });

    // prevent duplicates
    if (!project.members.includes(user._id)) {
      project.members.push(user._id);
      await project.save();
    }

    // Return updated project with populated members
    const updatedProject = await Project.findById(req.params.id)
      .populate("members", "name email role")
      .populate("createdBy", "name email");

    res.json(updatedProject);
  } catch (err) {
    next(err);
  }
};

// DELETE /api/projects/:id/members/:userId  (admin)
exports.removeMember = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) return res.status(404).json({ message: "Project not found" });

    project.members = project.members.filter(
      (m) => m.toString() !== req.params.userId
    );

    await project.save();

    const updatedProject = await Project.findById(req.params.id)
      .populate("members", "name email role")
      .populate("createdBy", "name email");

    res.json(updatedProject);
  } catch (err) {
    next(err);
  }
};