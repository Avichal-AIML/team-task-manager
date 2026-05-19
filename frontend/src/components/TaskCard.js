import { useAuth } from "../context/AuthContext";

const STATUSES = ["To Do", "In Progress", "Done"];

const TaskCard = ({ task, onStatusChange }) => {
  const { user } = useAuth();

  const canUpdate =
    user.role === "admin" ||
    (task.assignedTo && task.assignedTo._id === user.id);

  const overdue =
    task.dueDate &&
    new Date(task.dueDate) < new Date() &&
    task.status !== "Done";

  const priorityColor =
    task.priority === "High"
      ? "bg-red-500/20 text-red-300 border-red-500/30"
      : task.priority === "Medium"
      ? "bg-yellow-500/20 text-yellow-300 border-yellow-500/30"
      : "bg-green-500/20 text-green-300 border-green-500/30";

  const statusColor =
    task.status === "Done"
      ? "bg-green-500/20 text-green-300 border-green-500/30"
      : task.status === "In Progress"
      ? "bg-blue-500/20 text-blue-300 border-blue-500/30"
      : "bg-gray-500/20 text-gray-300 border-gray-500/30";

  return (
    <div className="p-6 rounded-2xl bg-white/5 border border-white/10 shadow-lg hover:scale-[1.01] transition space-y-4">
      {/* Header */}
      <div className="flex justify-between items-start gap-3">
        <h3 className="text-lg font-bold text-indigo-200 leading-snug">
          {task.title}
        </h3>

        <span
          className={`text-xs px-3 py-1 rounded-full border font-semibold ${priorityColor}`}
        >
          {task.priority}
        </span>
      </div>

      {/* Description */}
      {task.description && (
        <p className="text-gray-300 text-sm">{task.description}</p>
      )}

      {/* Meta Info */}
      <div className="flex flex-col gap-2 text-sm text-gray-400">
        <p>
          👤 Assigned to:{" "}
          <span className="text-gray-200 font-medium">
            {task.assignedTo?.name || "Unassigned"}
          </span>
        </p>

        {task.dueDate && (
          <p className={overdue ? "text-red-300 font-semibold" : ""}>
            📅 Due: {new Date(task.dueDate).toLocaleDateString()}
            {overdue && " (Overdue)"}
          </p>
        )}
      </div>

      {/* Status Row */}
      <div className="flex justify-between items-center gap-3 pt-2">
        <span
          className={`text-xs px-3 py-1 rounded-full border font-semibold ${statusColor}`}
        >
          {task.status}
        </span>

        <select
          value={task.status}
          disabled={!canUpdate}
          onChange={(e) => onStatusChange(task._id, e.target.value)}
          className={`px-3 py-2 rounded-lg bg-slate-900 border border-white/10 text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
            !canUpdate ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {STATUSES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      {/* Permission note */}
      {!canUpdate && (
        <p className="text-xs text-gray-500">
          Only admin or assigned member can update status.
        </p>
      )}
    </div>
  );
};

export default TaskCard;