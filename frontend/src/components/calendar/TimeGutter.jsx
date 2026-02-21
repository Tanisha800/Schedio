"use client";

import { HOUR_HEIGHT, TOTAL_HOURS, START_HOUR } from "@/utils/calendarConstants";

/**
 * TimeGutter
 *
 * The narrow left strip that shows hour labels (e.g. "7 AM", "12 PM", "3 PM").
 * Has no props — it derives all labels from the START_HOUR constant.
 */
export default function TimeGutter() {
    return (
        <div
            className="w-16 shrink-0 border-r border-border relative"
            style={{ height: TOTAL_HOURS * HOUR_HEIGHT }}
        >
            {Array.from({ length: TOTAL_HOURS }, (_, i) => {
                const hour = START_HOUR + i;
                const label =
                    hour === 12 ? "12 PM" : hour > 12 ? `${hour - 12} PM` : `${hour} AM`;

                return (
                    <div
                        key={hour}
                        className="absolute right-2 flex items-start"
                        style={{ top: i * HOUR_HEIGHT - 8, height: HOUR_HEIGHT }}
                    >
                        <span className="text-[10px] text-muted-foreground/70 font-medium tracking-tight leading-none pt-0.5">
                            {label}
                        </span>
                    </div>
                );
            })}
        </div>
    );
}
