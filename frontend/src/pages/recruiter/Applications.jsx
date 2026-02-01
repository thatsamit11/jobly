import { useNavigate } from "react-router-dom";

const Applications = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-4">Applications</h2>

      <div
        onClick={() => navigate("1")}
        className="border p-4 rounded cursor-pointer hover:bg-gray-50"
      >
        <p className="font-medium">Frontend Developer</p>
        <p className="text-sm text-gray-500">Amit Kumar</p>
      </div>
    </div>
  );
};

export default Applications;
