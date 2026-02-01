import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Jobs = () => {
  const navigate = useNavigate();
  const [showFilter, setShowFilter] = useState(false);
  const [savedJobs, setSavedJobs] = useState([]);

  const toggleSave = (id) => {
    setSavedJobs((prev) =>
      prev.includes(id)
        ? prev.filter((j) => j !== id)
        : [...prev, id]
    );
  };

  const jobs = [
    {
      id: 1,
      title: "Frontend Developer",
      company: "Google",
      experience: "1–3 Years",
      location: "Remote",
    },
    {
      id: 2,
      title: "React Developer",
      company: "Microsoft",
      experience: "2–4 Years",
      location: "Bangalore",
    },
  ];

  return (
    <div className="relative flex flex-col h-full">

      {/* SEARCH + FILTER */}
      <div className="flex justify-between mb-6">
        <input
          type="text"
          placeholder="Search jobs..."
          className="w-2/3 px-4 py-3 rounded-xl border"
        />
        <button
          onClick={() => setShowFilter(!showFilter)}
          className="px-5 py-3 bg-blue-500 text-white rounded-xl"
        >
          Filter
        </button>
      </div>

      {/* FILTER BOX */}
      {showFilter && (
        <div className="absolute top-16 right-0 bg-white shadow-lg p-4 rounded-xl w-72 z-20">
          <h4 className="font-semibold mb-3">Filter Jobs</h4>

          <select className="w-full mb-2 border p-2 rounded">
            <option>Location</option>
            <option>Remote</option>
            <option>Delhi</option>
          </select>

          <select className="w-full mb-2 border p-2 rounded">
            <option>Technology</option>
            <option>React</option>
            <option>Node</option>
          </select>

          <select className="w-full mb-4 border p-2 rounded">
            <option>Experience</option>
            <option>0–1 Years</option>
            <option>1–3 Years</option>
          </select>

          <div className="flex justify-between">
            <button onClick={() => setShowFilter(false)}>
              Cancel
            </button>
            <button
              onClick={() => setShowFilter(false)}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Apply
            </button>
          </div>
        </div>
      )}

      {/* JOB CARDS */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-2">
        {jobs.map((job) => (
          <div
            key={job.id}
            onClick={() =>
              navigate(`/candidate/dashboard/jobs/${job.id}`)
            }
            className="relative bg-white p-6 rounded-xl shadow cursor-pointer hover:shadow-lg h-36"
          >
            {/* SAVE ICON (TOP RIGHT) */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleSave(job.id);
              }}
              className="absolute top-4 right-4 text-xl"
            >
              {savedJobs.includes(job.id) ? "🔖" : "📑"}
            </button>

            {/* JOB INFO */}
            <h4 className="font-semibold text-lg">
              {job.title}
            </h4>

            <p className="text-gray-600 mt-1">
              {job.company} • {job.experience}
            </p>

            <p className="text-gray-500">
              {job.location}
            </p>

            {/* APPLY BUTTON (BOTTOM RIGHT) */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/candidate/dashboard/jobs/${job.id}`);
              }}
              className="absolute bottom-4 right-4 px-4 py-2 bg-purple-500 text-white rounded-lg"
            >
              Apply
            </button>
          </div>
        ))}
      </div>

    </div>
  );
};

export default Jobs;
