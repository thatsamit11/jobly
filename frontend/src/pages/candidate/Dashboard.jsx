import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const CandidateDashboard = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({});

  useEffect(() => {
    setProfile(JSON.parse(localStorage.getItem("candidateProfile")) || {});
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="h-screen w-full bg-[#eef2f7] flex flex-col overflow-hidden">

      {/* ================= TOP HEADER ================= */}
      <header className="h-16 px-8 flex items-center bg-linear-to-r from-[#1e4fa1] to-[#2f80ed] text-white shadow shrink-0">
        <h1 className="text-lg font-semibold">
          Welcome Back, {profile.name || "User"}
        </h1>
      </header>

      {/* ================= BODY ================= */}
      <div className="flex flex-1 overflow-hidden min-h-0">

        {/* ================= SIDEBAR ================= */}
        <aside className="w-64 bg-[#0f2a44] text-white flex flex-col px-5 py-6 shrink-0">

          {/* PROFILE BLOCK */}
          <div
            className="flex items-center gap-3 mb-8 cursor-pointer"
            onClick={() => navigate("/candidate/profile")}
          >
            <img
              src={profile.profilePic || "https://i.pravatar.cc/60"}
              className="w-10 h-10 rounded-full border"
            />
            <div>
              <p className="font-medium text-sm">
                {profile.name || "Your Name"}
              </p>
              <p
                className="text-xs text-blue-300 underline"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate("/candidate/profile/edit");
                }}
              >
                Edit Profile
              </p>
            </div>
          </div>

          <SidebarItem text="Dashboard" to="/candidate/dashboard" />
          <SidebarItem text="My Applications" to="/candidate/dashboard/applied-jobs" />
          <SidebarItem text="Saved Jobs" to="/candidate/dashboard/saved-jobs" />
          <SidebarItem text="Messages" to="/candidate/dashboard/messages" />
          <SidebarItem text="Notifications" to="/candidate/dashboard/notifications" />
          <SidebarItem text="Settings" to="/candidate/dashboard/settings" />

          <button
            onClick={handleLogout}
            className="mt-auto py-3 rounded-lg bg-red-500/20 hover:bg-red-500/30"
          >
            Logout
          </button>
        </aside>

        {/* ================= MAIN CONTENT ================= */}
        <main className="flex-1 p-6 flex flex-col overflow-hidden min-h-0">

          {/* ===== STATS ===== */}
          <div className="grid grid-cols-4 gap-6 mb-6 shrink-0">
            <StatCard title="Applied Jobs" value="12" sub="View All" />
            <StatCard title="Job Alerts" value="5" sub="Manage" />
            <StatCard title="Profile Views" value="327" sub="This Week" />
            <StatCard title="Messages" value="4" sub="Unread" />
          </div>

          {/* ===== MAIN GRID (🔥 FIXED) ===== */}
          <div className="grid grid-cols-12 gap-6 flex-1 min-h-0">

            {/* LEFT COLUMN — JOBS */}
            <div className="col-span-7 bg-white rounded-xl shadow p-5 flex flex-col min-h-0">

              {/* SEARCH + FILTER */}
              <div className="flex gap-3 mb-4 shrink-0">
                <div className="relative flex-1">
                  <input
                    placeholder="Search jobs..."
                    className="w-full px-4 py-3 pr-10 border rounded-lg"
                  />
                  <button className="absolute right-3 top-3 text-gray-500">
                    🔍
                  </button>
                </div>

                <button className="bg-blue-600 text-white px-4 rounded-lg">
                  Filter
                </button>
              </div>

              {/* 🔥 SCROLLABLE JOB LIST */}
              <div className="flex-1 overflow-y-auto space-y-4 pr-2">
                <Outlet />
              </div>
            </div>

            {/* RIGHT COLUMN */}
            <div className="col-span-5 space-y-6 overflow-y-auto pr-2 min-h-0">

              <Card title="Application Status">
                <div className="grid grid-cols-4 gap-4 text-center">
                  <Status label="Applied" value="12" color="bg-blue-500" />
                  <Status label="In Review" value="4" color="bg-green-500" />
                  <Status label="Interview" value="2" color="bg-orange-500" />
                  <Status label="Hired" value="1" color="bg-red-500" />
                </div>
              </Card>

              <Card title="Upcoming Interview">
                <p className="font-medium">Product Manager Interview</p>
                <p className="text-sm text-gray-500 mb-3">
                  April 25, 11:00 AM
                </p>
                <div className="flex gap-3">
                  <ActionBtn text="View Details" />
                  <ActionBtn text="Prepare" />
                </div>
              </Card>

              <Card title="Career Tips & Resources">
                <p className="text-sm text-gray-600">
                  Ace your job interview with expert tips.
                </p>
              </Card>

            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

/* ================= COMPONENTS ================= */

const SidebarItem = ({ text, to }) => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(to)}
      className="w-full text-left px-4 py-3 rounded-lg mb-1 hover:bg-white/10"
    >
      {text}
    </button>
  );
};

const Card = ({ title, children }) => (
  <div className="bg-white rounded-xl p-5 shadow-sm">
    <h3 className="font-semibold mb-4">{title}</h3>
    {children}
  </div>
);

const StatCard = ({ title, value, sub }) => (
  <div className="bg-white rounded-xl p-5 shadow-sm">
    <p className="text-sm text-gray-500">{title}</p>
    <h2 className="text-3xl font-bold">{value}</h2>
    <p className="text-xs text-blue-600">{sub}</p>
  </div>
);

const Status = ({ label, value, color }) => (
  <div className="bg-gray-50 rounded-lg p-4">
    <h2 className="text-xl font-bold">{value}</h2>
    <p className="text-sm">{label}</p>
    <div className={`h-1 mt-2 rounded ${color}`} />
  </div>
);

const ActionBtn = ({ text }) => (
  <button className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg">
    {text}
  </button>
);

export default CandidateDashboard;
