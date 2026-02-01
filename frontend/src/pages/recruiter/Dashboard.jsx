import { Outlet, useNavigate } from "react-router-dom";

const RecruiterDashboard = () => {
  const navigate = useNavigate();

  // 🔹 Backend se baad me aayega
const recruiter =
  JSON.parse(localStorage.getItem("recruiterProfile")) || {
    name: "Recruiter Name",
    company: "Company Name",
  };

  const logoutHandler = () => {
    localStorage.clear();
    navigate("/"); // landing page
  };

  return (
    <div className="min-h-screen flex bg-gray-100">

      {/* ================= SIDEBAR ================= */}
      <aside className="w-72 bg-white p-6 flex flex-col shadow-md">

        {/* Profile */}
        <div
          onClick={() => navigate("/recruiter/dashboard/profile")}
          className="flex items-center gap-3 cursor-pointer"
        >
          <img
            src={recruiter.profilePic}
            className="w-12 h-12 rounded-full object-cover"
            alt="profile"
          />
          <div>
            <h3 className="font-semibold">{recruiter.name}</h3>
            <p className="text-sm text-gray-500">{recruiter.company}</p>
          </div>
        </div>

        <button
          onClick={() => navigate("/recruiter/dashboard/edit-profile")}
          className="text-blue-600 text-sm mt-2 self-start"
        >
          Edit Profile
        </button>

        {/* Navigation */}
        <div className="mt-8 space-y-3 flex-1">
          <SidebarBtn label="🏠 Home" onClick={() => navigate("/recruiter/dashboard")} />
          <SidebarBtn label="➕ Post a Job" onClick={() => navigate("post-job")} />
          <SidebarBtn label="📋 Posted Jobs" onClick={() => navigate("jobs")} />
          <SidebarBtn label="📨 Applications" onClick={() => navigate("applications")} />
        </div>

        {/* Logout */}
        <button
          onClick={logoutHandler}
          className="bg-red-100 text-red-600 py-2 rounded-lg hover:bg-red-200"
        >
          🚪 Logout
        </button>
      </aside>

      {/* ================= MAIN ================= */}
      <main className="flex-1 p-8 overflow-y-auto">

        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-semibold">
            Welcome, {recruiter.name.split(" ")[0]} 👋
          </h1>

          <button
            onClick={() => navigate("post-job")}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
          >
            ➕ Post a Job
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-6 mb-10">
          <StatCard title="Total Jobs" count="8" onClick={() => navigate("jobs")} />
          <StatCard title="Applications" count="124" onClick={() => navigate("applications")} />
          <StatCard title="Shortlisted" count="32" onClick={() => navigate("applications?filter=shortlisted")} />
        </div>

        {/* Page Content */}
        <Outlet />
      </main>
    </div>
  );
};

export default RecruiterDashboard;



/* ================= COMPONENTS ================= */



const SidebarBtn = ({ label, onClick }) => (
  <button
    onClick={onClick}
    className="w-full text-left px-4 py-3 rounded-lg bg-gray-100 hover:bg-blue-50"
  >
    {label}
  </button>
);

const StatCard = ({ title, count, onClick }) => (
  <div
    onClick={onClick}
    className="cursor-pointer bg-white p-6 rounded-xl shadow hover:shadow-md transition"
  >
    <p className="text-gray-500">{title}</p>
    <h2 className="text-3xl font-bold mt-2">{count}</h2>
  </div>
);

