const Task = require('../models/Task');
const Project = require('../models/Project');

// helper: can current user access this project?
const canAccessProject = (project, user) =>
  user.role === 'admin' ||
  project.members.some((m) => m.toString() === user._id.toString());

// GET /api/tasks?projectId=...
exports.getTasks = async (req, res, next) => {
  try {
    const { projectId } = req.query;
    const filter = {};
    if (projectId) filter.project = projectId;

    // Members only see tasks assigned to them (or in their projects)
    if (req.user.role !== 'admin') {
      const myProjects = await Project.find({ members: req.user._id }).select('_id');
      filter.project = { $in: myProjects.map((p) => p._id) };
    }

    const tasks = await Task.find(filter)
      .populate('assignedTo', 'name email')
      .populate('project', 'name')
      .sort('-createdAt');
    res.json(tasks);
  } catch (err) {
    next(err);
  }
};

// POST /api/tasks  (admin)
exports.createTask = async (req, res, next) => {
  try {
    const { title, description, project, assignedTo, dueDate, priority } = req.body;
    if (!title || !project) {
      return res.status(400).json({ message: 'Title and project are required' });
    }
    const proj = await Project.findById(project);
    if (!proj) return res.status(404).json({ message: 'Project not found' });

    const task = await Task.create({
      title,
      description,
      project,
      assignedTo,
      dueDate,
      priority,
      createdBy: req.user._id,
    });
    res.status(201).json(task);
  } catch (err) {
    next(err);
  }
};

// PATCH /api/tasks/:id/status
exports.updateStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    if (!['To Do', 'In Progress', 'Done'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }
    const task = await Task.findById(req.params.id).populate('project');
    if (!task) return res.status(404).json({ message: 'Task not found' });

    // Members can only update tasks assigned to them
    const isAssignee =
      task.assignedTo && task.assignedTo.toString() === req.user._id.toString();
    if (req.user.role !== 'admin' && !isAssignee) {
      return res.status(403).json({ message: 'Not allowed to update this task' });
    }

    task.status = status;
    await task.save();
    res.json(task);
  } catch (err) {
    next(err);
  }
};

// DELETE /api/tasks/:id  (admin)
exports.deleteTask = async (req, res, next) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) {
    next(err);
  }
};
