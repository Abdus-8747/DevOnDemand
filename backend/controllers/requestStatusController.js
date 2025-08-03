import User from "../models/userModel.js";
import RequestStatus from "../models/requestStatusModel.js";

// Mark a request as completed by admin
export const markRequestCompleted = async (req, res) => {
  const { userId } = req.params;
  try {
    // Ensure the user exists and is verified submission
    const user = await User.findOne({ _id: userId, isVerified: true });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User submission not found or not verified.",
      });
    }

    let statusDoc = await RequestStatus.findOne({ user: userId });
    if (!statusDoc) {
      statusDoc = new RequestStatus({ user: userId });
    }

    statusDoc.isCompleted = true;
    statusDoc.completedAt = new Date();
    await statusDoc.save();

    return res.status(200).json({
      success: true,
      message: "Request marked as completed successfully.",
    });
  } catch (error) {
    console.error("Mark complete error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error. Please try again later.",
    });
  }
};

// Helper to build formatted submission
const formatSubmission = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  phoneNumber: user.phoneNumber,
  budget: user.budget,
  projectIdea: user.projectIdea || "Not provided",
  collegeName: user.collegeName || null,
  submittedAt: user.submittedAt,
  formattedDate: user.submittedAt.toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }),
});

// Get all pending requests (not completed)
export const getPendingRequests = async (_req, res) => {
  try {
    const verifiedUsers = await User.find({ isVerified: true }).lean();
    const statusDocs = await RequestStatus.find({}).lean();

    const statusMap = new Map(statusDocs.map((d) => [d.user.toString(), d]));

    const pendingUsers = verifiedUsers.filter((u) => {
      const s = statusMap.get(u._id.toString());
      return !s || !s.isCompleted;
    });

    const formatted = pendingUsers.map(formatSubmission);

    return res.status(200).json({
      success: true,
      message: "Pending requests retrieved successfully.",
      data: {
        requests: formatted,
        totalPending: formatted.length,
      },
    });
  } catch (error) {
    console.error("Fetch pending error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error. Please try again later.",
    });
  }
};

// Get all completed requests
export const getCompletedRequests = async (_req, res) => {
  try {
    const completedStatus = await RequestStatus.find({ isCompleted: true })
      .populate({
        path: "user",
        match: { isVerified: true },
      })
      .lean();

    const completedUsers = completedStatus
      .filter((s) => s.user) // filter out any where user no longer exists
      .map((s) => ({ ...s.user, completedAt: s.completedAt }));

    const formatted = completedUsers.map(formatSubmission);

    return res.status(200).json({
      success: true,
      message: "Completed requests retrieved successfully.",
      data: {
        requests: formatted,
        totalCompleted: formatted.length,
      },
    });
  } catch (error) {
    console.error("Fetch completed error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error. Please try again later.",
    });
  }
};
