import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: String,

    email: {
      type: String,
      unique: true,
      required: true,
    },

    password: String,

    role: {
      type: String,
      enum: ["candidate", "recruiter", "admin"],
      required: true,
    },

    authProvider: {
      type: String,
      enum: ["local", "google"],
      default: "local",
    },

    // COMMON
    profilePic: String,
    location: String,
    bio: String,

    // CANDIDATE
    skills: [String],
    resumeUrl: String,

    savedJobs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job",
      },
    ],

    // RECRUITER
    companyName: String,
    experience: String,
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
