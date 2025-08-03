import User from "../models/userModel.js";
import Otp from "../models/OTP.js";
import generateOTP from "../utils/otpGenerator.js";
import transporter from "../config/nodemailer.js";

// Submit user form and send OTP via email
export const submitUserForm = async (req, res) => {
  try {
    const { name, email, phoneNumber, projectIdea, isStudent, collegeName, budget } =
      req.body;

    // Check if user has submitted within last 5 mins
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);

    const recentSubmission = await User.findOne({
      $or: [{ email: email }, { phoneNumber: phoneNumber }],
      lastSubmissionTime: { $gte: fiveMinutesAgo },
    });

    if (recentSubmission) {
      return res.status(429).json({
        success: false,
        message:
          "You can only submit one request every 5 mins. Please wait before submitting again.",
      });
    }

    // Generate 6-digit OTP
    const otp = generateOTP();

    // Save OTP and user data temporarily
    const otpRecord = new Otp({
      email,
      otp,
      userData: {
        name,
        email,
        phoneNumber,
        budget,
        projectIdea,
        isStudent,
        collegeName: isStudent ? collegeName : null,
      },
    });

    await otpRecord.save();

    // Send OTP via email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "DevOnDemand - Email Verification",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; text-align: center;">Email Verification Required</h2>
          <p>Hi <strong>${name}</strong>,</p>
          <p>Thank you for your interest in our DevOnDemand. To complete your submission, please verify your email address.</p>
          
          <div style="background-color: #f8f9fa; padding: 20px; margin: 20px 0; border-radius: 8px; text-align: center;">
            <h3 style="color: #007bff; margin: 0;">Your Verification Code:</h3>
            <h1 style="color: #007bff; font-size: 32px; letter-spacing: 8px; margin: 10px 0;">${otp}</h1>
            <p style="color: #666; margin: 0;">This code will expire in 10 minutes</p>
          </div>
          
          <p><strong>Submission Details:</strong></p>
          <ul style="background-color: #f8f9fa; padding: 15px; border-radius: 8px;">
            <li>Name: ${name}</li>
            <li>Email: ${email}</li>
            <li>Phone: ${phoneNumber}</li>
            ${projectIdea ? `<li>Project Idea: ${projectIdea}</li>` : ""}
            <li>Budget: ${budget ? `₹${budget}` : "Not specified"}</li>
            ${
              isStudent
                ? `<li>College: ${collegeName || "Not specified"}</li>`
                : "<li>Type: Non-Student</li>"
            }
          </ul>
          
          <p>Please enter this code on the verification page to complete your submission.</p>
          <p>If you didn't request this, please ignore this email.</p>
          
          <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
          <p style="color: #666; font-size: 14px; text-align: center;">
            Best regards,<br>
            <strong>DevOnDemand Team</strong>
          </p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({
      success: true,
      message:
        "Verification code sent successfully to your email address. Please check your inbox and enter the code to complete your submission.",
      data: {
        email: email.replace(/(.{2})(.*)(@.*)/, "$1***$3"), // Mask email
        expiresIn: "10 minutes",
      },
    });
  } catch (error) {
    console.error("Form submission error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to send verification email. Please try again later.",
    });
  }
};

