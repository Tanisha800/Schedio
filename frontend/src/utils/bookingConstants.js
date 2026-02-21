export const BOOKING_STATUS = {
    UPCOMING: "upcoming",
    PAST: "past",
    CANCELLED: "cancelled",
};

export const BOOKING_FILTERS = {
    UPCOMING: "upcoming",
    PAST: "past",
    ALL: "all",
};

export const STATUS_COLORS = {
    [BOOKING_STATUS.UPCOMING]: "bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400 border-emerald-500/30",
    [BOOKING_STATUS.PAST]: "bg-muted text-muted-foreground border-border",
    [BOOKING_STATUS.CANCELLED]: "bg-destructive/10 text-destructive dark:bg-destructive/20 border-destructive/20",
};
