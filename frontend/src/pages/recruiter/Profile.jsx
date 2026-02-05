import { useNavigate } from "react-router-dom";

const RecruiterProfile = () => {
  const navigate = useNavigate();
  const profile = JSON.parse(localStorage.getItem("recruiterProfile"));

  if (!profile) return null;

  return (
    <div className="p-10 flex justify-center">
      <div className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-4xl">

        {/* HEADER */}
        <div className="flex items-center gap-8 border-b pb-8">
          <img
            src={profile.profilePic || "https://i.pravatar.cc/150"}
            className="w-36 h-36 rounded-full object-cover ring-4 ring-blue-500"
          />

          <div>
            <h1 className="text-3xl font-bold">{profile.name}</h1>
            <p className="text-xl text-gray-500">
              {profile.companyName}
            </p>
            <p className="text-gray-400">{profile.email}</p>
          </div>
        </div>

        {/* DETAILS */}
        <div className="grid grid-cols-2 gap-8 mt-10 text-lg">
          <Detail label="Experience" value={profile.experience} />
          <Detail
            label="Date of Birth"
            value={
              profile.dob
                ? new Date(profile.dob).toDateString()
                : "-"
            }
          />
          <Detail label="Location" value={profile.location} />
        </div>

        {/* BIO */}
        <div className="mt-10">
          <h3 className="text-xl font-semibold mb-2">About</h3>
          <p className="text-gray-600 leading-relaxed">
            {profile.bio || "No bio added"}
          </p>
        </div>

        {/* ACTION */}
        <button
          onClick={() =>
            navigate("/recruiter/dashboard/edit-profile")
          }
          className="mt-10 px-8 py-3 bg-blue-600 text-white rounded-xl text-lg hover:bg-blue-700"
        >
          ✏️ Edit Profile
        </button>
      </div>
    </div>
  );
};

const Detail = ({ label, value }) => (
  <div>
    <p className="text-gray-400">{label}</p>
    <p className="font-semibold">{value || "-"}</p>
  </div>
);

export default RecruiterProfile;
