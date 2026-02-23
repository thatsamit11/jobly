import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import ShaderBackground from "../../components/ShaderBackground";

const Login = ({ role }) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // ================= GOOGLE INIT =================
  useEffect(() => {
    if (!window.google) return;

    window.google.accounts.id.initialize({
      client_id:
        "137141801241-5i8cr48d3en5puh3tn8nl7b5lbv5nn4v.apps.googleusercontent.com",
      callback: handleGoogle,
    });

    window.google.accounts.id.renderButton(
      document.getElementById("googleLogin"),
      { theme: "outline", size: "large", width: "100%" }
    );
  }, [role]);

  // ================= AFTER LOGIN =================
  const afterLogin = async (token, user) => {
    localStorage.setItem("token", token);
    localStorage.setItem("role", user.role);

    const profileRes = await axios.get(
      "http://localhost:5000/api/profile/me",
      { headers: { Authorization: `Bearer ${token}` } }
    );

    localStorage.setItem(
      user.role === "candidate"
        ? "candidateProfile"
        : "recruiterProfile",
      JSON.stringify(profileRes.data)
    );

    navigate(`/${user.role}/dashboard`);
  };

  // ================= GOOGLE LOGIN =================
  const handleGoogle = async (res) => {
    try {
      setError("");
      setLoading(true);

      const r = await axios.post(
        "http://localhost:5000/api/auth/google",
        { credential: res.credential, role }
      );

      await afterLogin(r.data.token, r.data.user);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Google login unsuccessful. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // ================= MANUAL LOGIN =================
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);

      const r = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password, role }
      );

      await afterLogin(r.data.token, r.data.user);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Login unsuccessful. Please check credentials."
      );
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
              Welcome Back to Jobly
            </h1>
            <p className="mt-6 text-white/80 text-lg">
              Whether you are looking for your next opportunity or
              hiring top talent, Jobly helps you move faster.
            </p>
          </div>
        </div>
      </div>

      {/* RIGHT – LOGIN FORM */}
      <div className="flex items-center justify-center px-6 bg-gray-50">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl"
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Login
          </h2>

          <p className="text-gray-500 mb-6">
            Continue as <span className="font-semibold">{role}</span>
          </p>

          {/* 🔴 ERROR ALERT (Design Safe) */}
          {error && (
            <div className="mb-4 p-3 rounded-xl bg-red-100 text-red-600 text-sm">
              {error}
            </div>
          )}

          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            className="border px-4 py-3 w-full rounded-xl mb-4"
          />

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="border px-4 py-3 w-full rounded-xl mb-4"
          />

          <button
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-3 rounded-xl font-semibold"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <div className="my-6 text-center text-gray-400">
            OR
          </div>

          <div id="googleLogin"></div>
        </form>
      </div>
    </div>
  );
};

export default Login;
