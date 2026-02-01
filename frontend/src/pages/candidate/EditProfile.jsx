import { useNavigate } from "react-router-dom";
import { useState } from "react";

const EditProfile = () => {
  const navigate = useNavigate();

  const [profilePic, setProfilePic] = useState(null);
  const [skills, setSkills] = useState([]);
  const [skillInput, setSkillInput] = useState("");

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePic(URL.createObjectURL(file));
    }
  };

  const addSkill = () => {
    if (skillInput.trim() && !skills.includes(skillInput)) {
      setSkills([...skills, skillInput]);
      setSkillInput("");
    }
  };

  const removeSkill = (skill) => {
    setSkills(skills.filter((s) => s !== skill));
  };

const handleSave = () => {
  const profileData = {
    name: "Amit",
    email: "amit@gmail.com",
    location: "India",
    experience: "1–3 Years",
    bio: "Frontend Developer passionate about UI",
    skills,
    profilePic,
  };

  localStorage.setItem(
    "candidateProfile",
    JSON.stringify(profileData)
  );

  navigate("/candidate/dashboard/profile");
};

  return (
    <div className="h-full flex flex-col bg-gray-100">

      {/* HEADER */}
      <div className="bg-white px-8 py-4 border-b flex justify-between items-center">
        <h1 className="text-xl font-bold">Edit Profile</h1>
        <button
          onClick={() => navigate(-1)}
          className="text-blue-600"
        >
          ← Back
        </button>
      </div>

      {/* SCROLLABLE FORM */}
      <div className="flex-1 overflow-y-auto p-8">
        <div className="bg-white p-8 rounded-2xl shadow max-w-3xl mx-auto">

          {/* PROFILE PIC */}
          <div className="flex items-center gap-6 mb-8">
            <img
              src={profilePic || "https://i.pravatar.cc/150"}
              alt="profile"
              className="w-24 h-24 rounded-full object-cover ring-4 ring-blue-100"
            />

            <label className="cursor-pointer text-blue-600 font-medium">
              Change Photo
              <input
                type="file"
                accept="image/*"
                onChange={handleProfilePicChange}
                className="hidden"
              />
            </label>
          </div>

          {/* FORM */}
          <div className="grid grid-cols-2 gap-6">

            <Input label="Full Name" placeholder="Your name" />
            <Input label="Email" placeholder="Email address" />

            <Input label="Location" placeholder="City, Country" />
            <Input label="Experience" placeholder="1–3 Years" />

            <div className="col-span-2">
              <label className="block font-medium mb-1">Bio</label>
              <textarea
                rows="4"
                placeholder="Tell something about yourself..."
                className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* SKILLS */}
            <div className="col-span-2">
              <label className="block font-medium mb-2">Skills</label>

              <div className="flex gap-2 mb-3">
                <input
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  className="flex-1 border rounded-lg p-2"
                  placeholder="Add skill (React)"
                />
                <button
                  type="button"
                  onClick={addSkill}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                >
                  Add
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full flex items-center gap-2"
                  >
                    {skill}
                    <button
                      onClick={() => removeSkill(skill)}
                      className="text-sm"
                    >
                      ✕
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* RESUME */}
            <div className="col-span-2">
              <label className="block font-medium mb-2">
                Upload Resume (PDF)
              </label>
              <input
                type="file"
                accept=".pdf"
                className="border p-2 w-full rounded-lg"
              />
            </div>

          </div>
        </div>
      </div>

      {/* STICKY SAVE BUTTON */}
      <div className="bg-white border-t px-8 py-4 flex justify-end">
        <button
          onClick={handleSave}
          className="px-8 py-3 bg-green-600 text-white rounded-xl text-lg hover:bg-green-700"
        >
          Save Profile
        </button>
      </div>

    </div>
  );
};

const Input = ({ label, ...props }) => (
  <div>
    <label className="block font-medium mb-1">{label}</label>
    <input
      {...props}
      className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-400"
    />
  </div>
);

export default EditProfile;
