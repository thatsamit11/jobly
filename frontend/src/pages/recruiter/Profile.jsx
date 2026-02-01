const Profile = () => {
  const recruiter =
    JSON.parse(localStorage.getItem("recruiterProfile")) || {};

  return (
    <div className="bg-white p-6 rounded-xl shadow max-w-xl">
      <h2 className="text-xl font-semibold mb-6">My Profile</h2>

      <div className="flex items-center gap-4 mb-6">
        <img
          src={
            recruiter.profilePic
              ? recruiter.profilePic
              : "https://i.pravatar.cc/120"
          }
          className="w-20 h-20 rounded-full object-cover"
          alt="profile"
        />
        <div>
          <p className="text-lg font-medium">
            {recruiter.name || "Name not set"}
          </p>
          <p className="text-gray-500">
            {recruiter.company || "Company not set"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
