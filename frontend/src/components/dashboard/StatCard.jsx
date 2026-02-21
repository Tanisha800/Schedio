/**
 * StatCard
 *
 * A single statistics card with an icon, label, value, and sublabel.
 *
 * Props:
 *   label    – string  (e.g. "Upcoming")
 *   value    – number | string
 *   sublabel – string  (e.g. "meetings scheduled")
 *   icon     – Lucide icon component
 *   color    – "blue" | "green" | "purple"
 */
export default function StatCard({ label, value, sublabel, icon: Icon, color }) {
    const colorClasses = {
        blue: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
        green: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
        purple: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
    };

    return (
        <div className="bg-card border border-border rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    {label}
                </span>
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${colorClasses[color]}`}>
                    <Icon className="w-4 h-4" />
                </div>
            </div>
            <p className="text-3xl font-semibold text-foreground">{value}</p>
            <p className="text-sm text-muted-foreground mt-1">{sublabel}</p>
        </div>
    );
}
