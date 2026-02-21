"use client";

import { useState } from "react";
import { getMondayOf, addDays, formatShortDate, isSameDay } from "@/utils/calendarUtils";
import { SAMPLE_MEETINGS } from "@/utils/calendarConstants";

/**
 * useCalendarDates
 *
 * Manages all date-navigation state for the calendar.
 * Returns derived values (weekStart, weekDays, headerRange, getMeetingsForDay)
 * alongside navigation actions (navigate, goToday, setView).
 *
 * @param {Date} initialDate – The date to seed the calendar with on first render.
 */
export function useCalendarDates(initialDate) {
    const [refDate, setRefDate] = useState(initialDate);
    const [view, setView] = useState("week"); // "week" | "day"

    const weekStart = getMondayOf(refDate);

    const weekDays =
        view === "week"
            ? Array.from({ length: 7 }, (_, i) => addDays(weekStart, i))
            : [refDate];

    const headerRange =
        view === "week"
            ? `${formatShortDate(weekStart)} – ${formatShortDate(addDays(weekStart, 6))}`
            : formatShortDate(refDate);

    /** Go forward (+1) or backward (-1) by one week or one day depending on view. */
    const navigate = (dir) => {
        const delta = view === "week" ? 7 : 1;
        setRefDate((prev) => addDays(prev, dir * delta));
    };

    /** Jump back to today's date. */
    const goToday = () => setRefDate(new Date("2026-02-17"));

    /**
     * Returns meetings whose start date matches `date`.
     * Replace SAMPLE_MEETINGS with a prop or context value when using real data.
     */
    const getMeetingsForDay = (date) =>
        SAMPLE_MEETINGS.filter((m) => isSameDay(new Date(m.start), date));

    return {
        refDate,
        view,
        setView,
        weekStart,
        weekDays,
        headerRange,
        navigate,
        goToday,
        getMeetingsForDay,
    };
}
