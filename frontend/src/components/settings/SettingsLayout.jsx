"use client";

import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import axiosInstance from "@/lib/axiosInstance";
import { useRouter } from "next/navigation";

// ─── Loading fallback ─────────────────────────────────────────────────────────

function FullScreenLoading() {
    return (
        <div className="min-h-screen bg-background flex items-center justify-center">
            <div className="flex items-center gap-3">
                <div className="w-5 h-5 border-2 border-muted-foreground/30 border-t-muted-foreground rounded-full animate-spin"></div>
                <span className="text-muted-foreground text-sm">Loading...</span>
            </div>
        </div>
    );
}

/**
 * SettingsLayout
 *
 * Wraps the settings pages with the standard Sidebar and Topbar.
 * Keeps the dashboard-style layout consistent and manages responsiveness.
 */
export default function SettingsLayout({ children }) {
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

    if (loading) {
        return <FullScreenLoading />;
    }

    return (
        <div className="min-h-screen bg-background flex">
            {/* Fixed Sidebar */}
            <Sidebar user={user} />

            {/* Main Content Area (offset by sidebar) */}
            <div className="ml-64 flex flex-col flex-1 min-h-screen h-screen overflow-hidden">
                <Topbar user={user} onLogout={handleLogout} />

                {/* Scrollable Settings Content */}
                <main className="flex-1 overflow-y-auto bg-background">
                    <div className="max-w-5xl mx-auto px-6 py-10 lg:px-12">
                        <div className="mb-8">
                            <h1 className="text-2xl font-semibold text-foreground tracking-tight">Settings</h1>
                            <p className="text-sm text-muted-foreground mt-1">
                                Manage your account, preferences, and security settings.
                            </p>
                        </div>
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
