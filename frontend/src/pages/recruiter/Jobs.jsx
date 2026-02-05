import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Jobs = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchJobs = async () => {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/jobs/recruiter", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (Array.isArray(res.data)) setJobs(res.data);
      else if (Array.isArray(res.data.jobs)) setJobs(res.data.jobs);
    };

    fetchJobs();
  }, []);

  const filteredJobs = jobs.filter(
    (job) =>
      job.title?.toLowerCase().includes(search.toLowerCase()) ||
      job.company?.toLowerCase().includes(search.toLowerCase()) ||
      job.location?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="grid grid-cols-3 gap-8">
      {/* LEFT */}
      <div className="col-span-2">
        <div className="flex gap-4 mb-6">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search jobs by title, company, or location"
            className="flex-1 px-5 py-3 rounded-xl border focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <button className="px-6 py-3 rounded-xl bg-blue-600 text-white">
            Filter
          </button>
        </div>

        <div className="space-y-4">
          {filteredJobs.map((job) => (
            <div
              key={job._id}
              onClick={() => navigate(job._id)}
              className="
                cursor-pointer p-6 rounded-2xl
                border-2 border-blue-400
                bg-gradient-to-br from-sky-50 to-white
                hover:shadow-lg transition
              "
            >
              <h3 className="text-xl font-semibold">{job.title}</h3>
              <p className="text-gray-600">
                {job.company} • {job.location}
              </p>
              <p className="text-sm mt-1">Salary: {job.salary}</p>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT */}
      <div className="bg-white p-6 rounded-2xl shadow h-fit">
        <h3 className="font-semibold mb-4">Application Status</h3>
        <p>Applied: 12</p>
        <p>In Review: 4</p>
        <p>Interview: 2</p>
        <p>Saved Jobs: 6</p>
      </div>
    </div>
  );
};

export default Jobs;
