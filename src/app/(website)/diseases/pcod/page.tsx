import React from "react";
import Breadcrumb from "@/components/Breadcrumb";
import EnquiryFormSide from "@/components/EnquiryFormSide";

export default function PCODPage() {
    return (
        <main>
            <Breadcrumb title="PCOD" />

            {/* Hero Section */}
            <div className="ayur-kidney-section" style={{ background: "#071818", padding: "60px 0 40px 0" }}>
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-7 col-md-12 mb-4 mb-lg-0">
                            <div className="text-white" style={{ maxWidth: "600px" }}>
                                <h1 style={{ fontSize: "3rem", fontWeight: 800 }}>
                                    Ayurvedic <span style={{ color: "#ffb300", fontSize: "larger" }}>PCOD</span><br />
                                    Treatment
                                </h1>
                                <div style={{ margin: "32px 0 24px 0" }}>
                                    <span style={{ background: "#ff5722", color: "#fff", fontSize: "2.5rem", fontWeight: 700, padding: "10px 32px", borderRadius: "4px", display: "inline-block" }}>ATHARVEDA</span>
                                </div>
                                <div style={{ fontSize: "2rem", color: "#fff", fontWeight: 400 }}>100% Ayurvedic Treatment</div>
                                <div style={{ marginTop: "40px" }}>
                                    <img src="/assets/images/pcod.webp" alt="PCOD" style={{ maxWidth: "180px", display: "block" }} />
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-5 col-md-12">
                            <EnquiryFormSide disease="PCOD" />
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
                                What Is <span style={{ color: "#ffb300", fontSize: "larger" }}>PCOD?</span>
                            </h2>
                            <p style={{ fontSize: "1.25rem", color: "#18423b", marginBottom: "24px", maxWidth: "800px" }}>
                                <b>Polycystic Ovary Disease (PCOD)</b> is a common hormonal disorder affecting women of reproductive age. It occurs when the ovaries produce an excess of androgens, leading to irregular ovulation and cysts.
                            </p>
                            <button className="btn" style={{ background: "#00423b", color: "#fff", fontSize: "1rem", fontWeight: 500, padding: "10px 32px", borderRadius: "32px" }}>Book Consultation</button>
                        </div>
                        <div className="col-lg-5 col-md-12 text-center">
                            <div style={{ background: "#fff", borderRadius: "24px", boxShadow: "0 8px 32px rgba(0,0,0,0.08)", padding: "16px 0 0 0", display: "inline-block" }}>
                                <img src="/assets/images/pcod.webp" alt="PCOD" style={{ maxWidth: "100%", borderRadius: "16px", boxShadow: "0 4px 24px rgba(255,179,0,0.15)" }} />
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
                                <li><b>Herbal Formulations:</b> Ashwagandha, Shatavari, etc.</li>
                                <li><b>Panchakarma:</b> Detoxification of the reproductive system.</li>
                                <li><b>Dietary:</b> Vata and Kapha balancing.</li>
                                <li><b>Lifestyle:</b> Exercise and stress management.</li>
                            </ul>
                        </div>
                        <div className="col-lg-5 col-md-12">
                            <div style={{ background: "#fff", borderRadius: "16px", boxShadow: "0 8px 32px rgba(0,0,0,0.08)", padding: "28px 24px" }}>
                                <h3 style={{ fontSize: "1.3rem", color: "#ff5722", fontWeight: 700, marginBottom: "12px" }}>Types</h3>
                                <ul style={{ fontSize: "1.05rem", color: "#18423b", marginBottom: "0", listStyleType: "disc", paddingLeft: "24px" }}>
                                    <li>Insulin-Resistant</li>
                                    <li>Inflammatory</li>
                                    <li>Adrenal</li>
                                    <li>Post-Pill</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
