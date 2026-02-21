"use client";

import ThemeToggle from "./ThemeToggle";
import ProfileDropdown from "./ProfileDropdown";

/**
 * Topbar
 *
 * Sticky top header with a welcome message, theme toggle,
 * and profile dropdown.
 *
 * Props:
 *   user     – { name, email } | null
 *   onLogout – () => void
 */
export default function Topbar({ user, onLogout }) {
    return (
        <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b border-border">
            <div className="flex items-center justify-between px-8 py-4">
                <div>
                    <h1 className="text-xl font-semibold text-foreground">
                        Welcome back, {user?.name?.split(" ")[0] || "there"}
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Manage your meetings efficiently and stay organized
                    </p>
                </div>

                <div className="flex items-center gap-2">
                    <ThemeToggle />
                    <ProfileDropdown user={user} onLogout={onLogout} />
                </div>
            </div>
        </header>
    );
}
