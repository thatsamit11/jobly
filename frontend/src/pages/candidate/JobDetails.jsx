import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/jobs/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => setJob(res.data))
      .catch(() => alert("Failed to load job"));
  }, [id]);

  if (!job) return <p>Loading...</p>;

  return (
    <div className="h-full overflow-y-auto">
      <div className="bg-white p-8 rounded-xl shadow max-w-4xl">

        <div className="flex justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">{job.title}</h1>
            <p className="text-gray-600">{job.location}</p>
            <p className="text-gray-500">Salary: {job.salary}</p>
          </div>

          <button onClick={() => navigate(-1)} className="text-blue-500">
            ← Back
          </button>
        </div>

        <h3 className="font-semibold mb-2">Job Description</h3>
        <p className="text-gray-600 mb-6">{job.description}</p>

        <button className="px-6 py-3 bg-green-500 text-white rounded-xl">
          Apply for Job
        </button>
      </div>
    </div>
  );
};

export default JobDetails;
