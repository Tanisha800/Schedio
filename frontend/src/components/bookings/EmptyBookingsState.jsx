import { CalendarX2 } from "lucide-react";

export default function EmptyBookingsState({ filter }) {
    const message = {
        upcoming: "You don't have any upcoming bookings.",
        past: "No past bookings found.",
        all: "You don't have any bookings yet.",
    }[filter] || "No bookings found.";

    return (
        <div className="flex flex-col items-center justify-center py-24 px-6 border border-dashed border-border rounded-xl bg-muted/20">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                <CalendarX2 className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground">No bookings</h3>
            <p className="text-sm text-muted-foreground mt-1 text-center max-w-sm">
                {message}
            </p>
        </div>
    );
}
