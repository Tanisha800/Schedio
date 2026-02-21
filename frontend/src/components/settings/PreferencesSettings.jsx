"use client";

import { useState } from "react";
import SettingsHeader from "./SettingsHeader";
import { useTheme } from "next-themes";
import { Monitor, Moon, Sun } from "lucide-react";

/**
 * PreferencesSettings
 *
 * App-wide preferences like theme, language, and notification toggles.
 */
export default function PreferencesSettings() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    // Fake local state for notifications
    const [emailNotifs, setEmailNotifs] = useState(true);
    const [weeklyReport, setWeeklyReport] = useState(false);

    // Handle hydration mismatch for next-themes
    useState(() => setMounted(true), []);

    return (
        <div className="max-w-2xl">
            <SettingsHeader
                title="Preferences"
                description="Manage interface settings and notifications."
            />

            <div className="space-y-8">
                {/* Theme Selection */}
                <div>
                    <h3 className="text-sm font-medium text-foreground mb-4">Appearance</h3>
                    {mounted ? (
                        <div className="grid grid-cols-3 gap-4">
                            <button
                                onClick={() => setTheme("light")}
                                className={`flex flex-col items-center justify-center gap-2 p-4 rounded-xl border-2 transition-all ${theme === "light"
                                        ? "border-primary bg-primary/5 text-primary"
                                        : "border-border bg-card text-muted-foreground hover:border-muted-foreground/50 hover:text-foreground"
                                    }`}
                            >
                                <Sun className="w-6 h-6" />
                                <span className="text-sm font-medium">Light</span>
                            </button>

                            <button
                                onClick={() => setTheme("dark")}
                                className={`flex flex-col items-center justify-center gap-2 p-4 rounded-xl border-2 transition-all ${theme === "dark"
                                        ? "border-primary bg-primary/5 text-primary"
                                        : "border-border bg-card text-muted-foreground hover:border-muted-foreground/50 hover:text-foreground"
                                    }`}
                            >
                                <Moon className="w-6 h-6" />
                                <span className="text-sm font-medium">Dark</span>
                            </button>

                            <button
                                onClick={() => setTheme("system")}
                                className={`flex flex-col items-center justify-center gap-2 p-4 rounded-xl border-2 transition-all ${theme === "system"
                                        ? "border-primary bg-primary/5 text-primary"
                                        : "border-border bg-card text-muted-foreground hover:border-muted-foreground/50 hover:text-foreground"
                                    }`}
                            >
                                <Monitor className="w-6 h-6" />
                                <span className="text-sm font-medium">System</span>
                            </button>
                        </div>
                    ) : (
                        <div className="h-[104px] rounded-xl bg-muted animate-pulse" />
                    )}
                </div>

                {/* Notifications */}
                <div className="pt-6 border-t border-border">
                    <h3 className="text-sm font-medium text-foreground mb-4">Email Notifications</h3>

                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-foreground">Booking Updates</p>
                                <p className="text-[13px] text-muted-foreground">Receive emails when someone books or cancels.</p>
                            </div>
                            <button
                                onClick={() => setEmailNotifs(!emailNotifs)}
                                className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${emailNotifs ? "bg-primary" : "bg-muted"
                                    }`}
                            >
                                <span
                                    className={`inline-block h-4 w-4 transform rounded-full bg-background transition-transform ${emailNotifs ? "translate-x-4" : "translate-x-1"
                                        }`}
                                />
                            </button>
                        </div>

                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-foreground">Weekly Wrap-up</p>
                                <p className="text-[13px] text-muted-foreground">Get a summary of your meetings every Friday.</p>
                            </div>
                            <button
                                onClick={() => setWeeklyReport(!weeklyReport)}
                                className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${weeklyReport ? "bg-primary" : "bg-muted"
                                    }`}
                            >
                                <span
                                    className={`inline-block h-4 w-4 transform rounded-full bg-background transition-transform ${weeklyReport ? "translate-x-4" : "translate-x-1"
                                        }`}
                                />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
