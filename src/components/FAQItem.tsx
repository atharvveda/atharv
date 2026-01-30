"use client";

import React, { useState } from "react";

interface FAQItemProps {
    faq: {
        question: string;
        answer: string;
    };
    index: number;
}

export default function FAQItem({ faq, index }: FAQItemProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="card" style={{ border: "none", marginBottom: "16px", boxShadow: "0 4px 12px rgba(0,0,0,0.05)", borderRadius: "12px" }}>
            <div className="card-header" id={`heading${index}`} style={{ background: "#fff", borderBottom: "none", padding: "0" }}>
                <h3 className="mb-0">
                    <button
                        className="btn btn-link btn-block text-left"
                        onClick={() => setIsOpen(!isOpen)}
                        aria-expanded={isOpen}
                        style={{ width: "100%", textAlign: "left", padding: "20px", color: "#00423b", fontWeight: 700, textDecoration: "none", display: "flex", justifyContent: "space-between", alignItems: "center" }}
                    >
                        {faq.question}
                        <span style={{ fontSize: "1.5rem", color: "#ffb300", transform: isOpen ? "rotate(45deg)" : "rotate(0)", transition: "transform 0.3s" }}>+</span>
                    </button>
                </h3>
            </div>
            {isOpen && (
                <div style={{ padding: "0 20px 20px 20px", color: "#555" }}>
                    {faq.answer}
                </div>
            )}
        </div>
    );
}
