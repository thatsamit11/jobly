import { useEffect, useState } from "react";
import axios from "axios";

const PostedJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔹 FETCH RECRUITER JOBS
  useEffect(() => {
    const fetchMyJobs = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          console.error("No token found");
          return;
        }

        const res = await axios.get(
          "http://localhost:5000/api/jobs/recruiter",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setJobs(res.data);
      } catch (err) {
        console.error("Failed to fetch jobs", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMyJobs();
  }, []);

  // 🔥 DELETE JOB
  const handleDelete = async (jobId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this job?"
    );
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Session expired. Please login again.");
        return;
      }

      await axios.delete(
        `http://localhost:5000/api/jobs/${jobId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // 🔥 remove from UI
      setJobs((prev) => prev.filter((job) => job._id !== jobId));
    } catch (error) {
      console.error("Failed to delete job", error.response?.data || error.message);
      alert("Failed to delete job");
    }
  };

  if (loading) {
    return <p className="text-gray-500">Loading posted jobs...</p>;
  }

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-xl font-semibold mb-6">Your Posted Jobs</h2>

      {jobs.length === 0 ? (
        <p className="text-gray-500">You have not posted any jobs yet.</p>
      ) : (
        <div className="space-y-4">
          {jobs.map((job) => (
            <div
              key={job._id}
              className="border rounded-lg p-4 flex justify-between items-center"
            >
              <div>
                <h3 className="font-semibold text-lg">{job.title}</h3>
                <p className="text-sm text-gray-500">
                  {job.location} • ₹{job.salary}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full">
                  Active
                </span>

                <button
                  onClick={() => handleDelete(job._id)}
                  className="text-sm bg-red-100 text-red-600 px-3 py-1 rounded hover:bg-red-200"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PostedJobs;
