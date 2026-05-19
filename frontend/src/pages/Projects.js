import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

const Projects = () => {
  const { user } = useAuth();
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({ name: "", description: "" });

  const load = () => api.get("/projects").then((res) => setProjects(res.data));

  useEffect(() => {
    load();
  }, []);

  const create = async (e) => {
    e.preventDefault();
    await api.post("/projects", form);
    setForm({ name: "", description: "" });
    load();
  };

  return (
    <div className="space-y-8">
      {/* Page Heading */}
      <div>
        <h1 className="text-3xl font-bold text-indigo-300">Projects</h1>
        <p className="text-gray-300 mt-2">
          Manage your projects and collaborate with your team.
        </p>
      </div>

      {/* Create Project Form (Admin Only) */}
      {user.role === "admin" && (
        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 shadow-lg">
          <h2 className="text-xl font-bold text-indigo-200">
            Create New Project
          </h2>

          <form onSubmit={create} className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              placeholder="Project name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
              className="px-4 py-2 rounded-lg bg-slate-900 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <input
              placeholder="Description"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="px-4 py-2 rounded-lg bg-slate-900 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 transition font-semibold shadow-md"
            >
              + Create
            </button>
          </form>
        </div>
      )}

      {/* Projects Grid */}
      {projects.length === 0 ? (
        <div className="p-10 rounded-2xl bg-white/5 border border-white/10 text-center shadow-lg">
          <h2 className="text-xl font-bold text-indigo-200">
            No Projects Found
          </h2>
          <p className="text-gray-400 mt-2">
            Create a project to start managing tasks.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p) => (
            <Link
              to={`/projects/${p._id}`}
              key={p._id}
              className="p-6 rounded-2xl bg-white/5 border border-white/10 shadow-lg hover:scale-[1.02] transition block"
            >
              <h2 className="text-xl font-bold text-indigo-200">{p.name}</h2>

              <p className="text-gray-300 text-sm mt-2">
                {p.description || "No description available"}
              </p>

              <div className="mt-5 flex justify-between items-center">
                <span className="text-xs text-gray-400">
                  {p.members.length} members
                </span>

                <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold">
                  Active
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Projects;