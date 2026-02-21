"use client";

import { Clock, CalendarDays, X } from "lucide-react";
import { MEETING_COLORS } from "@/utils/calendarConstants";
import { formatTime12 } from "@/utils/calendarUtils";

/**
 * MeetingPopover
 *
 * Fixed bottom-right card that shows full details of a selected meeting.
 * Clicking the backdrop overlay or the X button closes it.
 *
 * Props:
 *   meeting  – { id, title, person, start, end, color } | null
 *   onClose  – () => void
 */
export default function MeetingPopover({ meeting, onClose }) {
    if (!meeting) return null;

    const colors = MEETING_COLORS[meeting.color] || MEETING_COLORS.blue;
    const startStr = meeting.start.split("T")[1];
    const endStr = meeting.end.split("T")[1];
    const date = new Date(meeting.start);
    const dayLabel = date.toLocaleDateString("en-US", {
        weekday: "long",
        month: "short",
        day: "numeric",
    });

    return (
        <>
            {/* Invisible overlay to dismiss on outside click */}
            <div className="fixed inset-0 z-40" onClick={onClose} />

            <div className="fixed bottom-6 right-6 z-50 w-72 bg-card border border-border rounded-xl shadow-lg overflow-hidden">
                {/* Colour accent strip */}
                <div className={`h-1 w-full ${colors.dot}`} />

                <div className="p-4">
                    {/* Title + close button */}
                    <div className="flex items-start justify-between gap-2 mb-3">
                        <div>
                            <p className="text-sm font-semibold text-foreground">{meeting.title}</p>
                            <p className="text-xs text-muted-foreground mt-0.5">{meeting.person}</p>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-1 hover:bg-accent rounded-md transition-colors shrink-0"
                        >
                            <X className="w-3.5 h-3.5 text-muted-foreground" />
                        </button>
                    </div>

                    {/* Date & time rows */}
                    <div className="space-y-1.5">
                        <div className="flex items-center gap-2">
                            <CalendarDays className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                            <span className="text-xs text-muted-foreground">{dayLabel}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                            <span className="text-xs text-muted-foreground">
                                {formatTime12(startStr)} – {formatTime12(endStr)}
                            </span>
                        </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex gap-2 mt-4">
                        <button className="flex-1 px-3 py-1.5 text-xs font-medium rounded-lg border border-border text-muted-foreground hover:bg-accent hover:text-foreground transition-colors">
                            Reschedule
                        </button>
                        <button className="flex-1 px-3 py-1.5 text-xs font-medium rounded-lg border border-destructive/30 text-destructive hover:bg-destructive/10 transition-colors">
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
