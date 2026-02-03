import Job from "../models/Job.js";

// Recruiter: post job
const postJob = async (req, res) => {
  try {
    const job = await Job.create({
      title: req.body.title,
      company: req.body.company,
      location: req.body.location,
      salary: req.body.salary,
      description: req.body.description,
      recruiterId: req.user.id,
    });

    res.status(201).json(job);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Job post failed" });
  }
};

// Candidate: get all jobs
const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch jobs" });
  }
};

// Candidate: get job by id
const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.json(job);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch job" });
  }
};

// Recruiter: get own jobs
const getRecruiterJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ recruiterId: req.user.id });
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch recruiter jobs" });
  }
};

export {
  postJob,
  getAllJobs,
  getJobById,
  getRecruiterJobs,
};
