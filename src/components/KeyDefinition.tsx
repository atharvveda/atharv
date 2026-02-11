"use client";
import React from "react";

interface KeyDefinitionProps {
    term: string;
    definition: string;
}

const KeyDefinition: React.FC<KeyDefinitionProps> = ({ term, definition }) => {
    return (
        <div
            style={{
                background: "#e8f5e9", // Light green background
                borderLeft: "4px solid #2e7d32", // Dark green border
                padding: "20px",
                borderRadius: "4px",
                marginBottom: "30px",
                marginTop: "20px",
            }}
        >
            <h2 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#1b5e20", marginTop: 0 }}>
                What is {term}?
            </h2>
            <p style={{ fontSize: "1.1rem", color: "#333", margin: 0, lineHeight: "1.6" }}>
                {definition}
            </p>
        </div>
    );
};

export default KeyDefinition;
