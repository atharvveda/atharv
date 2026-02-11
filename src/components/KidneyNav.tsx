"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const KidneyNav = () => {
    const pathname = usePathname();

    const links = [
        { name: "Kidney Disease Overview", path: "/diseases/kidney" },
        { name: "Chronic Kidney Disease (CKD)", path: "/chronic-kidney-disease" },
        { name: "Stages of Kidney Disease", path: "/kidney-disease-stages" },
        { name: "Ayurvedic Treatment", path: "/ayurvedic-treatment-of-kidney-diseases" },
        { name: "Herbal Remedies", path: "/herbal-treatment-of-kidney-disease" },
    ];

    return (
        <div style={{
            background: "#fff",
            borderRadius: "12px",
            padding: "24px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
            border: "1px solid #f0f0f0",
            height: "fit-content",
            position: "sticky",
            top: "100px"
        }}>
            <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#212529", marginBottom: "16px", paddingBottom: "12px", borderBottom: "2px solid #f0f0f0" }}>
                Kidney Health Topics
            </h3>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {links.map((link, index) => {
                    const isActive = pathname === link.path;
                    return (
                        <li key={index} style={{ marginBottom: "12px" }}>
                            <Link
                                href={link.path}
                                style={{
                                    textDecoration: "none",
                                    color: isActive ? "#00695c" : "#495057",
                                    fontWeight: isActive ? 700 : 500,
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "10px",
                                    transition: "all 0.2s"
                                }}
                            >
                                <span style={{
                                    width: "6px",
                                    height: "6px",
                                    borderRadius: "50%",
                                    background: isActive ? "#00695c" : "#dee2e6",
                                    display: "block"
                                }}></span>
                                {link.name}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default KidneyNav;
