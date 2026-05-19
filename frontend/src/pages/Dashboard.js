import { useEffect, useState } from "react";
import api from "../api/axios";

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const loadDashboard = () => {
      api
        .get("/dashboard")
        .then((res) => {
          console.log("DASHBOARD RESPONSE:", res.data);
          setStats(res.data);
        })
        .catch((err) => {
          console.log("DASHBOARD ERROR:", err.response?.data || err.message);
        });
    };

    loadDashboard();

    const interval = setInterval(loadDashboard, 3000);
    return () => clearInterval(interval);
  }, []);

  if (!stats)
    return (
      <p className="text-gray-300 text-center mt-10 text-lg">
        Loading dashboard...
      </p>
    );

  const total = stats.total || 0;
  const todo = stats.byStatus?.["To Do"] || 0;
  const inProgress = stats.byStatus?.["In Progress"] || 0;
  const done = stats.byStatus?.["Done"] || 0;
  const overdue = stats.overdue || 0;

  const perUser = stats.perUser || {};
  const perUserTasks = stats.perUserTasks || {};

  return (
    <div className="space-y-8">
      {/* Heading */}
      <div>
        <h1 className="text-3xl font-bold text-indigo-300">Dashboard</h1>
        <p className="text-gray-300 mt-2">
          Track your tasks, progress and overdue work.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 shadow-lg">
          <p className="text-gray-300 text-sm">Total Tasks</p>
          <h2 className="text-3xl font-bold mt-2 text-white">{total}</h2>
        </div>

        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 shadow-lg">
          <p className="text-gray-300 text-sm">To Do</p>
          <h2 className="text-3xl font-bold mt-2 text-gray-200">{todo}</h2>
        </div>

        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 shadow-lg">
          <p className="text-gray-300 text-sm">In Progress</p>
          <h2 className="text-3xl font-bold mt-2 text-blue-300">
            {inProgress}
          </h2>
        </div>

        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 shadow-lg">
          <p className="text-gray-300 text-sm">Done</p>
          <h2 className="text-3xl font-bold mt-2 text-green-300">{done}</h2>
        </div>

        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 shadow-lg">
          <p className="text-gray-300 text-sm">Overdue</p>
          <h2 className="text-3xl font-bold mt-2 text-red-300">{overdue}</h2>
        </div>
      </div>

      {/* Tasks per Member */}
      <div className="p-6 rounded-2xl bg-white/5 border border-white/10 shadow-lg">
        <h2 className="text-xl font-bold text-indigo-200">
          Tasks Per Member
        </h2>
        <p className="text-gray-400 text-sm mt-1">
          Click on a member to view their tasks.
        </p>

        <div className="mt-5 space-y-3">
          {Object.keys(perUser).length === 0 ? (
            <p className="text-gray-400">No tasks assigned yet.</p>
          ) : (
            Object.entries(perUser).map(([name, count]) => (
              <div
                key={name}
                onClick={() =>
                  setSelectedUser(selectedUser === name ? null : name)
                }
                className="cursor-pointer flex justify-between items-center p-4 rounded-xl bg-slate-900/50 border border-white/10 hover:bg-slate-900 transition"
              >
                <p className="text-white font-semibold">{name}</p>
                <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-sm font-semibold">
                  {count} Tasks
                </span>
              </div>
            ))
          )}
        </div>

        {/* TASK LIST ON CLICK */}
        {selectedUser && (
          <div className="mt-6 p-5 rounded-xl bg-black/30 border border-white/10">
            <h3 className="text-lg font-bold text-indigo-200">
              Tasks of {selectedUser}
            </h3>

            <div className="mt-4 space-y-3">
              {perUserTasks?.[selectedUser]?.length ? (
                perUserTasks[selectedUser].map((t) => (
                  <div
                    key={t._id}
                    className="p-4 rounded-xl bg-slate-900/50 border border-white/10 flex justify-between items-center"
                  >
                    <div>
                      <p className="text-white font-semibold">{t.title}</p>
                      <p className="text-sm text-gray-400">
                        Project: {t.project} | Priority: {t.priority}
                      </p>
                    </div>

                    <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold">
                      {t.status}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-gray-400">No tasks found.</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;