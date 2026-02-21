"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

// ─── Helper functions ─────────────────────────────────────────────────────────

function getWeekDates(date) {
    const week = [];
    const start = new Date(date);
    start.setDate(start.getDate() - start.getDay());

    for (let i = 0; i < 7; i++) {
        const day = new Date(start);
        day.setDate(start.getDate() + i);
        week.push(day);
    }
    return week;
}

function getMeetingStyle(meeting) {
    const startHour = parseInt(meeting.start.split(":")[0]);
    const startMin = parseInt(meeting.start.split(":")[1]);
    const endHour = parseInt(meeting.end.split(":")[0]);
    const endMin = parseInt(meeting.end.split(":")[1]);

    const top = ((startHour - 9) * 60 + startMin) * (48 / 60); // 48px per hour
    const height = ((endHour - startHour) * 60 + (endMin - startMin)) * (48 / 60);

    const colorClasses = {
        blue: "bg-blue-500/15 border-blue-500/30 text-blue-700 dark:text-blue-300",
        green: "bg-emerald-500/15 border-emerald-500/30 text-emerald-700 dark:text-emerald-300",
        purple: "bg-violet-500/15 border-violet-500/30 text-violet-700 dark:text-violet-300",
    };

    return {
        top: `${top}px`,
        height: `${height}px`,
        className: colorClasses[meeting.color],
    };
}

function isToday(date) {
    const today = new Date();
    return date.toDateString() === today.toDateString();
}

// ─── Sample data ──────────────────────────────────────────────────────────────

const SAMPLE_MEETINGS = [
    { id: 1, title: "Team Standup", start: "09:00", end: "09:30", day: 1, color: "blue" },
    { id: 2, title: "Client Call", start: "10:00", end: "11:00", day: 2, color: "purple" },
    { id: 3, title: "Design Review", start: "14:00", end: "15:30", day: 3, color: "green" },
    { id: 4, title: "1:1 with Sarah", start: "11:00", end: "11:30", day: 4, color: "blue" },
    { id: 5, title: "Product Demo", start: "15:00", end: "16:00", day: 5, color: "purple" },
];

const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// ─── Sub-components ───────────────────────────────────────────────────────────

/** Header with month/year, navigation arrows, and "Today" button */
function CalendarHeader({ weekDates, onNavigateWeek, onGoToday }) {
    return (
        <div className="flex items-center justify-between p-4 border-b border-border">
            <div className="flex items-center gap-4">
                <h3 className="text-base font-semibold text-foreground">
                    {weekDates[0].toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                </h3>
                <div className="flex items-center gap-1">
                    <button
                        onClick={() => onNavigateWeek(-1)}
                        className="p-1.5 hover:bg-accent rounded-md transition-colors"
                    >
                        <ChevronLeft className="w-4 h-4 text-muted-foreground" />
                    </button>
                    <button
                        onClick={onGoToday}
                        className="px-3 py-1 text-xs font-medium text-muted-foreground hover:bg-accent rounded-md transition-colors"
                    >
                        Today
                    </button>
                    <button
                        onClick={() => onNavigateWeek(1)}
                        className="p-1.5 hover:bg-accent rounded-md transition-colors"
                    >
                        <ChevronRight className="w-4 h-4 text-muted-foreground" />
                    </button>
                </div>
            </div>
        </div>
    );
}

/** Row of day names + date numbers */
function CalendarDayHeaders({ weekDates }) {
    return (
        <div className="grid grid-cols-8 border-b border-border">
            <div className="p-3 text-xs text-muted-foreground" /> {/* Time column */}
            {weekDates.map((date, i) => (
                <div key={i} className="p-3 text-center border-l border-border">
                    <p className="text-xs text-muted-foreground mb-1">{DAY_NAMES[i]}</p>
                    <p className={`text-sm font-medium ${isToday(date)
                        ? "w-7 h-7 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto"
                        : "text-foreground"
                        }`}>
                        {date.getDate()}
                    </p>
                </div>
            ))}
        </div>
    );
}

/** Time labels column */
function TimeColumn({ timeSlots }) {
    return (
        <div className="border-r border-border">
            {timeSlots.map((hour) => (
                <div key={hour} className="h-12 border-b border-border px-3 py-1">
                    <span className="text-xs text-muted-foreground">
                        {hour > 12 ? `${hour - 12} PM` : hour === 12 ? "12 PM" : `${hour} AM`}
                    </span>
                </div>
            ))}
        </div>
    );
}

/** A single meeting block inside a day column */
function MeetingBlock({ meeting }) {
    const style = getMeetingStyle(meeting);
    return (
        <div
            className={`absolute left-1 right-1 rounded-md border px-2 py-1 text-xs overflow-hidden ${style.className}`}
            style={{ top: style.top, height: style.height }}
        >
            <p className="font-medium truncate">{meeting.title}</p>
            <p className="opacity-75 text-[10px]">{meeting.start} - {meeting.end}</p>
        </div>
    );
}

/** The scrollable time grid with meeting blocks */
function CalendarGrid({ weekDates, timeSlots, meetings }) {
    return (
        <div className="grid grid-cols-8 max-h-[400px] overflow-y-auto">
            <TimeColumn timeSlots={timeSlots} />

            {weekDates.map((date, dayIndex) => (
                <div key={dayIndex} className="relative border-l border-border">
                    {timeSlots.map((hour) => (
                        <div key={hour} className="h-12 border-b border-border" />
                    ))}

                    {meetings
                        .filter((m) => m.day === dayIndex)
                        .map((meeting) => (
                            <MeetingBlock key={meeting.id} meeting={meeting} />
                        ))}
                </div>
            ))}
        </div>
    );
}

// ─── Main component ───────────────────────────────────────────────────────────

/**
 * WeeklyCalendar
 *
 * A compact weekly calendar widget for the dashboard.
 * Self-contained with its own week navigation state and sample data.
 *
 * NOTE: This is the _dashboard_ mini-calendar, separate from the
 * full-page calendar at /calendar.
 */
export default function WeeklyCalendar() {
    const [currentDate, setCurrentDate] = useState(new Date());

    const weekDates = getWeekDates(currentDate);
    const timeSlots = Array.from({ length: 10 }, (_, i) => i + 9); // 9 AM to 6 PM

    const navigateWeek = (direction) => {
        const newDate = new Date(currentDate);
        newDate.setDate(newDate.getDate() + (direction * 7));
        setCurrentDate(newDate);
    };

    return (
        <div className="bg-card border border-border rounded-xl overflow-hidden">
            <CalendarHeader
                weekDates={weekDates}
                onNavigateWeek={navigateWeek}
                onGoToday={() => setCurrentDate(new Date())}
            />
            <CalendarDayHeaders weekDates={weekDates} />
            <CalendarGrid
                weekDates={weekDates}
                timeSlots={timeSlots}
                meetings={SAMPLE_MEETINGS}
            />
        </div>
    );
}
