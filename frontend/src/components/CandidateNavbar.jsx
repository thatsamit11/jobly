import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const CandidateNavbar = ({ user }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  const navLinks = [
    { name: "Dashboard", path: "" },              // index route
    { name: "My Applications", path: "applied-jobs" },
    { name: "Saved Jobs", path: "saved-jobs" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-8 h-16 flex items-center justify-between">

        <h1
          onClick={() => navigate("/candidate/dashboard")}
          className="text-2xl font-bold text-blue-600 cursor-pointer"
        >
          Jobly
        </h1>

        {/* NAV LINKS – RELATIVE PATHS */}
        <nav className="flex gap-8">
          {navLinks.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              end
              className={({ isActive }) =>
                `font-medium ${
                  isActive ? "text-blue-600" : "text-gray-700"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </nav>

        {/* PROFILE */}
        <div className="relative flex items-center gap-3">
          <img
            src={user?.profilePic || "https://i.pravatar.cc/100"}
            className="w-9 h-9 rounded-full cursor-pointer"
            onClick={() => navigate("/candidate/profile")}
          />

          <div className="leading-tight text-right">
            <p
              onClick={() => navigate("/candidate/profile")}
              className="text-sm font-semibold cursor-pointer"
            >
              {user?.name}
            </p>

            <p
              onClick={(e) => {
                e.stopPropagation();
                setOpen(!open);
              }}
              className="text-xs text-blue-600 cursor-pointer"
            >
              Edit Profile
            </p>
          </div>

          {open && (
            <div className="absolute right-0 top-12 w-40 bg-white shadow-lg rounded">
              <button
                onClick={() => navigate("/candidate/profile/edit")}
                className="w-full px-4 py-2 text-left hover:bg-gray-100"
              >
                ✏️ Edit Profile
              </button>
              <button
                onClick={logout}
                className="w-full px-4 py-2 text-left text-red-600 hover:bg-red-50"
              >
                🚪 Logout
              </button>
            </div>
          )}
        </div>

      </div>
    </header>
  );
};

export default CandidateNavbar;
