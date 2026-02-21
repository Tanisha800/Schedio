"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import {
    Clock,
    Settings,
    LogOut,
    User,
    ChevronDown,
    LayoutDashboard,
    CalendarDays,
    CalendarClock,
    BookOpen,
    Moon,
    Sun,
    Check,
    ChevronRight,
    Timer,
    Hourglass,
} from "lucide-react";
import axiosInstance from "@/lib/axiosInstance";

// ─────────────────────────────────────────────
// Sidebar  (identical structure to dashboard)
// ─────────────────────────────────────────────
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
        <aside className="w-64 h-screen bg-card border-r border-border flex flex-col fixed left-0 top-0">
            {/* Logo */}
            <div className="p-6 border-b border-border">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center">
                        <CalendarClock className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <span className="text-lg font-semibold text-foreground">Schedio</span>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4">
                <ul className="space-y-1">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <li key={item.name}>
                                <a
                                    href={item.href}
                                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${isActive
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

// ─────────────────────────────────────────────
// Theme Toggle
// ─────────────────────────────────────────────
function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => { setMounted(true); }, []);

    if (!mounted) {
        return (
            <button className="p-2 hover:bg-accent rounded-lg transition-colors">
                <Sun className="w-5 h-5 text-muted-foreground" />
            </button>
        );
    }

    return (
        <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 hover:bg-accent rounded-lg transition-colors"
        >
            {theme === "dark" ? (
                <Sun className="w-5 h-5 text-muted-foreground" />
            ) : (
                <Moon className="w-5 h-5 text-muted-foreground" />
            )}
        </button>
    );
}

// ─────────────────────────────────────────────
// Toggle Switch
// ─────────────────────────────────────────────
function ToggleSwitch({ enabled, onChange }) {
    return (
        <button
            role="switch"
            aria-checked={enabled}
            onClick={() => onChange(!enabled)}
            className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none ${enabled ? "bg-primary" : "bg-border"
                }`}
        >
            <span
                className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform duration-200 ${enabled ? "translate-x-4" : "translate-x-0"
                    }`}
            />
        </button>
    );
}

// ─────────────────────────────────────────────
// Time Select
// ─────────────────────────────────────────────
function TimeSelect({ value, onChange, disabled }) {
    const times = [];
    for (let h = 0; h < 24; h++) {
        for (let m = 0; m < 60; m += 30) {
            const hh = String(h).padStart(2, "0");
            const mm = String(m).padStart(2, "0");
            const val = `${hh}:${mm}`;
            const label = new Date(`1970-01-01T${val}`).toLocaleTimeString("en-US", {
                hour: "numeric",
                minute: "2-digit",
                hour12: true,
            });
            times.push({ val, label });
        }
    }

    return (
        <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            disabled={disabled}
            className={`h-9 rounded-lg border border-border bg-background px-3 py-1 text-sm font-medium transition-colors appearance-none cursor-pointer pr-8 focus:outline-none focus:ring-2 focus:ring-ring/50 ${disabled
                    ? "opacity-35 cursor-not-allowed text-muted-foreground"
                    : "text-foreground hover:border-ring/50"
                }`}
            style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23888' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 10px center",
            }}
        >
            {times.map(({ val, label }) => (
                <option key={val} value={val}>
                    {label}
                </option>
            ))}
        </select>
    );
}

// ─────────────────────────────────────────────
// Day Row
// ─────────────────────────────────────────────
function DayRow({ day, config, onChange }) {
    const { enabled, start, end } = config;

    return (
        <div
            className={`flex items-center gap-4 px-5 py-4 transition-colors ${!enabled ? "opacity-60" : ""
                }`}
        >
            {/* Day name */}
            <div className="w-28 shrink-0">
                <span
                    className={`text-sm font-medium ${enabled ? "text-foreground" : "text-muted-foreground"
                        }`}
                >
                    {day}
                </span>
            </div>

            {/* Toggle */}
            <ToggleSwitch
                enabled={enabled}
                onChange={(val) => onChange({ ...config, enabled: val })}
            />

            {/* Availability label */}
            <div className="w-24 shrink-0">
                <span className={`text-xs ${enabled ? "text-muted-foreground" : "text-muted-foreground/50"}`}>
                    {enabled ? "Available" : "Unavailable"}
                </span>
            </div>

            {/* Time range */}
            <div className="flex items-center gap-2 ml-auto">
                <TimeSelect
                    value={start}
                    onChange={(val) => onChange({ ...config, start: val })}
                    disabled={!enabled}
                />
                <span className="text-xs text-muted-foreground/70 shrink-0">to</span>
                <TimeSelect
                    value={end}
                    onChange={(val) => onChange({ ...config, end: val })}
                    disabled={!enabled}
                />
            </div>
        </div>
    );
}

