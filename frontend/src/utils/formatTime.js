/**
 * formatTime.js
 *
 * Formats an ISO string time, or a static "HH:MM" string, into "h:mm A".
 * Example: "14:00" -> "2:00 PM"
 */

export function formatTime(timeString) {
    if (!timeString) return "";

    // If it's a full ISO string
    if (timeString.includes("T")) {
        const date = new Date(timeString);
        return date.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
        });
    }

    // If it's just "HH:mm" formatted
    const [hourStr, minStr] = timeString.split(":");
    let hour = parseInt(hourStr, 10);
    const ampm = hour >= 12 ? "PM" : "AM";
    hour = hour % 12;
    if (hour === 0) hour = 12;

    return `${hour}:${minStr || "00"} ${ampm}`;
}
