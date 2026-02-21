"use client";

import { MEETING_COLORS } from "@/utils/calendarConstants";
import { isToday, formatTime12 } from "@/utils/calendarUtils";

/**
 * UpcomingPanel
 *
 * A sidebar panel listing the next 5 upcoming meetings across all days,
 * sorted by start time. Meetings that have already passed are excluded.
 *
 * Props:
 *   meetings – Meeting[] (full list, not day-filtered)
 */
export default function UpcomingPanel({ meetings }) {
    const now = new Date();

    const upcoming = meetings
        .filter((m) => new Date(m.start) >= now)
        .sort((a, b) => new Date(a.start) - new Date(b.start))
        .slice(0, 5);

    return (
        <div className="w-64 shrink-0 border-l border-border flex flex-col overflow-hidden">
            {/* Panel header */}
            <div className="px-4 py-3.5 border-b border-border">
                <p className="text-xs font-semibold text-foreground uppercase tracking-wider">Upcoming</p>
                <p className="text-xs text-muted-foreground mt-0.5">{upcoming.length} meetings ahead</p>
            </div>

            {/* Meeting list */}
            <div className="flex-1 overflow-y-auto divide-y divide-border">
                {upcoming.length === 0 && (
                    <div className="px-4 py-6 text-center">
                        <p className="text-xs text-muted-foreground">Nothing scheduled ahead</p>
                    </div>
                )}

                {upcoming.map((m) => {
                    const colors = MEETING_COLORS[m.color] || MEETING_COLORS.blue;
                    const startStr = m.start.split("T")[1];
                    const date = new Date(m.start);
                    const dateLabel = isToday(date)
                        ? "Today"
                        : date.toLocaleDateString("en-US", {
                            weekday: "short",
                            month: "short",
                            day: "numeric",
                        });

                    return (
                        <div key={m.id} className="px-4 py-3 hover:bg-accent/40 transition-colors group">
                            <div className="flex items-start gap-2.5">
                                <div className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${colors.dot}`} />
                                <div className="min-w-0">
                                    <p className="text-xs font-medium text-foreground truncate">{m.title}</p>
                                    <p className="text-[11px] text-muted-foreground truncate mt-0.5">{m.person}</p>
                                    <div className="flex items-center gap-1.5 mt-1">
                                        <span className="text-[10px] text-muted-foreground/70">{dateLabel}</span>
                                        <span className="text-muted-foreground/40 text-[10px]">·</span>
                                        <span className="text-[10px] text-muted-foreground/70">{formatTime12(startStr)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
