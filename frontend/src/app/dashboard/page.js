"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import {
    Calendar,
    Clock,
    Copy,
    Check,
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
    Link2,
    MoreHorizontal,
} from "lucide-react";
// import axiosInstance from "@/lib/axiosInstance";
import axiosInstance from "../../lib/axiosInstance";

// Sidebar Component
export function Sidebar({ user }) {
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

            {/* User section */}
            <div className="p-4 border-t border-border"></div>
            {/* <div className="flex items-center gap-3 px-3 py-2">
                    <div className="w-9 h-9 bg-accent rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-foreground">
                            {user?.name?.charAt(0).toUpperCase() || "U"}
                        </span>
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">{user?.name || "User"}</p>
                        <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
                    </div>
                </div>
            </div> */}
        </aside>
    );
}

// Theme Toggle Component
function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

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

// Stats Card Component
function StatCard({ label, value, sublabel, icon: Icon, color }) {
    const colorClasses = {
        blue: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
        green: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
        purple: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
    };

    return (
        <div className="bg-card border border-border rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    {label}
                </span>
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${colorClasses[color]}`}>
                    <Icon className="w-4 h-4" />
                </div>
            </div>
            <p className="text-3xl font-semibold text-foreground">{value}</p>
            <p className="text-sm text-muted-foreground mt-1">{sublabel}</p>
        </div>
    );
}

// Weekly Calendar Component
function WeeklyCalendar() {
    const [currentDate, setCurrentDate] = useState(new Date());

    // Get week dates
    const getWeekDates = (date) => {
        const week = [];
        const start = new Date(date);
        start.setDate(start.getDate() - start.getDay());

        for (let i = 0; i < 7; i++) {
            const day = new Date(start);
            day.setDate(start.getDate() + i);
            week.push(day);
        }
        return week;
    };

    const weekDates = getWeekDates(currentDate);
    const timeSlots = Array.from({ length: 10 }, (_, i) => i + 9); // 9 AM to 6 PM

    // Sample meetings data
    const meetings = [
        { id: 1, title: "Team Standup", start: "09:00", end: "09:30", day: 1, color: "blue" },
        { id: 2, title: "Client Call", start: "10:00", end: "11:00", day: 2, color: "purple" },
        { id: 3, title: "Design Review", start: "14:00", end: "15:30", day: 3, color: "green" },
        { id: 4, title: "1:1 with Sarah", start: "11:00", end: "11:30", day: 4, color: "blue" },
        { id: 5, title: "Product Demo", start: "15:00", end: "16:00", day: 5, color: "purple" },
    ];

    const getMeetingStyle = (meeting) => {
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
    };

    const formatDate = (date) => {
        return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    };

    const isToday = (date) => {
        const today = new Date();
        return date.toDateString() === today.toDateString();
    };

    const navigateWeek = (direction) => {
        const newDate = new Date(currentDate);
        newDate.setDate(newDate.getDate() + (direction * 7));
        setCurrentDate(newDate);
    };

    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    return (
        <div className="bg-card border border-border rounded-xl overflow-hidden">
            {/* Calendar Header */}
            <div className="flex items-center justify-between p-4 border-b border-border">
                <div className="flex items-center gap-4">
                    <h3 className="text-base font-semibold text-foreground">
                        {weekDates[0].toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                    </h3>
                    <div className="flex items-center gap-1">
                        <button
                            onClick={() => navigateWeek(-1)}
                            className="p-1.5 hover:bg-accent rounded-md transition-colors"
                        >
                            <ChevronLeft className="w-4 h-4 text-muted-foreground" />
                        </button>
                        <button
                            onClick={() => setCurrentDate(new Date())}
                            className="px-3 py-1 text-xs font-medium text-muted-foreground hover:bg-accent rounded-md transition-colors"
                        >
                            Today
                        </button>
                        <button
                            onClick={() => navigateWeek(1)}
                            className="p-1.5 hover:bg-accent rounded-md transition-colors"
                        >
                            <ChevronRight className="w-4 h-4 text-muted-foreground" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Days Header */}
            <div className="grid grid-cols-8 border-b border-border">
                <div className="p-3 text-xs text-muted-foreground" /> {/* Time column */}
                {weekDates.map((date, i) => (
                    <div key={i} className="p-3 text-center border-l border-border">
                        <p className="text-xs text-muted-foreground mb-1">{dayNames[i]}</p>
                        <p className={`text-sm font-medium ${isToday(date)
                            ? "w-7 h-7 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto"
                            : "text-foreground"
                            }`}>
                            {date.getDate()}
                        </p>
                    </div>
                ))}
            </div>

            {/* Time Grid */}
            <div className="grid grid-cols-8 max-h-[400px] overflow-y-auto">
                {/* Time Labels */}
                <div className="border-r border-border">
                    {timeSlots.map((hour) => (
                        <div key={hour} className="h-12 border-b border-border px-3 py-1">
                            <span className="text-xs text-muted-foreground">
                                {hour > 12 ? `${hour - 12} PM` : hour === 12 ? "12 PM" : `${hour} AM`}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Day Columns */}
                {weekDates.map((date, dayIndex) => (
                    <div key={dayIndex} className="relative border-l border-border">
                        {timeSlots.map((hour) => (
                            <div key={hour} className="h-12 border-b border-border" />
                        ))}

                        {/* Meetings */}
                        {meetings
                            .filter((m) => m.day === dayIndex)
                            .map((meeting) => {
                                const style = getMeetingStyle(meeting);
                                return (
                                    <div
                                        key={meeting.id}
                                        className={`absolute left-1 right-1 rounded-md border px-2 py-1 text-xs overflow-hidden ${style.className}`}
                                        style={{ top: style.top, height: style.height }}
                                    >
                                        <p className="font-medium truncate">{meeting.title}</p>
                                        <p className="opacity-75 text-[10px]">{meeting.start} - {meeting.end}</p>
                                    </div>
                                );
                            })}
                    </div>
                ))}
            </div>
        </div>
    );
}

// Booking Link Card Component
function BookingLinkCard({ user }) {
    const [copied, setCopied] = useState(false);
    const bookingLink = `https://schedio.app/${user?.name?.toLowerCase().replace(/\s+/g, "-") || "user"}`;

    const handleCopy = () => {
        navigator.clipboard.writeText(bookingLink);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="bg-card border border-border rounded-xl p-5">
            <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
                    <Link2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                    <h3 className="text-sm font-semibold text-foreground">Your booking link</h3>
                    <p className="text-xs text-muted-foreground">Share this link to let others schedule time with you</p>
                </div>
            </div>

            <div className="flex items-center gap-2">
                <div className="flex-1 bg-muted border border-border rounded-lg px-4 py-2.5">
                    <span className="text-sm text-foreground font-mono">{bookingLink}</span>
                </div>
                <button
                    onClick={handleCopy}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium text-sm transition-all ${copied
                        ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30"
                        : "bg-primary text-primary-foreground hover:bg-primary/90"
                        }`}
                >
                    {copied ? (
                        <>
                            <Check className="w-4 h-4" />
                            Copied
                        </>
                    ) : (
                        <>
                            <Copy className="w-4 h-4" />
                            Copy link
                        </>
                    )}
                </button>
            </div>
        </div>
    );
}

// Quick Actions Component
function QuickActions() {
    const router = useRouter();

    return (
        <div className="bg-card border border-border rounded-xl p-5">
            <h3 className="text-sm font-semibold text-foreground mb-1">Quick actions</h3>
            <p className="text-xs text-muted-foreground mb-4">Manage your schedule</p>

            <div className="space-y-2">
                <button
                    onClick={() => router.push("/availability")}
                    className="w-full flex items-center justify-between px-4 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                >
                    <span className="text-sm font-medium">Set Availability</span>
                    <ChevronRight className="w-4 h-4" />
                </button>
                <button
                    onClick={() => router.push("/bookings")}
                    className="w-full flex items-center justify-between px-4 py-3 bg-muted text-foreground rounded-lg hover:bg-accent transition-colors border border-border"
                >
                    <span className="text-sm font-medium">View Bookings</span>
                    <ChevronRight className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
}

// Recent Bookings Component
function RecentBookings() {
    const bookings = [
        { id: 1, name: "Alex Johnson", date: "Tomorrow", time: "2:00 PM", duration: "30 min meeting", initials: "AJ", color: "bg-blue-500" },
        { id: 2, name: "Maria Garcia", date: "Feb 6", time: "10:00 AM", duration: "60 min consultation", initials: "MG", color: "bg-rose-500" },
        { id: 3, name: "David Kim", date: "Feb 6", time: "3:30 PM", duration: "30 min meeting", initials: "DK", color: "bg-amber-500" },
        { id: 4, name: "Jennifer Lee", date: "Feb 7", time: "11:00 AM", duration: "45 min demo", initials: "JL", color: "bg-emerald-500" },
    ];

    return (
        <div className="bg-card border border-border rounded-xl">
            <div className="p-5 border-b border-border">
                <h3 className="text-base font-semibold text-foreground">Recent bookings</h3>
            </div>

            <div className="divide-y divide-border">
                {bookings.map((booking) => (
                    <div key={booking.id} className="p-4 flex items-center justify-between group hover:bg-accent/30 transition-colors">
                        <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 ${booking.color} rounded-full flex items-center justify-center`}>
                                <span className="text-xs font-medium text-white">{booking.initials}</span>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-foreground">{booking.name}</p>
                                <p className="text-xs text-muted-foreground">
                                    {booking.date} at {booking.time} · {booking.duration}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button className="px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors">
                                Reschedule
                            </button>
                            <button className="px-3 py-1.5 text-xs font-medium text-destructive hover:bg-destructive/10 rounded-md transition-colors">
                                Cancel
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

// Main Dashboard Component
export default function Dashboard() {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const stats = {
        upcoming: 8,
        thisWeek: 5,
        allTime: 24,
    };

    useEffect(() => {
        fetchUser();
    }, []);

    const fetchUser = async () => {
        try {
            const response = await axiosInstance.get("/auth/me");
            if (response.data.success) {
                setUser(response.data.user);
            }
        } catch (error) {
            console.error("Failed to fetch user:", error);
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
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="flex items-center gap-3">
                    <div className="w-5 h-5 border-2 border-muted-foreground/30 border-t-muted-foreground rounded-full animate-spin"></div>
                    <span className="text-muted-foreground text-sm">Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background">
            {/* Sidebar */}
            <Sidebar user={user} />

            {/* Main Content */}
            <div className="ml-64">
                {/* Top Header */}
                <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b border-border">
                    <div className="flex items-center justify-between px-8 py-4">
                        <div>
                            <h1 className="text-xl font-semibold text-foreground">
                                Welcome back, {user?.name?.split(" ")[0] || "there"}
                            </h1>
                            <p className="text-sm text-muted-foreground">
                                Manage your meetings efficiently and stay organized
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
                                                    <User className="w-4 h-4" />
                                                    Profile
                                                </button>
                                                <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-foreground hover:bg-accent transition-colors">
                                                    <Settings className="w-4 h-4" />
                                                    Settings
                                                </button>
                                            </div>
                                            <div className="border-t border-border pt-1">
                                                <button
                                                    onClick={handleLogout}
                                                    className="w-full flex items-center gap-3 px-4 py-2 text-sm text-destructive hover:bg-destructive/10 transition-colors"
                                                >
                                                    <LogOut className="w-4 h-4" />
                                                    Log out
                                                </button>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </header>

                {/* Dashboard Content */}
                <main className="p-8">
                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                        <StatCard
                            label="Upcoming"
                            value={stats.upcoming}
                            sublabel="meetings scheduled"
                            icon={CalendarDays}
                            color="blue"
                        />
                        <StatCard
                            label="This Week"
                            value={stats.thisWeek}
                            sublabel="confirmed bookings"
                            icon={Clock}
                            color="green"
                        />
                        <StatCard
                            label="All Time"
                            value={stats.allTime}
                            sublabel="total bookings"
                            icon={User}
                            color="purple"
                        />
                    </div>

                    {/* Booking Link & Quick Actions */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
                        <div className="lg:col-span-2">
                            <BookingLinkCard user={user} />
                        </div>
                        <QuickActions />
                    </div>

                    {/* Calendar & Recent Bookings */}
                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                        <div className="xl:col-span-2">
                            <WeeklyCalendar />
                        </div>
                        <div>
                            <RecentBookings />
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
