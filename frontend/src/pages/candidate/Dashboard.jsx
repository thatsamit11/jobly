import { useNavigate, Outlet } from "react-router-dom";
import { useState } from "react";

const CandidateDashboard = () => {
  const navigate = useNavigate();
  const [savedJobs, setSavedJobs] = useState([]);

  // PROFILE DATA
  const profile =
    JSON.parse(localStorage.getItem("candidateProfile")) || {};

  const toggleSave = (id) => {
    setSavedJobs((prev) =>
      prev.includes(id)
        ? prev.filter((j) => j !== id)
        : [...prev, id]
    );
  };

  // 🔴 LOGOUT FUNCTION
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("candidateProfile");
    navigate("/");
  };

  return (
    <div className="h-screen bg-gray-100 flex overflow-hidden">

      {/* ========== LEFT SIDEBAR ========== */}
      <aside className="w-64 bg-white p-6 shadow-md flex-shrink-0 flex flex-col">

        {/* HOME BUTTON */}
        <button
          onClick={() => navigate("/candidate/dashboard")}
          className="w-full flex items-center gap-3 px-4 py-3 mb-6 rounded-xl bg-blue-500 text-white hover:bg-blue-600 transition"
        >
          <span className="text-xl">🏠</span>
          <span className="font-medium">Home</span>
        </button>

        {/* PROFILE */}
        <div className="flex items-center gap-3 mb-1">
          <img
            src={profile.profilePic || "https://i.pravatar.cc/100"}
            alt="profile"
            onClick={() => navigate("/candidate/dashboard/profile")}
            className="w-12 h-12 rounded-full object-cover cursor-pointer"
          />
          <div>
            <h2 className="font-semibold">
              {profile.name || "Your Name"}
            </h2>
            <p
              onClick={() =>
                navigate("/candidate/dashboard/profile/edit")
              }
              className="text-sm text-gray-500 cursor-pointer hover:underline"
            >
              Edit Profile
            </p>
          </div>
        </div>

        {/* SIDEBAR BUTTONS */}
        <div className="space-y-3 mt-8 flex-1">
          <SidebarBtn
            icon="💾"
            text="Saved Jobs"
            onClick={() =>
              navigate("/candidate/dashboard/saved-jobs")
            }
          />
          <SidebarBtn
            icon="📤"
            text="Applied Jobs"
            onClick={() =>
              navigate("/candidate/dashboard/applied-jobs")
            }
          />
          <SidebarBtn
            icon="⭐"
            text="Shortlisted"
            onClick={() =>
              navigate("/candidate/dashboard/shortlisted")
            }
          />
          <SidebarBtn
            icon="🎤"
            text="Interviews"
            onClick={() =>
              navigate("/candidate/dashboard/interviews")
            }
          />
        </div>

        {/* LOGOUT BUTTON (BOTTOM) */}
        <button
          onClick={handleLogout}
          className="w-full mt-6 flex items-center gap-3 px-4 py-3 rounded-xl bg-red-100 text-red-600 hover:bg-red-200 transition"
        >
          <span className="text-lg">🚪</span>
          <span className="font-medium">Logout</span>
        </button>

      </aside>

      {/* ========== MAIN CONTENT ========== */}
      <main className="flex-1 p-8 overflow-hidden flex flex-col">
        <Outlet />
      </main>

      {/* ========== AI CHATBOT ========== */}
      <aside className="w-72 bg-blue-50 p-4 flex flex-col flex-shrink-0">
        <h4 className="font-semibold mb-3">
          AI Career Assistant
        </h4>

        <div className="flex-1 bg-white rounded-lg p-3 mb-3 overflow-y-auto space-y-2 text-sm">
          <div className="bg-gray-100 p-2 rounded-lg">
            Hi! How can I help you today?
          </div>
          <div className="bg-blue-100 p-2 rounded-lg self-end">
            Suggest frontend jobs
          </div>
          <div className="bg-gray-100 p-2 rounded-lg">
            Here are some React-based opportunities.
          </div>
        </div>

        <input
          type="text"
          placeholder="Ask something..."
          className="px-3 py-2 rounded-lg border"
        />
      </aside>

    </div>
  );
};

const SidebarBtn = ({ icon, text, onClick }) => (
  <button
    onClick={onClick}
    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-gray-100 hover:bg-blue-50 transition"
  >
    <span className="text-lg">{icon}</span>
    <span className="font-medium">{text}</span>
  </button>
);

export default CandidateDashboard;