// Verify OTP and complete submission
export const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    // Find OTP record
    const otpRecord = await Otp.findOne({ email, otp });

    if (!otpRecord) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid or expired verification code. Please try again or request a new code.",
      });
    }

    // Create user record
    const user = new User({
      ...otpRecord.userData,
      isVerified: true,
      submittedAt: new Date(),
      lastSubmissionTime: new Date(),
    });

    await user.save();

    // Delete OTP record
    await Otp.deleteOne({ _id: otpRecord._id });

    // Send success confirmation email
    const successMailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "DevOnDemand - Request Submitted Successfully",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #28a745; text-align: center;">✅ Request Submitted Successfully!</h2>
          <p>Hi <strong>${otpRecord.userData.name}</strong>,</p>
          <p>Congratulations! Your project request has been successfully submitted and verified. Our team will review your requirements and get back to you within 24 hours.</p>
          
          <div style="background-color: #d4edda; border: 1px solid #c3e6cb; padding: 20px; margin: 20px 0; border-radius: 8px;">
            <h3 style="color: #155724; margin-top: 0;">📋 Submission Details:</h3>
            <ul style="color: #155724; margin-bottom: 0;">
              <li><strong>Name:</strong> ${otpRecord.userData.name}</li>
              <li><strong>Email:</strong> ${otpRecord.userData.email}</li>
              <li><strong>Phone:</strong> ${otpRecord.userData.phoneNumber}</li>
              <li><strong>Budget:</strong> ${otpRecord.userData.budget ? `₹${otpRecord.userData.budget}` : "Not specified"}</li>
              ${
                otpRecord.userData.projectIdea
                  ? `<li><strong>Project Idea:</strong> ${otpRecord.userData.projectIdea}</li>`
                  : ""
              }
              ${
                otpRecord.userData.isStudent
                  ? `<li><strong>College:</strong> ${
                      otpRecord.userData.collegeName || "Not specified"
                    }</li>`
                  : "<li><strong>Type:</strong> Non-Student</li>"
              }
              <li><strong>Submitted At:</strong> ${new Date().toLocaleString(
                "en-IN",
                { timeZone: "Asia/Kolkata" }
              )}</li>
            </ul>
          </div>
          
          <p>Our team of experienced developers will analyze your requirements and provide you with a detailed proposal including timeline and pricing.</p>
          
          <p>What happens next:</p>
          <ol>
            <li>Our team will review your submission within 24 hours</li>
            <li>We'll contact you via email or phone to discuss details</li>
            <li>Upon agreement, we'll start working on your project</li>
          </ol>
          
          <p>Thank you for choosing our services! We look forward to helping you with your project.</p>
          
          <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
          <p style="color: #666; font-size: 14px; text-align: center;">
            Best regards,<br>
            <strong>DevOnDemand Team</strong><br>
            Email: ${process.env.EMAIL_USER}
          </p>
        </div>
      `,
    };

    await transporter.sendMail(successMailOptions);

    res.status(201).json({
      success: true,
      message:
        "Your request has been successfully submitted and verified! Please be patient as our team will shortly get back to you.",
      data: {
        submissionId: user._id,
        submittedAt: user.submittedAt,
        nextSubmissionAllowed: new Date(Date.now() + 12 * 60 * 60 * 1000),
      },
    });
  } catch (error) {
    console.error("OTP verification error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to verify email. Please try again later.",
    });
  }
};

// Resend OTP function
export const resendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    // Find existing OTP record
    const existingOTP = await Otp.findOne({ email });

    if (!existingOTP) {
      return res.status(404).json({
        success: false,
        message:
          "No pending verification found for this email. Please submit the form again.",
      });
    }

    // Generate new OTP
    const newOTP = generateOTP();

    // Update OTP record
    existingOTP.otp = newOTP;
    existingOTP.createdAt = new Date();
    await existingOTP.save();

    // Send new OTP via email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "DevOnDemand - New Verification Code",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; text-align: center;">New Verification Code</h2>
          <p>Hi <strong>${existingOTP.userData.name}</strong>,</p>
          <p>You requested a new verification code. Here's your new code:</p>
          
          <div style="background-color: #f8f9fa; padding: 20px; margin: 20px 0; border-radius: 8px; text-align: center;">
            <h3 style="color: #007bff; margin: 0;">Your New Verification Code:</h3>
            <h1 style="color: #007bff; font-size: 32px; letter-spacing: 8px; margin: 10px 0;">${newOTP}</h1>
            <p style="color: #666; margin: 0;">This code will expire in 10 minutes</p>
          </div>
          
          <p>Please enter this code on the verification page to complete your submission.</p>
          
          <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
          <p style="color: #666; font-size: 14px; text-align: center;">
            Best regards,<br>
            <strong>DevOnDemand Team</strong>
          </p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({
      success: true,
      message: "New verification code sent successfully to your email address.",
      data: {
        email: email.replace(/(.{2})(.*)(@.*)/, "$1***$3"),
        expiresIn: "10 minutes",
      },
    });
  } catch (error) {
    console.error("Resend OTP error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to send new verification code. Please try again later.",
    });
  }
};
