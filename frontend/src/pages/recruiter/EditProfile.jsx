import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const navigate = useNavigate();
  const [skillInput, setSkillInput] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    location: "",
    experience: "",
    bio: "",
    profilePic: "",
    resumeUrl: "",
    skills: [],
  });

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("candidateProfile"));
    if (data) setForm(data);
  }, []);

  const addSkill = () => {
    if (skillInput && !form.skills.includes(skillInput)) {
      setForm({ ...form, skills: [...form.skills, skillInput] });
      setSkillInput("");
    }
  };

  const removeSkill = (s) => {
    setForm({ ...form, skills: form.skills.filter((x) => x !== s) });
  };

  const handleSave = async () => {
    const res = await axios.put(
      "http://localhost:5000/api/profile/me",
      form,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    localStorage.setItem("candidateProfile", JSON.stringify(res.data));
    navigate("/candidate/profile");
  };

  return (
    <div className="min-h-screen bg-[#eef2f7] p-10">
      <div className="bg-white max-w-4xl mx-auto rounded-2xl shadow p-8">
        <h1 className="text-2xl font-bold mb-6">Edit Profile</h1>

        <div className="grid grid-cols-2 gap-6">

          <Input label="Name" value={form.name} onChange={(e)=>setForm({...form,name:e.target.value})}/>
          <Input label="Email" value={form.email} onChange={(e)=>setForm({...form,email:e.target.value})}/>
          <Input label="Location" value={form.location} onChange={(e)=>setForm({...form,location:e.target.value})}/>
          <Input label="Experience" value={form.experience} onChange={(e)=>setForm({...form,experience:e.target.value})}/>

          <Input label="Profile Image URL" value={form.profilePic} onChange={(e)=>setForm({...form,profilePic:e.target.value})}/>
          <Input label="Resume URL (PDF)" value={form.resumeUrl} onChange={(e)=>setForm({...form,resumeUrl:e.target.value})}/>

          <div className="col-span-2">
            <label>Bio</label>
            <textarea
              className="w-full border p-3 rounded-lg"
              rows="4"
              value={form.bio}
              onChange={(e)=>setForm({...form,bio:e.target.value})}
            />
          </div>

          {/* SKILLS */}
          <div className="col-span-2">
            <label>Skills</label>
            <div className="flex gap-2 mb-3">
              <input
                value={skillInput}
                onChange={(e)=>setSkillInput(e.target.value)}
                className="border p-2 flex-1 rounded-lg"
              />
              <button onClick={addSkill} className="bg-blue-600 text-white px-4 rounded-lg">
                Add
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              {form.skills.map((s) => (
                <span key={s} className="bg-blue-100 px-3 py-1 rounded-full">
                  {s}
                  <button onClick={()=>removeSkill(s)} className="ml-2">✕</button>
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-8">
          <button onClick={handleSave} className="bg-green-600 text-white px-8 py-3 rounded-xl">
            Save Profile
          </button>
        </div>
      </div>
    </div>
  );
};

const Input = ({ label, ...props }) => (
  <div>
    <label className="block font-medium mb-1">{label}</label>
    <input {...props} className="w-full border p-2 rounded-lg" />
  </div>
);

export default EditProfile;
