"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

/**
 * ThemeToggle
 *
 * A single button that switches between light and dark themes.
 * Uses a `mounted` guard to prevent a hydration mismatch —
 * next-themes can't know the theme on the server, so we render
 * a placeholder icon until the client has mounted.
 */
export default function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    // Placeholder button (avoids hydration flash)
    if (!mounted) {
        return (
            <button className="p-2 hover:bg-accent rounded-lg transition-colors">
                <Sun className="w-5 h-5 text-muted-foreground" />
            </button>
        );
    }

    return (
        <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 hover:bg-accent rounded-lg transition-colors"
            title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
        >
            {theme === "dark"
                ? <Sun className="w-5 h-5 text-muted-foreground" />
                : <Moon className="w-5 h-5 text-muted-foreground" />
            }
        </button>
    );
}
