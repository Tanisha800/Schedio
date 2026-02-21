"use client";

import { User, Shield, Sliders, AlertTriangle } from "lucide-react";

const SETTINGS_TABS = [
    { id: "profile", label: "Profile", icon: User },
    { id: "preferences", label: "Preferences", icon: Sliders },
    { id: "security", label: "Security", icon: Shield },
    { id: "danger", label: "Danger Zone", icon: AlertTriangle, isDestructive: true },
];

/**
 * SettingsSidebar
 *
 * Inner sidebar for navigating between different settings categories.
 *
 * Props:
 *   activeTab  - The currently active section ID
 *   onTabChange - Callback to switch sections
 */
export default function SettingsSidebar({ activeTab, onTabChange }) {
    return (
        <nav className="flex flex-col space-y-1 md:w-64 shrink-0">
            {SETTINGS_TABS.map((tab) => {
                const isActive = activeTab === tab.id;
                const Icon = tab.icon;

                return (
                    <button
                        key={tab.id}
                        onClick={() => onTabChange(tab.id)}
                        className={`
                            flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors text-left
                            ${isActive
                                ? "bg-accent text-foreground"
                                : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                            }
                            ${tab.isDestructive && isActive ? "bg-destructive/10 text-destructive" : ""}
                            ${tab.isDestructive && !isActive ? "hover:text-destructive hover:bg-destructive/10" : ""}
                        `}
                    >
                        <Icon className={`w-4 h-4 ${tab.isDestructive && isActive ? "text-destructive" : ""}`} />
                        {tab.label}
                    </button>
                );
            })}
        </nav>
    );
}
