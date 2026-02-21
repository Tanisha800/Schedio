"use client";

import {
    ChevronLeft,
    ChevronRight,
    ChevronDown,
    AlignLeft,
    Columns2,
    User,
    Settings,
    LogOut,
} from "lucide-react";
import ThemeToggle from "@/components/layout/ThemeToggle";

/**
 * CalendarHeader
 *
 * The top toolbar bar of the calendar page.
 * Contains:
 *   - Page title + subtitle
 *   - Previous / Today / Next navigation buttons
 *   - Current date range label
 *   - Week / Day view toggle
 *   - Upcoming panel toggle button
 *   - Theme toggle
 *   - User profile dropdown (with logout)
 *
 * Props:
 *   headerRange    – string  e.g. "Feb 16 – Feb 22"
 *   view           – "week" | "day"
 *   setView        – (view: string) => void
 *   showPanel      – boolean
 *   setShowPanel   – (fn) => void
 *   dropdownOpen   – boolean
 *   setDropdownOpen – (bool) => void
 *   user           – { name, email } | null
 *   onNavigate     – (dir: -1 | 1) => void
 *   onGoToday      – () => void
 *   onLogout       – () => void
 */
export default function CalendarHeader({
    headerRange,
    view,
    setView,
    showPanel,
    setShowPanel,
    dropdownOpen,
    setDropdownOpen,
    user,
    onNavigate,
    onGoToday,
    onLogout,
}) {
    return (
        <header className="shrink-0 z-20 bg-background/90 backdrop-blur-sm border-b border-border">
            <div className="flex items-center justify-between px-6 py-3.5">

                {/* ── Left side: title + navigation ── */}
                <div className="flex items-center gap-5">
                    {/* Page title */}
                    <div>
                        <h1 className="text-base font-semibold text-foreground leading-tight">Calendar</h1>
                        <p className="text-xs text-muted-foreground">View and manage your scheduled meetings</p>
                    </div>

                    <div className="h-6 w-px bg-border" />

                    {/* Week/day navigation */}
                    <div className="flex items-center gap-1.5">
                        <button
                            onClick={() => onNavigate(-1)}
                            className="p-1.5 hover:bg-accent rounded-md transition-colors"
                        >
                            <ChevronLeft className="w-4 h-4 text-muted-foreground" />
                        </button>

                        <button
                            onClick={onGoToday}
                            className="px-3 py-1 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors"
                        >
                            Today
                        </button>

                        <button
                            onClick={() => onNavigate(1)}
                            className="p-1.5 hover:bg-accent rounded-md transition-colors"
                        >
                            <ChevronRight className="w-4 h-4 text-muted-foreground" />
                        </button>
                    </div>

                    {/* Current date range label */}
                    <span className="text-sm font-medium text-foreground">{headerRange}</span>
                </div>

                {/* ── Right side: controls ── */}
                <div className="flex items-center gap-2">

                    {/* Week / Day view toggle */}
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

                    {/* Upcoming panel toggle */}
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
                                {/* Overlay to close on outside click */}
                                <div
                                    className="fixed inset-0 z-10"
                                    onClick={() => setDropdownOpen(false)}
                                />
                                <div className="absolute right-0 mt-2 w-52 bg-card rounded-xl shadow-lg border border-border py-2 z-20">
                                    {/* User info */}
                                    <div className="px-4 py-3 border-b border-border">
                                        <p className="text-sm font-medium text-foreground">{user?.name}</p>
                                        <p className="text-xs text-muted-foreground mt-0.5">{user?.email}</p>
                                    </div>

                                    {/* Menu items */}
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
                                            onClick={onLogout}
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
    );
}
