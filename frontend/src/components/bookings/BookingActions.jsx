"use client";

import { useState } from "react";
import { MoreHorizontal, XCircle, Clock } from "lucide-react";
import { BOOKING_STATUS } from "@/utils/bookingConstants";

/**
 * BookingActions
 *
 * Renders the options dropdown (e.g. Cancel) for an individual booking.
 */
export default function BookingActions({ booking, onCancel }) {
    const [open, setOpen] = useState(false);

    // If past or already cancelled, maybe we don't allow cancellation
    const canCancel = booking.status === BOOKING_STATUS.UPCOMING;

    return (
        <div className="relative">
            <button
                onClick={() => setOpen(!open)}
                className="p-2 text-muted-foreground hover:bg-accent hover:text-foreground rounded-lg transition-colors"
                title="Options"
            >
                <MoreHorizontal className="w-4 h-4" />
            </button>

            {open && (
                <>
                    <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
                    <div className="absolute right-0 mt-2 w-48 bg-card rounded-xl shadow-lg border border-border py-2 z-20">
                        <button
                            className="w-full flex items-center gap-3 px-4 py-2 text-sm text-foreground hover:bg-accent transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <Clock className="w-4 h-4" /> Reschedule
                        </button>

                        {canCancel && (
                            <button
                                onClick={() => {
                                    setOpen(false);
                                    onCancel(booking.id);
                                }}
                                className="w-full flex items-center gap-3 px-4 py-2 text-sm text-destructive hover:bg-destructive/10 transition-colors mt-1 border-t border-border pt-2"
                            >
                                <XCircle className="w-4 h-4" /> Cancel booking
                            </button>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}
