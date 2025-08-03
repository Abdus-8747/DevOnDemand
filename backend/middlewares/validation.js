import {body,validationResult} from "express-validator"

export const validateUserSubmission = [
  body("name")
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("Name must be between 2 and 50 characters"),

  body("email")
    .isEmail()
    .normalizeEmail()
    .withMessage("Please provide a valid email address"),

  body("phoneNumber")
    .isMobilePhone()
    .withMessage("Please provide a valid phone number"),

  body("projectIdea")
    .optional()
    .isLength({ max: 1000 })
    .withMessage("Project idea must not exceed 1000 characters"),

  body("budget")
    .isFloat({ gt: 0 })
    .withMessage("Budget must be a positive number"),

  body("isStudent")
    .isBoolean()
    .withMessage("isStudent must be a boolean value"),

  body("collegeName")
    .optional()
    .isLength({ max: 100 })
    .withMessage("College name must not exceed 100 characters"),
];

export const validateOTP = [
  body("email")
    .isEmail()
    .normalizeEmail()
    .withMessage("Please provide a valid email address"),

  body("otp")
    .isLength({ min: 6, max: 6 })
    .isNumeric()
    .withMessage("OTP must be a 6-digit number"),
];

export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: errors.array(),
    });
  }
  next();
};
