"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import {
    Clock,
    Settings,
    LogOut,
    User,
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    LayoutDashboard,
    CalendarDays,
    CalendarClock,
    BookOpen,
    Moon,
    Sun,
    X,
    Columns2,
    AlignLeft,
} from "lucide-react";
import axiosInstance from "@/lib/axiosInstance";

// ─── Constants ───────────────────────────────────────────────────────────────

const HOUR_HEIGHT = 56; // px per hour
const START_HOUR = 7;   // 7 AM
const END_HOUR = 20;    // 8 PM
const TOTAL_HOURS = END_HOUR - START_HOUR;

const MEETING_COLORS = {
    blue: { bg: "bg-blue-500/12 dark:bg-blue-500/15", border: "border-blue-400/40", text: "text-blue-700 dark:text-blue-300", dot: "bg-blue-500" },
    violet: { bg: "bg-violet-500/12 dark:bg-violet-500/15", border: "border-violet-400/40", text: "text-violet-700 dark:text-violet-300", dot: "bg-violet-500" },
    emerald: { bg: "bg-emerald-500/12 dark:bg-emerald-500/15", border: "border-emerald-400/40", text: "text-emerald-700 dark:text-emerald-300", dot: "bg-emerald-500" },
    amber: { bg: "bg-amber-500/12 dark:bg-amber-500/15", border: "border-amber-400/40", text: "text-amber-700 dark:text-amber-300", dot: "bg-amber-500" },
    rose: { bg: "bg-rose-500/12 dark:bg-rose-500/15", border: "border-rose-400/40", text: "text-rose-700 dark:text-rose-300", dot: "bg-rose-500" },
};

