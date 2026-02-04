import express from "express";
import auth from "../middleware/auth.middleware.js";
import role from "../middleware/role.middleware.js";

import {
  postJob,
  getAllJobs,
  getJobById,
  getRecruiterJobs,
  deleteJob, // ✅ ADD THIS
} from "../controllers/job.controller.js";

const router = express.Router();

// Recruiter routes
router.post("/", auth, role("recruiter"), postJob);
router.get("/recruiter", auth, role("recruiter"), getRecruiterJobs);
router.delete("/:id", auth, role("recruiter"), deleteJob); // ✅ works now

// Candidate routes
router.get("/", auth, role("candidate"), getAllJobs);
router.get("/:id", auth, role("candidate"), getJobById);

export default router;
