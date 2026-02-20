"use client";

import Link from "next/link";
import { SignIn, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";

export default function DoctorLoginPage() {
    const { isSignedIn, user, isLoaded } = useUser();
    const router = useRouter();
    const [redirecting, setRedirecting] = useState(false);

    useEffect(() => {
        if (isLoaded && isSignedIn) {
            setRedirecting(true);
            const role = user?.publicMetadata?.role as string | undefined;
            // For doctors, we expect the 'admin' role to be set by an administrator 
            // but we allow them to reach the dashboard if metadata is pending.
            if (!role || role === "admin") {
                const target = "/doctor/dashboard";
                setTimeout(() => router.push(target), 500);
            } else if (role === "patient") {
                router.push("/patient/dashboard");
            }
        }
    }, [isLoaded, isSignedIn, user, router]);

    if (!isLoaded || redirecting) {
        return (
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', gap: 2 }}>
                <CircularProgress color="primary" />
                <Typography variant="body1" color="text.secondary">
                    {redirecting ? "Redirecting to your dashboard..." : "Loading authentication..."}
                </Typography>
            </Box>
        );
    }

    return (
        <section className="login-page-section">
            <div className="login-page-container">
                <Link href="/login" className="login-page-back">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m15 18-6-6 6-6" />
                    </svg>
                    Back to role selection
                </Link>

                <div className="login-page-header">
                    <h1>Doctor Login</h1>
                    <p>Sign in to access your doctor dashboard</p>
                </div>

                <div className="login-clerk-wrapper">
                    <SignIn
                        routing="hash"
                        fallbackRedirectUrl="/doctor/dashboard"
                        appearance={{
                            elements: {
                                rootBox: { width: "100%" },
                                card: {
                                    boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
                                    borderRadius: "16px",
                                },
                            },
                        }}
                    />
                </div>
            </div>
        </section>
    );
}
