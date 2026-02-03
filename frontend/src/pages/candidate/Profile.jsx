import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Profile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await axios.get(
          "http://localhost:5000/api/profile/me",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setProfile(res.data);
        localStorage.setItem(
          "candidateProfile",
          JSON.stringify(res.data)
        );
      } catch (err) {
        console.error(err);
      }
    };

    fetchProfile();
  }, []);

  if (!profile) return null;

  return (
    <div className="min-h-screen bg-[#eef2f7] p-10">
      <div className="bg-white max-w-4xl mx-auto rounded-2xl shadow p-8">

        <div className="flex justify-between items-start mb-8">
          <div className="flex items-center gap-6">
            <img
              src={profile.profilePic || "https://i.pravatar.cc/150"}
              className="w-28 h-28 rounded-full object-cover border"
            />
            <div>
              <h1 className="text-3xl font-bold">{profile.name}</h1>
              <p className="text-gray-500">{profile.location}</p>
            </div>
          </div>

          <button
            onClick={() => navigate("/candidate/profile/edit")}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg"
          >
            Edit Profile
          </button>
        </div>

        <Section title="Bio">
          {profile.bio || "No bio added"}
        </Section>

        <Section title="Experience">
          {profile.experience || "Not specified"}
        </Section>

        <Section title="Skills">
          <div className="flex flex-wrap gap-2">
            {profile.skills?.length > 0 ? (
              profile.skills.map((s) => (
                <span
                  key={s}
                  className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full"
                >
                  {s}
                </span>
              ))
            ) : (
              <p className="text-gray-400 text-sm">
                No skills added
              </p>
            )}
          </div>
        </Section>

      </div>
    </div>
  );
};

const Section = ({ title, children }) => (
  <div className="mb-6">
    <h3 className="font-semibold mb-2">{title}</h3>
    {children}
  </div>
);

export default Profile;
