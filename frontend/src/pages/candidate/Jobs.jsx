import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const token = localStorage.getItem("token");
        const role = localStorage.getItem("role");

        if (!token || role !== "candidate") {
          console.warn("Not logged in as candidate");
          return;
        }

        const res = await axios.get(
          "http://localhost:5000/api/jobs",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setJobs(res.data);
      } catch (err) {
        console.error("Failed to fetch jobs:", err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) {
    return <p className="text-gray-500">Loading jobs...</p>;
  }

  return (
    <div className="h-full max-h-full overflow-y-auto pr-2">
      {jobs.length === 0 ? (
        <p className="text-gray-500">No jobs available</p>
      ) : (
        <div className="space-y-4">
          {jobs.map((job) => (
            <div
              key={job._id}
              className="relative border p-4 rounded-xl bg-white hover:shadow transition"
            >
              {/* JOB INFO */}
              <div
                onClick={() =>
                  navigate(`/candidate/dashboard/jobs/${job._id}`)
                }
                className="cursor-pointer"
              >
                <h3 className="font-semibold text-lg">
                  {job.title}
                </h3>

                <p className="text-gray-600 text-sm">
                  {job.company} • {job.location}
                </p>

                <p className="text-gray-500 text-sm">
                  Salary: {job.salary}
                </p>
              </div>

              {/* APPLY BUTTON */}
              <div className="flex justify-end mt-4">
                <button
                  onClick={() =>
                    navigate(`/candidate/dashboard/jobs/${job._id}`)
                  }
                  className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
                >
                  Apply
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Jobs;
