"use client";

import { useRouter } from "next/navigation";
import { ChevronRight } from "lucide-react";

/**
 * QuickActions
 *
 * Two action buttons: "Set Availability" and "View Bookings".
 * Each navigates to the corresponding page.
 */
export default function QuickActions() {
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
