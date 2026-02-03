import { useState } from "react";
import axios from "axios";

const PostJob = () => {
  const [form, setForm] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    description: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/api/jobs", form, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      alert("Job posted successfully");

      // reset form
      setForm({
        title: "",
        company: "",
        location: "",
        salary: "",
        description: "",
      });
    } catch (err) {
      console.error(err);
      alert("Job post failed");
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow max-w-3xl">
      <h2 className="text-xl font-semibold mb-4">Post a Job</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          placeholder="Job Title"
          required
        />

        <input
          name="company"
          value={form.company}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          placeholder="Company Name"
          required
        />

        <input
          name="location"
          value={form.location}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          placeholder="Location"
          required
        />

        <input
          name="salary"
          value={form.salary}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          placeholder="Salary"
          required
        />

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          placeholder="Job Description"
          required
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Post Job
        </button>
      </form>
    </div>
  );
};

export default PostJob;
