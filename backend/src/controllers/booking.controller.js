import prisma from "../lib/prisma.js";

export const createBooking = async (req, res) => {
    try {
        const { startTime, endTime, inviteeName, inviteeEmail } = req.body;
        const userId = req.user;

        const bookingStart = new Date(startTime);
        const bookingEnd = new Date(endTime);

        // 1️⃣ Check availability
        const dayOfWeek = bookingStart.getDay();

        const availability = await prisma.availability.findFirst({
            where: { userId, dayOfWeek }
        });

        if (!availability) {
            return res.status(400).json({ message: "User is not available on this day" });
        }

        // 2️⃣ Check time window
        const [startH, startM] = availability.startTime.split(":").map(Number);
        const [endH, endM] = availability.endTime.split(":").map(Number);

        const availStart = new Date(bookingStart);
        availStart.setHours(startH, startM, 0, 0);

        const availEnd = new Date(bookingStart);
        availEnd.setHours(endH, endM, 0, 0);

        if (bookingStart < availStart || bookingEnd > availEnd) {
            return res.status(400).json({ message: "Booking time is outside availability" });
        }

        // 3️⃣ Check conflicts
        const conflict = await prisma.booking.findFirst({
            where: {
                userId,
                startTime: { lt: bookingEnd },
                endTime: { gt: bookingStart },
                status: "booked"
            }
        });

        if (conflict) {
            return res.status(409).json({ message: "Time slot already booked" });
        }

        // 4️⃣ Create booking
        const booking = await prisma.booking.create({
            data: {
                userId,
                startTime: bookingStart,
                endTime: bookingEnd,
                inviteeName,
                inviteeEmail,
                status: "booked"
            }
        });

        res.status(201).json({ success: true, booking });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to create booking" });
    }
};


export const cancelBooking = async (req, res) => {
    try {
        const { id } = req.params;

        // 1️⃣ Find booking
        const booking = await prisma.booking.findUnique({
            where: { id }
        });

        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        // 2️⃣ Ownership check
        if (booking.userId !== req.user) {
            return res.status(403).json({ message: "Not authorized to cancel this booking" });
        }

        // 3️⃣ Soft cancel (do not delete)
        const cancelledBooking = await prisma.booking.update({
            where: { id },
            data: { status: "cancelled" }
        });

        res.status(200).json({
            success: true,
            booking: cancelledBooking
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to cancel booking" });
    }
};
