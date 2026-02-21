"use client";

import { useState } from "react";
import { Copy, Check, Link2 } from "lucide-react";

/**
 * BookingLinkCard
 *
 * Displays the user's personal booking link with a copy-to-clipboard button.
 *
 * Props:
 *   user – { name } | null
 */
export default function BookingLinkCard({ user }) {
    const [copied, setCopied] = useState(false);
    const bookingLink = `https://schedio.app/${user?.name?.toLowerCase().replace(/\s+/g, "-") || "user"}`;

    const handleCopy = () => {
        navigator.clipboard.writeText(bookingLink);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="bg-card border border-border rounded-xl p-5">
            <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
                    <Link2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                    <h3 className="text-sm font-semibold text-foreground">Your booking link</h3>
                    <p className="text-xs text-muted-foreground">Share this link to let others schedule time with you</p>
                </div>
            </div>

            <div className="flex items-center gap-2">
                <div className="flex-1 bg-muted border border-border rounded-lg px-4 py-2.5">
                    <span className="text-sm text-foreground font-mono">{bookingLink}</span>
                </div>
                <button
                    onClick={handleCopy}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium text-sm transition-all ${copied
                        ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30"
                        : "bg-primary text-primary-foreground hover:bg-primary/90"
                        }`}
                >
                    {copied ? (
                        <>
                            <Check className="w-4 h-4" />
                            Copied
                        </>
                    ) : (
                        <>
                            <Copy className="w-4 h-4" />
                            Copy link
                        </>
                    )}
                </button>
            </div>
        </div>
    );
}
