"use client";

import { useRouter } from "next/navigation";
import axiosInstance from "@/lib/axiosInstance";

// Hooks
import { useCurrentUser } from "@/hooks/useCurrentUser";

// Layout components
import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";

// Dashboard feature components
import StatsGrid from "@/components/dashboard/StatsGrid";
import BookingLinkCard from "@/components/dashboard/BookingLinkCard";
import QuickActions from "@/components/dashboard/QuickActions";
import WeeklyCalendar from "@/components/dashboard/WeeklyCalendar";
import RecentBookings from "@/components/dashboard/RecentBookings";

// ─── Static data (will be replaced with API calls later) ──────────────────────
const DASHBOARD_STATS = {
    upcoming: 8,
    thisWeek: 5,
    allTime: 24,
};

// ─── Loading fallback ─────────────────────────────────────────────────────────
function LoadingScreen() {
    return (
        <div className="min-h-screen bg-background flex items-center justify-center">
            <div className="flex items-center gap-3">
                <div className="w-5 h-5 border-2 border-muted-foreground/30 border-t-muted-foreground rounded-full animate-spin"></div>
                <span className="text-muted-foreground text-sm">Loading...</span>
            </div>
        </div>
    );
}

// ─── Page (Orchestrator) ──────────────────────────────────────────────────────

export default function Dashboard() {
    const router = useRouter();
    const { user, loading } = useCurrentUser();

    const handleLogout = async () => {
        try {
            await axiosInstance.post("/auth/logout");
            localStorage.removeItem("accessToken");
            router.push("/signup");
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    if (loading) return <LoadingScreen />;

    return (
        <div className="min-h-screen bg-background">
            {/* Sidebar */}
            <Sidebar user={user} />

            {/* Main Content */}
            <div className="ml-64">
                {/* Top Header */}
                <Topbar user={user} onLogout={handleLogout} />

                {/* Dashboard Content */}
                <main className="p-8">
                    {/* Stats Cards */}
                    <StatsGrid stats={DASHBOARD_STATS} />

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
