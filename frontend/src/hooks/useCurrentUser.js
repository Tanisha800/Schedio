"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axiosInstance from "@/lib/axiosInstance";

/**
 * useCurrentUser
 *
 * Fetches the authenticated user from /auth/me.
 * Redirects to /signup if the request fails (unauthenticated).
 *
 * Returns { user, loading }
 */
export function useCurrentUser() {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                const response = await axiosInstance.get("/auth/me");
                if (response.data.success) {
                    setUser(response.data.user);
                }
            } catch (error) {
                console.error("Failed to fetch user:", error);
                router.push("/signup");
            } finally {
                setLoading(false);
            }
        })();
    }, [router]);

    return { user, loading };
}
