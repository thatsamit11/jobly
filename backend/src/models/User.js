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

    // ================= PROFILE FIELDS =================
    profilePic: String,
    bio: String,
    location: String,
    experience: String,
    skills: [String],
    resumeUrl: String,
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
