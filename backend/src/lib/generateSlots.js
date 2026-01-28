export const generateSlots = (
    date,
    startTime,
    endTime,
    slotDuration = 30
) => {
    const slots = [];

    const [startHour, startMinute] = startTime.split(":").map(Number);
    const [endHour, endMinute] = endTime.split(":").map(Number);

    const current = new Date(date);
    current.setHours(startHour, startMinute, 0, 0);

    const end = new Date(date);
    end.setHours(endHour, endMinute, 0, 0);

    while (current < end) {
        const slotStart = new Date(current);
        const slotEnd = new Date(current);
        slotEnd.setMinutes(slotEnd.getMinutes() + slotDuration);

        if (slotEnd <= end) {
            slots.push({
                start: slotStart,
                end: slotEnd
            });
        }

        current.setMinutes(current.getMinutes() + slotDuration);
    }

    return slots;
};
