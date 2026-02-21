"use client";

import { useRef } from "react";
import DayColumn from "./DayColumn";
import TimeGutter from "./TimeGutter";
import CurrentTimeIndicator from "./CurrentTimeIndicator";
import { HOUR_HEIGHT, TOTAL_HOURS, DAY_NAMES } from "@/utils/calendarConstants";
import { isToday } from "@/utils/calendarUtils";

/**
 * CalendarGrid
 *
 * Renders the full scrollable time grid including:
 *   - The day-label header row (Mon–Sun or single day)
 *   - The scrollable time area with TimeGutter + DayColumn for each day
 *   - CurrentTimeIndicator overlaid on today's column (if visible)
 *
 * Props:
 *   weekDays        – Date[] — array of 1 or 7 Date objects to display
 *   weekStart       – Date   — Monday of the current week (for CurrentTimeIndicator)
 *   view            – "week" | "day"
 *   getMeetingsForDay – (date: Date) => Meeting[]
 *   onMeetingClick  – (meeting) => void
 *   scrollRef       – React ref attached to the scrollable container (for auto-scroll)
 */
export default function CalendarGrid({
    weekDays,
    weekStart,
    view,
    getMeetingsForDay,
    onMeetingClick,
    scrollRef,
}) {
    return (
        <div className="flex flex-col flex-1 overflow-hidden">
            {/* ── Day header row ── */}
            <div className="shrink-0 flex border-b border-border bg-background">
                {/* Spacer that aligns with the TimeGutter */}
                <div className="w-16 shrink-0 border-r border-border" />

                {weekDays.map((date, i) => {
                    const today = isToday(date);
                    const dayLabel = view === "week"
                        ? DAY_NAMES[i]
                        : date.toLocaleDateString("en-US", { weekday: "short" });

                    return (
                        <div
                            key={i}
                            className="flex-1 flex flex-col items-center justify-center py-2.5 border-l border-border"
                        >
                            <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
                                {dayLabel}
                            </span>
                            <span
                                className={`text-sm font-semibold mt-0.5 w-7 h-7 flex items-center justify-center rounded-full transition-colors ${today
                                        ? "bg-primary text-primary-foreground"
                                        : "text-foreground"
                                    }`}
                            >
                                {date.getDate()}
                            </span>
                        </div>
                    );
                })}
            </div>

            {/* ── Scrollable time grid ── */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto overflow-x-hidden">
                <div className="flex" style={{ height: TOTAL_HOURS * HOUR_HEIGHT }}>
                    <TimeGutter />

                    {/* Day columns */}
                    <div className="flex flex-1">
                        {weekDays.map((date, i) => {
                            const dayMeetings = getMeetingsForDay(date);
                            const isTodayCol = isToday(date);

                            return (
                                <div key={i} className="flex-1 relative">
                                    {/* Live time indicator — only on today's column */}
                                    {isTodayCol && <CurrentTimeIndicator weekStart={weekStart} />}

                                    {/* Subtle tint on today's column */}
                                    {isTodayCol && (
                                        <div className="absolute inset-0 bg-primary/[0.02] pointer-events-none" />
                                    )}

                                    <DayColumn
                                        date={date}
                                        meetings={dayMeetings}
                                        onMeetingClick={onMeetingClick}
                                    />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
