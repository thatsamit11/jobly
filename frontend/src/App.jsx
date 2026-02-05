import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/home/Home";
import Auth from "./pages/auth/Auth";

// ================= CANDIDATE =================
import CandidateDashboard from "./pages/candidate/Dashboard";
import CandidateJobs from "./pages/candidate/Jobs";
import JobDetails from "./pages/candidate/JobDetails";
import SavedJobs from "./pages/candidate/SavedJobs";
import AppliedJobs from "./pages/candidate/AppliedJobs";
import CandidateProfile from "./pages/candidate/Profile";
import CandidateEditProfile from "./pages/candidate/EditProfile";

// ================= RECRUITER =================
import RecruiterDashboard from "./pages/recruiter/Dashboard";
import DashboardHome from "./pages/recruiter/DashboardHome";
import PostJob from "./pages/recruiter/PostJob";
import PostedJobs from "./pages/recruiter/PostedJobs";
import Applications from "./pages/recruiter/Applications";
import ApplicationDetail from "./pages/recruiter/ApplicationDetail";
import RecruiterProfile from "./pages/recruiter/Profile";
import RecruiterEditProfile from "./pages/recruiter/EditProfile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ================= PUBLIC ================= */}
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />

        {/* ================= CANDIDATE ================= */}
        <Route path="/candidate/dashboard" element={<CandidateDashboard />}>
          <Route index element={<CandidateJobs />} />
          <Route path="jobs/:id" element={<JobDetails />} />
          <Route path="saved-jobs" element={<SavedJobs />} />
          <Route path="applied-jobs" element={<AppliedJobs />} />
        </Route>

        <Route path="/candidate/profile" element={<CandidateProfile />} />
        <Route path="/candidate/profile/edit" element={<CandidateEditProfile />} />

        {/* ================= RECRUITER ================= */}
        <Route path="/recruiter/dashboard" element={<RecruiterDashboard />}>
          <Route index element={<DashboardHome />} />
          <Route path="post-job" element={<PostJob />} />
          <Route path="jobs" element={<PostedJobs />} />
          <Route path="applications" element={<Applications />} />
          <Route path="applications/:id" element={<ApplicationDetail />} />
          <Route path="profile" element={<RecruiterProfile />} />
          <Route path="edit-profile" element={<RecruiterEditProfile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
