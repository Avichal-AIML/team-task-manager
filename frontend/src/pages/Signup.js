import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Signup = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "member",
  });

  const [err, setErr] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    try {
      await signup(form);
      navigate("/");
    } catch (e) {
      setErr(e.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white/5 border border-white/10 rounded-2xl shadow-xl p-8 backdrop-blur-md">
        <h2 className="text-3xl font-bold text-indigo-400 text-center">
          Create Account
        </h2>

        <p className="text-gray-300 text-center mt-2 text-sm">
          Join Team Task Manager
        </p>

        <form onSubmit={submit} className="mt-6 space-y-4">
          {/* Name */}
          <div>
            <label className="text-sm text-gray-300">Full Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full mt-2 px-4 py-2 rounded-lg bg-slate-900 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-sm text-gray-300">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full mt-2 px-4 py-2 rounded-lg bg-slate-900 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-sm text-gray-300">Password</label>
            <input
              type="password"
              placeholder="Create password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full mt-2 px-4 py-2 rounded-lg bg-slate-900 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          {/* Role */}
          <div>
            <label className="text-sm text-gray-300">Role</label>
            <select
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
              className="w-full mt-2 px-4 py-2 rounded-lg bg-slate-900 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="member">Member</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {err && (
            <p className="text-red-400 text-sm text-center bg-red-500/10 border border-red-500/20 rounded-lg py-2">
              {err}
            </p>
          )}

          <button
            type="submit"
            className="w-full py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 transition font-semibold"
          >
            Sign Up
          </button>

          <p className="text-sm text-gray-300 text-center mt-4">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-indigo-400 hover:text-indigo-300"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;