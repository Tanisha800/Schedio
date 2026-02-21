"use client";

import { useState } from "react";
import SettingsHeader from "./SettingsHeader";
import { Camera, Input } from "lucide-react";

/**
 * ProfileSettings
 *
 * Displays forms to manage personal user information.
 *
 * Props:
 *   user - The currently authenticated user object
 */
export default function ProfileSettings({ user }) {
    const [name, setName] = useState(user?.name || "");
    const [email, setEmail] = useState(user?.email || "");
    const [saving, setSaving] = useState(false);

    // Future expansion: avatar URL & bio
    const [bio, setBio] = useState("");

    const handleSave = async (e) => {
        e.preventDefault();
        setSaving(true);
        // Simulate API call
        setTimeout(() => setSaving(false), 800);
    };

    return (
        <div className="max-w-2xl">
            <SettingsHeader
                title="Profile"
                description="Manage your public profile and personal details."
            />

            <form onSubmit={handleSave} className="space-y-8">
                {/* Avatar Section */}
                <div>
                    <h3 className="text-sm font-medium text-foreground mb-4">Avatar</h3>
                    <div className="flex items-center gap-5">
                        <div className="relative w-20 h-20 rounded-full bg-accent flex items-center justify-center border border-border group overflow-hidden">
                            <span className="text-2xl font-medium text-foreground">
                                {user?.name?.charAt(0).toUpperCase() || "U"}
                            </span>

                            <label className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                                <Camera className="w-6 h-6 text-white" />
                                <input type="file" className="hidden" accept="image/*" />
                            </label>
                        </div>
                        <div className="text-sm">
                            <button type="button" className="text-foreground font-medium hover:underline">
                                Upload new picture
                            </button>
                            <p className="text-muted-foreground mt-1 text-xs">
                                JPG, GIF or PNG. 1MB max.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Personal Information */}
                <div className="space-y-4">
                    <div className="grid gap-2">
                        <label htmlFor="name" className="text-sm font-medium text-foreground">
                            Full Name
                        </label>
                        <input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
                            placeholder="Your name"
                        />
                    </div>

                    <div className="grid gap-2">
                        <label htmlFor="email" className="text-sm font-medium text-foreground">
                            Email Address
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            disabled
                            className="flex h-10 w-full rounded-md border border-input bg-muted px-3 py-2 text-sm ring-offset-background disabled:cursor-not-allowed disabled:opacity-50"
                            placeholder="Your email"
                        />
                        <p className="text-[13px] text-muted-foreground">
                            Your email address is used to login and receive booking notifications.
                        </p>
                    </div>

                    <div className="grid gap-2">
                        <label htmlFor="bio" className="text-sm font-medium text-foreground">
                            Bio
                        </label>
                        <textarea
                            id="bio"
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                            className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
                            placeholder="Tell people a little about yourself"
                        />
                    </div>
                </div>

                <div className="flex justify-end pt-4 border-t border-border">
                    <button
                        type="submit"
                        disabled={saving}
                        className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 min-w-[120px]"
                    >
                        {saving ? (
                            <span className="flex items-center gap-2">
                                <div className="w-4 h-4 rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground animate-spin" />
                                Saving...
                            </span>
                        ) : (
                            "Save changes"
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}
