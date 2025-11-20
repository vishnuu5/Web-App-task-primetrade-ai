import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react"; // <-- Lucide Icons

export default function Navbar() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="bg-dark text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">

        {/* Left Section */}
        <div className="flex items-center gap-8">
          <Link to="/dashboard" className="text-2xl font-bold text-primary">
            TaskApp
          </Link>

          <div className="hidden md:flex gap-6">
            <Link to="/dashboard" className="hover:text-primary transition">
              Dashboard
            </Link>
            <Link to="/profile" className="hover:text-primary transition">
              Profile
            </Link>
          </div>
        </div>

        {/* Desktop User Info */}
        <div className="hidden md:flex items-center gap-4">
          <span className="text-gray-300">Welcome, {user.name || "User"}</span>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-danger rounded hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-white p-2"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-dark border-t border-gray-700 p-4 space-y-3">
          <Link to="/dashboard" className="block hover:text-primary transition">
            Dashboard
          </Link>
          <Link to="/profile" className="block hover:text-primary transition">
            Profile
          </Link>
          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 bg-danger rounded hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}
