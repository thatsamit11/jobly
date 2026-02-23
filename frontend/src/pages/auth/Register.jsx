import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ShaderBackground from "../../components/ShaderBackground";

const Register = ({ role }) => {
  const navigate = useNavigate();

  // ✅ ENV VARIABLES
  const API = import.meta.env.VITE_API_URL;
  const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  const [selectedRole, setSelectedRole] = useState(role || "");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // ================= GOOGLE INIT =================
  useEffect(() => {
    if (!window.google) return;

    window.google.accounts.id.initialize({
      client_id: GOOGLE_CLIENT_ID,
      callback: handleGoogleResponse,
    });

    window.google.accounts.id.renderButton(
      document.getElementById("googleSignIn"),
      { theme: "outline", size: "large", width: "100%" }
    );
  }, [selectedRole]);

  // ================= GOOGLE REGISTER =================
  const handleGoogleResponse = async (response) => {
    if (!selectedRole) {
      alert("Please select a role first");
      return;
    }

    try {
      const res = await axios.post(
        `${API}/api/auth/google`,
        { credential: response.credential, role: selectedRole }
      );

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.user.role);

      navigate(`/${res.data.user.role}/dashboard`);
    } catch (err) {
      alert(err.response?.data?.message || "Google registration failed");
    }
  };

  // ================= NORMAL REGISTER =================
  const handleRegister = async (e) => {
    e.preventDefault();
    if (!selectedRole) return alert("Please select a role");

    try {
      setLoading(true);

      const res = await axios.post(
        `${API}/api/auth/register`,
        { name, email, password, role: selectedRole }
      );

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.user.role);

      navigate(`/${res.data.user.role}/dashboard`);
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">

      {/* LEFT – SHADER + TEXT */}
      <div className="relative hidden md:block">
        <ShaderBackground />
        <div className="absolute inset-0 flex items-center justify-center text-white px-10">
          <div className="max-w-lg">
            <h1 className="text-4xl font-bold leading-tight">
              Start Your Journey with Jobly
            </h1>
            <p className="mt-6 text-white/80 text-lg">
              Build your career or grow your team using a modern,
              fast and role-based hiring platform.
            </p>
          </div>
        </div>
      </div>

      {/* RIGHT – REGISTER FORM */}
      <div className="flex items-center justify-center px-6 bg-gray-50">
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl">

          <h2 className="text-3xl font-bold text-gray-800 text-center">
            Create Account
          </h2>

          {/* ROLE */}
          <div className="grid grid-cols-2 gap-4 my-6">
            <button
              type="button"
              onClick={() => setSelectedRole("candidate")}
              className={`p-4 rounded-xl border font-semibold ${
                selectedRole === "candidate"
                  ? "bg-blue-600 text-white"
                  : "border-gray-300"
              }`}
            >
              Candidate
            </button>

            <button
              type="button"
              onClick={() => setSelectedRole("recruiter")}
              className={`p-4 rounded-xl border font-semibold ${
                selectedRole === "recruiter"
                  ? "bg-purple-600 text-white"
                  : "border-gray-300"
              }`}
            >
              Recruiter
            </button>
          </div>

          {/* GOOGLE */}
          <div id="googleSignIn" className="mb-4"></div>

          <div className="text-center text-gray-400 my-2">
            OR
          </div>

          {/* NORMAL REGISTER */}
          <form onSubmit={handleRegister} className="space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 border rounded-xl"
            />

            <input
              type="email"
              placeholder="Email address"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border rounded-xl"
            />

            <input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border rounded-xl"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-semibold transition"
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;