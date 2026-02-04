import express from "express";
import {
    registerUser,
    loginUser,
    refreshAccessToken,
    logoutUser,
    getCurrentUser,
    checkUser
} from "../controllers/auth.controller.js";
import { protect } from "../middlewares/middleware.js";

const router = express.Router();

router.post("/check", checkUser);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/refresh", refreshAccessToken);
router.post("/logout", logoutUser);
router.get("/me", protect, getCurrentUser);

export default router;
