import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import TaskCard from "../components/TaskCard";

const ProjectDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();

  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);

  const [taskForm, setTaskForm] = useState({
    title: "",
    description: "",
    assignedTo: "",
    dueDate: "",
    priority: "Medium",
  });

  const [memberEmail, setMemberEmail] = useState("");

  const isAdmin = user?.role === "admin";

  // Load project + tasks
  useEffect(() => {
    const load = async () => {
      try {
        const [p, t] = await Promise.all([
          api.get(`/api/projects/${id}`),
          api.get(`/api/tasks?projectId=${id}`),
        ]);

        setProject(p.data);
        setTasks(t.data);
      } catch (err) {
        console.log("LOAD ERROR:", err.response?.data || err.message);
      }
    };

    load();
  }, [id]);

  // Create Task
  const createTask = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        ...taskForm,
        project: id,
      };

      console.log("CREATE TASK PAYLOAD:", payload);

      await api.post("/api/tasks", payload);

      setTaskForm({
        title: "",
        description: "",
        assignedTo: "",
        dueDate: "",
        priority: "Medium",
      });

      const res = await api.get(`/api/tasks?projectId=${id}`);
      setTasks(res.data);
    } catch (err) {
      console.log("CREATE TASK ERROR:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Task creation failed");
    }
  };

  // Change task status
  const changeStatus = async (taskId, status) => {
    try {
      await api.patch(`/api/tasks/${taskId}/status`, { status });

      const res = await api.get(`/api/tasks?projectId=${id}`);
      setTasks(res.data);
    } catch (err) {
      console.log("STATUS UPDATE ERROR:", err.message);
    }
  };

  // Add member
  const addMember = async (e) => {
    e.preventDefault();

    try {
      await api.post(`/api/projects/${id}/members`, {
        email: memberEmail,
      });

      setMemberEmail("");

      const res = await api.get(`/api/projects/${id}`);
      setProject(res.data);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to add member");
    }
  };

  // Remove member
  const removeMember = async (uid) => {
    try {
      await api.delete(`/api/projects/${id}/members/${uid}`);

      const res = await api.get(`/api/projects/${id}`);
      setProject(res.data);
    } catch (err) {
      console.log("REMOVE MEMBER ERROR:", err.message);
    }
  };

  if (!project)
    return (
      <p className="text-gray-300 text-center mt-10 text-lg">
        Loading project...
      </p>
    );

  return (
    <div className="space-y-10">
      {/* Project Header */}
      <div className="p-6 rounded-2xl bg-white/5 border border-white/10 shadow-lg">
        <h1 className="text-3xl font-bold text-indigo-300">
          {project.name}
        </h1>

        <p className="text-gray-300 mt-2">
          {project.description || "No description available"}
        </p>

        <div className="flex gap-3 mt-4 flex-wrap">
          <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold">
            Members: {project.members?.length || 0}
          </span>
        </div>
      </div>

      {/* Members */}
      <div className="p-6 rounded-2xl bg-white/5 border border-white/10 shadow-lg space-y-4">
        <h2 className="text-xl font-bold text-indigo-200">
          Team Members
        </h2>

        {project.members?.length === 0 ? (
          <p className="text-gray-400">
            No members in this project.
          </p>
        ) : (
          project.members.map((m) => (
            <div
              key={m._id}
              className="p-4 rounded-xl bg-slate-900/50 border border-white/10 flex justify-between items-center"
            >
              <div>
                <p className="font-semibold text-white">
                  {m.name}
                </p>

                <p className="text-sm text-gray-400">
                  {m.email}
                </p>
              </div>

              {isAdmin && (
                <button
                  onClick={() => removeMember(m._id)}
                  className="px-3 py-1 rounded-lg bg-red-500/20 text-red-300"
                >
                  Remove
                </button>
              )}
            </div>
          ))
        )}

        {isAdmin && (
          <form onSubmit={addMember} className="flex gap-3 pt-4">
            <input
              value={memberEmail}
              onChange={(e) => setMemberEmail(e.target.value)}
              placeholder="Enter member email"
              className="flex-1 px-4 py-2 rounded-lg bg-slate-900 text-white"
            />

            <button className="px-5 py-2 bg-indigo-600 rounded-lg">
              Add Member
            </button>
          </form>
        )}
      </div>

      {/* Create Task */}
      {isAdmin && (
        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 shadow-lg">
          <h2 className="text-xl font-bold text-indigo-200">
            Create Task
          </h2>

          <form
            onSubmit={createTask}
            className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <input
              placeholder="Task Title"
              value={taskForm.title}
              onChange={(e) =>
                setTaskForm({
                  ...taskForm,
                  title: e.target.value,
                })
              }
              required
              className="px-4 py-2 rounded-lg bg-slate-900 text-white"
            />

            <input
              placeholder="Description"
              value={taskForm.description}
              onChange={(e) =>
                setTaskForm({
                  ...taskForm,
                  description: e.target.value,
                })
              }
              className="px-4 py-2 rounded-lg bg-slate-900 text-white"
            />

            <select
              value={taskForm.assignedTo}
              onChange={(e) =>
                setTaskForm({
                  ...taskForm,
                  assignedTo: e.target.value,
                })
              }
              className="px-4 py-2 rounded-lg bg-slate-900 text-white"
            >
              <option value="">Assign to</option>

              {project.members?.map((m) => (
                <option key={m._id} value={m._id}>
                  {m.name}
                </option>
              ))}
            </select>

            <input
              type="date"
              value={taskForm.dueDate}
              onChange={(e) =>
                setTaskForm({
                  ...taskForm,
                  dueDate: e.target.value,
                })
              }
              style={{
                colorScheme: "dark",
              }}
              className="w-full px-4 py-2 rounded-lg bg-slate-900 text-white border border-white/10 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
            />

            <select
              value={taskForm.priority}
              onChange={(e) =>
                setTaskForm({
                  ...taskForm,
                  priority: e.target.value,
                })
              }
              className="px-4 py-2 rounded-lg bg-slate-900 text-white"
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>

            <button
              type="submit"
              className="px-5 py-2 bg-indigo-600 rounded-lg"
            >
              Add Task
            </button>
          </form>
        </div>
      )}

      {/* Tasks */}
      <div className="p-6 rounded-2xl bg-white/5 border border-white/10 shadow-lg">
        <h2 className="text-xl font-bold text-indigo-200">
          Tasks
        </h2>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-5">
          {tasks.map((t) => (
            <TaskCard
              key={t._id}
              task={t}
              onStatusChange={changeStatus}
            />
          ))}

          {tasks.length === 0 && (
            <p className="text-gray-400">
              No tasks yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;