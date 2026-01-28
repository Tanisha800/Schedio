import express from "express";
import {
    createAvailability,
    getMyAvailability
} from "../controllers/availability.controller.js";
import { protect } from "../middlewares/middleware.js";

const router = express.Router();

router.post("/", protect, createAvailability);
router.get("/me", protect, getMyAvailability);

export default router;
