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

    // ===== COMMON PROFILE =====
    profilePic: String,
    location: String,
    bio: String,

    // ===== RECRUITER ONLY =====
    companyName: String,
    experience: String,
    dob: Date,

    // ===== CANDIDATE ONLY =====
    skills: [String],
    resumeUrl: String,
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
