import { CalendarDays, Clock, User } from "lucide-react";
import StatCard from "./StatCard";

/**
 * StatsGrid
 *
 * Renders the three dashboard stat cards in a responsive grid.
 *
 * Props:
 *   stats – { upcoming: number, thisWeek: number, allTime: number }
 */
export default function StatsGrid({ stats }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <StatCard
                label="Upcoming"
                value={stats.upcoming}
                sublabel="meetings scheduled"
                icon={CalendarDays}
                color="blue"
            />
            <StatCard
                label="This Week"
                value={stats.thisWeek}
                sublabel="confirmed bookings"
                icon={Clock}
                color="green"
            />
            <StatCard
                label="All Time"
                value={stats.allTime}
                sublabel="total bookings"
                icon={User}
                color="purple"
            />
        </div>
    );
}
