"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

const ReviewerProfile = () => {
    return (
        <div style={{
            background: "#f8f9fa",
            border: "1px solid #e9ecef",
            borderRadius: "12px",
            padding: "24px",
            marginTop: "40px",
            marginBottom: "40px",
            display: "flex",
            alignItems: "center",
            gap: "20px",
            flexWrap: "wrap"
        }}>
            <div style={{ flexShrink: 0 }}>
                <Image
                    src="/assets/images/admin.jpg"
                    alt="Dr. Rahul Sharma"
                    width={100}
                    height={100}
                    style={{ borderRadius: "50%", objectFit: "cover", border: "3px solid #fff", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
                />
            </div>
            <div>
                <p style={{
                    fontSize: "0.9rem",
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                    color: "#6c757d",
                    marginBottom: "4px",
                    fontWeight: 600
                }}>Medically Reviewed By</p>
                <h3 style={{ fontSize: "1.4rem", fontWeight: 700, color: "#212529", marginBottom: "4px" }}>
                    Dr. Rahul Sharma
                </h3>
                <p style={{ color: "#495057", marginBottom: "8px", fontWeight: 500 }}>
                    B.A.M.S., M.D. (Ayurveda)
                </p>
                <p style={{ fontSize: "0.95rem", color: "#6c757d", marginBottom: "12px", lineHeight: "1.5" }}>
                    Expert in Ayurvedic Nephrology and Chronic Disease Management with over 15 years of clinical experience.
                </p>
                <Link href="/about" style={{ color: "#00695c", fontWeight: 600, textDecoration: "none" }}>
                    View Full Profile &rarr;
                </Link>
            </div>
        </div>
    );
};

export default ReviewerProfile;
