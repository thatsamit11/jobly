import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleFindJobs = () => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token) {
      navigate("/auth?role=candidate");
    } else {
      navigate(`/${role}/dashboard`);
    }
  };

  const handleHireTalent = () => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token) {
      navigate("/auth?role=recruiter");
    } else {
      navigate(`/${role}/dashboard`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-10 py-6">
        <h1 className="text-2xl font-bold text-blue-600">Jobly</h1>

        <div className="flex gap-4">
          <button
            onClick={() => navigate("/auth")}
            className="px-5 py-2 rounded-full border"
          >
            Login
          </button>
          <button
            onClick={() => navigate("/auth?mode=register")}
            className="px-5 py-2 rounded-full border"
          >
            Register
          </button>
        </div>
      </nav>

      {/* Hero */}
      <div className="flex flex-col items-center text-center mt-20">
        <h2 className="text-4xl font-bold max-w-3xl">
          Find Jobs or Hire Talent — One Platform
        </h2>

        <p className="text-gray-500 mt-4 max-w-xl">
          Connecting candidates with recruiters for a seamless hiring
          experience.
        </p>

        {/* CTA */}
        <div className="flex gap-6 mt-8">
          <button
            onClick={handleFindJobs}
            className="px-8 py-3 bg-blue-500 text-white rounded-xl"
          >
            Find Jobs
          </button>

          <button
            onClick={handleHireTalent}
            className="px-8 py-3 bg-purple-500 text-white rounded-xl"
          >
            Hire Talent
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
