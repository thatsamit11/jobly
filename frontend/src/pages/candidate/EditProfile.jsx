import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const EditProfile = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    location: "",
    experience: "",
    bio: "",
    profilePic: "",
    skills: [],
  });

  const [skillInput, setSkillInput] = useState("");

  /* 🔥 PREFILL FROM BACKEND (NOT ONLY LOCAL) */
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

        const data = res.data;

        setForm({
          name: data.name || "",
          email: data.email || "",
          location: data.location || "",
          experience: data.experience || "",
          bio: data.bio || "",
          profilePic: data.profilePic || "",
          skills: data.skills || [],
        });
      } catch (err) {
        console.error(err);
      }
    };

    fetchProfile();
  }, []);

  /* 🔥 IMAGE → BASE64 */
  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setForm((prev) => ({
        ...prev,
        profilePic: reader.result,
      }));
    };
    reader.readAsDataURL(file);
  };

  const addSkill = () => {
    if (
      skillInput &&
      !form.skills.includes(skillInput)
    ) {
      setForm({
        ...form,
        skills: [...form.skills, skillInput],
      });
      setSkillInput("");
    }
  };

  /* 🔥 SAVE PROFILE */
  const saveProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Login expired");
        return;
      }

      const res = await axios.put(
        "http://localhost:5000/api/profile/me",
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      localStorage.setItem(
        "candidateProfile",
        JSON.stringify(res.data)
      );

      navigate("/candidate/profile");
    } catch (err) {
      console.error(err);
      alert("Profile save failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#eef2f7] p-10">
      <div className="bg-white max-w-3xl mx-auto rounded-2xl shadow p-8">

        <h1 className="text-2xl font-bold mb-6">
          Edit Profile
        </h1>

        <div className="flex items-center gap-6 mb-6">
          <img
            src={form.profilePic || "https://i.pravatar.cc/150"}
            className="w-24 h-24 rounded-full object-cover border"
          />

          <label className="cursor-pointer text-blue-600">
            Change Photo
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoUpload}
              className="hidden"
            />
          </label>
        </div>

        <Input
          label="Name"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />

        <Input
          label="Email"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <Input
          label="Location"
          value={form.location}
          onChange={(e) =>
            setForm({
              ...form,
              location: e.target.value,
            })
          }
        />

        <Input
          label="Experience"
          value={form.experience}
          onChange={(e) =>
            setForm({
              ...form,
              experience: e.target.value,
            })
          }
        />

        <textarea
          value={form.bio}
          onChange={(e) =>
            setForm({ ...form, bio: e.target.value })
          }
          className="w-full border rounded-lg p-3 mb-4"
          placeholder="Bio"
        />

        <div className="flex gap-2 mb-3">
          <input
            value={skillInput}
            onChange={(e) =>
              setSkillInput(e.target.value)
            }
            className="flex-1 border p-2 rounded"
            placeholder="Add skill"
          />
          <button
            type="button"
            onClick={addSkill}
            className="bg-blue-600 text-white px-4 rounded"
          >
            Add
          </button>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {form.skills.map((s) => (
            <span
              key={s}
              className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full"
            >
              {s}
            </span>
          ))}
        </div>

        <button
          onClick={saveProfile}
          className="px-8 py-3 bg-green-600 text-white rounded-xl"
        >
          Save Profile
        </button>
      </div>
    </div>
  );
};

const Input = ({ label, ...props }) => (
  <input
    {...props}
    placeholder={label}
    className="w-full border rounded-lg p-2 mb-4"
  />
);

export default EditProfile;
