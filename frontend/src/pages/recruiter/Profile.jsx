import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const profile = JSON.parse(localStorage.getItem("candidateProfile"));

  if (!profile) return <div className="p-10">Loading...</div>;

  return (
    <div className="min-h-screen bg-[#eef2f7] p-10 flex justify-center">
      <div className="bg-white max-w-4xl w-full rounded-2xl shadow p-8">

        {/* HEADER */}
        <div className="flex items-center gap-6 mb-8">
          <img
            src={profile.profilePic || "https://i.pravatar.cc/150"}
            className="w-28 h-28 rounded-full object-cover"
          />
          <div>
            <h1 className="text-2xl font-bold">{profile.name}</h1>
            <p className="text-gray-500">{profile.email}</p>
            <p className="text-gray-500">{profile.location}</p>
          </div>
        </div>

        {/* DETAILS */}
        <div className="space-y-4">
          <p><b>Experience:</b> {profile.experience}</p>
          <p><b>Bio:</b> {profile.bio}</p>

          <div>
            <b>Skills:</b>
            <div className="flex flex-wrap gap-2 mt-2">
              {profile.skills?.map((s) => (
                <span
                  key={s}
                  className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* RESUME */}
          {profile.resumeUrl && (
            <a
              href={profile.resumeUrl}
              target="_blank"
              className="inline-block mt-4 px-5 py-2 bg-green-600 text-white rounded-lg"
            >
              View Resume
            </a>
          )}
        </div>

        <button
          onClick={() => navigate("/candidate/profile/edit")}
          className="mt-8 px-6 py-3 bg-blue-600 text-white rounded-xl"
        >
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default Profile;
