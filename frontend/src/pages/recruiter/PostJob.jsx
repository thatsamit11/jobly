const PostJob = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow max-w-3xl">
      <h2 className="text-xl font-semibold mb-4">Post a Job</h2>

      <form className="space-y-4">
        <input className="w-full border p-2 rounded" placeholder="Job Title" />
        <input className="w-full border p-2 rounded" placeholder="Location" />
        <input className="w-full border p-2 rounded" placeholder="Salary" />
        <textarea className="w-full border p-2 rounded" placeholder="Job Description" />

        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Post Job
        </button>
      </form>
    </div>
  );
};

export default PostJob;
