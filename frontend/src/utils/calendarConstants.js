// ─── Calendar Layout Constants ─────────────────────────────────────────────────
export const HOUR_HEIGHT = 56; // px per hour in the time grid
export const START_HOUR = 7;   // 7 AM — first visible hour
export const END_HOUR = 20;    // 8 PM — last visible hour
export const TOTAL_HOURS = END_HOUR - START_HOUR;

// ─── Day Name Labels ───────────────────────────────────────────────────────────
export const DAY_NAMES = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

// ─── Meeting Color Palette ─────────────────────────────────────────────────────
export const MEETING_COLORS = {
    blue: {
        bg: "bg-blue-500/12 dark:bg-blue-500/15",
        border: "border-blue-400/40",
        text: "text-blue-700 dark:text-blue-300",
        dot: "bg-blue-500",
    },
    violet: {
        bg: "bg-violet-500/12 dark:bg-violet-500/15",
        border: "border-violet-400/40",
        text: "text-violet-700 dark:text-violet-300",
        dot: "bg-violet-500",
    },
    emerald: {
        bg: "bg-emerald-500/12 dark:bg-emerald-500/15",
        border: "border-emerald-400/40",
        text: "text-emerald-700 dark:text-emerald-300",
        dot: "bg-emerald-500",
    },
    amber: {
        bg: "bg-amber-500/12 dark:bg-amber-500/15",
        border: "border-amber-400/40",
        text: "text-amber-700 dark:text-amber-300",
        dot: "bg-amber-500",
    },
    rose: {
        bg: "bg-rose-500/12 dark:bg-rose-500/15",
        border: "border-rose-400/40",
        text: "text-rose-700 dark:text-rose-300",
        dot: "bg-rose-500",
    },
};

// ─── Sample Meetings ───────────────────────────────────────────────────────────
// Replace with real API data when backend integration is ready
export const SAMPLE_MEETINGS = [
    { id: 1, title: "Team Standup", person: "All hands", start: "2026-02-16T09:00", end: "2026-02-16T09:30", color: "blue" },
    { id: 2, title: "Client Call", person: "Priya Mehra", start: "2026-02-17T10:00", end: "2026-02-17T11:00", color: "violet" },
    { id: 3, title: "Design Review", person: "Alex & Sam", start: "2026-02-18T13:00", end: "2026-02-18T14:30", color: "emerald" },
    { id: 4, title: "1:1 with Sarah", person: "Sarah Kim", start: "2026-02-19T11:00", end: "2026-02-19T11:30", color: "blue" },
    { id: 5, title: "Product Demo", person: "TechCorp Ltd.", start: "2026-02-20T15:00", end: "2026-02-20T16:00", color: "violet" },
    { id: 6, title: "Sprint Planning", person: "Engineering", start: "2026-02-16T14:00", end: "2026-02-16T15:30", color: "emerald" },
    { id: 7, title: "Investor Update", person: "Series A team", start: "2026-02-19T14:00", end: "2026-02-19T15:00", color: "amber" },
    { id: 8, title: "Onboarding Call", person: "New user", start: "2026-02-20T09:00", end: "2026-02-20T09:45", color: "rose" },
    { id: 9, title: "Async catchup", person: "Dev team", start: "2026-02-17T09:00", end: "2026-02-17T09:30", color: "amber" },
    { id: 10, title: "Marketing sync", person: "Rahul & Zoe", start: "2026-02-18T10:00", end: "2026-02-18T11:00", color: "rose" },
];
