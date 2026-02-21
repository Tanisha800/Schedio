"use client";

import { useState } from "react";
import SettingsHeader from "./SettingsHeader";
import { AlertOctagon, X } from "lucide-react";

/**
 * DangerZone
 *
 * Appears as a red-outlined section containing irreversible actions.
 * Demands a secondary confirmation modal to delete the user's account.
 */
export default function DangerZone() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDeleteAccount = () => {
        setIsDeleting(true);
        // Add your real API call to delete the account here.
        setTimeout(() => {
            setIsDeleting(false);
            setIsMenuOpen(false);
            // e.g. window.location.href = "/signup";
        }, 1500);
    };

    return (
        <div className="max-w-2xl">
            <SettingsHeader
                title="Danger Zone"
                description="Irreversible and destructive actions for your account."
            />

            {/* Red Destructive Box */}
            <div className="border border-destructive/50 bg-destructive/5 rounded-xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors hover:border-destructive/80">
                <div>
                    <h3 className="text-base font-semibold text-foreground">Delete Account</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                        Permanently delete your account, all scheduled meetings, and billing data. This action cannot be undone.
                    </p>
                </div>

                <button
                    onClick={() => setIsMenuOpen(true)}
                    className="shrink-0 inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 bg-destructive text-destructive-foreground hover:bg-destructive/90 h-10 px-4 py-2"
                >
                    Delete account
                </button>
            </div>

            {/* Confirmation Modal */}
            {isMenuOpen && (
                <>
                    {/* Backdrop */}
                    <div className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm" />

                    {/* Modal Content */}
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <div className="bg-card border border-border rounded-xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">

                            {/* Modal Header */}
                            <div className="flex items-center justify-between px-6 py-4 border-b border-border">
                                <div className="flex items-center gap-2 text-destructive">
                                    <AlertOctagon className="w-5 h-5" />
                                    <h2 className="text-lg font-semibold">Delete Account</h2>
                                </div>
                                <button
                                    onClick={() => setIsMenuOpen(false)}
                                    className="p-1.5 rounded-md hover:bg-accent text-muted-foreground transition-colors"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>

                            {/* Modal Body */}
                            <div className="p-6">
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    Are you absolutely sure? This action cannot be undone. This will permanently delete your
                                    account and remove your data from our servers.
                                </p>
                            </div>

                            {/* Modal Footer */}
                            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-border bg-muted/30">
                                <button
                                    onClick={() => setIsMenuOpen(false)}
                                    disabled={isDeleting}
                                    className="px-4 py-2 text-sm font-medium text-foreground bg-background border border-border rounded-md hover:bg-accent transition-colors disabled:opacity-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleDeleteAccount}
                                    disabled={isDeleting}
                                    className="inline-flex min-w-[120px] items-center justify-center px-4 py-2 text-sm font-medium text-destructive-foreground bg-destructive rounded-md hover:bg-destructive/90 transition-colors disabled:opacity-50"
                                >
                                    {isDeleting ? (
                                        <span className="flex items-center gap-2">
                                            <div className="w-4 h-4 rounded-full border-2 border-destructive-foreground/30 border-t-destructive-foreground animate-spin" />
                                            Deleting...
                                        </span>
                                    ) : (
                                        "Delete account"
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
