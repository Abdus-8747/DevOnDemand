import express from "express";
import getAllSubmissions from "../controllers/adminController.js";
import {
  getPendingRequests,
  getCompletedRequests,
  markRequestCompleted,
} from "../controllers/requestStatusController.js";
const router = express.Router();

router.get("/submissions", getAllSubmissions);

// Request status routes
router.get("/requests/pending", getPendingRequests);
router.get("/requests/completed", getCompletedRequests);
router.put("/requests/:userId/complete", markRequestCompleted);

export default router