"use client";

import { useState } from "react";
import {
    ChevronDown,
    User,
    Settings,
    LogOut,
} from "lucide-react";

/**
 * ProfileDropdown
 *
 * Avatar button that toggles a dropdown with profile info,
 * settings link, and logout action.
 *
 * Props:
 *   user     – { name, email } | null
 *   onLogout – () => void
 */
export default function ProfileDropdown({ user, onLogout }) {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    return (
        <div className="relative">
            <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 p-2 hover:bg-accent rounded-lg transition-colors"
            >
                <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-foreground">
                        {user?.name?.charAt(0).toUpperCase() || "U"}
                    </span>
                </div>
                <ChevronDown className="w-4 h-4 text-muted-foreground" />
            </button>

            {dropdownOpen && (
                <>
                    <div
                        className="fixed inset-0 z-10"
                        onClick={() => setDropdownOpen(false)}
                    />
                    <div className="absolute right-0 mt-2 w-56 bg-card rounded-xl shadow-lg border border-border py-2 z-20">
                        <div className="px-4 py-3 border-b border-border">
                            <p className="text-sm font-medium text-foreground">{user?.name}</p>
                            <p className="text-xs text-muted-foreground mt-0.5">{user?.email}</p>
                        </div>
                        <div className="py-1">
                            <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-foreground hover:bg-accent transition-colors">
                                <User className="w-4 h-4" />
                                Profile
                            </button>
                            <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-foreground hover:bg-accent transition-colors">
                                <Settings className="w-4 h-4" />
                                Settings
                            </button>
                        </div>
                        <div className="border-t border-border pt-1">
                            <button
                                onClick={onLogout}
                                className="w-full flex items-center gap-3 px-4 py-2 text-sm text-destructive hover:bg-destructive/10 transition-colors"
                            >
                                <LogOut className="w-4 h-4" />
                                Log out
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
