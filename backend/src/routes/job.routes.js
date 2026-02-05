import express from "express";
import auth from "../middleware/auth.middleware.js";
import role from "../middleware/role.middleware.js";

import {
  postJob,
  getAllJobs,
  getJobById,
  getRecruiterJobs,
  deleteJob,
  saveJob,
  unsaveJob,
  getSavedJobs,
} from "../controllers/job.controller.js";

const router = express.Router();

/* RECRUITER */
router.post("/", auth, role("recruiter"), postJob);
router.get("/recruiter", auth, role("recruiter"), getRecruiterJobs);
router.delete("/:id", auth, role("recruiter"), deleteJob);

/* CANDIDATE */
router.get("/", auth, role("candidate"), getAllJobs);
router.get("/saved", auth, role("candidate"), getSavedJobs);
router.post("/save/:id", auth, role("candidate"), saveJob);
router.delete("/unsave/:id", auth, role("candidate"), unsaveJob);
router.get("/:id", auth, role("candidate"), getJobById);

export default router;
