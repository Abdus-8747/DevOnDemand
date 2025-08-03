import { createTransport } from "nodemailer";
import dotenv from "dotenv";

// Load environment variables before creating the transporter
dotenv.config();

const transporter = createTransport({
  host: process.env.EMAIL_HOST || "smtp.gmail.com",
  port: Number(process.env.EMAIL_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export default transporter
