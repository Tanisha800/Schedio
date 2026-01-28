import prisma from "../src/lib/prisma.js";
import bcrypt from "bcrypt";

async function main() {
    console.log("🌱 Seeding database...");

    // Create a test user
    const hashedPassword = await bcrypt.hash("password123", 10);

    const user = await prisma.user.upsert({
        where: { email: "tanisha@example.com" },
        update: {},
        create: {
            name: "tanisha",
            email: "tanisha@example.com",
            password: hashedPassword,
            timezone: "Asia/Kolkata"
        }
    });

    console.log("✅ Created user:", user.name);

    // Delete existing availability for this user and recreate
    await prisma.availability.deleteMany({
        where: { userId: user.id }
    });

    // Create availability for weekdays (9 AM - 5 PM)
    const days = [
        { dayOfWeek: 0, startTime: "09:00", endTime: "17:00" }, // Sunday
        { dayOfWeek: 1, startTime: "09:00", endTime: "17:00" }, // Monday
        { dayOfWeek: 2, startTime: "09:00", endTime: "17:00" }, // Tuesday
        { dayOfWeek: 3, startTime: "09:00", endTime: "17:00" }, // Wednesday
        { dayOfWeek: 4, startTime: "09:00", endTime: "17:00" }, // Thursday
        { dayOfWeek: 5, startTime: "09:00", endTime: "17:00" }, // Friday
    ];

    for (const day of days) {
        await prisma.availability.create({
            data: {
                userId: user.id,
                dayOfWeek: day.dayOfWeek,
                startTime: day.startTime,
                endTime: day.endTime,
                isRecurring: true
            }
        });
    }

    console.log("✅ Created availability for weekdays (9 AM - 5 PM)");

    // Delete existing bookings for this user
    await prisma.booking.deleteMany({
        where: { userId: user.id }
    });

    // Create a sample booking that overlaps with a slot on today's date
    const today = new Date();
    today.setHours(10, 0, 0, 0); // 10:00 AM

    const bookingEnd = new Date(today);
    bookingEnd.setMinutes(bookingEnd.getMinutes() + 30); // 10:30 AM

    const booking = await prisma.booking.create({
        data: {
            userId: user.id,
            inviteeName: "Test Client",
            inviteeEmail: "client@example.com",
            startTime: today,
            endTime: bookingEnd,
            status: "booked"
        }
    });

    console.log("✅ Created sample booking:", {
        startTime: booking.startTime,
        endTime: booking.endTime
    });

    console.log("\n🎉 Seeding complete!");
    console.log("\n📋 Test with:");
    console.log(`   GET /api/public/tanisha/slots?date=${new Date().toISOString().split('T')[0]}`);
    console.log(`   POST /api/publicbooking/tanisha/book`);
}

main()
    .catch((e) => {
        console.error("❌ Seeding failed:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
