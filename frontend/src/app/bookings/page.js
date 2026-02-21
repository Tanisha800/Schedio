"use client";

import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useBookings } from "@/hooks/useBookings";

import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";

import BookingsHeader from "@/components/bookings/BookingsHeader";
import BookingsLayout from "@/components/bookings/BookingsLayout";
import BookingsList from "@/components/bookings/BookingsList";
import BookingsSkeleton from "@/components/bookings/BookingsSkeleton";
import EmptyBookingsState from "@/components/bookings/EmptyBookingsState";
import { useRouter } from "next/navigation";
import axiosInstance from "@/lib/axiosInstance";



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


export default function BookingsPage() {
    const router = useRouter();
    const { user, loading: userLoading } = useCurrentUser();
    const { bookings, loading: bookingsLoading, error, filter, setFilter, cancelBooking } = useBookings();

    const handleLogout = async () => {
        try {
            await axiosInstance.post("/auth/logout");
            localStorage.removeItem("accessToken");
            router.push("/signup");
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    if (userLoading) {
        return <FullScreenLoading />;
    }

    return (
        <div className="min-h-screen bg-background">
            {/* Left rail */}
            <Sidebar user={user} />

            <div className="ml-64 flex flex-col min-h-screen">
                {/* Top header */}
                <Topbar user={user} onLogout={handleLogout} />

                {/* Main content */}
                <main className="flex-1 px-8 py-4 bg-background overflow-y-auto">
                    <BookingsLayout>
                        <BookingsHeader filter={filter} setFilter={setFilter} />

                        {error && (
                            <div className="p-4 mb-6 text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-lg">
                                {error}
                            </div>
                        )}

                        {bookingsLoading ? (
                            <BookingsSkeleton />
                        ) : bookings.length === 0 ? (
                            <EmptyBookingsState filter={filter} />
                        ) : (
                            <BookingsList bookings={bookings} onCancel={cancelBooking} />
                        )}
                    </BookingsLayout>
                </main>
            </div>
        </div>
    );
}
