"use client";

import { useState, useEffect } from "react";
import axiosInstance from "@/lib/axiosInstance";
import { BOOKING_FILTERS, BOOKING_STATUS } from "@/utils/bookingConstants";

export function useBookings() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [filter, setFilter] = useState(BOOKING_FILTERS.UPCOMING);

    // Initial fetch
    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        try {
            setLoading(true);

            // NOTE: Replace with actual backend endpoint when ready
            // Example: const res = await axiosInstance.get('/bookings');
            // setBookings(res.data.bookings);

            // Dummy data for now:
            setTimeout(() => {
                setBookings([
                    {
                        id: 1,
                        inviteeName: "Alex Johnson",
                        inviteeEmail: "alex@example.com",
                        date: new Date().toISOString(),
                        startTime: "14:00",
                        endTime: "14:30",
                        status: BOOKING_STATUS.UPCOMING,
                    },
                    {
                        id: 2,
                        inviteeName: "Maria Garcia",
                        inviteeEmail: "maria@example.com",
                        date: new Date(Date.now() + 86400000).toISOString(),
                        startTime: "10:00",
                        endTime: "11:00",
                        status: BOOKING_STATUS.UPCOMING,
                    },
                    {
                        id: 3,
                        inviteeName: "David Kim",
                        inviteeEmail: "david@example.com",
                        date: new Date(Date.now() - 86400000 * 2).toISOString(),
                        startTime: "15:30",
                        endTime: "16:00",
                        status: BOOKING_STATUS.PAST,
                    },
                    {
                        id: 4,
                        inviteeName: "Sam Wilson",
                        inviteeEmail: "sam@example.com",
                        date: new Date(Date.now() - 86400000 * 5).toISOString(),
                        startTime: "09:00",
                        endTime: "09:45",
                        status: BOOKING_STATUS.CANCELLED,
                    }
                ]);
                setLoading(false);
            }, 800);

        } catch (err) {
            console.error("Failed to fetch bookings:", err);
            setError("Failed to load bookings");
            setLoading(false);
        }
    };

    const cancelBooking = async (bookingId) => {
        // Optimistically update UI
        setBookings((prev) =>
            prev.map((b) => (b.id === bookingId ? { ...b, status: BOOKING_STATUS.CANCELLED } : b))
        );

        try {
            // NOTE: uncomment when backend is ready
            // await axiosInstance.post(`/bookings/${bookingId}/cancel`);
        } catch (err) {
            console.error("Failed to cancel booking:", err);
            // Revert on failure
            fetchBookings();
        }
    };

    const filteredBookings = bookings.filter((b) => {
        if (filter === BOOKING_FILTERS.UPCOMING) {
            return b.status === BOOKING_STATUS.UPCOMING;
        }
        if (filter === BOOKING_FILTERS.PAST) {
            return b.status === BOOKING_STATUS.PAST || b.status === BOOKING_STATUS.CANCELLED;
        }
        return true; // ALL
    });

    return {
        bookings: filteredBookings,
        loading,
        error,
        filter,
        setFilter,
        cancelBooking,
        refresh: fetchBookings,
    };
}
