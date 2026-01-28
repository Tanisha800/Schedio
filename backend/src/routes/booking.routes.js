import express from "express";
import { protect } from "../middlewares/middleware.js";
import { createBooking } from "../controllers/booking.controller.js";
import { cancelBooking } from "../controllers/booking.controller.js";

const router = express.Router();

router.post("/", protect, createBooking);
router.patch("/:id/cancel", protect, cancelBooking);

export default router;
