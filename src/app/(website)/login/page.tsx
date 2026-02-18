import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Login | Atharv Veda",
    description: "Login as a Doctor or Patient to access your Atharv Veda dashboard.",
    robots: {
        index: false,
        follow: false,
    },
};

export default function LoginRoleSelectionPage() {
    return (
        <section className="login-role-section">
            <div className="login-role-container">
                <div className="login-role-header">
                    <h1>Welcome Back</h1>
                    <p>Please select your role to continue to the appropriate portal</p>
                </div>

                <div className="login-role-cards">
                    {/* Doctor Card */}
                    <Link href="/login/doctor" className="login-role-card doctor-card">
                        <div className="login-role-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M3 9a2 2 0 0 1 2-2h1a2 2 0 0 0 2-2V4a2 2 0 0 1 4 0v1a2 2 0 0 0 2 2h1a2 2 0 0 1 2 2v1a2 2 0 0 0 2 2h1" />
                                <path d="M12 11v4" />
                                <path d="M10 13h4" />
                                <circle cx="12" cy="7" r="1" />
                                <path d="M9 20H6a2 2 0 0 1-2-2v-3" />
                                <path d="M15 20h3a2 2 0 0 0 2-2v-3" />
                                <path d="M12 15a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" />
                            </svg>
                        </div>
                        <h2>I&apos;m a Doctor</h2>
                        <p>Access your dashboard to manage patients, view records, and provide consultations</p>
                        <span className="card-action">
                            Doctor Login
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M5 12h14" />
                                <path d="m12 5 7 7-7 7" />
                            </svg>
                        </span>
                    </Link>

                    {/* Patient Card */}
                    <Link href="/login/patient" className="login-role-card patient-card">
                        <div className="login-role-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                <circle cx="12" cy="7" r="4" />
                            </svg>
                        </div>
                        <h2>I&apos;m a Patient</h2>
                        <p>Sign in or create an account to view your treatment plans, diet charts, and consultations</p>
                        <span className="card-action">
                            Patient Login / Sign Up
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M5 12h14" />
                                <path d="m12 5 7 7-7 7" />
                            </svg>
                        </span>
                    </Link>
                </div>
            </div>
        </section>
    );
}
