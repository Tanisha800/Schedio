/**
 * formatDate.js
 *
 * Formats a Date object or ISO string into a readable date format.
 * Examples: "Feb 21, 2026", "Tomorrow", "Today"
 */

export function formatDate(dateString) {
    if (!dateString) return "";

    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
        return "Today";
    }

    if (date.toDateString() === tomorrow.toDateString()) {
        return "Tomorrow";
    }

    return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: date.getFullYear() !== today.getFullYear() ? "numeric" : undefined,
    });
}
