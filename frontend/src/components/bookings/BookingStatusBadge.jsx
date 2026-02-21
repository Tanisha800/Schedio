import { STATUS_COLORS } from "@/utils/bookingConstants";

/**
 * BookingStatusBadge
 *
 * Renders a colored pill indicating the booking status.
 */
export default function BookingStatusBadge({ status }) {
    const colorClass = STATUS_COLORS[status] || STATUS_COLORS.upcoming;

    return (
        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold capitalize border ${colorClass}`}>
            {status}
        </span>
    );
}