// ─────────────────────────────────────────────
// Advanced Options Card
// ─────────────────────────────────────────────
function AdvancedOptions({ settings, onChange }) {
    const bufferOptions = [
        { label: "No buffer", value: 0 },
        { label: "5 minutes", value: 5 },
        { label: "10 minutes", value: 10 },
        { label: "15 minutes", value: 15 },
        { label: "30 minutes", value: 30 },
    ];

    const durationOptions = [
        { label: "15 min", value: 15 },
        { label: "30 min", value: 30 },
        { label: "45 min", value: 45 },
        { label: "60 min", value: 60 },
        { label: "90 min", value: 90 },
    ];

    return (
        <div className="bg-card border border-border rounded-xl overflow-hidden">
            <div className="px-5 py-4 border-b border-border">
                <h2 className="text-sm font-semibold text-foreground">Advanced options</h2>
                <p className="text-xs text-muted-foreground mt-0.5">
                    Fine-tune how bookings are handled
                </p>
            </div>

            <div className="divide-y divide-border">
                {/* Buffer time */}
                <div className="flex items-center justify-between px-5 py-4">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center shrink-0">
                            <Timer className="w-4 h-4 text-muted-foreground" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-foreground">Buffer time</p>
                            <p className="text-xs text-muted-foreground">Padding between meetings</p>
                        </div>
                    </div>
                    <select
                        value={settings.buffer}
                        onChange={(e) => onChange({ ...settings, buffer: Number(e.target.value) })}
                        className="h-9 rounded-lg border border-border bg-background px-3 py-1 text-sm text-foreground appearance-none cursor-pointer pr-8 focus:outline-none focus:ring-2 focus:ring-ring/50 hover:border-ring/50 transition-colors"
                        style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23888' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "right 10px center",
                        }}
                    >
                        {bufferOptions.map((o) => (
                            <option key={o.value} value={o.value}>
                                {o.label}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Meeting duration */}
                <div className="flex items-center justify-between px-5 py-4">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center shrink-0">
                            <Hourglass className="w-4 h-4 text-muted-foreground" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-foreground">Meeting duration</p>
                            <p className="text-xs text-muted-foreground">Default length for new bookings</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-1.5">
                        {durationOptions.map((o) => (
                            <button
                                key={o.value}
                                onClick={() => onChange({ ...settings, duration: o.value })}
                                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${settings.duration === o.value
                                        ? "bg-primary text-primary-foreground"
                                        : "bg-muted text-muted-foreground hover:bg-accent hover:text-foreground border border-border"
                                    }`}
                            >
                                {o.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

// ─────────────────────────────────────────────
// Main Page
// ─────────────────────────────────────────────
export default function AvailabilityPage() {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [saveStatus, setSaveStatus] = useState("idle"); // idle | saving | saved

    const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

    const defaultSchedule = {
        Monday: { enabled: true, start: "09:00", end: "17:00" },
        Tuesday: { enabled: true, start: "09:00", end: "17:00" },
        Wednesday: { enabled: true, start: "09:00", end: "17:00" },
        Thursday: { enabled: true, start: "09:00", end: "17:00" },
        Friday: { enabled: true, start: "09:00", end: "17:00" },
        Saturday: { enabled: false, start: "10:00", end: "14:00" },
        Sunday: { enabled: false, start: "10:00", end: "14:00" },
    };

    const [schedule, setSchedule] = useState(defaultSchedule);
    const [advanced, setAdvanced] = useState({ buffer: 10, duration: 30 });

    useEffect(() => {
        fetchUser();
    }, []);

    const fetchUser = async () => {
        try {
            const response = await axiosInstance.get("/auth/me");
            if (response.data.success) setUser(response.data.user);
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

    const handleSave = async () => {
        setSaveStatus("saving");
        // Simulate API call – replace with real endpoint when ready
        await new Promise((r) => setTimeout(r, 900));
        setSaveStatus("saved");
        setTimeout(() => setSaveStatus("idle"), 3000);
    };

    const updateDay = (day, config) => {
        setSchedule((prev) => ({ ...prev, [day]: config }));
    };

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

    const enabledCount = DAYS.filter((d) => schedule[d].enabled).length;

    return (
        <div className="min-h-screen bg-background">
            <Sidebar user={user} />

            <div className="ml-64">
                {/* ── Top Header ── */}
                <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b border-border">
                    <div className="flex items-center justify-between px-8 py-4">
                        <div>
                            <h1 className="text-xl font-semibold text-foreground">Availability</h1>
                            <p className="text-sm text-muted-foreground">
                                Define when people can book time with you
                            </p>
                        </div>

                        <div className="flex items-center gap-2">
                            <ThemeToggle />

                            {/* Profile Dropdown */}
                            <div className="relative">
                                <button
                                    onClick={() => setDropdownOpen(!dropdownOpen)}
                                    className="flex items-center gap-2 p-2 hover:bg-accent rounded-lg transition-colors"
                                >
                                    <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                                        <span className="text-sm font-medium text-foreground">
                                            {user?.name?.charAt(0).toUpperCase() || "U"}
                                        </span>
                                    </div>
                                    <ChevronDown className="w-4 h-4 text-muted-foreground" />
                                </button>

                                {dropdownOpen && (
                                    <>
                                        <div
                                            className="fixed inset-0 z-10"
                                            onClick={() => setDropdownOpen(false)}
                                        />
                                        <div className="absolute right-0 mt-2 w-56 bg-card rounded-xl shadow-lg border border-border py-2 z-20">
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

                {/* ── Main Content ── */}
                <main className="p-8 max-w-3xl">

                    {/* ── Summary strip ── */}
                    <div className="flex items-center gap-6 mb-6 px-1">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-primary" />
                            <span className="text-sm text-muted-foreground">
                                <span className="font-medium text-foreground">{enabledCount}</span> of 7 days active
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-border" />
                            <span className="text-sm text-muted-foreground">
                                {advanced.duration} min slots · {advanced.buffer > 0 ? `${advanced.buffer} min buffer` : "no buffer"}
                            </span>
                        </div>
                    </div>

                    {/* ── Weekly Schedule Card ── */}
                    <div className="bg-card border border-border rounded-xl overflow-hidden mb-5">
                        {/* Card header */}
                        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
                            <div>
                                <h2 className="text-sm font-semibold text-foreground">Weekly schedule</h2>
                                <p className="text-xs text-muted-foreground mt-0.5">
                                    Set your available hours for each day
                                </p>
                            </div>

                            {/* Apply-to-all shortcut */}
                            <ApplyAllControl schedule={schedule} onApply={setSchedule} />
                        </div>

                        {/* Column labels */}
                        <div className="flex items-center gap-4 px-5 py-2.5 border-b border-border bg-muted/30">
                            <div className="w-28 shrink-0">
                                <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Day</span>
                            </div>
                            <div className="w-10" />
                            <div className="w-24 shrink-0">
                                <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Status</span>
                            </div>
                            <div className="ml-auto flex items-center gap-2">
                                <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider mr-12">Start</span>
                                <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">End</span>
                            </div>
                        </div>

                        {/* Day rows */}
                        <div className="divide-y divide-border">
                            {DAYS.map((day) => (
                                <DayRow
                                    key={day}
                                    day={day}
                                    config={schedule[day]}
                                    onChange={(cfg) => updateDay(day, cfg)}
                                />
                            ))}
                        </div>
                    </div>

                    {/* ── Advanced Options ── */}
                    <div className="mb-8">
                        <AdvancedOptions settings={advanced} onChange={setAdvanced} />
                    </div>

                    {/* ── Save Action ── */}
                    <div className="flex items-center gap-4">
                        <button
                            onClick={handleSave}
                            disabled={saveStatus === "saving"}
                            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${saveStatus === "saved"
                                    ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30"
                                    : "bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-60"
                                }`}
                        >
                            {saveStatus === "saving" && (
                                <span className="w-4 h-4 border-2 border-current/30 border-t-current rounded-full animate-spin" />
                            )}
                            {saveStatus === "saved" && <Check className="w-4 h-4" />}
                            {saveStatus === "saving"
                                ? "Saving…"
                                : saveStatus === "saved"
                                    ? "Availability updated"
                                    : "Save availability"}
                        </button>

                        {saveStatus === "idle" && (
                            <span className="text-xs text-muted-foreground">
                                Changes apply to all future bookings
                            </span>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
}

// ─────────────────────────────────────────────
// Apply-all helper (inline, keeps card header clean)
// ─────────────────────────────────────────────
function ApplyAllControl({ schedule, onApply }) {
    const [open, setOpen] = useState(false);

    // Find a "reference" day that is enabled
    const refDay = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].find(
        (d) => schedule[d].enabled
    ) || "Monday";
    const ref = schedule[refDay];

    const applyToWeekdays = () => {
        const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
        onApply((prev) => {
            const next = { ...prev };
            days.forEach((d) => { next[d] = { ...next[d], start: ref.start, end: ref.end }; });
            return next;
        });
        setOpen(false);
    };

    const applyToAll = () => {
        onApply((prev) => {
            const next = { ...prev };
            Object.keys(next).forEach((d) => { next[d] = { ...next[d], start: ref.start, end: ref.end }; });
            return next;
        });
        setOpen(false);
    };

    return (
        <div className="relative">
            <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-muted-foreground border border-border hover:bg-accent hover:text-foreground transition-colors"
            >
                Copy hours
                <ChevronRight className="w-3 h-3" />
            </button>

            {open && (
                <>
                    <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
                    <div className="absolute right-0 mt-1.5 w-48 bg-card border border-border rounded-xl shadow-md py-1.5 z-20">
                        <p className="px-3 py-1.5 text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
                            Copy from {refDay}
                        </p>
                        <button
                            onClick={applyToWeekdays}
                            className="w-full text-left px-3 py-2 text-sm text-foreground hover:bg-accent transition-colors"
                        >
                            Apply to weekdays
                        </button>
                        <button
                            onClick={applyToAll}
                            className="w-full text-left px-3 py-2 text-sm text-foreground hover:bg-accent transition-colors"
                        >
                            Apply to all days
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}
