import mongoose from "mongoose";

const requestStatusSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
  completedAt: {
    type: Date,
  },
});

const RequestStatus = mongoose.model("RequestStatus", requestStatusSchema);
export default RequestStatus;
