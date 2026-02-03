import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/jobs", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => setJobs(res.data))
      .catch((err) => console.error(err));
  }, []);

  // 🔖 SAVE JOB
  const saveJob = async (jobId) => {
    try {
      await axios.post(
        `http://localhost:5000/api/jobs/save/${jobId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
    } catch (err) {
      console.error(err);
    }
  };

  return (
    // 🔥 IMPORTANT: height + overflow yahin se milega
    <div className="h-full max-h-full overflow-y-auto pr-2">

      <div className="space-y-4">
        {jobs.map((job) => (
          <div
            key={job._id}
            className="relative border p-4 rounded-xl bg-white hover:shadow transition"
          >
            {/* 🔖 BOOKMARK ICON (TOP RIGHT) */}
            <button
              onClick={() => saveJob(job._id)}
              className="absolute top-3 right-3 text-gray-400 hover:text-blue-600 text-xl"
              title="Save Job"
            >
              🔖
            </button>

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

            {/* 🔵 APPLY BUTTON (BOTTOM RIGHT) */}
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
    </div>
  );
};

export default Jobs;
