"use client";

import { useState } from "react";
import SettingsHeader from "./SettingsHeader";
import { Link2 } from "lucide-react";

/**
 * AccountSettings
 *
 * Displays general account configuration like username/URL,
 * timezone, and regional formatting.
 */
export default function AccountSettings({ user }) {
    const [username, setUsername] = useState(user?.name?.toLowerCase().replace(/\s+/g, "-") || "user");
    const [timezone, setTimezone] = useState(Intl.DateTimeFormat().resolvedOptions().timeZone);
    const [saving, setSaving] = useState(false);

    const handleSave = async (e) => {
        e.preventDefault();
        setSaving(true);
        setTimeout(() => setSaving(false), 800);
    };

    return (
        <div className="max-w-2xl">
            <SettingsHeader
                title="Account"
                description="Manage your Schedio URL and account defaults."
            />

            <form onSubmit={handleSave} className="space-y-8">
                <div className="space-y-4">

                    {/* Public URL */}
                    <div className="grid gap-2">
                        <label htmlFor="username" className="text-sm font-medium text-foreground">
                            Personal URL
                        </label>
                        <div className="flex rounded-md shadow-sm">
                            <span className="inline-flex items-center px-4 rounded-l-md border border-r-0 border-border bg-muted text-muted-foreground sm:text-sm">
                                <Link2 className="w-4 h-4 mr-2" />
                                schedio.app/
                            </span>
                            <input
                                type="text"
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="flex-1 block w-full min-w-0 rounded-none rounded-r-md sm:text-sm border-border bg-background px-3 py-2 text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring border"
                                placeholder="username"
                            />
                        </div>
                        <p className="text-[13px] text-muted-foreground mt-1">
                            This is your public scheduling link. Changing it will break existing links.
                        </p>
                    </div>

                    {/* Timezone */}
                    <div className="grid gap-2 mt-4">
                        <label htmlFor="timezone" className="text-sm font-medium text-foreground">
                            Timezone
                        </label>
                        <select
                            id="timezone"
                            value={timezone}
                            onChange={(e) => setTimezone(e.target.value)}
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 appearance-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        >
                            {/* In a real app, populate this with all timezones */}
                            <option value="America/Los_Angeles">Pacific Time (PT)</option>
                            <option value="America/New_York">Eastern Time (ET)</option>
                            <option value="Europe/London">Greenwich Mean Time (GMT)</option>
                            <option value="Asia/Kolkata">India Standard Time (IST)</option>
                            <option value={timezone}>{timezone} (System Default)</option>
                        </select>
                        <p className="text-[13px] text-muted-foreground mt-1">
                            Your availability will be displayed to invitees in their local timezone.
                        </p>
                    </div>
                </div>

                <div className="flex justify-end pt-4 border-t border-border">
                    <button
                        type="submit"
                        disabled={saving}
                        className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 min-w-[120px]"
                    >
                        {saving ? (
                            <span className="flex items-center gap-2">
                                <div className="w-4 h-4 rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground animate-spin" />
                                Saving...
                            </span>
                        ) : (
                            "Save Changes"
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}