// Sample meetings – replace with real API data
const SAMPLE_MEETINGS = [
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

// ─── Utilities ────────────────────────────────────────────────────────────────

function getMondayOf(date) {
    const d = new Date(date);
    const day = d.getDay();
    const diff = day === 0 ? -6 : 1 - day;
    d.setDate(d.getDate() + diff);
    d.setHours(0, 0, 0, 0);
    return d;
}

function addDays(date, n) {
    const d = new Date(date);
    d.setDate(d.getDate() + n);
    return d;
}

function formatMonthYear(date) {
    return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

function formatShortDate(date) {
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function isToday(date) {
    const t = new Date();
    return date.toDateString() === t.toDateString();
}

function timeToMinutes(ts) {
    const [h, m] = ts.split(":").map(Number);
    return h * 60 + m;
}

function formatTime12(ts) {
    const [h, m] = ts.split(":").map(Number);
    const label = h >= 12 ? "PM" : "AM";
    const hh = h % 12 || 12;
    return `${hh}:${String(m).padStart(2, "0")} ${label}`;
}

function isSameDay(a, b) {
    return a.toDateString() === b.toDateString();
}

function getMeetingTopPx(startISO) {
    const d = new Date(startISO);
    const totalMin = (d.getHours() - START_HOUR) * 60 + d.getMinutes();
    return (totalMin / 60) * HOUR_HEIGHT;
}

function getMeetingHeightPx(startISO, endISO) {
    const start = new Date(startISO);
    const end = new Date(endISO);
    const durationMin = (end - start) / 60000;
    return Math.max((durationMin / 60) * HOUR_HEIGHT, 22);
}

// ─── Sidebar ─────────────────────────────────────────────────────────────────

function Sidebar({ user }) {
    const pathname = usePathname();
    const navItems = [
        { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
        { name: "Availability", href: "/availability", icon: Clock },
        { name: "Calendar", href: "/calendar", icon: CalendarDays },
        { name: "Bookings", href: "/bookings", icon: BookOpen },
        { name: "Settings", href: "/settings", icon: Settings },
    ];

    return (
        <aside className="w-64 h-screen bg-card border-r border-border flex flex-col fixed left-0 top-0 z-30">
            <div className="p-6 border-b border-border">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center">
                        <CalendarClock className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <span className="text-lg font-semibold text-foreground">Schedio</span>
                </div>
            </div>
            <nav className="flex-1 p-4">
                <ul className="space-y-1">
                    {navItems.map((item) => {
                        const active = pathname === item.href;
                        return (
                            <li key={item.name}>
                                <a
                                    href={item.href}
                                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${active
                                        ? "bg-accent text-foreground"
                                        : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                                        }`}
                                >
                                    <item.icon className="w-5 h-5" />
                                    {item.name}
                                </a>
                            </li>
                        );
                    })}
                </ul>
            </nav>
            <div className="p-4 border-t border-border" />
        </aside>
    );
}

// ─── Theme Toggle ─────────────────────────────────────────────────────────────

function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);
    if (!mounted) return <button className="p-2 hover:bg-accent rounded-lg transition-colors"><Sun className="w-5 h-5 text-muted-foreground" /></button>;
    return (
        <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className="p-2 hover:bg-accent rounded-lg transition-colors">
            {theme === "dark" ? <Sun className="w-5 h-5 text-muted-foreground" /> : <Moon className="w-5 h-5 text-muted-foreground" />}
        </button>
    );
}

// ─── Meeting Detail Popover ───────────────────────────────────────────────────

function MeetingPopover({ meeting, onClose }) {
    if (!meeting) return null;
    const colors = MEETING_COLORS[meeting.color] || MEETING_COLORS.blue;
    const startStr = meeting.start.split("T")[1];
    const endStr = meeting.end.split("T")[1];
    const date = new Date(meeting.start);
    const dayLabel = date.toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" });

    return (
        <>
            <div className="fixed inset-0 z-40" onClick={onClose} />
            <div className="fixed bottom-6 right-6 z-50 w-72 bg-card border border-border rounded-xl shadow-lg overflow-hidden">
                {/* color strip */}
                <div className={`h-1 w-full ${colors.dot}`} />
                <div className="p-4">
                    <div className="flex items-start justify-between gap-2 mb-3">
                        <div>
                            <p className="text-sm font-semibold text-foreground">{meeting.title}</p>
                            <p className="text-xs text-muted-foreground mt-0.5">{meeting.person}</p>
                        </div>
                        <button onClick={onClose} className="p-1 hover:bg-accent rounded-md transition-colors shrink-0">
                            <X className="w-3.5 h-3.5 text-muted-foreground" />
                        </button>
                    </div>
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

// ─── Meeting Block ────────────────────────────────────────────────────────────

function MeetingBlock({ meeting, style, onClick }) {
    const colors = MEETING_COLORS[meeting.color] || MEETING_COLORS.blue;
    const startStr = meeting.start.split("T")[1];
    const endStr = meeting.end.split("T")[1];
    const durationMin = (new Date(meeting.end) - new Date(meeting.start)) / 60000;
    const compact = durationMin <= 30;

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
                    <p className="text-[10px] opacity-60 mt-0.5">{formatTime12(startStr)} – {formatTime12(endStr)}</p>
                </>
            )}
            {compact && (
                <p className="text-[10px] opacity-60 truncate">{formatTime12(startStr)}</p>
            )}
        </div>
    );
}

// ─── Day Column ───────────────────────────────────────────────────────────────

function DayColumn({ date, meetings, onMeetingClick }) {
    return (
        <div className="relative border-l border-border" style={{ minHeight: TOTAL_HOURS * HOUR_HEIGHT }}>
            {/* Hour grid lines */}
            {Array.from({ length: TOTAL_HOURS }, (_, i) => (
                <div
                    key={i}
                    className="absolute left-0 right-0 border-b border-border/50"
                    style={{ top: i * HOUR_HEIGHT, height: HOUR_HEIGHT }}
                />
            ))}
            {/* Half-hour lines */}
            {Array.from({ length: TOTAL_HOURS }, (_, i) => (
                <div
                    key={`half-${i}`}
                    className="absolute left-0 right-0 border-b border-border/20"
                    style={{ top: i * HOUR_HEIGHT + HOUR_HEIGHT / 2 }}
                />
            ))}
            {/* Meetings */}
            {meetings.map((m) => (
                <MeetingBlock
                    key={m.id}
                    meeting={m}
                    style={{
                        top: getMeetingTopPx(m.start),
                        height: getMeetingHeightPx(m.start, m.end),
                        zIndex: 2,
                    }}
                    onClick={onMeetingClick}
                />
            ))}
        </div>
    );
}

// ─── Time Gutter ─────────────────────────────────────────────────────────────

function TimeGutter() {
    return (
        <div className="w-16 shrink-0 border-r border-border relative" style={{ height: TOTAL_HOURS * HOUR_HEIGHT }}>
            {Array.from({ length: TOTAL_HOURS }, (_, i) => {
                const hour = START_HOUR + i;
                const label = hour === 12 ? "12 PM" : hour > 12 ? `${hour - 12} PM` : `${hour} AM`;
                return (
                    <div
                        key={hour}
                        className="absolute right-2 flex items-start"
                        style={{ top: i * HOUR_HEIGHT - 8, height: HOUR_HEIGHT }}
                    >
                        <span className="text-[10px] text-muted-foreground/70 font-medium tracking-tight leading-none pt-0.5">
                            {label}
                        </span>
                    </div>
                );
            })}
        </div>
    );
}

// ─── Current-time indicator ────────────────────────────────────────────────────

function CurrentTimeIndicator({ weekStart }) {
    const [now, setNow] = useState(new Date());
    useEffect(() => {
        const interval = setInterval(() => setNow(new Date()), 30000);
        return () => clearInterval(interval);
    }, []);

    const todayCol = [0, 1, 2, 3, 4, 5, 6].findIndex((i) =>
        isSameDay(addDays(weekStart, i), now)
    );
    if (todayCol === -1) return null;
    if (now.getHours() < START_HOUR || now.getHours() >= END_HOUR) return null;

    const topPx = getMeetingTopPx(`${now.toISOString().split("T")[0]}T${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`);

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

// ─── Upcoming Panel ────────────────────────────────────────────────────────────

function UpcomingPanel({ meetings }) {
    const now = new Date();
    const upcoming = meetings
        .filter((m) => new Date(m.start) >= now)
        .sort((a, b) => new Date(a.start) - new Date(b.start))
        .slice(0, 5);

    return (
        <div className="w-64 shrink-0 border-l border-border flex flex-col overflow-hidden">
            <div className="px-4 py-3.5 border-b border-border">
                <p className="text-xs font-semibold text-foreground uppercase tracking-wider">Upcoming</p>
                <p className="text-xs text-muted-foreground mt-0.5">{upcoming.length} meetings ahead</p>
            </div>
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
                        : date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });

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

// ─── Main Page ─────────────────────────────────────────────────────────────────

export default function CalendarPage() {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [selectedMeeting, setSelectedMeeting] = useState(null);
    const [view, setView] = useState("week"); // "week" | "day"
    const [showPanel, setShowPanel] = useState(true);
    const scrollRef = useRef(null);

    // Current reference date
    const [refDate, setRefDate] = useState(() => {
        // Use Feb 17 2026 as "today" per user's current date context
        return new Date("2026-02-17");
    });

    const weekStart = getMondayOf(refDate);
    const weekDays = Array.from({ length: view === "week" ? 7 : 1 }, (_, i) =>
        view === "week" ? addDays(weekStart, i) : refDate
    );

    const DAY_NAMES = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

    useEffect(() => {
        fetchUser();
    }, []);

    // Scroll to ~8 AM on mount
    useEffect(() => {
        if (scrollRef.current) {
            const scrollTo = (START_HOUR + 1) * HOUR_HEIGHT;
            scrollRef.current.scrollTop = scrollTo;
        }
    }, [loading]);

    const fetchUser = async () => {
        try {
            const res = await axiosInstance.get("/auth/me");
            if (res.data.success) setUser(res.data.user);
        } catch {
            router.push("/signup");
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        try {
            await axiosInstance.post("/auth/logout");
            localStorage.removeItem("accessToken");
            router.push("/signup");
        } catch (e) {
            console.error("Logout failed:", e);
        }
    };

    const navigate = (dir) => {
        const n = view === "week" ? 7 : 1;
        setRefDate((prev) => addDays(prev, dir * n));
    };

    const goToday = () => setRefDate(new Date("2026-02-17"));

    const getMeetingsForDay = (date) =>
        SAMPLE_MEETINGS.filter((m) => isSameDay(new Date(m.start), date));

    if (loading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="flex items-center gap-3">
                    <div className="w-5 h-5 border-2 border-muted-foreground/30 border-t-muted-foreground rounded-full animate-spin" />
                    <span className="text-muted-foreground text-sm">Loading...</span>
                </div>
            </div>
        );
    }

    const headerRange =
        view === "week"
            ? `${formatShortDate(weekStart)} – ${formatShortDate(addDays(weekStart, 6))}`
            : formatShortDate(refDate);

    return (
        <div className="min-h-screen bg-background">
            <Sidebar user={user} />

            <div className="ml-64 flex flex-col h-screen overflow-hidden">
                {/* ── Top Header ── */}
                <header className="shrink-0 z-20 bg-background/90 backdrop-blur-sm border-b border-border">
                    <div className="flex items-center justify-between px-6 py-3.5">
                        {/* Left: title + nav */}
                        <div className="flex items-center gap-5">
                            <div>
                                <h1 className="text-base font-semibold text-foreground leading-tight">Calendar</h1>
                                <p className="text-xs text-muted-foreground">View and manage your scheduled meetings</p>
                            </div>

                            {/* Divider */}
                            <div className="h-6 w-px bg-border" />

                            {/* Navigation */}
                            <div className="flex items-center gap-1.5">
                                <button
                                    onClick={() => navigate(-1)}
                                    className="p-1.5 hover:bg-accent rounded-md transition-colors"
                                >
                                    <ChevronLeft className="w-4 h-4 text-muted-foreground" />
                                </button>
                                <button
                                    onClick={goToday}
                                    className="px-3 py-1 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors"
                                >
                                    Today
                                </button>
                                <button
                                    onClick={() => navigate(1)}
                                    className="p-1.5 hover:bg-accent rounded-md transition-colors"
                                >
                                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                                </button>
                            </div>

                            {/* Date range label */}
                            <span className="text-sm font-medium text-foreground">{headerRange}</span>
                        </div>

                        {/* Right: controls */}
                        <div className="flex items-center gap-2">
                            {/* View toggle */}
                            <div className="flex items-center rounded-lg border border-border overflow-hidden divide-x divide-border">
                                <button
                                    onClick={() => setView("week")}
                                    className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium transition-colors ${view === "week"
                                        ? "bg-accent text-foreground"
                                        : "text-muted-foreground hover:bg-accent/50"
                                        }`}
                                >
                                    <Columns2 className="w-3.5 h-3.5" />
                                    Week
                                </button>
                                <button
                                    onClick={() => setView("day")}
                                    className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium transition-colors ${view === "day"
                                        ? "bg-accent text-foreground"
                                        : "text-muted-foreground hover:bg-accent/50"
                                        }`}
                                >
                                    <AlignLeft className="w-3.5 h-3.5" />
                                    Day
                                </button>
                            </div>

                            {/* Panel toggle */}
                            <button
                                onClick={() => setShowPanel((p) => !p)}
                                className={`p-1.5 rounded-md border transition-colors ${showPanel
                                    ? "border-border bg-accent text-foreground"
                                    : "border-transparent text-muted-foreground hover:bg-accent"
                                    }`}
                                title="Toggle upcoming panel"
                            >
                                <AlignLeft className="w-4 h-4 rotate-180" />
                            </button>

                            <ThemeToggle />

                            {/* Profile dropdown */}
                            <div className="relative">
                                <button
                                    onClick={() => setDropdownOpen(!dropdownOpen)}
                                    className="flex items-center gap-2 p-2 hover:bg-accent rounded-lg transition-colors"
                                >
                                    <div className="w-7 h-7 bg-accent rounded-full flex items-center justify-center">
                                        <span className="text-xs font-medium text-foreground">
                                            {user?.name?.charAt(0).toUpperCase() || "U"}
                                        </span>
                                    </div>
                                    <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
                                </button>
                                {dropdownOpen && (
                                    <>
                                        <div className="fixed inset-0 z-10" onClick={() => setDropdownOpen(false)} />
                                        <div className="absolute right-0 mt-2 w-52 bg-card rounded-xl shadow-lg border border-border py-2 z-20">
                                            <div className="px-4 py-3 border-b border-border">
                                                <p className="text-sm font-medium text-foreground">{user?.name}</p>
                                                <p className="text-xs text-muted-foreground mt-0.5">{user?.email}</p>
                                            </div>
                                            <div className="py-1">
                                                <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-foreground hover:bg-accent transition-colors">
                                                    <User className="w-4 h-4" /> Profile
                                                </button>
                                                <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-foreground hover:bg-accent transition-colors">
                                                    <Settings className="w-4 h-4" /> Settings
                                                </button>
                                            </div>
                                            <div className="border-t border-border pt-1">
                                                <button
                                                    onClick={handleLogout}
                                                    className="w-full flex items-center gap-3 px-4 py-2 text-sm text-destructive hover:bg-destructive/10 transition-colors"
                                                >
                                                    <LogOut className="w-4 h-4" /> Log out
                                                </button>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </header>

                {/* ── Calendar body ── */}
                <div className="flex flex-1 overflow-hidden">
                    {/* Grid area */}
                    <div className="flex flex-col flex-1 overflow-hidden">
                        {/* Day header row */}
                        <div className="shrink-0 flex border-b border-border bg-background">
                            {/* Gutter spacer */}
                            <div className="w-16 shrink-0 border-r border-border" />
                            {/* Day labels */}
                            {weekDays.map((date, i) => {
                                const today = isToday(date);
                                const dayIndex = view === "week" ? i : date.getDay() === 0 ? 6 : date.getDay() - 1;
                                return (
                                    <div
                                        key={i}
                                        className="flex-1 flex flex-col items-center justify-center py-2.5 border-l border-border"
                                    >
                                        <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
                                            {view === "week" ? DAY_NAMES[i] : date.toLocaleDateString("en-US", { weekday: "short" })}
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

                        {/* Scrollable time grid */}
                        <div ref={scrollRef} className="flex-1 overflow-y-auto overflow-x-hidden">
                            <div className="flex" style={{ height: TOTAL_HOURS * HOUR_HEIGHT }}>
                                {/* Time gutter */}
                                <TimeGutter />

                                {/* Day columns */}
                                <div className="flex flex-1">
                                    {weekDays.map((date, i) => {
                                        const dayMeetings = getMeetingsForDay(date);
                                        const todayCol = isToday(date);
                                        return (
                                            <div key={i} className="flex-1 relative">
                                                {todayCol && (
                                                    <CurrentTimeIndicator weekStart={weekStart} />
                                                )}
                                                {/* Today column tint */}
                                                {todayCol && (
                                                    <div className="absolute inset-0 bg-primary/[0.02] pointer-events-none" />
                                                )}
                                                <DayColumn
                                                    date={date}
                                                    meetings={dayMeetings}
                                                    onMeetingClick={setSelectedMeeting}
                                                />
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Upcoming panel */}
                    {showPanel && <UpcomingPanel meetings={SAMPLE_MEETINGS} />}
                </div>
            </div>

            {/* Meeting detail popover */}
            {selectedMeeting && (
                <MeetingPopover meeting={selectedMeeting} onClose={() => setSelectedMeeting(null)} />
            )}
        </div>
    );
}

