"use client";
import React from "react";

interface QuickFactProps {
    facts: { icon: string; text: string }[];
}

const QuickFacts: React.FC<QuickFactProps> = ({ facts }) => {
    return (
        <div style={{
            background: "#fff3cd",
            border: "1px solid #ffeeba",
            borderRadius: "8px",
            padding: "20px",
            marginBottom: "30px",
            marginTop: "20px"
        }}>
            <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#856404", marginTop: 0, marginBottom: "15px", display: "flex", alignItems: "center", gap: "10px" }}>
                <span>⚡</span> Quick Facts
            </h3>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {facts.map((fact, index) => (
                    <li key={index} style={{ marginBottom: "10px", display: "flex", alignItems: "flex-start", gap: "10px", fontSize: "1rem", color: "#333" }}>
                        <span style={{ fontSize: "1.2rem", lineHeight: "1" }}>{fact.icon}</span>
                        <span>{fact.text}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default QuickFacts;
