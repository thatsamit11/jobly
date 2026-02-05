import { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";

const CandidateNavbar = ({ user }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-8 h-16 flex items-center justify-between">

        {/* LOGO */}
        <h1
          onClick={() => navigate("/candidate/dashboard")}
          className="text-2xl font-bold text-blue-600 cursor-pointer"
        >
          Jobly
        </h1>

        {/* NAV LINKS */}
        <nav className="flex gap-8">
          {[
            { name: "Dashboard", path: "/candidate/dashboard" },
            { name: "My Applications", path: "/candidate/profile/applications" },
            { name: "Saved Jobs", path: "/candidate/profile/saved" },
          ].map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className="relative font-medium text-gray-700 group"
            >
              {item.name}
              <span className="absolute left-1/2 bottom-[-6px] w-0 h-[2px] bg-blue-600 transition-all duration-300 group-hover:w-full group-hover:left-0" />
            </NavLink>
          ))}
        </nav>

        {/* PROFILE AREA */}
<div className="relative flex items-center gap-3">

  {/* PROFILE IMAGE */}
  <img
    src={user?.profilePic || "https://i.pravatar.cc/100"}
    className="w-9 h-9 rounded-full object-cover cursor-pointer"
    alt="profile"
    onClick={() => navigate("/candidate/profile")}
  />

  {/* NAME + EDIT */}
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
        setOpen((prev) => !prev);
      }}
      className="text-xs text-blue-600 cursor-pointer hover:underline"
    >
      Edit Profile
    </p>
  </div>

  {/* DROPDOWN */}
  {open && (
    <div className="absolute right-0 top-12 w-40 bg-white shadow-lg rounded-lg overflow-hidden">
      <button
        onClick={() => {
          setOpen(false);
          navigate("/candidate/profile/edit");
        }}
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
