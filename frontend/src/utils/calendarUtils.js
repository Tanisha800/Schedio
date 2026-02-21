import { HOUR_HEIGHT, START_HOUR } from "./calendarConstants";

// ─── Week Navigation ───────────────────────────────────────────────────────────

/** Returns the Monday of the week containing `date`. */
export function getMondayOf(date) {
    const d = new Date(date);
    const day = d.getDay();
    const diff = day === 0 ? -6 : 1 - day;
    d.setDate(d.getDate() + diff);
    d.setHours(0, 0, 0, 0);
    return d;
}

/** Adds `n` days (can be negative) to `date` and returns a new Date. */
export function addDays(date, n) {
    const d = new Date(date);
    d.setDate(d.getDate() + n);
    return d;
}

// ─── Date Formatting ───────────────────────────────────────────────────────────

/** e.g. "February 2026" */
export function formatMonthYear(date) {
    return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

/** e.g. "Feb 16" */
export function formatShortDate(date) {
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

// ─── Time Formatting ───────────────────────────────────────────────────────────

/** Converts "14:30" (HH:MM string from ISO) → total minutes since midnight */
export function timeToMinutes(ts) {
    const [h, m] = ts.split(":").map(Number);
    return h * 60 + m;
}

/** Converts "14:30" → "2:30 PM" */
export function formatTime12(ts) {
    const [h, m] = ts.split(":").map(Number);
    const label = h >= 12 ? "PM" : "AM";
    const hh = h % 12 || 12;
    return `${hh}:${String(m).padStart(2, "0")} ${label}`;
}

// ─── Date Comparison ──────────────────────────────────────────────────────────

/** True if both dates fall on the same calendar day. */
export function isSameDay(a, b) {
    return a.toDateString() === b.toDateString();
}

/** True if `date` is today's calendar day. */
export function isToday(date) {
    return isSameDay(date, new Date());
}

// ─── Meeting Geometry ─────────────────────────────────────────────────────────

/**
 * Returns the CSS `top` value (px) to position a meeting block in the grid.
 * @param {string} startISO – e.g. "2026-02-17T09:00"
 */
export function getMeetingTopPx(startISO) {
    const d = new Date(startISO);
    const totalMin = (d.getHours() - START_HOUR) * 60 + d.getMinutes();
    return (totalMin / 60) * HOUR_HEIGHT;
}

/**
 * Returns the CSS `height` value (px) of a meeting block.
 * Enforces a minimum of 22px so very short meetings remain clickable.
 * @param {string} startISO
 * @param {string} endISO
 */
export function getMeetingHeightPx(startISO, endISO) {
    const start = new Date(startISO);
    const end = new Date(endISO);
    const durationMin = (end - start) / 60000;
    return Math.max((durationMin / 60) * HOUR_HEIGHT, 22);
}
