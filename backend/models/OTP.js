import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  userData: {
    name: String,
    email: String,
    phoneNumber: String,
    projectIdea: String,
    budget: Number,
    isStudent: Boolean,
    collegeName: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 600, 
  },
});

const Otp = mongoose.model("Otp", otpSchema);
export default Otp;
