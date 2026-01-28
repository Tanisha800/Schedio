import prisma from "../lib/prisma.js";

// create availability
export const createAvailability = async (req, res) => {
    const { dayOfWeek, startTime, endTime, isRecurring } = req.body;

    const availability = await prisma.availability.create({
        data: {
            userId: req.user,
            dayOfWeek,
            startTime,
            endTime,
            isRecurring
        }
    });

    res.status(201).json({
        success: true,
        availability
    });
};

// get logged in user availability
export const getMyAvailability = async (req, res) => {
    const availability = await prisma.availability.findMany({
        where: {
            userId: req.user
        },
        orderBy: {
            dayOfWeek: "asc"
        }
    });

    res.status(200).json({
        success: true,
        availability
    });
};
