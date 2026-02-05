import express from "express";
import auth from "../middleware/auth.middleware.js";
import role from "../middleware/role.middleware.js";

import {
  applyJob,
  recruiterApplications,
  candidateApplications,
  withdrawApplication,
} from "../controllers/application.controller.js";

const router = express.Router();

/* ================= CANDIDATE ================= */
router.post(
  "/apply/:jobId",
  auth,
  role("candidate"),
  applyJob
);

router.get(
  "/candidate",
  auth,
  role("candidate"),
  candidateApplications
);

router.delete(
  "/withdraw/:id",
  auth,
  role("candidate"),
  withdrawApplication
);

/* ================= RECRUITER ================= */
router.get(
  "/recruiter",
  auth,
  role("recruiter"),
  recruiterApplications
);

export default router;
