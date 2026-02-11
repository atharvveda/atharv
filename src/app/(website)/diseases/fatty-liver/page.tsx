import React from "react";
import Breadcrumb from "@/components/Breadcrumb";
import EnquiryFormSide from "@/components/EnquiryFormSide";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Ayurvedic Fatty Liver Treatment | Reverse NAFLD Naturally",
    description: "Natural Ayurvedic treatment for Fatty Liver Disease (Hepatic Steatosis). Detoxify and rejuvenate your liver with herbal care.",
    alternates: {
        canonical: "/diseases/fatty-liver",
    },
};

export default function FattyLiverPage() {
    return (
        <main>
            <Breadcrumb title="Fatty Liver Disease" />

            {/* Hero Section */}
            <div className="ayur-kidney-section" style={{ background: "#071818", padding: "60px 0 40px 0" }}>
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-7 col-md-12 mb-4 mb-lg-0">
                            <div className="text-white" style={{ maxWidth: "600px" }}>
                                <h1 style={{ fontSize: "3rem", fontWeight: 800 }}>
                                    Ayurvedic <span style={{ color: "#ffb300", fontSize: "larger" }}>Fatty Liver Disease</span><br />
                                    Treatment
                                </h1>
                                <div style={{ margin: "32px 0 24px 0" }}>
                                    <span style={{ background: "#ff5722", color: "#fff", fontSize: "2.5rem", fontWeight: 700, padding: "10px 32px", borderRadius: "4px", display: "inline-block" }}>ATHARVEDA</span>
                                </div>
                                <div style={{ fontSize: "2rem", color: "#fff", fontWeight: 400 }}>100% Ayurvedic Treatment</div>
                                <div style={{ marginTop: "40px" }}>
                                    <img src="/assets/images/fatty-liver.webp" alt="Fatty Liver" style={{ maxWidth: "180px", display: "block" }} />
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-5 col-md-12">
                            <EnquiryFormSide disease="Fatty Liver Disease" />
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
                                What Is <span style={{ color: "#ffb300", fontSize: "larger" }}>Fatty Liver Disease?</span>
                            </h2>
                            <p style={{ fontSize: "1.25rem", color: "#18423b", marginBottom: "24px", maxWidth: "800px" }}>
                                <b>Fatty liver disease</b>, also known as hepatic steatosis, occurs when excess fat accumulates in the liver cells. While a small amount of fat in the liver is normal, excessive fat can lead to inflammation and liver damage. Other names include NAFLD and AFLD.
                            </p>
                            <button className="btn" style={{ background: "#00423b", color: "#fff", fontSize: "1rem", fontWeight: 500, padding: "10px 32px", borderRadius: "32px" }}>Book Consultation</button>
                        </div>
                        <div className="col-lg-5 col-md-12 text-center">
                            <div style={{ background: "#fff", borderRadius: "24px", boxShadow: "0 8px 32px rgba(0,0,0,0.08)", padding: "16px 0 0 0", display: "inline-block" }}>
                                <img src="/assets/images/fatty-liver.webp" alt="Fatty Liver" style={{ maxWidth: "100%", borderRadius: "16px", boxShadow: "0 4px 24px rgba(255,179,0,0.15)" }} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Types and Approach */}
            <div className="ayur-mnd-types-section" style={{ background: "linear-gradient(90deg, #fffbe7 60%, #f8f9fa 100%)", padding: "60px 0 40px 0", marginBottom: "40px", borderRadius: "24px" }}>
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-7 col-md-12 mb-4 mb-lg-0">
                            <h2 style={{ fontSize: "2.5rem", fontWeight: 800, color: "#00423b", marginBottom: "18px" }}>
                                Ayurvedic <span style={{ color: "#ffb300", fontSize: "larger" }}>Treatment Approach</span>
                            </h2>
                            <ul style={{ fontSize: "1.15rem", color: "#18423b", marginBottom: "18px", listStyleType: "disc", paddingLeft: "24px" }}>
                                <li><b>Herbal Remedies:</b> Bhumi Amla, Giloy, etc.</li>
                                <li><b>Panchakarma:</b> Specialized detox treatments.</li>
                                <li><b>Dietary Guidance:</b> Antioxidant-rich foods.</li>
                                <li><b>Lifestyle Changes:</b> Physical activity and stress management.</li>
                            </ul>
                        </div>
                        <div className="col-lg-5 col-md-12">
                            <div style={{ background: "#fff", borderRadius: "16px", boxShadow: "0 8px 32px rgba(0,0,0,0.08)", padding: "28px 24px" }}>
                                <h3 style={{ fontSize: "1.3rem", color: "#ff5722", fontWeight: 700, marginBottom: "12px" }}>Types</h3>
                                <ul style={{ fontSize: "1.05rem", color: "#18423b", marginBottom: "0", listStyleType: "disc", paddingLeft: "24px" }}>
                                    <li>Non-Alcoholic (NAFLD)</li>
                                    <li>Alcoholic (AFLD)</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
