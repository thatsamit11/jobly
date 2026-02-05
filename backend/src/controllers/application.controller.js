import Application from "../models/Application.js";
import Job from "../models/Job.js";

/* APPLY JOB */
export const applyJob = async (req, res) => {
  const job = await Job.findById(req.params.jobId);
  if (!job) return res.status(404).json({ message: "Job not found" });

  const already = await Application.findOne({
    job: job._id,
    candidate: req.user.id,
  });

  if (already)
    return res.status(400).json({ message: "Already applied" });

  await Application.create({
    job: job._id,
    candidate: req.user.id,
    recruiter: job.recruiterId,
    status: "applied",
  });

  res.json({ message: "Applied successfully" });
};

/* WITHDRAW APPLICATION */
export const withdrawApplication = async (req, res) => {
  await Application.findOneAndDelete({
    _id: req.params.id,
    candidate: req.user.id,
  });

  res.json({ message: "Application withdrawn" });
};

/* RECRUITER APPLICATIONS */
export const recruiterApplications = async (req, res) => {
  const apps = await Application.find({ recruiter: req.user.id })
    .populate("job", "title company location salary")
    .populate("candidate", "name email")
    .sort({ createdAt: -1 });

  res.json(apps);
};

/* CANDIDATE APPLICATIONS */
export const candidateApplications = async (req, res) => {
  const apps = await Application.find({ candidate: req.user.id })
    .populate("job", "title company location salary")
    .sort({ createdAt: -1 });

  res.json(apps);
};
