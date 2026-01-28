import prisma from "../lib/prisma.js";
import { generateSlots } from "../lib/generateSlots.js";

export const getAvailableSlots = async (req, res) => {
    const { username } = req.params;
    const { date } = req.query;

    if (!date) {
        return res.status(400).json({ message: "Date is required" });
    }

    const targetDate = new Date(date);
    const dayOfWeek = targetDate.getDay();

    const user = await prisma.user.findFirst({
        where: { name: username }
    });

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    const availability = await prisma.availability.findFirst({
        where: {
            userId: user.id,
            dayOfWeek
        }
    });

    if (!availability) {
        return res.status(200).json({ slots: [] });
    }

    const slots = generateSlots(
        targetDate,
        availability.startTime,
        availability.endTime
    );

    // Create separate date objects to avoid mutation issues
    const dayStart = new Date(targetDate);
    dayStart.setHours(0, 0, 0, 0);

    const dayEnd = new Date(targetDate);
    dayEnd.setHours(23, 59, 59, 999);

    const bookings = await prisma.booking.findMany({
        where: {
            userId: user.id,
            startTime: {
                gte: dayStart,
                lt: dayEnd
            }
        }
    });

    const availableSlots = slots.filter((slot) => {
        return !bookings.some(
            (booking) =>
                booking.startTime < slot.end &&
                booking.endTime > slot.start
        );
    });

    res.status(200).json({
        date,
        slots: availableSlots
    });
};
