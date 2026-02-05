import { useEffect, useState } from "react";
import axios from "axios";

const Applications = () => {
  const [apps, setApps] = useState([]);

  useEffect(() => {
    const fetchApps = async () => {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        "http://localhost:5000/api/applications/recruiter",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setApps(res.data);
    };

    fetchApps();
  }, []);

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-6">Applications</h2>

      {apps.length === 0 ? (
        <p>No applications yet</p>
      ) : (
        apps.map((app) => (
          <div
            key={app._id}
            className="border p-4 rounded-lg flex justify-between"
          >
            <div>
              <p className="font-semibold">{app.job?.title}</p>
              <p className="text-sm text-gray-500">
                {app.candidate?.name} • {app.candidate?.email}
              </p>
            </div>

            <span className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
              {app.status}
            </span>
          </div>
        ))
      )}
    </div>
  );
};

export default Applications;
