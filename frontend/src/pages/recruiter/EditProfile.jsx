import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const RecruiterEditProfile = () => {
  const navigate = useNavigate();
  const saved = JSON.parse(localStorage.getItem("recruiterProfile"));

  const [form, setForm] = useState({
    name: saved?.name || "",
    email: saved?.email || "",
    companyName: saved?.companyName || "",
    experience: saved?.experience || "",
    dob: saved?.dob
      ? saved.dob.slice(0, 10)
      : "",
    location: saved?.location || "",
    bio: saved?.bio || "",
    profilePic: saved?.profilePic || "",
  });

  const uploadImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () =>
      setForm({ ...form, profilePic: reader.result });
    reader.readAsDataURL(file);
  };

  const save = async () => {
    const res = await axios.put(
      "http://localhost:5000/api/profile/me",
      form,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(
            "token"
          )}`,
        },
      }
    );

    localStorage.setItem(
      "recruiterProfile",
      JSON.stringify(res.data)
    );

    navigate("/recruiter/dashboard/profile");
  };

  return (
    <div className="p-10 flex justify-center">
      <div className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-4xl">

        <h1 className="text-3xl font-bold mb-8">
          Edit Recruiter Profile
        </h1>

        {/* IMAGE */}
        <div className="flex items-center gap-6 mb-8">
          <img
            src={form.profilePic || "https://i.pravatar.cc/150"}
            className="w-28 h-28 rounded-full object-cover"
          />

          <label className="cursor-pointer text-blue-600">
            Upload Image
            <input
              type="file"
              accept="image/*"
              onChange={uploadImage}
              className="hidden"
            />
          </label>
        </div>

        {/* FORM */}
        <div className="grid grid-cols-2 gap-6">
          <Input label="Name" value={form.name}
            onChange={(e)=>setForm({...form,name:e.target.value})} />

          <Input label="Email" value={form.email} disabled />

          <Input label="Company Name" value={form.companyName}
            onChange={(e)=>setForm({...form,companyName:e.target.value})} />

          <Input label="Experience" value={form.experience}
            onChange={(e)=>setForm({...form,experience:e.target.value})} />

          <Input label="Date of Birth" type="date"
            value={form.dob}
            onChange={(e)=>setForm({...form,dob:e.target.value})} />

          <Input label="Location" value={form.location}
            onChange={(e)=>setForm({...form,location:e.target.value})} />
        </div>

        <textarea
          className="w-full border rounded-xl p-4 mt-6"
          rows="4"
          placeholder="Bio"
          value={form.bio}
          onChange={(e)=>setForm({...form,bio:e.target.value})}
        />

        <button
          onClick={save}
          className="mt-8 bg-green-600 text-white px-10 py-3 rounded-xl text-lg hover:bg-green-700"
        >
          💾 Save Profile
        </button>
      </div>
    </div>
  );
};

const Input = ({ label, ...props }) => (
  <div>
    <label className="block text-gray-500 mb-1">
      {label}
    </label>
    <input
      {...props}
      className="w-full border rounded-xl p-3"
    />
  </div>
);

export default RecruiterEditProfile;
