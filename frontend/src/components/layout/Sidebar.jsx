"use client";

import { usePathname } from "next/navigation";
import {
    Clock,
    Settings,
    LayoutDashboard,
    CalendarDays,
    CalendarClock,
    BookOpen,
} from "lucide-react";

const NAV_ITEMS = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Availability", href: "/availability", icon: Clock },
    { name: "Calendar", href: "/calendar", icon: CalendarDays },
    { name: "Bookings", href: "/bookings", icon: BookOpen },
    { name: "Settings", href: "/settings", icon: Settings },
];

/**
 * Sidebar
 *
 * Fixed left navigation rail shared across all dashboard pages.
 *
 * Props:
 *   user – { name, email } | null  (reserved for future avatar/profile display)
 */
export default function Sidebar({ user }) {
    const pathname = usePathname();

    return (
        <aside className="w-64 h-screen bg-card border-r border-border flex flex-col fixed left-0 top-0 z-30">
            {/* Brand */}
            <div className="p-6 border-b border-border">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center">
                        <CalendarClock className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <span className="text-lg font-semibold text-foreground">Schedio</span>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4">
                <ul className="space-y-1">
                    {NAV_ITEMS.map((item) => {
                        const active = pathname === item.href;
                        return (
                            <li key={item.name}>
                                <a
                                    href={item.href}
                                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${active
                                            ? "bg-accent text-foreground"
                                            : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                                        }`}
                                >
                                    <item.icon className="w-5 h-5" />
                                    {item.name}
                                </a>
                            </li>
                        );
                    })}
                </ul>
            </nav>

            {/* Footer spacer (reserved for user info or extras) */}
            <div className="p-4 border-t border-border" />
        </aside>
    );
}
