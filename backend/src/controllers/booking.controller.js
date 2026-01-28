import prisma from "../lib/prisma.js";


export const createBooking = async (req, res) => {
    const { startTime, endTime, inviteeName, inviteeEmail } = req.body;
    const userId = req.user;
    console.log(userId)

    // Check availability for that day
    const dayOfWeek = new Date(startTime).getDay();
    console.log(dayOfWeek)

    const availability = await prisma.availability.findFirst({
        where: {
            userId,
            dayOfWeek
        }
    });

    if (!availability) {
        return res.status(400).json({
            message: "User is not available on this day"
        });
    }

    //Check time is within availability window
    const bookingStart = new Date(startTime);
    const bookingEnd = new Date(endTime);

    const [availStartHour, availStartMin] = availability.startTime.split(":");
    const [availEndHour, availEndMin] = availability.endTime.split(":");

    const availStart = new Date(bookingStart);
    availStart.setHours(availStartHour, availStartMin);

    const availEnd = new Date(bookingStart);
    availEnd.setHours(availEndHour, availEndMin);

    if (bookingStart < availStart || bookingEnd > availEnd) {
        return res.status(400).json({
            message: "Booking time is outside availability"
        });
    }

    // Check for overlapping bookings
    const conflict = await prisma.booking.findFirst({
        where: {
            userId,
            OR: [
                {
                    startTime: { lt: bookingEnd },
                    endTime: { gt: bookingStart }
                }
            ]
        }
    });

    if (conflict) {
        return res.status(409).json({
            message: "Time slot already booked"
        });
    }

    //Create booking
    const booking = await prisma.booking.create({
        data: {
            userId,
            startTime: bookingStart,
            endTime: bookingEnd,
            inviteeName,
            inviteeEmail
        }
    });

    res.status(201).json({
        success: true,
        booking
    });
};
