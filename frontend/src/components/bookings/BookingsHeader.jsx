"use client";

import { BOOKING_FILTERS } from "@/utils/bookingConstants";

export default function BookingsHeader({ filter, setFilter }) {
    const tabs = [
        { id: BOOKING_FILTERS.UPCOMING, label: "Upcoming" },
        { id: BOOKING_FILTERS.PAST, label: "Past" },
        { id: BOOKING_FILTERS.ALL, label: "All Bookings" },
    ];

    return (
        <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
                <h1 className="text-2xl font-semibold text-foreground tracking-tight">Bookings</h1>
                <p className="text-sm text-muted-foreground mt-1">
                    Manage your upcoming meetings and review past events.
                </p>
            </div>

            <div className="flex bg-muted/50 p-1 rounded-lg border border-border w-max overflow-x-auto scrollbar-hide">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setFilter(tab.id)}
                        className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${filter === tab.id
                                ? "bg-card text-foreground shadow-sm ring-1 ring-border"
                                : "text-muted-foreground hover:text-foreground hover:bg-muted"
                            }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>
        </div>
    );
}
