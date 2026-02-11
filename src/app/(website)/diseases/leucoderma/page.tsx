import React from "react";
import Breadcrumb from "@/components/Breadcrumb";
import EnquiryFormSide from "@/components/EnquiryFormSide";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Ayurvedic Leucoderma Treatment | Vitiligo & White Patches Care",
    description: "Natural Ayurvedic treatment for Leucoderma (Vitiligo). Restore skin pigmentation with herbal remedies and detox therapies.",
    alternates: {
        canonical: "/diseases/leucoderma",
    },
};

export default function LeucodermaPage() {
    return (
        <main>
            <Breadcrumb title="Leucoderma" />

            {/* Hero Section */}
            <div className="ayur-kidney-section" style={{ background: "#071818", padding: "60px 0 40px 0" }}>
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-7 col-md-12 mb-4 mb-lg-0">
                            <div className="text-white" style={{ maxWidth: "600px" }}>
                                <h1 style={{ fontSize: "3rem", fontWeight: 800 }}>
                                    Ayurvedic <span style={{ color: "#ffb300", fontSize: "larger" }}>Leucoderma</span><br />
                                    Treatment
                                </h1>
                                <div style={{ margin: "32px 0 24px 0" }}>
                                    <span style={{ background: "#ff5722", color: "#fff", fontSize: "2.5rem", fontWeight: 700, padding: "10px 32px", borderRadius: "4px", display: "inline-block" }}>ATHARVEDA</span>
                                </div>
                                <div style={{ fontSize: "2rem", color: "#fff", fontWeight: 400 }}>100% Ayurvedic Treatment</div>
                                <div style={{ marginTop: "40px" }}>
                                    <img src="/assets/images/leucoderma.webp" alt="Leucoderma" style={{ maxWidth: "180px", display: "block" }} />
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-5 col-md-12">
                            <EnquiryFormSide disease="Leucoderma" />
                        </div>
                    </div>
                </div>
            </div>

            {/* What is Leucoderma */}
            <div className="ayur-kidney-info-section" style={{ background: "linear-gradient(180deg, #f8f9fa 0%, #fff 100%)", padding: "60px 0 40px 0", borderRadius: "0 0 24px 24px", marginBottom: "40px" }}>
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-7 col-md-12 mb-4 mb-lg-0">
                            <h2 style={{ fontSize: "3rem", fontWeight: 800, color: "#00423b", marginBottom: "24px" }}>
                                What Is <span style={{ color: "#ffb300", fontSize: "larger" }}>Leucoderma?</span>
                            </h2>
                            <p style={{ fontSize: "1.25rem", color: "#18423b", marginBottom: "24px", maxWidth: "800px" }}>
                                Leucoderma is a skin condition that causes white patches due to loss of skin pigment. This happens when the melanocytes—cells responsible for making melanin—are damaged or destroyed. Melanin gives colour to your skin and hair. When these cells stop working or die, depigmentation occurs. Leucoderma and vitiligo are often used as interchangeable terms, though both refer to similar skin depigmentation issues. Ayurvedic leucoderma treatment focuses on restoring skin balance and natural pigmentation.
                            </p>
                        </div>
                        <div className="col-lg-5 col-md-12 text-center">
                            <div style={{ background: "#fff", borderRadius: "24px", boxShadow: "0 8px 32px rgba(0,0,0,0.08)", padding: "16px 0 0 0", display: "inline-block" }}>
                                <img src="/assets/images/leucoderma.webp" alt="Leucoderma" style={{ maxWidth: "100%", borderRadius: "16px", boxShadow: "0 4px 24px rgba(255,179,0,0.15)" }} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Causes */}
            <div className="ayur-kidney-treatment-info-section" style={{ background: "linear-gradient(90deg, #f8f9fa 60%, #fffbe7 100%)", padding: "60px 0 40px 0", marginBottom: "40px", borderRadius: "24px" }}>
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-5 col-md-12 mb-4 mb-lg-0 text-center">
                            <img src="/assets/images/leucoderma.webp" alt="Leucoderma" style={{ maxWidth: "340px", borderRadius: "16px", boxShadow: "0 8px 32px rgba(0,0,0,0.10)", background: "#fff", padding: "16px" }} />
                        </div>
                        <div className="col-lg-7 col-md-12">
                            <h2 style={{ fontSize: "2.8rem", fontWeight: 800, color: "#00423b", marginBottom: "18px" }}>
                                What Are The <span style={{ color: "#ffb300", fontSize: "larger" }}>Causes Of Leucoderma?</span>
                            </h2>
                            <p style={{ fontSize: "1.25rem", color: "#18423b", marginBottom: "18px" }}>
                                Leucoderma can be caused by several factors. In some people, it is triggered by autoimmune diseases such as thyroid disorders. Genetics also play a strong role—if someone in your family has had leucoderma, your chances of getting it increase.
                                <br /><br />
                                Other common causes include burns, skin injuries, psoriasis, eczema, or ulcers that damage the pigment cells. White patches may form over time due to these skin traumas.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Types and Complications */}
            <div className="ayur-mnd-types-section" style={{ background: "linear-gradient(90deg, #fffbe7 60%, #f8f9fa 100%)", padding: "60px 0 40px 0", marginBottom: "40px", borderRadius: "24px" }}>
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-7 col-md-12 mb-4 mb-lg-0">
                            <h2 style={{ fontSize: "2.5rem", fontWeight: 800, color: "#00423b", marginBottom: "18px" }}>
                                Types of <span style={{ color: "#ffb300", fontSize: "larger" }}>Leucoderma</span>
                            </h2>
                            <ul style={{ fontSize: "1.15rem", color: "#18423b", marginBottom: "18px", listStyleType: "disc", paddingLeft: "40px" }}>
                                <li>Non Segmental Vitiligo</li>
                                <li>Segmental Vitiligo</li>
                            </ul>
                            <h3 style={{ fontSize: "1.3rem", color: "#ff5722", fontWeight: 700, marginBottom: "12px" }}>Complications of Leucoderma</h3>
                            <ul style={{ fontSize: "1.05rem", color: "#18423b", marginBottom: "12px", listStyleType: "disc", paddingLeft: "24px" }}>
                                <li>Type 1 diabetes</li>
                                <li>Addison’s disease</li>
                                <li>Dermatitis</li>
                                <li>Lupus</li>
                                <li>Rheumatoid arthritis</li>
                                <li>Autoimmune thyroid problems</li>
                                <li>Pernicious (poisonous) anaemia</li>
                            </ul>
                        </div>
                        <div className="col-lg-5 col-md-12">
                            <div style={{ background: "#fff", borderRadius: "16px", boxShadow: "0 8px 32px rgba(0,0,0,0.08)", padding: "28px 24px", marginBottom: "24px" }}>
                                <h3 style={{ fontSize: "1.3rem", color: "#ff5722", fontWeight: 700, marginBottom: "12px" }}>Signs And Symptoms</h3>
                                <ul style={{ fontSize: "1.05rem", color: "#18423b", marginBottom: "12px", listStyleType: "disc", paddingLeft: "24px" }}>
                                    <li>White patches or spots on the skin.</li>
                                    <li>Affected areas may itch.</li>
                                    <li>Hair loss in the affected area.</li>
                                    <li>Change in eye colour.</li>
                                    <li>Uveitis (eye inflammation).</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
