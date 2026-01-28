import prisma from "../lib/prisma.js";

export const getPublicAvailability = async (req, res) => {
    const { username } = req.params;


    const user = await prisma.user.findFirst({
        where: { name: username }
    });

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }


    const availability = await prisma.availability.findMany({
        where: { userId: user.id }
    });

    res.status(200).json({
        user: {
            name: user.name,
            timezone: user.timezone
        },
        availability
    });
};




export const createPublicBooking = async (req, res) => {
    const { username } = req.params;
    const { startTime, endTime, inviteeName, inviteeEmail } = req.body;

    const user = await prisma.user.findFirst({
        where: { name: username }
    });

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    const conflict = await prisma.booking.findFirst({
        where: {
            userId: user.id,
            startTime: { lt: new Date(endTime) },
            endTime: { gt: new Date(startTime) }
        }
    });

    if (conflict) {
        return res.status(409).json({ message: "Slot already booked" });
    }

    const booking = await prisma.booking.create({
        data: {
            userId: user.id,
            startTime: new Date(startTime),
            endTime: new Date(endTime),
            inviteeName,
            inviteeEmail
        }
    });

    res.status(201).json({
        success: true,
        booking
    });
};