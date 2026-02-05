import Application from "../models/Application.js";
import Job from "../models/Job.js";

/* ================= APPLY JOB ================= */
export const applyJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    const alreadyApplied = await Application.findOne({
      job: job._id,
      candidate: req.user.id,
    });

    if (alreadyApplied) {
      return res.status(400).json({ message: "Already applied" });
    }

    await Application.create({
      job: job._id,
      candidate: req.user.id,
      recruiter: job.recruiterId,
      status: "applied",
    });

    res.json({ message: "Applied successfully" });
  } catch (err) {
    console.error("APPLY JOB ERROR:", err);
    res.status(500).json({ message: "Apply failed" });
  }
};

/* ================= RECRUITER APPLICATIONS ================= */
export const recruiterApplications = async (req, res) => {
  try {
    const apps = await Application.find({
      recruiter: req.user.id,
    })
      .populate("job", "title company location salary")
      .populate("candidate", "name email")
      .sort({ createdAt: -1 });

    res.json(apps);
  } catch (err) {
    console.error("RECRUITER APPS ERROR:", err);
    res.status(500).json({ message: "Failed to fetch applications" });
  }
};

/* ================= CANDIDATE APPLICATIONS ================= */
export const candidateApplications = async (req, res) => {
  try {
    const apps = await Application.find({
      candidate: req.user.id,
    })
      .populate("job", "title company location salary")
      .sort({ createdAt: -1 });

    res.json(apps);
  } catch (err) {
    console.error("CANDIDATE APPS ERROR:", err);
    res.status(500).json({ message: "Failed to fetch applied jobs" });
  }
};
