const Task = require("../models/Task");
const Project = require("../models/Project");

// GET /api/dashboard — aggregated stats
exports.getDashboard = async (req, res, next) => {
  try {
    let taskFilter = {};

    // Limit scope for non-admins
    if (req.user.role !== "admin") {
      const myProjects = await Project.find({ members: req.user._id }).select(
        "_id"
      );
      taskFilter.project = { $in: myProjects.map((p) => p._id) };
    }

    const tasks = await Task.find(taskFilter)
      .populate("assignedTo", "name email")
      .populate("project", "name");

    const now = new Date();
    const byStatus = { "To Do": 0, "In Progress": 0, Done: 0 };
    let overdue = 0;

    const perUser = {};
    const perUserTasks = {};

    tasks.forEach((t) => {
      // status count
      byStatus[t.status] = (byStatus[t.status] || 0) + 1;

      // overdue count
      if (t.dueDate && new Date(t.dueDate) < now && t.status !== "Done") {
        overdue++;
      }

      const key = t.assignedTo ? t.assignedTo.name : "Unassigned";

      // count per user
      perUser[key] = (perUser[key] || 0) + 1;

      // store tasks per user
      if (!perUserTasks[key]) perUserTasks[key] = [];

      perUserTasks[key].push({
        _id: t._id,
        title: t.title,
        status: t.status,
        priority: t.priority,
        dueDate: t.dueDate,
        project: t.project?.name || "N/A",
      });
    });

    res.json({
      total: tasks.length,
      byStatus,
      overdue,
      perUser,
      perUserTasks, // ✅ NEW FIELD
    });
  } catch (err) {
    next(err);
  }
};