import { useEffect, useState } from "react";
import axios from "axios";

const AppliedJobs = () => {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  const fetchApplications = async () => {
    try {
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
      setApps([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const handleWithdraw = async (appId) => {
    await axios.delete(
      `http://localhost:5000/api/applications/withdraw/${appId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setApps((prev) => prev.filter((a) => a._id !== appId));
  };

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
            className="bg-white p-6 rounded-xl shadow relative"
          >
            {/* 3 DOTS */}
            <div className="absolute top-4 right-4">
              <button
                onClick={() => handleWithdraw(app._id)}
                className="text-sm text-red-600 hover:underline"
              >
                ❌ Withdraw
              </button>
            </div>

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
