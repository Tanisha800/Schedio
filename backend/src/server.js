import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import availabilityRoutes from "./routes/availability.routes.js";
import bookingRoutes from "./routes/booking.routes.js";
import publicBookingRoutes from "./routes/publicbooking.routes.js";
import slotsRoutes from "./routes/slots.routes.js";

const app = express();


app.use(
    cors({
        origin: [
            "http://localhost:3000",
            "http://localhost:3001",
            process.env.FRONTEND_URL
        ].filter(Boolean),
        credentials: true
    })
);

app.use(express.json());
app.use(cookieParser());


app.use("/api/auth", authRoutes);
app.use("/api/availability", availabilityRoutes);
app.use("/api/booking", bookingRoutes);
app.use("/api/publicbooking", publicBookingRoutes);
app.use("/api/public", slotsRoutes);



app.get("/api/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Schedio API is healthy",
        timestamp: new Date().toISOString()
    });
});


app.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
});


app.use((err, req, res, next) => {
    console.error("Unhandled error:", err);
    res.status(500).json({ message: "Internal server error" });
});

export default app;
