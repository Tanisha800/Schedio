"use client";

import { useState, useEffect } from "react";
import { isSameDay, addDays, getMeetingTopPx } from "@/utils/calendarUtils";
import { START_HOUR, END_HOUR } from "@/utils/calendarConstants";

/**
 * CurrentTimeIndicator
 *
 * A red line + dot that shows the current time position in the scrollable grid.
 * Renders only when today's column is visible in the current week view.
 * Updates every 30 seconds to stay in sync.
 *
 * Props:
 *   weekStart – Date (Monday of the currently displayed week)
 */
export default function CurrentTimeIndicator({ weekStart }) {
    const [now, setNow] = useState(new Date());

    // Refresh every 30 seconds
    useEffect(() => {
        const interval = setInterval(() => setNow(new Date()), 30_000);
        return () => clearInterval(interval);
    }, []);

    // Check if today falls within the displayed week
    const todayColIndex = [0, 1, 2, 3, 4, 5, 6].findIndex((i) =>
        isSameDay(addDays(weekStart, i), now)
    );

    // Don't render if today isn't in view, or current time is outside visible hours
    if (todayColIndex === -1) return null;
    if (now.getHours() < START_HOUR || now.getHours() >= END_HOUR) return null;

    // Build an ISO-like string for the getMeetingTopPx utility
    const dateStr = now.toISOString().split("T")[0];
    const hh = String(now.getHours()).padStart(2, "0");
    const mm = String(now.getMinutes()).padStart(2, "0");
    const topPx = getMeetingTopPx(`${dateStr}T${hh}:${mm}`);

    return (
        <div
            className="absolute left-0 right-0 z-10 flex items-center pointer-events-none"
            style={{ top: topPx }}
        >
            <div className="w-2 h-2 rounded-full bg-rose-500 shrink-0 -ml-1" />
            <div className="flex-1 h-px bg-rose-500/70" />
        </div>
    );
}
