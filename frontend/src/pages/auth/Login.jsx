import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Login = ({ role }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (!window.google) return;

    google.accounts.id.initialize({
      client_id: "137141801241-5i8cr48d3en5puh3tn8nl7b5lbv5nn4v.apps.googleusercontent.com",
      callback: handleGoogle,
    });

    google.accounts.id.renderButton(
      document.getElementById("googleLogin"),
      { theme: "outline", size: "large", width: "100%" }
    );
  }, [role]);

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

  const handleGoogle = async (res) => {
    const r = await axios.post(
      "http://localhost:5000/api/auth/google",
      { credential: res.credential, role }
    );
    afterLogin(r.data.token, r.data.user);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const r = await axios.post(
      "http://localhost:5000/api/auth/login",
      { email, password, role }
    );
    afterLogin(r.data.token, r.data.user);
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded-xl w-96">
        <h2 className="text-xl font-bold mb-4">
          Login as {role}
        </h2>

        <input
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          placeholder="Email"
          className="border p-2 w-full mb-3"
        />

        <input
          type="password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          placeholder="Password"
          className="border p-2 w-full mb-3"
        />

        <button className="w-full bg-blue-600 text-white py-2">
          Login
        </button>

        <div className="my-4 text-center">OR</div>
        <div id="googleLogin"></div>
      </form>
    </div>
  );
};

export default Login;
