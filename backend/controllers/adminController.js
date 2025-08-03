import User from "../models/userModel.js";

const getAllSubmissions = async (req, res) => {
  try {
    const submissions = await User.find({ isVerified: true })
      .select("name email phoneNumber budget projectIdea collegeName submittedAt")
      .sort({ submittedAt: -1 });

    const formattedSubmissions = submissions.map((submission) => ({
      id: submission._id,
      name: submission.name,
      email: submission.email,
      phoneNumber: submission.phoneNumber,
      budget: submission.budget,
      projectIdea: submission.projectIdea || "Not provided",
      collegeName: submission.collegeName || null,
      submittedAt: submission.submittedAt,
      formattedDate: submission.submittedAt.toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }),
    }));

    res.status(200).json({
      success: true,
      message: "Submissions retrieved successfully",
      data: {
        submissions: formattedSubmissions,
        totalSubmissions: submissions.length,
      },
    });
  } catch (error) {
    console.error("Admin fetch error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error. Please try again later.",
    });
  }
};

export default getAllSubmissions
