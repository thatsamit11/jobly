import mongoose from "mongoose";
import Job from "../models/Job.js";

/* ================= POST JOB ================= */
const postJob = async (req, res) => {
  try {
    const { title, company, location, salary, description } = req.body;

    if (!title || !company || !location || !salary || !description) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const job = await Job.create({
      title,
      company,
      location,
      salary,
      description,
      recruiterId: new mongoose.Types.ObjectId(req.user.id), // 🔥 FIX
    });

    res.status(201).json(job);
  } catch (error) {
    console.error("POST JOB ERROR:", error);
    res.status(500).json({ message: "Job post failed" });
  }
};

/* ================= DELETE JOB ================= */
const deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    // 🔥 FINAL & SAFE OWNERSHIP CHECK
    if (!job.recruiterId.equals(req.user.id)) {
      return res.status(403).json({ message: "Not allowed" });
    }

    await job.deleteOne();
    res.json({ message: "Job deleted successfully" });
  } catch (error) {
    console.error("DELETE JOB ERROR:", error);
    res.status(500).json({ message: "Failed to delete job" });
  }
};

/* ================= GET ALL JOBS (CANDIDATE) ================= */
const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.json(jobs);
  } catch {
    res.status(500).json({ message: "Failed to fetch jobs" });
  }
};

/* ================= GET JOB BY ID ================= */
const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found" });
    res.json(job);
  } catch {
    res.status(500).json({ message: "Failed to fetch job" });
  }
};

/* ================= GET RECRUITER JOBS ================= */
const getRecruiterJobs = async (req, res) => {
  try {
    const jobs = await Job.find({
      recruiterId: new mongoose.Types.ObjectId(req.user.id),
    }).sort({ createdAt: -1 });

    res.json(jobs);
  } catch (error) {
    console.error("FETCH RECRUITER JOBS ERROR:", error);
    res.status(500).json({ message: "Failed to fetch recruiter jobs" });
  }
};

export {
  postJob,
  deleteJob,
  getAllJobs,
  getJobById,
  getRecruiterJobs,
};
