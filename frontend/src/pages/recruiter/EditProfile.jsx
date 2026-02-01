import { useState } from "react";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const navigate = useNavigate();

  const savedProfile =
    JSON.parse(localStorage.getItem("recruiterProfile")) || {};

  const [name, setName] = useState(savedProfile.name || "");
  const [company, setCompany] = useState(savedProfile.company || "");
  const [profilePic, setProfilePic] = useState(
    savedProfile.profilePic || ""
  );

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // ⚠️ size limit (VERY IMPORTANT)
    if (file.size > 200 * 1024) {
      alert("Image must be under 200KB");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setProfilePic(reader.result); // base64
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    const updatedProfile = {
      name,
      company,
      profilePic,
    };

    localStorage.setItem(
      "recruiterProfile",
      JSON.stringify(updatedProfile)
    );

    navigate("/recruiter/dashboard");
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow max-w-xl">
      <h2 className="text-xl font-semibold mb-6">Edit Profile</h2>

      {/* PROFILE IMAGE */}
      <div className="flex flex-col items-center mb-6">
        <img
          src={profilePic || "https://i.pravatar.cc/120"}
          className="w-28 h-28 rounded-full object-cover mb-3"
          alt="profile"
        />

        <label className="cursor-pointer text-blue-600 text-sm">
          Change Profile Photo
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </label>
      </div>

      <input
        className="w-full border p-2 rounded mb-3"
        placeholder="Your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        className="w-full border p-2 rounded mb-6"
        placeholder="Company Name"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
      />

      <button
        onClick={handleSave}
        className="w-full bg-blue-600 text-white py-2 rounded-lg"
      >
        Save Profile
      </button>
    </div>
  );
};

export default EditProfile;
