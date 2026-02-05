import { useEffect, useState } from "react";
import axios from "axios";

const AppliedJobs = () => {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          "http://localhost:5000/api/applications/candidate",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setApps(res.data);
      } catch (err) {
        console.error("Failed to fetch applied jobs", err);
        setApps([]);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  if (loading) {
    return <p className="text-gray-500">Loading applications...</p>;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">My Applications</h2>

      {apps.length === 0 ? (
        <p className="text-gray-500">
          You have not applied to any jobs yet.
        </p>
      ) : (
        apps.map((app) => (
          <div
            key={app._id}
            className="bg-white p-6 rounded-xl shadow border"
          >
            <h3 className="text-lg font-semibold">
              {app.job?.title}
            </h3>

            <p className="text-gray-600">
              {app.job?.company} • {app.job?.location}
            </p>

            <p className="text-sm mt-1">
              Salary: {app.job?.salary}
            </p>

            <span className="inline-block mt-3 text-xs px-3 py-1 rounded-full bg-blue-100 text-blue-700">
              Status: {app.status}
            </span>
          </div>
        ))
      )}
    </div>
  );
};

export default AppliedJobs;
