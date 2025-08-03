import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

const app = express();

// Connect to database
connectDB();

// Allowed origins
const allowedOrigins = [
  "https://www.devondemand.space", // Production
  "http://localhost:5173"          // Development
];

// Middleware
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, Postman)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Handle preflight
app.options("*", cors());

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Routes
app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);

// Health check endpoint
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Student Project Service API is running!",
    timestamp: new Date().toISOString(),
  });
});

// Handle undefined routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// Global error handler
app.use((error, req, res, next) => {
  console.error("Global error:", error);
  res.status(500).json({
    success: false,
    message: "Something went wrong!",
  });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`✅ Health check: http://localhost:${PORT}/`);
});
