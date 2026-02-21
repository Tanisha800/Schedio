"use client";

import BookingCard from "./BookingCard";

/**
 * BookingsList
 *
 * Renders an array of bookings or delegates empty state.
 */
export default function BookingsList({ bookings, onCancel }) {
    return (
        <div className="flex flex-col gap-4 mt-6">
            {bookings.map((booking) => (
                <BookingCard key={booking.id} booking={booking} onCancel={onCancel} />
            ))}
        </div>
    );
}
