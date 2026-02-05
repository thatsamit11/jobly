import { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import CandidateNavbar from "../../components/CandidateNavbar";

const CandidateDashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("candidateProfile"));

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  if (!user) return null;

  return (
    <>
      {/* NAVBAR ONLY HERE */}
      <CandidateNavbar user={user} />

      <div className="bg-gray-50 min-h-screen px-10 py-8">
        <h1 className="text-3xl font-bold mb-1">
          Welcome back, {user.name.split(" ")[0]} 👋
        </h1>
        <p className="text-gray-500 mb-6">
          Find your next opportunity today
        </p>

        {/* CHILD ROUTES RENDER HERE */}
        <Outlet />
      </div>
    </>
  );
};

export default CandidateDashboard;
