"use client";

import { useState } from "react";
import SettingsLayout from "@/components/settings/SettingsLayout";
import SettingsSidebar from "@/components/settings/SettingsSidebar";
import ProfileSettings from "@/components/settings/ProfileSettings";
import AccountSettings from "@/components/settings/AccountSettings";
import PreferencesSettings from "@/components/settings/PreferencesSettings";
import SecuritySettings from "@/components/settings/SecuritySettings";
import DangerZone from "@/components/settings/DangerZone";
import { useCurrentUser } from "@/hooks/useCurrentUser";

/**
 * Settings Page Orchestrator
 *
 * Keeps state for the currently active tab and renders
 * the corresponding component to avoid massive files.
 */
export default function SettingsPage() {
    const { user, loading } = useCurrentUser();
    const [activeTab, setActiveTab] = useState("profile");

    // Don't flash content before user loads
    if (loading) return null;

    return (
        <SettingsLayout>
            <div className="flex flex-col md:flex-row gap-10 mt-6">

                {/* Secondary Sidebar (Settings Categories) */}
                <SettingsSidebar activeTab={activeTab} onTabChange={setActiveTab} />

                {/* Dynamic Content Area */}
                <div className="flex-1 pb-16">
                    {activeTab === "profile" && <ProfileSettings user={user} />}
                    {activeTab === "account" && <AccountSettings user={user} />}
                    {activeTab === "preferences" && <PreferencesSettings />}
                    {activeTab === "security" && <SecuritySettings />}
                    {activeTab === "danger" && <DangerZone />}
                </div>

            </div>
        </SettingsLayout>
    );
}
