import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Jobs = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  /* ================= FETCH ALL JOBS (CANDIDATE) ================= */
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get("http://localhost:5000/api/jobs", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (Array.isArray(res.data)) {
          setJobs(res.data);
        } else {
          setJobs([]);
        }
      } catch (err) {
        console.error("Job fetch failed", err);
        setJobs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  /* ================= APPLY JOB ================= */
  const handleApply = async (jobId) => {
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        `http://localhost:5000/api/applications/apply/${jobId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("✅ Applied successfully");
    } catch (err) {
      alert(err.response?.data?.message || "Apply failed");
    }
  };

  /* ================= SAVE JOB ================= */
  const handleSave = async (jobId) => {
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        `http://localhost:5000/api/jobs/save/${jobId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("💾 Job saved");
    } catch (err) {
      alert(err.response?.data?.message || "Save failed");
    }
  };

  /* ================= SEARCH FILTER ================= */
  const filteredJobs = jobs.filter(
    (job) =>
      job.title?.toLowerCase().includes(search.toLowerCase()) ||
      job.company?.toLowerCase().includes(search.toLowerCase()) ||
      job.location?.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return <p className="text-gray-500">Loading jobs...</p>;
  }

  return (
    <div className="grid grid-cols-3 gap-8">
      {/* ================= LEFT ================= */}
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
          {filteredJobs.length === 0 ? (
            <p className="text-gray-500">No jobs found</p>
          ) : (
            filteredJobs.map((job) => (
              <div
                key={job._id}
                className="
                  p-6 rounded-2xl
                  border-2 border-blue-400
                  bg-gradient-to-br from-sky-50 to-white
                  hover:shadow-lg transition
                "
              >
                {/* ================= JOB INFO ================= */}
                <div
                  onClick={() => navigate(`jobs/${job._id}`)}
                  className="cursor-pointer"
                >
                  <h3 className="text-xl font-semibold">{job.title}</h3>

                  <p className="text-gray-600">
                    {job.company} • {job.location}
                  </p>

                  {/* ✅ RECRUITER NAME (FIXED & CORRECT) */}
                  <p className="text-sm text-gray-500">
  Recruiter: {job.recruiterId?.name || "N/A"}
</p>

<p className="text-sm text-gray-400">
  Company: {job.recruiterId?.companyName || "N/A"}
</p>


                  <p className="text-sm mt-1">
                    Salary: {job.salary}
                  </p>
                </div>

                {/* ================= ACTION BUTTONS ================= */}
                <div className="flex gap-3 mt-4">
                  <button
                    onClick={() => handleSave(job._id)}
                    className="px-4 py-1 border rounded text-sm hover:bg-gray-100"
                  >
                    💾 Save
                  </button>

                  <button
                    onClick={() => handleApply(job._id)}
                    className="px-4 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
                  >
                    📩 Apply
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* ================= RIGHT ================= */}
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
