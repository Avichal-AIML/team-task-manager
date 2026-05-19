import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="w-full bg-white/5 backdrop-blur-md border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-indigo-400">
          TaskManager
        </Link>

        <div className="flex items-center gap-6">
          <Link
            to="/"
            className="text-sm font-medium hover:text-indigo-300 transition"
          >
            Dashboard
          </Link>

          <Link
            to="/projects"
            className="text-sm font-medium hover:text-indigo-300 transition"
          >
            Projects
          </Link>

          <div className="text-sm text-gray-300 hidden sm:block">
            {user?.name} ({user?.role})
          </div>

          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 transition font-semibold text-sm"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}