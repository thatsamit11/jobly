import { useEffect, useState } from "react";
import axios from "axios";

const SavedJobs = () => {
  const [jobs, setJobs] = useState([]);

  const token = localStorage.getItem("token");

  const fetchSaved = async () => {
    const res = await axios.get(
      "http://localhost:5000/api/jobs/saved",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    setJobs(res.data);
  };

  useEffect(() => {
    fetchSaved();
  }, []);

  const handleUnsave = async (jobId) => {
    await axios.delete(
      `http://localhost:5000/api/jobs/unsave/${jobId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    setJobs((prev) => prev.filter((j) => j._id !== jobId));
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Saved Jobs</h1>

      {jobs.length === 0 ? (
        <p className="text-gray-500">No saved jobs</p>
      ) : (
        jobs.map((job) => (
          <div
            key={job._id}
            className="bg-white p-6 rounded-xl shadow relative"
          >
            {/* 3 DOTS */}
            <div className="absolute top-4 right-4">
              <button
                onClick={() => handleUnsave(job._id)}
                className="text-sm text-red-600 hover:underline"
              >
                ❌ Unsave
              </button>
            </div>

            <h2 className="font-semibold text-lg">
              {job.title}
            </h2>

            <p className="text-gray-600">
              Recruiter: {job.recruiterId?.name}
            </p>

            <p className="text-gray-500">
              {job.recruiterId?.companyName} • {job.location}
            </p>

            <p className="mt-1">Salary: {job.salary}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default SavedJobs;
