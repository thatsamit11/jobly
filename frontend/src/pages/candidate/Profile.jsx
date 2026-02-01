import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white p-8 rounded-xl shadow max-w-xl">
      <h1 className="text-2xl font-bold mb-4">My Profile</h1>

      <p><b>Name:</b> Amit</p>
      <p><b>Email:</b> amit@gmail.com</p>
      <p><b>Skills:</b> React, Tailwind</p>

      <button
        onClick={() => navigate("/candidate/profile/edit")}
        className="mt-6 px-5 py-2 bg-blue-600 text-white rounded-xl"
      >
        Edit Profile
      </button>
    </div>
  );
};

export default Profile;
