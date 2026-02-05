import { useEffect, useState } from "react";
import axios from "axios";

const SavedJobs = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchSaved = async () => {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        "http://localhost:5000/api/jobs/saved",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setJobs(res.data);
    };

    fetchSaved();
  }, []);

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Saved Jobs</h1>

      {jobs.length === 0 ? (
        <p>No saved jobs</p>
      ) : (
        jobs.map((job) => (
          <div key={job._id} className="bg-white p-6 rounded-xl shadow">
            <h2 className="font-semibold">{job.title}</h2>
            <p className="text-gray-500">
              {job.recruiterId?.companyName} • {job.location}
            </p>
            <p>Salary: {job.salary}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default SavedJobs;
