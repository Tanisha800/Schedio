"use client";

import MeetingBlock from "./MeetingBlock";
import { HOUR_HEIGHT, TOTAL_HOURS } from "@/utils/calendarConstants";
import { getMeetingTopPx, getMeetingHeightPx } from "@/utils/calendarUtils";

/**
 * DayColumn
 *
 * Renders one vertical column of the calendar grid for a single day.
 * Draws hour lines, half-hour lines, and all meeting blocks for that day.
 *
 * Props:
 *   date           – Date object for this column's day
 *   meetings       – Meeting[] filtered to this day
 *   onMeetingClick – (meeting) => void
 */
export default function DayColumn({ date, meetings, onMeetingClick }) {
    return (
        <div
            className="relative border-l border-border"
            style={{ minHeight: TOTAL_HOURS * HOUR_HEIGHT }}
        >
            {/* Hour grid lines */}
            {Array.from({ length: TOTAL_HOURS }, (_, i) => (
                <div
                    key={i}
                    className="absolute left-0 right-0 border-b border-border/50"
                    style={{ top: i * HOUR_HEIGHT, height: HOUR_HEIGHT }}
                />
            ))}

            {/* Half-hour guide lines */}
            {Array.from({ length: TOTAL_HOURS }, (_, i) => (
                <div
                    key={`half-${i}`}
                    className="absolute left-0 right-0 border-b border-border/20"
                    style={{ top: i * HOUR_HEIGHT + HOUR_HEIGHT / 2 }}
                />
            ))}

            {/* Meeting blocks */}
            {meetings.map((meeting) => (
                <MeetingBlock
                    key={meeting.id}
                    meeting={meeting}
                    style={{
                        top: getMeetingTopPx(meeting.start),
                        height: getMeetingHeightPx(meeting.start, meeting.end),
                        zIndex: 2,
                    }}
                    onClick={onMeetingClick}
                />
            ))}
        </div>
    );
}
