import Job from "../models/Job.js";
import User from "../models/User.js";

/* POST JOB */
export const postJob = async (req, res) => {
  try {
    const job = await Job.create({
      ...req.body,
      recruiterId: req.user.id,
    });
    res.status(201).json(job);
  } catch {
    res.status(500).json({ message: "Job post failed" });
  }
};

/* DELETE JOB */
export const deleteJob = async (req, res) => {
  const job = await Job.findById(req.params.id);
  if (!job) return res.status(404).json({ message: "Job not found" });

  // 🔍 DEBUG LOGS
  console.log("JOB RECRUITER ID:", job.recruiterId.toString());
  console.log("LOGGED IN USER ID:", req.user.id);

  if (job.recruiterId.toString() !== req.user.id.toString())

    return res.status(403).json({ message: "Unauthorized" });

  await job.deleteOne();
  res.json({ message: "Job deleted" });
};

/* ALL JOBS (CANDIDATE) */
export const getAllJobs = async (req, res) => {
  const jobs = await Job.find()
    .populate("recruiterId", "name companyName")
    .sort({ createdAt: -1 });

  res.json(jobs);
};

/* SINGLE JOB */
export const getJobById = async (req, res) => {
  const job = await Job.findById(req.params.id).populate(
    "recruiterId",
    "name companyName"
  );
  res.json(job);
};

/* RECRUITER JOBS */
export const getRecruiterJobs = async (req, res) => {
  const jobs = await Job.find({ recruiterId: req.user.id }).sort({
    createdAt: -1,
  });
  res.json(jobs);
};

/* SAVE JOB */
export const saveJob = async (req, res) => {
  const user = await User.findById(req.user.id);

  if (user.savedJobs.includes(req.params.id))
    return res.status(400).json({ message: "Already saved" });

  user.savedJobs.push(req.params.id);
  await user.save();

  res.json({ message: "Saved" });
};

/* 🔥 UNSAVE JOB */
export const unsaveJob = async (req, res) => {
  const user = await User.findById(req.user.id);

  user.savedJobs = user.savedJobs.filter(
    (jobId) => jobId.toString() !== req.params.id
  );

  await user.save();
  res.json({ message: "Job unsaved" });
};

/* GET SAVED JOBS */
export const getSavedJobs = async (req, res) => {
  const user = await User.findById(req.user.id).populate({
    path: "savedJobs",
    populate: { path: "recruiterId", select: "name companyName" },
  });

  res.json(user.savedJobs);
};
