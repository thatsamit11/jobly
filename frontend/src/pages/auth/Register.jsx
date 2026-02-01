import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = ({ role }) => {
  const navigate = useNavigate();

  const [selectedRole, setSelectedRole] = useState(role || "");
  const [name, setName] = useState("");
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
        document.getElementById("googleSignIn"),
        {
          theme: "outline",
          size: "large",
          width: "100%",
        }
      );
    }
  }, [selectedRole]);

  // ================= GOOGLE REGISTER / LOGIN =================
  const handleGoogleResponse = async (response) => {
    if (!selectedRole) {
      alert("Please select a role first");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/google",
        {
          credential: response.credential,
          role: selectedRole,
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

  // ================= NORMAL REGISTER (REAL) =================
  const handleRegister = async (e) => {
    e.preventDefault();

    if (!selectedRole) {
      alert("Please select a role");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          name,
          email,
          password,
          role: selectedRole,
        }
      );

      const { token, user } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("role", user.role);

      navigate(`/${user.role}/dashboard`);
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-500 to-orange-500 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800">
          Create Account 🚀
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

        <div className="text-center text-gray-400 my-2">OR</div>

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
            className="w-full py-3 rounded-xl bg-orange-500 text-white font-semibold"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
