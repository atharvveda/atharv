import React from "react";
import Breadcrumb from "@/components/Breadcrumb";
import EnquiryFormSide from "@/components/EnquiryFormSide";

export default function LiverCirrhosisPage() {
    return (
        <main>
            <Breadcrumb title="Liver Cirrhosis" />

            {/* Hero Section */}
            <div className="ayur-kidney-section" style={{ background: "#071818", padding: "60px 0 40px 0" }}>
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-7 col-md-12 mb-4 mb-lg-0">
                            <div className="text-white" style={{ maxWidth: "600px" }}>
                                <h1 style={{ fontSize: "3rem", fontWeight: 800 }}>
                                    Ayurvedic <span style={{ color: "#ffb300", fontSize: "larger" }}>Liver Cirrhosis</span><br />
                                    Treatment
                                </h1>
                                <div style={{ margin: "32px 0 24px 0" }}>
                                    <span style={{ background: "#ff5722", color: "#fff", fontSize: "2.5rem", fontWeight: 700, padding: "10px 32px", borderRadius: "4px", display: "inline-block" }}>ATHARVEDA</span>
                                </div>
                                <div style={{ fontSize: "2rem", color: "#fff", fontWeight: 400 }}>100% Ayurvedic Treatment</div>
                                <div style={{ marginTop: "40px" }}>
                                    <img src="/assets/images/liver-cirrhosis.jpg" alt="Liver Cirrhosis" style={{ maxWidth: "180px", display: "block" }} />
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-5 col-md-12">
                            <EnquiryFormSide disease="Liver Cirrhosis" />
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
                                What Is <span style={{ color: "#ffb300", fontSize: "larger" }}>Liver Cirrhosis?</span>
                            </h2>
                            <p style={{ fontSize: "1.25rem", color: "#18423b", marginBottom: "24px", maxWidth: "800px" }}>
                                <b>Liver cirrhosis</b> is a serious condition where healthy liver tissue is replaced by scar tissue, reducing the liver’s ability to function properly. Ayurvedic treatment for liver cirrhosis uses natural herbs, detox therapies, and lifestyle changes to help heal and restore liver health.
                            </p>
                        </div>
                        <div className="col-lg-5 col-md-12 text-center">
                            <div style={{ background: "#fff", borderRadius: "24px", boxShadow: "0 8px 32px rgba(0,0,0,0.08)", padding: "16px 0 0 0", display: "inline-block" }}>
                                <img src="/assets/images/liver-cirrhosis.jpg" alt="Liver Cirrhosis" style={{ maxWidth: "100%", borderRadius: "16px", boxShadow: "0 4px 24px rgba(255,179,0,0.15)" }} />
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
                            <img src="/assets/images/liver-cirrhosis.jpg" alt="Liver Cirrhosis" style={{ maxWidth: "340px", borderRadius: "16px", boxShadow: "0 8px 32px rgba(0,0,0,0.10)", background: "#fff", padding: "16px" }} />
                        </div>
                        <div className="col-lg-7 col-md-12">
                            <h2 style={{ fontSize: "2.8rem", fontWeight: 800, color: "#00423b", marginBottom: "18px" }}>
                                What Causes <span style={{ color: "#ffb300", fontSize: "larger" }}>Liver Cirrhosis?</span>
                            </h2>
                            <ul style={{ fontSize: "1.15rem", color: "#18423b", listStyleType: "disc", paddingLeft: "24px" }}>
                                <li>Long-term alcohol abuse</li>
                                <li>Hepatitis B and C infections</li>
                                <li>Fatty liver disease</li>
                                <li>Inherited diseases</li>
                                <li>Exposure to toxins</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
