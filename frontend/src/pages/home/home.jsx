import { useNavigate } from "react-router-dom";
import ShaderBackground from "../../components/ShaderBackground";

const Home = () => {
  const navigate = useNavigate();

  // ✅ CANDIDATE FLOW
  const handleFindJobs = () => {
    const token = localStorage.getItem("token");
    const candidate = JSON.parse(localStorage.getItem("candidateProfile"));

    if (!token || !candidate) {
      navigate("/auth?mode=login&role=candidate");
    } else {
      navigate("/candidate/dashboard");
    }
  };

  // ✅ RECRUITER FLOW
  const handleHireTalent = () => {
    const token = localStorage.getItem("token");
    const recruiter = JSON.parse(localStorage.getItem("recruiterProfile"));

    if (!token || !recruiter) {
      navigate("/auth?mode=login&role=recruiter");
    } else {
      navigate("/recruiter/dashboard");
    }
  };

  return (
    <div className="w-full">
      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b">
        <div className="flex justify-between items-center px-10 py-4">
          <h1 className="text-2xl font-bold cursor-pointer">Jobly</h1>

          <div className="flex gap-4">
            <button
              onClick={() => navigate("/auth?mode=login")}
              className="px-5 py-2 rounded-full border border-sky-400 text-sky-400 hover:bg-sky-400 hover:text-white"
            >
              Login
            </button>
            <button
              onClick={() => navigate("/auth?mode=register")}
              className="px-5 py-2 rounded-full border border-sky-400 text-sky-400 hover:bg-sky-400 hover:text-white"
            >
              Register
            </button>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative h-screen text-white">
        <ShaderBackground />

        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center">
          <h2 className="text-5xl font-bold">
            Find Jobs or Hire Talent
          </h2>

          <div className="flex gap-6 mt-10">
            <button
              onClick={handleFindJobs}
              className="px-8 py-3 bg-blue-600 rounded-xl"
            >
              Find Jobs
            </button>
            <button
              onClick={handleHireTalent}
              className="px-8 py-3 bg-purple-600 rounded-xl"
            >
              Hire Talent
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
