import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const RecruiterDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const recruiter = JSON.parse(localStorage.getItem("recruiterProfile"));

  const [totalJobs, setTotalJobs] = useState(0);
  const [applications, setApplications] = useState([]);

  // 🔒 SAFE REDIRECT
  useEffect(() => {
    if (!recruiter) navigate("/");
  }, [recruiter, navigate]);

  // 🔥 FETCH DASHBOARD DATA
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        // Total Jobs
        const jobsRes = await axios.get(
          "http://localhost:5000/api/jobs/recruiter",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setTotalJobs(jobsRes.data.length);

        // Applications
        const appsRes = await axios.get(
          "http://localhost:5000/api/applications/recruiter",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setApplications(appsRes.data);
      } catch (err) {
        console.error("Dashboard fetch failed", err);
      }
    };

    fetchDashboardData();
  }, []);

  if (!recruiter) return null;

  const logoutHandler = () => {
    localStorage.clear();
    navigate("/");
  };

  const isHome = location.pathname === "/recruiter/dashboard";

  // 🔥 latest 2 applications
  const recentApplications = applications.slice(0, 2);

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* ================= SIDEBAR ================= */}
      <aside className="w-72 bg-gradient-to-b from-[#020617] to-[#0f172a]
                        text-white p-6 flex flex-col shadow-2xl">

        <h1 className="text-2xl font-bold mb-10">
          Job<span className="text-blue-400">ly</span>
        </h1>

        {/* PROFILE */}
        <div
          onClick={() => navigate("/recruiter/dashboard/profile")}
          className="flex items-center gap-4 p-3 rounded-xl cursor-pointer
                     hover:bg-white/10"
        >
          <img
            src={recruiter.profilePic || "https://i.pravatar.cc/150"}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <h3 className="font-semibold">{recruiter.name}</h3>
            <p className="text-sm text-gray-400">
              {recruiter.companyName || "Recruiter"}
            </p>
          </div>
        </div>

        <button
          onClick={() => navigate("/recruiter/dashboard/edit-profile")}
          className="text-sm text-blue-400 ml-4 mb-10"
        >
          Edit Profile →
        </button>

        {/* NAV */}
        <div className="space-y-2 flex-1">
          <SidebarBtn
            icon="🏠"
            label="Dashboard"
            active={isHome}
            onClick={() => navigate("/recruiter/dashboard")}
          />
          <SidebarBtn
            icon="➕"
            label="Post Job"
            onClick={() => navigate("post-job")}
          />
          <SidebarBtn
            icon="📋"
            label="Posted Jobs"
            onClick={() => navigate("jobs")}
          />
          <SidebarBtn
            icon="📨"
            label="Applications"
            onClick={() => navigate("applications")}
          />
        </div>

        <button
          onClick={logoutHandler}
          className="mt-6 bg-red-500/10 text-red-400 py-3 rounded-xl"
        >
          🚪 Logout
        </button>
      </aside>

      {/* ================= MAIN ================= */}
      <main className="flex-1 px-10 py-8 bg-gray-50">
        {isHome && (
          <>
            {/* HEADER */}
            <div className="bg-white rounded-2xl p-6 shadow mb-8
                            flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold">
                  Welcome back, {recruiter.name.split(" ")[0]} 👋
                </h1>
                <p className="text-gray-500">
                  Manage your jobs & applications like a pro
                </p>
              </div>

              <button
                onClick={() => navigate("post-job")}
                className="bg-blue-600 text-white px-6 py-3 rounded-xl"
              >
                ➕ Post a Job
              </button>
            </div>

            {/* STATS */}
            <div className="grid grid-cols-3 gap-6 mb-10">
              <StatCard
                title="Total Jobs"
                count={totalJobs}
                gradient="from-blue-500 to-blue-700"
              />
              <StatCard
                title="Applications"
                count={applications.length}
                gradient="from-purple-500 to-purple-700"
              />
              <StatCard
                title="Shortlisted"
                count="32"
                gradient="from-green-500 to-green-700"
              />
            </div>

            {/* 🔥 RECENT APPLICATIONS (CLEAN) */}
            <div className="bg-white rounded-2xl shadow p-6">
              <h2 className="text-xl font-semibold mb-4">
                Recent Applications
              </h2>

              {recentApplications.length === 0 ? (
                <p className="text-gray-500">
                  No applications yet.
                </p>
              ) : (
                <div className="space-y-4">
                  {recentApplications.map((app) => (
                    <div
                      key={app._id}
                      className="border rounded-xl p-4 flex justify-between items-center"
                    >
                      <div>
                        <p className="font-semibold">
                          {app.candidate?.name}
                        </p>
                        <p className="text-sm text-gray-500">
                          {app.job?.title}
                        </p>
                      </div>

                      <span className="text-xs px-3 py-1 rounded-full
                                       bg-blue-100 text-blue-700">
                        {app.status}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
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
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl
      ${active
        ? "bg-blue-600 text-white"
        : "text-gray-300 hover:bg-white/10"}
    `}
  >
    <span>{icon}</span>
    <span>{label}</span>
  </button>
);

const StatCard = ({ title, count, gradient }) => (
  <div className={`bg-gradient-to-r ${gradient}
                  text-white p-6 rounded-2xl shadow`}>
    <p className="text-white/80">{title}</p>
    <h2 className="text-4xl font-bold mt-2">{count}</h2>
  </div>
);
