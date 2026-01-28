import express from "express";
import {
    getPublicAvailability,
    createPublicBooking
} from "../controllers/publicbooking.controller.js";

const router = express.Router();

router.get("/:username", getPublicAvailability);

router.post("/:username/book", createPublicBooking);

export default router;
