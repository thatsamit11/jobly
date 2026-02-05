import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";

const RecruiterDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const recruiter = JSON.parse(localStorage.getItem("recruiterProfile"));

  // 🔒 SAFE REDIRECT
  useEffect(() => {
    if (!recruiter) navigate("/");
  }, [recruiter, navigate]);

  if (!recruiter) return null;

  const logoutHandler = () => {
    localStorage.clear();
    navigate("/");
  };

  // sirf dashboard home par
  const isHome = location.pathname === "/recruiter/dashboard";

  return (
    <div className="min-h-screen flex bg-gray-100">

      {/* ================= PREMIUM SIDEBAR ================= */}
      <aside className="w-72 bg-gradient-to-b from-[#020617] to-[#0f172a]
                        text-white p-6 flex flex-col shadow-2xl relative">

        {/* Glow strip */}
        <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b
                        from-blue-500 via-purple-500 to-pink-500 rounded-r-xl" />

        {/* LOGO */}
        <h1 className="text-2xl font-bold mb-10 tracking-wide relative z-10">
          Job<span className="text-blue-400">ly</span>
        </h1>

        {/* PROFILE */}
        <div
          onClick={() => navigate("/recruiter/dashboard/profile")}
          className="group flex items-center gap-4 p-3 rounded-xl cursor-pointer
                     hover:bg-white/10 transition-all duration-300
                     hover:scale-[1.02] relative z-10"
        >
          <div className="relative">
            <img
              src={recruiter.profilePic || "https://i.pravatar.cc/150"}
              className="w-12 h-12 rounded-full object-cover border-2 border-blue-500
                         group-hover:border-purple-400 transition"
            />
            <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500
                             rounded-full border-2 border-[#020617]" />
          </div>

          <div>
            <h3 className="font-semibold group-hover:text-blue-400 transition">
              {recruiter.name}
            </h3>
            <p className="text-sm text-gray-400">
              {recruiter.companyName || "Recruiter"}
            </p>
          </div>
        </div>

        <button
          onClick={() => navigate("/recruiter/dashboard/edit-profile")}
          className="text-sm text-blue-400 ml-4 mb-10 hover:text-blue-300
                     transition relative z-10"
        >
          Edit Profile →
        </button>

        {/* NAV */}
        <div className="space-y-2 flex-1 relative z-10">
          <SidebarBtn
            icon="🏠"
            label="Dashboard"
            active={location.pathname === "/recruiter/dashboard"}
            onClick={() => navigate("/recruiter/dashboard")}
          />
          <SidebarBtn
            icon="➕"
            label="Post Job"
            active={location.pathname.includes("post-job")}
            onClick={() => navigate("post-job")}
          />
          <SidebarBtn
            icon="📋"
            label="Posted Jobs"
            active={location.pathname.includes("jobs")}
            onClick={() => navigate("jobs")}
          />
          <SidebarBtn
            icon="📨"
            label="Applications"
            active={location.pathname.includes("applications")}
            onClick={() => navigate("applications")}
          />
        </div>

        {/* LOGOUT */}
        <button
          onClick={logoutHandler}
          className="mt-6 flex items-center justify-center gap-2
                     bg-red-500/10 text-red-400 py-3 rounded-xl
                     hover:bg-red-500/20 hover:text-red-300 transition-all"
        >
          🚪 Logout
        </button>
      </aside>

      {/* ================= MAIN ================= */}
      <main className="flex-1 px-10 py-8 overflow-y-auto
                       bg-gradient-to-br from-gray-50 to-gray-100">

        {/* HEADER (ONLY HOME) */}
        {isHome && (
          <div className="bg-white rounded-2xl p-6 shadow mb-8
                          flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                Welcome back, {recruiter.name.split(" ")[0]} 👋
              </h1>
              <p className="text-gray-500 mt-1">
                Manage your jobs & applications like a pro
              </p>
            </div>

            <button
              onClick={() => navigate("post-job")}
              className="bg-blue-600 hover:bg-blue-700
                         text-white px-6 py-3 rounded-xl shadow transition"
            >
              ➕ Post a Job
            </button>
          </div>
        )}

        {/* STATS (ONLY HOME) */}
        {isHome && (
          <div className="grid grid-cols-3 gap-6 mb-10">
            <StatCard
              title="Total Jobs"
              count="8"
              gradient="from-blue-500 to-blue-700"
            />
            <StatCard
              title="Applications"
              count="124"
              gradient="from-purple-500 to-purple-700"
            />
            <StatCard
              title="Shortlisted"
              count="32"
              gradient="from-green-500 to-green-700"
            />
          </div>
        )}

        <Outlet />
      </main>
    </div>
  );
};

export default RecruiterDashboard;

/* ================= COMPONENTS ================= */

const SidebarBtn = ({ icon, label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`group relative w-full flex items-center gap-3 px-4 py-3 rounded-xl
      transition-all duration-300
      ${active
        ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
        : "text-gray-300 hover:text-white hover:bg-white/10"}
    `}
  >
    {/* left indicator */}
    <span
      className={`absolute left-0 top-1/2 -translate-y-1/2 w-1 rounded-r
        bg-blue-400 transition-all duration-300
        ${active ? "h-8" : "h-0 group-hover:h-6"}
      `}
    />
    <span className="text-lg">{icon}</span>
    <span className="font-medium">{label}</span>
  </button>
);

const StatCard = ({ title, count, gradient }) => (
  <div
    className={`bg-gradient-to-r ${gradient}
                text-white p-6 rounded-2xl shadow-lg
                hover:scale-[1.05] transition cursor-pointer`}
  >
    <p className="text-white/80">{title}</p>
    <h2 className="text-4xl font-bold mt-2">{count}</h2>
  </div>
);
