import React from "react";
import { Metadata } from "next";
import Breadcrumb from "@/components/Breadcrumb";
import EnquiryFormSide from "@/components/EnquiryFormSide";

export const generateMetadata = (): Metadata => {
    return {
        title: "Ayurvedic Cancer Care & Support | Natural Healing @ Atharv Veda",
        description: "Holistic Ayurvedic support for various types of cancer. Natural therapies using authentic herbs to improve quality of life and support your healing journey.",
        keywords: ["Ayurvedic Cancer Treatment", "Natural Cancer Support", "Holistic Cancer Care", "Ayurvedic Herbs for Cancer", "Atharv Veda Cancer Treatment"],
        alternates: {
            canonical: "/diseases/cancer",
        },
    };
};

export default function CancerPage() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "MedicalCondition",
        "name": "Cancer",
        "description": "A group of diseases involving abnormal cell growth with the potential to invade or spread to other parts of the body.",
        "possibleTreatment": [
            {
                "@type": "MedicalTherapy",
                "name": "Ayurvedic Cancer Support",
                "description": "Integrative Ayurvedic support focused on detoxification and strengthening the immune system."
            }
        ],
        "relevantSpecialty": {
            "@type": "MedicalSpecialty",
            "name": "Oncology"
        }
    };

    const cancerTypes = [
        "Blood Cancer", "Breast Cancer", "Lung Cancer", "Cervical Cancer", "Prostate Cancer",
        "Liver Cancer", "Colon Cancer", "Skin Cancer", "Bone Cancer", "Brain Tumor",
        "Oral Cancer", "Ovarian Cancer", "Pancreatic Cancer", "Kidney Cancer", "Stomach Cancer",
        "Testicular Cancer", "Thyroid Cancer", "Uterine Cancer", "Bladder Cancer", "Esophageal Cancer",
        "Gallbladder Cancer", "Leukemia", "Lymphoma", "Melanoma"
    ];

    return (
        <main>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <Breadcrumb title="Cancer Treatment" />

            {/* Hero Section */}
            <div className="ayur-kidney-section" style={{ background: "#071818", padding: "60px 0 40px 0" }}>
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-7 col-md-12 mb-4 mb-lg-0">
                            <div className="text-white" style={{ maxWidth: "600px" }}>
                                <h1 style={{ fontSize: "3rem", fontWeight: 800 }}>
                                    Natural <span style={{ color: "#ffb300", fontSize: "larger" }}>Cancer Care</span><br />
                                    Ayurvedic Perspective
                                </h1>
                                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "10px", background: "rgba(255,179,0,0.1)", padding: "8px 16px", borderRadius: "32px", width: "fit-content" }}>
                                    <img src="/assets/images/checkmark.png" alt="verified" style={{ width: "16px" }} />
                                    <span style={{ fontSize: "0.9rem", color: "#ffb300", fontWeight: 600 }}>Medically Reviewed by Dr. Rahul Sharma (B.A.M.S., M.D.)</span>
                                </div>
                                <div style={{ margin: "32px 0 24px 0" }}>
                                    <span style={{ background: "#ff5722", color: "#fff", fontSize: "2.5rem", fontWeight: 700, padding: "10px 32px", borderRadius: "4px", display: "inline-block" }}>ATHARVEDA</span>
                                </div>
                                <div style={{ fontSize: "2rem", color: "#fff", fontWeight: 400 }}>Holistic & Supportive Cancer Healing</div>
                                <div style={{ marginTop: "40px" }}>
                                    <img src="/assets/images/blog-single.png" alt="Ayurvedic Cancer Care - Atharv Veda" style={{ maxWidth: "180px", display: "block" }} />
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-5 col-md-12">
                            <EnquiryFormSide disease="Cancer" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Info Section */}
            <div className="ayur-kidney-info-section" style={{ background: "linear-gradient(180deg, #f8f9fa 0%, #fff 100%)", padding: "60px 0 40px 0", borderRadius: "0 0 24px 24px", marginBottom: "40px" }}>
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-7 col-md-12 mb-4 mb-lg-0">
                            <h2 style={{ fontSize: "2.5rem", fontWeight: 800, color: "#00423b", marginBottom: "24px" }}>
                                What is <span style={{ color: "#ffb300", fontSize: "larger" }}>Cancer?</span>
                            </h2>
                            <p style={{ fontSize: "1.25rem", color: "#18423b", marginBottom: "24px", maxWidth: "800px" }}>
                                Cancer is a life-threatening disease that starts when abnormal cells grow uncontrollably in any
                                part of the body. These cells invade surrounding tissues and can spread to other areas,
                                disrupting vital bodily functions...
                            </p>
                        </div>
                        <div className="col-lg-5 col-md-12 text-center">
                            <div style={{ background: "#fff", borderRadius: "24px", boxShadow: "0 8px 32px rgba(0,0,0,0.08)", padding: "16px 0 0 0", display: "inline-block" }}>
                                <img src="/assets/images/blog-single.png" alt="Cancer" style={{ maxWidth: "100%", borderRadius: "16px", boxShadow: "0 4px 24px rgba(255,179,0,0.15)" }} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Types Section */}
            <div className="ayur-kidney-treatments-section" style={{ background: "linear-gradient(180deg, #f8f9fa 0%, #fff 100%)", padding: "60px 0 40px 0", borderRadius: "0 0 24px 24px", marginBottom: "40px" }}>
                <div className="container">
                    <h2 style={{ fontSize: "2.5rem", fontWeight: 800, color: "#00423b", marginBottom: "32px", textAlign: "center" }}>
                        Types of <span style={{ color: "#ffb300", fontSize: "larger" }}>Cancer We Treat</span>
                    </h2>
                    <div className="treatments-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "24px" }}>
                        {cancerTypes.map((type, i) => (
                            <div className="treatment-box" key={i}>
                                <span>{type}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
        .treatments-grid .treatment-box {
          background: #0b3c3c;
          border-radius: 16px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
          padding: 32px 16px 24px 16px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          color: #ffe0a3;
          font-weight: 700;
          font-size: 1.25rem;
          text-decoration: none;
          transition: background 0.3s, color 0.3s, box-shadow 0.3s;
          cursor: pointer;
          border: none;
        }
        .treatments-grid .treatment-box span {
          display: block;
          margin-top: 8px;
          font-size: 1.1rem;
          color: #ffe0a3;
          font-weight: 700;
        }
        .treatments-grid .treatment-box:hover {
          background: #ffb300;
          color: #fff;
          box-shadow: 0 8px 32px rgba(255, 179, 0, 0.25);
        }
        .treatments-grid .treatment-box:hover span {
          color: #fff;
        }
      `}} />
        </main>
    );
}
