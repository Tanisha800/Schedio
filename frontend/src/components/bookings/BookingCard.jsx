"use client";

import { Calendar, Clock, User, Link2 } from "lucide-react";
import BookingStatusBadge from "./BookingStatusBadge";
import BookingActions from "./BookingActions";
import { formatDate } from "@/utils/formatDate";
import { formatTime } from "@/utils/formatTime";

export default function BookingCard({ booking, onCancel }) {
    return (
        <div className="group flex flex-col md:flex-row md:items-center justify-between p-5 bg-card border border-border rounded-xl hover:border-primary/50 transition-colors">

            {/* Left side: Info */}
            <div className="flex flex-col gap-3 md:w-1/2">
                <div className="flex items-center gap-2">
                    <BookingStatusBadge status={booking.status} />
                    <span className="text-sm font-medium text-foreground">{booking.inviteeName}</span>
                </div>

                <div className="flex items-center gap-5 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4" />
                        {formatDate(booking.date)}
                    </div>
                    <div className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4" />
                        {formatTime(booking.startTime)} - {formatTime(booking.endTime)}
                    </div>
                </div>
            </div>

            {/* Right side: Email & Actions */}
            <div className="flex items-center justify-between md:justify-end gap-6 mt-4 md:mt-0 w-full md:w-1/2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted px-3 py-1.5 rounded-md">
                    <User className="w-4 h-4" />
                    <span className="truncate max-w-[150px] sm:max-w-none">{booking.inviteeEmail}</span>
                </div>

                <div className="flex items-center gap-2">
                    <button className="hidden sm:flex items-center gap-2 px-4 py-2 text-sm font-medium bg-primary/10 text-primary hover:bg-primary/20 rounded-lg transition-colors">
                        <Link2 className="w-4 h-4" />
                        Meeting link
                    </button>

                    <BookingActions booking={booking} onCancel={onCancel} />
                </div>
            </div>
        </div>
    );
}
