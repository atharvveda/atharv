import React from "react";
import Breadcrumb from "@/components/Breadcrumb";
import EnquiryFormSide from "@/components/EnquiryFormSide";

export default function EczemaPage() {
    return (
        <main>
            <Breadcrumb title="Eczema" />

            {/* Hero Section */}
            <div className="ayur-kidney-section" style={{ background: "#071818", padding: "60px 0 40px 0" }}>
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-7 col-md-12 mb-4 mb-lg-0">
                            <div className="text-white" style={{ maxWidth: "600px" }}>
                                <h1 style={{ fontSize: "3rem", fontWeight: 800 }}>
                                    Ayurvedic <span style={{ color: "#ffb300", fontSize: "larger" }}>Eczema</span><br />
                                    Treatment
                                </h1>
                                <div style={{ margin: "32px 0 24px 0" }}>
                                    <span style={{ background: "#ff5722", color: "#fff", fontSize: "2.5rem", fontWeight: 700, padding: "10px 32px", borderRadius: "4px", display: "inline-block" }}>ATHARVEDA</span>
                                </div>
                                <div style={{ fontSize: "2rem", color: "#fff", fontWeight: 400 }}>100% Ayurvedic Treatment</div>
                                <div style={{ marginTop: "40px" }}>
                                    <img src="/assets/images/liver-cirrhosis.webp" alt="Eczema" style={{ maxWidth: "180px", display: "block" }} />
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-5 col-md-12">
                            <EnquiryFormSide disease="Eczema" />
                        </div>
                    </div>
                </div>
            </div>

            {/* What is it */}
            <div className="ayur-kidney-info-section" style={{ background: "linear-gradient(180deg, #f8f9fa 0%, #fff 100%)", padding: "60px 0 40px 0", borderRadius: "0 0 24px 24px", marginBottom: "40px" }}>
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-7 col-md-12 mb-4 mb-lg-0">
                            <h2 style={{ fontSize: "2.5rem", fontWeight: 800, color: "#00423b", marginBottom: "24px" }}>
                                What Is <span style={{ color: "#ffb300", fontSize: "larger" }}>Eczema?</span>
                            </h2>
                            <p style={{ fontSize: "1.25rem", color: "#18423b", marginBottom: "24px", maxWidth: "800px" }}>
                                Eczema is a group of inflammatory skin conditions that lead to itching, dryness, redness, and rashes. It is not contagious and often worsens with allergens or irritants.
                            </p>
                        </div>
                        <div className="col-lg-5 col-md-12 text-center">
                            <div style={{ background: "#fff", borderRadius: "24px", boxShadow: "0 8px 32px rgba(0,0,0,0.08)", padding: "16px 0 0 0", display: "inline-block" }}>
                                <img src="/assets/images/eczema.jpg" alt="Eczema" style={{ maxWidth: "100%", borderRadius: "16px", boxShadow: "0 4px 24px rgba(255,179,0,0.15)" }} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Types and Symptoms */}
            <div className="container" style={{ marginBottom: "40px" }}>
                <div className="row">
                    <div className="col-lg-6 mb-4">
                        <div style={{ background: "#f8f9fa", borderRadius: "24px", padding: "40px", height: "100%", border: "1px solid #eee" }}>
                            <h2 style={{ fontSize: "2rem", fontWeight: 800, color: "#00423b", marginBottom: "24px" }}>Types</h2>
                            <ul style={{ fontSize: "1.1rem", color: "#18423b", listStyleType: "disc", paddingLeft: "24px" }}>
                                <li>Dyshidrotic Eczema</li>
                                <li>Neurodermatitis</li>
                                <li>Nummular Eczema</li>
                                <li>Atopic Dermatitis</li>
                                <li>Contact Dermatitis</li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-lg-6 mb-4">
                        <div style={{ background: "#fffbe7", borderRadius: "24px", padding: "40px", height: "100%", border: "1px solid #eee" }}>
                            <h2 style={{ fontSize: "2rem", fontWeight: 800, color: "#00423b", marginBottom: "24px" }}>Symptoms</h2>
                            <ul style={{ fontSize: "1.1rem", color: "#18423b", listStyleType: "disc", paddingLeft: "24px" }}>
                                <li>Raised bumps</li>
                                <li>Crusting or oozing</li>
                                <li>Thickened patches</li>
                                <li>Persistent itchiness</li>
                                <li>Dry, cracked skin</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
