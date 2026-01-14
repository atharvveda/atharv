import React from "react";
import Breadcrumb from "@/components/Breadcrumb";
import EnquiryFormSide from "@/components/EnquiryFormSide";

export default function PanchakarmaPage() {
    return (
        <main>
            <Breadcrumb title="Panchakarma" />

            {/* Hero Section */}
            <div className="ayur-kidney-section" style={{ background: "#071818", padding: "60px 0 40px 0" }}>
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-7 col-md-12 mb-4 mb-lg-0">
                            <div className="text-white" style={{ maxWidth: "600px" }}>
                                <h1 style={{ fontSize: "3rem", fontWeight: 800 }}>
                                    Ayurvedic <span style={{ color: "#ffb300", fontSize: "larger" }}>Panchakarma</span><br />
                                    Treatment
                                </h1>
                                <div style={{ margin: "32px 0 24px 0" }}>
                                    <span style={{ background: "#ff5722", color: "#fff", fontSize: "2.5rem", fontWeight: 700, padding: "10px 32px", borderRadius: "4px", display: "inline-block" }}>ATHARVEDA</span>
                                </div>
                                <div style={{ fontSize: "2rem", color: "#fff", fontWeight: 400 }}>100% Ayurvedic Detox</div>
                                <div style={{ marginTop: "40px" }}>
                                    <img src="/assets/images/chronic-kidney.webp" alt="Panchakarma" style={{ maxWidth: "180px", display: "block" }} />
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-5 col-md-12">
                            <EnquiryFormSide disease="Panchakarma" />
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
                                What Is <span style={{ color: "#ffb300", fontSize: "larger" }}>Panchakarma?</span>
                            </h2>
                            <p style={{ fontSize: "1.25rem", color: "#18423b", marginBottom: "24px", maxWidth: "800px" }}>
                                According to Ayurvedic principles, good health depends on the balance of the three vital energies or doshas—Vata, Pitta, and Kapha. Panchakarma is a powerful detox method that helps cleanse the body from within.
                            </p>
                        </div>
                        <div className="col-lg-5 col-md-12 text-center">
                            <div style={{ background: "#fff", borderRadius: "24px", boxShadow: "0 8px 32px rgba(0,0,0,0.08)", padding: "16px 0 0 0", display: "inline-block" }}>
                                <img src="/assets/images/chronic-kidney.webp" alt="Panchakarma" style={{ maxWidth: "100%", borderRadius: "16px", boxShadow: "0 4px 24px rgba(255,179,0,0.15)" }} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Therapies */}
            <div className="ayur-mnd-types-section" style={{ background: "linear-gradient(90deg, #fffbe7 60%, #f8f9fa 100%)", padding: "60px 0 40px 0", marginBottom: "40px", borderRadius: "24px" }}>
                <div className="container">
                    <h2 style={{ fontSize: "2.5rem", fontWeight: 800, color: "#00423b", marginBottom: "18px" }}>
                        The Five <span style={{ color: "#ffb300", fontSize: "larger" }}>Actions</span>
                    </h2>
                    <div className="row">
                        <div className="col-lg-12">
                            <ol style={{ fontSize: "1.15rem", color: "#18423b" }}>
                                <li><b>Vamanam:</b> Therapeutic emesis for respiratory detox.</li>
                                <li><b>Virechanam:</b> Purgation therapy for liver and intestine cleanse.</li>
                                <li><b>Anuvasana:</b> Oil enema for colon lubrication.</li>
                                <li><b>Nasyam:</b> Nasal detox for sinus and brain function.</li>
                                <li><b>Astapana Vasti:</b> Decoction enema for deep colon cleanse.</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
