import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    trim: true,
  },
  projectIdea: {
    type: String,
    trim: true,
  },
  budget: {
    type: Number,
  },
  isStudent: {
    type: Boolean,
    default: false,
  },
  collegeName: {
    type: String,
    trim: true,
    default: null,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  submittedAt: {
    type: Date,
    default: Date.now,
  },
  lastSubmissionTime: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", userSchema);
export default User;
