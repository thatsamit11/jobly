import { useNavigate } from "react-router-dom";
import ShaderBackground from "../../components/ShaderBackground";

const Home = () => {
  const navigate = useNavigate();

  // ✅ FIXED
  const handleFindJobs = () => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token) {
      navigate("/auth?mode=login&role=candidate");
    } else {
      navigate(`/${role}/dashboard`);
    }
  };

  // ✅ FIXED
  const handleHireTalent = () => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token) {
      navigate("/auth?mode=login&role=recruiter");
    } else {
      navigate(`/${role}/dashboard`);
    }
  };

  return (
    <div className="w-full">

      {/* ================= STICKY NAVBAR (PAGE LEVEL) ================= */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-gray-200">
        <div className="flex justify-between items-center px-10 py-4">

          <h1 className="text-2xl font-bold text-black cursor-pointer">
            Jobly
          </h1>

          <div className="flex gap-4">
            <button
              onClick={() => navigate("/auth?mode=login")}
              className="px-5 py-2 rounded-full border border-sky-400 text-sky-400
                         hover:bg-sky-400 hover:text-white transition"
            >
              Login
            </button>

            <button
              onClick={() => navigate("/auth?mode=register")}
              className="px-5 py-2 rounded-full border border-sky-400 text-sky-400
                         hover:bg-sky-400 hover:text-white transition"
            >
              Register
            </button>
          </div>

        </div>
      </nav>

      {/* ================= HERO SECTION ================= */}
      <section className="relative h-screen w-full overflow-hidden text-white">

        {/* Shader background */}
        <ShaderBackground />

        {/* Hero content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
          <h2 className="text-5xl font-bold max-w-3xl leading-tight">
            Find Jobs or Hire Talent — <br />
            One Powerful Platform
          </h2>

          <p className="text-white/80 mt-6 max-w-xl text-lg">
            Connecting candidates with recruiters for a fast, modern
            and seamless hiring experience.
          </p>

          <div className="flex gap-6 mt-10">
            <button
              onClick={handleFindJobs}
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl transition"
            >
              Find Jobs
            </button>

            <button
              onClick={handleHireTalent}
              className="px-8 py-3 bg-purple-600 hover:bg-purple-700 rounded-xl transition"
            >
              Hire Talent
            </button>
          </div>
        </div>
      </section>

      {/* ================= ZIG-ZAG DETAILS SECTION ================= */}
      <section className="bg-gray-50 text-gray-800 py-24 px-8">
        <div className="max-w-6xl mx-auto space-y-32">

          {/* ===== BLOCK 1 ===== */}
          <div className="grid md:grid-cols-2 gap-14 items-center">
            <div>
              <img
                src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d"
                alt="role based dashboard"
                className="rounded-2xl shadow-xl"
              />
            </div>

            <div>
              <h3 className="text-3xl font-bold mb-4">
                Role-Based Dashboards
              </h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Jobly offers separate dashboards for candidates and recruiters,
                ensuring a focused experience with role-specific tools,
                permissions, and workflows.
              </p>
            </div>
          </div>

          {/* ===== BLOCK 2 (REVERSE) ===== */}
          <div className="grid md:grid-cols-2 gap-14 items-center">
            <div className="md:order-2">
              <img
                src="https://images.unsplash.com/photo-1557804506-669a67965ba0"
                alt="smart hiring"
                className="rounded-2xl shadow-xl"
              />
            </div>

            <div className="md:order-1">
              <h3 className="text-3xl font-bold mb-4">
                Smart Hiring Workflow
              </h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Recruiters can post jobs, track applications, shortlist
                candidates, and manage the entire hiring pipeline
                from one centralized system.
              </p>
            </div>
          </div>

          {/* ===== BLOCK 3 ===== */}
          <div className="grid md:grid-cols-2 gap-14 items-center">
            <div>
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
                alt="modern ui"
                className="rounded-2xl shadow-xl"
              />
            </div>

            <div>
              <h3 className="text-3xl font-bold mb-4">
                Modern & Scalable UI
              </h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Built with React, Tailwind and a shader-powered landing page,
                Jobly delivers a smooth, responsive and scalable
                user experience across all devices.
              </p>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};

export default Home;
