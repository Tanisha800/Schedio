/**
 * RecentBookings
 *
 * Displays a list of upcoming / recent bookings with reschedule
 * and cancel actions that appear on hover.
 */

const BOOKINGS = [
    { id: 1, name: "Alex Johnson", date: "Tomorrow", time: "2:00 PM", duration: "30 min meeting", initials: "AJ", color: "bg-blue-500" },
    { id: 2, name: "Maria Garcia", date: "Feb 6", time: "10:00 AM", duration: "60 min consultation", initials: "MG", color: "bg-rose-500" },
    { id: 3, name: "David Kim", date: "Feb 6", time: "3:30 PM", duration: "30 min meeting", initials: "DK", color: "bg-amber-500" },
    { id: 4, name: "Jennifer Lee", date: "Feb 7", time: "11:00 AM", duration: "45 min demo", initials: "JL", color: "bg-emerald-500" },
];

export default function RecentBookings() {
    return (
        <div className="bg-card border border-border rounded-xl">
            <div className="p-5 border-b border-border">
                <h3 className="text-base font-semibold text-foreground">Recent bookings</h3>
            </div>

            <div className="divide-y divide-border">
                {BOOKINGS.map((booking) => (
                    <div key={booking.id} className="p-4 flex items-center justify-between group hover:bg-accent/30 transition-colors">
                        <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 ${booking.color} rounded-full flex items-center justify-center`}>
                                <span className="text-xs font-medium text-white">{booking.initials}</span>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-foreground">{booking.name}</p>
                                <p className="text-xs text-muted-foreground">
                                    {booking.date} at {booking.time} · {booking.duration}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button className="px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors">
                                Reschedule
                            </button>
                            <button className="px-3 py-1.5 text-xs font-medium text-destructive hover:bg-destructive/10 rounded-md transition-colors">
                                Cancel
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
