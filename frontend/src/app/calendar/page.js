"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import axiosInstance from "@/lib/axiosInstance";

// Layout components
import Sidebar from "@/components/layout/Sidebar";

// Calendar feature components
import CalendarHeader from "@/components/calendar/CalendarHeader";
import CalendarGrid from "@/components/calendar/CalendarGrid";
import UpcomingPanel from "@/components/calendar/UpcomingPanel";
import MeetingPopover from "@/components/calendar/MeetingPopover";

// Data hook
import { useCalendarDates } from "@/hooks/useCalendarDates";

// Constants
import { HOUR_HEIGHT, START_HOUR, SAMPLE_MEETINGS } from "@/utils/calendarConstants";

// ─── Seed date ────────────────────────────────────────────────────────────────
// Using Feb 17 2026 as the "today" reference date for the demo.
// Replace with `new Date()` when switching to live data.
const DEMO_TODAY = new Date("2026-02-17");

// ─── Loading fallback ─────────────────────────────────────────────────────────
function LoadingScreen() {
    return (
        <div className="min-h-screen bg-background flex items-center justify-center">
            <div className="flex items-center gap-3">
                <div className="w-5 h-5 border-2 border-muted-foreground/30 border-t-muted-foreground rounded-full animate-spin" />
                <span className="text-muted-foreground text-sm">Loading...</span>
            </div>
        </div>
    );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function CalendarPage() {
    const router = useRouter();
    const scrollRef = useRef(null);

    // Auth state
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // UI state
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [selectedMeeting, setSelectedMeeting] = useState(null);
    const [showPanel, setShowPanel] = useState(true);

    // All date / week navigation logic lives in this hook
    const {
        view,
        setView,
        weekStart,
        weekDays,
        headerRange,
        navigate,
        goToday,
        getMeetingsForDay,
    } = useCalendarDates(DEMO_TODAY);

    // ── Auth ──────────────────────────────────────────────────────────────────
    useEffect(() => {
        (async () => {
            try {
                const res = await axiosInstance.get("/auth/me");
                if (res.data.success) setUser(res.data.user);
            } catch {
                router.push("/signup");
            } finally {
                setLoading(false);
            }
        })();
    }, [router]);

    // ── Auto-scroll to ~8 AM on mount ────────────────────────────────────────
    useEffect(() => {
        if (!loading && scrollRef.current) {
            scrollRef.current.scrollTop = (START_HOUR + 1) * HOUR_HEIGHT;
        }
    }, [loading]);

    const handleLogout = async () => {
        try {
            await axiosInstance.post("/auth/logout");
            localStorage.removeItem("accessToken");
            router.push("/signup");
        } catch (e) {
            console.error("Logout failed:", e);
        }
    };

    // ── Render ────────────────────────────────────────────────────────────────
    if (loading) return <LoadingScreen />;

    return (
        <div className="min-h-screen bg-background">
            {/* Fixed left sidebar */}
            <Sidebar user={user} />

            {/* Main content area (offset by sidebar width) */}
            <div className="ml-64 flex flex-col h-screen overflow-hidden">

                {/* Top toolbar */}
                <CalendarHeader
                    headerRange={headerRange}
                    view={view}
                    setView={setView}
                    showPanel={showPanel}
                    setShowPanel={setShowPanel}
                    dropdownOpen={dropdownOpen}
                    setDropdownOpen={setDropdownOpen}
                    user={user}
                    onNavigate={navigate}
                    onGoToday={goToday}
                    onLogout={handleLogout}
                />

                {/* Calendar body: grid + optional right panel */}
                <div className="flex flex-1 overflow-hidden">
                    <CalendarGrid
                        weekDays={weekDays}
                        weekStart={weekStart}
                        view={view}
                        getMeetingsForDay={getMeetingsForDay}
                        onMeetingClick={setSelectedMeeting}
                        scrollRef={scrollRef}
                    />

                    {showPanel && <UpcomingPanel meetings={SAMPLE_MEETINGS} />}
                </div>
            </div>

            {/* Meeting detail popover (portal-style, fixed position) */}
            {selectedMeeting && (
                <MeetingPopover
                    meeting={selectedMeeting}
                    onClose={() => setSelectedMeeting(null)}
                />
            )}
        </div>
    );
}
