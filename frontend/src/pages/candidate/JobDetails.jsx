import { useParams, useNavigate } from "react-router-dom";

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="h-full overflow-y-auto">
      <div className="bg-white p-8 rounded-xl shadow max-w-4xl">

        <div className="flex justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Frontend Developer</h1>
            <p className="text-gray-600">Google • Remote</p>
            <p className="text-gray-500">Experience: 1–3 Years</p>
          </div>

          <button
            onClick={() => navigate(-1)}
            className="text-blue-500"
          >
            ← Back
          </button>
        </div>

        <h3 className="font-semibold mb-2">Job Description</h3>
        <p className="text-gray-600 mb-4">
          This is a full job description page. Backend aane ke baad
          yahan real data aayega.
        </p>

        <h3 className="font-semibold mb-2">Requirements</h3>
        <ul className="list-disc ml-5 text-gray-600 mb-6">
          <li>React, JavaScript</li>
          <li>Tailwind / CSS</li>
          <li>REST APIs basics</li>
        </ul>

        <button className="px-6 py-3 bg-green-500 text-white rounded-xl">
          Apply for Job
        </button>

      </div>
    </div>
  );
};

export default JobDetails;
