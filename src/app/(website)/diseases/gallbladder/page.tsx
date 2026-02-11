import React from "react";
import Breadcrumb from "@/components/Breadcrumb";
import EnquiryFormSide from "@/components/EnquiryFormSide";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Ayurvedic Gallbladder Stone Treatment | Natural Removal",
    description: "Avoid surgery with Ayurvedic treatment for Gallbladder Stones. Dissolve stones naturally using powerful herbal formulations.",
    alternates: {
        canonical: "/diseases/gallbladder",
    },
};

export default function GallbladderPage() {
    return (
        <main>
            <Breadcrumb title="Gallbladder Stones" />

            {/* Hero Section */}
            <div className="ayur-kidney-section" style={{ background: "#071818", padding: "60px 0 40px 0" }}>
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-7 col-md-12 mb-4 mb-lg-0">
                            <div className="text-white" style={{ maxWidth: "600px" }}>
                                <h1 style={{ fontSize: "3rem", fontWeight: 800 }}>
                                    Ayurvedic <span style={{ color: "#ffb300", fontSize: "larger" }}>Gallbladder Stones</span><br />
                                    Treatment
                                </h1>
                                <div style={{ margin: "32px 0 24px 0" }}>
                                    <span style={{ background: "#ff5722", color: "#fff", fontSize: "2.5rem", fontWeight: 700, padding: "10px 32px", borderRadius: "4px", display: "inline-block" }}>ATHARVEDA</span>
                                </div>
                                <div style={{ fontSize: "2rem", color: "#fff", fontWeight: 400 }}>100% Ayurvedic Treatment</div>
                                <div style={{ marginTop: "40px" }}>
                                    <img src="/assets/images/gall-bladder.webp" alt="Gallbladder Stones" style={{ maxWidth: "180px", display: "block" }} />
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-5 col-md-12">
                            <EnquiryFormSide disease="Gallbladder Stones" />
                        </div>
                    </div>
                </div>
            </div>

            {/* What is it */}
            <div className="ayur-kidney-info-section" style={{ background: "linear-gradient(180deg, #f8f9fa 0%, #fff 100%)", padding: "60px 0 40px 0", borderRadius: "0 0 24px 24px", marginBottom: "40px" }}>
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-7 col-md-12 mb-4 mb-lg-0">
                            <h2 style={{ fontSize: "3rem", fontWeight: 800, color: "#00423b", marginBottom: "24px" }}>
                                What Are <span style={{ color: "#ffb300", fontSize: "larger" }}>Gallbladder Stones?</span>
                            </h2>
                            <p style={{ fontSize: "1.25rem", color: "#18423b", marginBottom: "24px", maxWidth: "800px" }}>
                                Gallbladder stones, also known as cholelithiasis, are hard deposits that form inside the gallbladder. They usually form when bile contains too much cholesterol or bilirubin.
                            </p>
                        </div>
                        <div className="col-lg-5 col-md-12 text-center">
                            <div style={{ background: "#fff", borderRadius: "24px", boxShadow: "0 8px 32px rgba(0,0,0,0.08)", padding: "16px 0 0 0", display: "inline-block" }}>
                                <img src="/assets/images/gall-bladder.webp" alt="Gallbladder Stones" style={{ maxWidth: "100%", borderRadius: "16px", boxShadow: "0 4px 24px rgba(255,179,0,0.15)" }} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Causes and Symptoms */}
            <div className="ayur-kidney-treatment-info-section" style={{ background: "linear-gradient(90deg, #f8f9fa 60%, #fffbe7 100%)", padding: "60px 0 40px 0", marginBottom: "40px", borderRadius: "24px" }}>
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-5 col-md-12 mb-4 mb-lg-0 text-center">
                            <img src="/assets/images/gall-bladder.webp" alt="Gallbladder Stones" style={{ maxWidth: "340px", borderRadius: "16px", boxShadow: "0 8px 32px rgba(0,0,0,0.10)", background: "#fff", padding: "16px" }} />
                        </div>
                        <div className="col-lg-7 col-md-12">
                            <h2 style={{ fontSize: "2.8rem", fontWeight: 800, color: "#00423b", marginBottom: "18px" }}>
                                What Causes <span style={{ color: "#ffb300", fontSize: "larger" }}>Gallbladder Stones?</span>
                            </h2>
                            <ul style={{ fontSize: "1.15rem", color: "#18423b", listStyleType: "disc", paddingLeft: "24px" }}>
                                <li>Incomplete emptying of gallbladder</li>
                                <li>Excess bilirubin</li>
                                <li>High cholesterol levels in bile</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
