import express from "express";
import { rateLimit } from "express-rate-limit";
import {
  submitUserForm,
  verifyOTP,
  resendOTP,
} from "../controllers/userController.js";
import {validateUserSubmission,validateOTP,
  handleValidationErrors,} from "../middlewares/validation.js"
import { body } from "express-validator";

const router = express.Router();

// Rate limiting
const submitLimit = rateLimit({
  windowMs: 1 * 60 * 1000, // 15 minutes
  max: 100, // 3 attempts per window
  message: {
    success: false,
    message: "Too many submission attempts. Please try again later.",
  },
  //console: "Rate limiting is disabled for user submissions in development mode.",
});

const otpLimit = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 100, // 5 OTP attempts per window
  message: {
    success: false,
    message: "Too many verification attempts. Please try again later.",
  },
});

const resendLimit = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 2, // 2 resend attempts per window
  message: {
    success: false,
    message:
      "Too many resend attempts. Please wait before requesting a new code.",
  },
});

// Validation for resend OTP
const validateResendOTP = [
  body("email")
    .isEmail()
    .normalizeEmail()
    .withMessage("Please provide a valid email address"),
];

// Routes
router.post(
  "/submit",
  submitLimit,
  validateUserSubmission,
  handleValidationErrors,
  submitUserForm
);

router.post(
  "/verify-otp",
  otpLimit,
  validateOTP,
  handleValidationErrors,
  verifyOTP
);

router.post(
  "/resend-otp",
  resendLimit,
  validateResendOTP,
  handleValidationErrors,
  resendOTP
);

export default router
