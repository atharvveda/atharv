"use client";
import React from "react";

const ReferencesSection = () => {
    return (
        <div style={{
            marginTop: "60px",
            paddingTop: "30px",
            borderTop: "1px solid #dee2e6",
            fontSize: "0.9rem",
            color: "#6c757d"
        }}>
            <h4 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#343a40", marginBottom: "16px" }}>
                References & Medical Citations
            </h4>
            <ol style={{ paddingLeft: "20px" }}>
                <li style={{ marginBottom: "8px" }}>
                    National Institute of Diabetes and Digestive and Kidney Diseases (NIDDK). "Chronic Kidney Disease Tests & Diagnosis." Available at: <a href="https://www.niddk.nih.gov/health-information/kidney-disease" target="_blank" rel="nofollow noopener noreferrer" style={{ color: "#00695c" }}>https://www.niddk.nih.gov</a>
                </li>
                <li style={{ marginBottom: "8px" }}>
                    National Kidney Foundation. "Stages of Chronic Kidney Disease (CKD)." Available at: <a href="https://www.kidney.org/atoz/content/gfr" target="_blank" rel="nofollow noopener noreferrer" style={{ color: "#00695c" }}>https://www.kidney.org</a>
                </li>
                <li style={{ marginBottom: "8px" }}>
                    Centers for Disease Control and Prevention (CDC). "Chronic Kidney Disease in the United States." Available at: <a href="https://www.cdc.gov/kidneydisease/index.html" target="_blank" rel="nofollow noopener noreferrer" style={{ color: "#00695c" }}>https://www.cdc.gov</a>
                </li>
                <li style={{ marginBottom: "8px" }}>
                    PubMed. "Integrative Medicine and the Kidney." Available at: <a href="https://pubmed.ncbi.nlm.nih.gov/" target="_blank" rel="nofollow noopener noreferrer" style={{ color: "#00695c" }}>https://pubmed.ncbi.nlm.nih.gov</a>
                </li>
            </ol>
            <p style={{ marginTop: "20px", fontStyle: "italic", fontSize: "0.85rem" }}>
                Disclaimer: This content is for informational purposes only and does not constitute medical advice. Always consult with a qualified healthcare provider for diagnosis and treatment.
            </p>
        </div>
    );
};

export default ReferencesSection;
