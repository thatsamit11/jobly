import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Login = ({ role }) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // ================= GOOGLE INIT =================
  useEffect(() => {
    /* global google */
    if (window.google) {
      google.accounts.id.initialize({
        client_id:
          "137141801241-5i8cr48d3en5puh3tn8nl7b5lbv5nn4v.apps.googleusercontent.com",
        callback: handleGoogleResponse,
      });

      google.accounts.id.renderButton(
        document.getElementById("googleLogin"),
        {
          theme: "outline",
          size: "large",
          width: "100%",
        }
      );
    }
  }, [role]);

  // ================= GOOGLE LOGIN =================
  const handleGoogleResponse = async (response) => {
  

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/google",
        {
          credential: response.credential,
          role,
        }
      );

      const { token, user } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("role", user.role);

      navigate(`/${user.role}/dashboard`);
    } catch (err) {
      alert("Google login failed");
      console.error(err);
    }
  };

  // ================= NORMAL LOGIN =================
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password,
          role,
        }
      );

      const { token, user } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("role", user.role);

      navigate(`/${user.role}/dashboard`);
    } catch (err) {
      alert(err.response?.data?.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-500 to-purple-600 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">

        <h2 className="text-3xl font-bold text-center text-gray-800">
          Welcome Back 👋
        </h2>
        <p className="text-center text-gray-500 mt-2 mb-6">
          Login as {role || "User"}
        </p>

        {/* NORMAL LOGIN */}
        <form onSubmit={handleLogin} className="space-y-4">
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
            className="w-full py-3 bg-blue-600 text-white rounded-xl font-semibold"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-gray-300"></div>
          <span className="px-3 text-sm text-gray-500">OR</span>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        {/* GOOGLE LOGIN */}
        <div id="googleLogin"></div>

      </div>
    </div>
  );
};

export default Login;
