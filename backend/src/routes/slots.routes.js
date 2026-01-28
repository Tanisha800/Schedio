import express from "express";
import { getAvailableSlots } from "../controllers/slots.controller.js";

const router = express.Router();

router.get("/:username/slots", getAvailableSlots);

export default router;
