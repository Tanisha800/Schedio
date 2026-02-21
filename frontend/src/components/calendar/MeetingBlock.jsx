"use client";

import { MEETING_COLORS } from "@/utils/calendarConstants";
import { formatTime12 } from "@/utils/calendarUtils";

/**
 * MeetingBlock
 *
 * Renders a single meeting event inside the time grid.
 * Positioned absolutely by the parent (DayColumn) via the `style` prop.
 *
 * Props:
 *   meeting  – { id, title, person, start, end, color }
 *   style    – CSSProperties with `top`, `height`, `zIndex` for grid positioning
 *   onClick  – (meeting) => void — called when the user clicks the block
 */
export default function MeetingBlock({ meeting, style, onClick }) {
    const colors = MEETING_COLORS[meeting.color] || MEETING_COLORS.blue;

    // Extract HH:MM strings from ISO timestamps for formatting
    const startStr = meeting.start.split("T")[1];
    const endStr = meeting.end.split("T")[1];

    const durationMin = (new Date(meeting.end) - new Date(meeting.start)) / 60000;
    const compact = durationMin <= 30; // Show less detail for short meetings

    return (
        <div
            onClick={() => onClick(meeting)}
            className={`absolute left-1 right-1 rounded-md border px-2 py-1 cursor-pointer overflow-hidden
                hover:brightness-95 dark:hover:brightness-110 transition-all select-none
                ${colors.bg} ${colors.border} ${colors.text}`}
            style={style}
        >
            <p className="text-[11px] font-semibold leading-tight truncate">{meeting.title}</p>

            {!compact && (
                <>
                    <p className="text-[10px] opacity-70 truncate mt-0.5">{meeting.person}</p>
                    <p className="text-[10px] opacity-60 mt-0.5">
                        {formatTime12(startStr)} – {formatTime12(endStr)}
                    </p>
                </>
            )}

            {compact && (
                <p className="text-[10px] opacity-60 truncate">{formatTime12(startStr)}</p>
            )}
        </div>
    );
}
