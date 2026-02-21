"use client";

import { useState } from "react";
import SettingsHeader from "./SettingsHeader";

/**
 * SecuritySettings
 *
 * Form to handle password updates.
 */
export default function SecuritySettings() {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [saving, setSaving] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleSave = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(false);

        if (newPassword !== confirmPassword) {
            setError("New passwords do not match.");
            return;
        }

        if (newPassword.length < 8) {
            setError("Password must be at least 8 characters long.");
            return;
        }

        setSaving(true);
        // Simulate API call for password change
        setTimeout(() => {
            setSaving(false);
            setSuccess(true);
            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");
        }, 1000);
    };

    return (
        <div className="max-w-2xl">
            <SettingsHeader
                title="Security"
                description="Manage your password and account security."
            />

            <form onSubmit={handleSave} className="space-y-6">

                {/* Status Messages */}
                {error && (
                    <div className="p-3 text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-lg">
                        {error}
                    </div>
                )}
                {success && (
                    <div className="p-3 text-sm text-emerald-600 bg-emerald-500/10 border border-emerald-500/20 rounded-lg dark:text-emerald-400">
                        Password updated successfully.
                    </div>
                )}

                <div className="space-y-4">
                    <div className="grid gap-2">
                        <label htmlFor="current" className="text-sm font-medium text-foreground">
                            Current Password
                        </label>
                        <input
                            id="current"
                            type="password"
                            required
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 transition-colors"
                        />
                    </div>

                    <div className="grid gap-2">
                        <label htmlFor="new" className="text-sm font-medium text-foreground">
                            New Password
                        </label>
                        <input
                            id="new"
                            type="password"
                            required
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 transition-colors"
                        />
                    </div>

                    <div className="grid gap-2">
                        <label htmlFor="confirm" className="text-sm font-medium text-foreground">
                            Confirm New Password
                        </label>
                        <input
                            id="confirm"
                            type="password"
                            required
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 transition-colors"
                        />
                    </div>
                </div>

                <div className="flex justify-end pt-4 border-t border-border">
                    <button
                        type="submit"
                        disabled={saving || !currentPassword || !newPassword || !confirmPassword}
                        className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 min-w-[140px]"
                    >
                        {saving ? (
                            <span className="flex items-center gap-2">
                                <div className="w-4 h-4 rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground animate-spin" />
                                Updating...
                            </span>
                        ) : (
                            "Update Password"
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}
