"use client";

import Link from "next/link";
import { SignIn, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";

export default function PatientLoginPage() {
    const { isSignedIn, user, isLoaded } = useUser();
    const router = useRouter();
    const [redirecting, setRedirecting] = useState(false);

    useEffect(() => {
        if (isLoaded && isSignedIn) {
            setRedirecting(true);
            const role = user?.publicMetadata?.role as string | undefined;
            // If they are a patient OR have no role yet (auto-reg will handle it), send to dashboard
            if (!role || role === "patient") {
                const hostname = window.location.hostname;
                const isLocal = hostname === "localhost" || hostname === "127.0.0.1";
                const target = isLocal ? "/patient/dashboard" : "https://patient.atharvveda.us";

                // Small delay to ensure state is settled
                setTimeout(() => router.push(target), 500);
            } else if (role === "admin") {
                // If they are an admin trying to login as patient, send to doctor dashboard
                router.push("/doctor/dashboard");
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
                    <h1>Patient Login</h1>
                    <p>Sign in using the credentials provided by your doctor to access your health portal</p>
                </div>

                <div className="login-clerk-wrapper">
                    <SignIn
                        routing="hash"
                        fallbackRedirectUrl="/patient/dashboard"
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
