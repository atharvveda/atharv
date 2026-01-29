import React from "react";
import { Metadata } from "next";
import Breadcrumb from "@/components/Breadcrumb";
import EnquiryFormSide from "@/components/EnquiryFormSide";
import MedicalDisclaimer from "@/components/MedicalDisclaimer";
import { generateMedicalWebPageSchema } from "@/lib/schema/medical-webpage";
import { generateBreadcrumbSchema } from "@/lib/schema/breadcrumb";

export const generateMetadata = (): Metadata => {
    return {
        title: "Best Ayurvedic Kidney Treatment | Natural CKD Healing by Atharv Veda",
        description: "Start your journey to better kidney health with authentic Ayurvedic treatments. Effective solutions for CKD, Nephrotic Syndrome, and High Creatinine without dialysis.",
        keywords: ["Kidney Treatment Ayurveda", "Ayurvedic Medicine for Kidney Failure", "CKD Treatment", "Natural Kidney Healing", "Avoid Dialysis Ayurveda"],
        alternates: {
            canonical: "https://atharvveda.us/diseases/kidney",
        },
        openGraph: {
            title: "Best Ayurvedic Kidney Treatment | Atharv Veda",
            description: "Natural, holistic kidney disease treatment using Ayurveda.",
            url: "https://atharvveda.us/diseases/kidney",
            type: "website",
            images: [
                {
                    url: "https://atharvveda.us/assets/images/chronic-kidney.webp",
                    width: 1200,
                    height: 630,
                },
            ],
        },
    };
};

export default function KidneyPage() {
    const medicalWebPageSchema = generateMedicalWebPageSchema({
        title: "Ayurvedic Kidney Treatment",
        description: "Comprehensive Ayurvedic treatment for chronic kidney disease and related conditions.",
        url: "https://atharvveda.us/diseases/kidney",
        datePublished: "2024-01-01",
        dateModified: "2026-01-29",
        conditionName: "Kidney Disease",
        conditionDescription: "A condition in which the kidneys are damaged and cannot filter blood as well as they should.",
        reviewerName: "Dr. Rahul Sharma",
        reviewerCredentials: "B.A.M.S., M.D.",
    });

    const breadcrumbSchema = generateBreadcrumbSchema([
        { name: 'Home', url: '/' },
        { name: 'Diseases', url: '/diseases' },
        { name: 'Kidney Treatment', url: '/diseases/kidney' },
    ]);

    const treatments = [
        { name: "ACUTE KIDNEY DISEASE", img: "chronic-kidney.webp" },
        { name: "CHRONIC KIDNEY DISEASE(CKD)", img: "chronic-kidney.webp" },
        { name: "NEPHROTIC SYNDROME", img: "nephrotic.webp" },
        { name: "POLYCYSTIC KIDNEY DISEASE(PKD)", img: "kidney-shrinkage.webp" },
        { name: "High Creatinine Levels", img: "elevated-creatinine.webp" },
        { name: "PROTEINURIA", img: "urine-test.png" },
        { name: "KIDNEY SHRINKAGE", img: "kidney-shrinkage.webp" },
        { name: "IGA-NEPHROPATHY", img: "nephropathy.webp" },
        { name: "Kidney Detox", img: "diabetes.webp" },
        { name: "Avoiding Dialysis", img: "gall-bladder.webp" },
        { name: "Kidney Cysts", img: "liver-cirrhosis.jpg" },
        { name: "Kidney Swelling", img: "eczema.webp" },
        { name: "Glomerulonephritis", img: "arthritis.webp" },
        { name: "Kidney Failure", img: "obesity.webp" },
        { name: "Kidney Infection", img: "eczema.webp" },
        { name: "Kidney Stones", img: "eczema.webp" },
        { name: "High Blood Urea", img: "eczema.webp" },
        { name: "Foamy Urine", img: "eczema.webp" },
    ];

    return (
        <main>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(medicalWebPageSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <Breadcrumb title="Kidney Treatment" />

            {/* Hero Section */}
            <div className="ayur-kidney-section" style={{ background: "#071818", padding: "60px 0 40px 0" }}>
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-7 col-md-12 mb-4 mb-lg-0">
                            <div className="text-white" style={{ maxWidth: "600px" }}>
                                <h1 style={{ fontSize: "3rem", fontWeight: 800 }}>
                                    Ayurvedic <span style={{ color: "#ffb300", fontSize: "larger" }}>Kidney Disease</span><br />
                                    Treatment Without Dialysis
                                </h1>
                                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "10px", background: "rgba(255,179,0,0.1)", padding: "8px 16px", borderRadius: "32px", width: "fit-content" }}>
                                    <img src="/assets/images/checkmark.png" alt="verified" style={{ width: "16px" }} />
                                    <span style={{ fontSize: "0.9rem", color: "#ffb300", fontWeight: 600 }}>Medically Reviewed by Dr. Rahul Sharma (B.A.M.S., M.D.)</span>
                                </div>
                                <div style={{ margin: "32px 0 24px 0" }}>
                                    <span style={{ background: "#ff5722", color: "#fff", fontSize: "2.5rem", fontWeight: 700, padding: "10px 32px", borderRadius: "4px", display: "inline-block" }}>ATHARVEDA</span>
                                </div>
                                <div style={{ fontSize: "2rem", color: "#fff", fontWeight: 400 }}>Best 100% Ayurvedic Care</div>
                                <div style={{ marginTop: "40px" }}>
                                    <img src="/assets/images/chronic-kidney.webp" alt="Ayurvedic Kidney Treatment at Atharv Veda" style={{ maxWidth: "180px", display: "block" }} />
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-5 col-md-12">
                            <EnquiryFormSide disease="Kidney" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Medical Disclaimer */}
            <div className="container">
                <MedicalDisclaimer
                    lastReviewed="January 29, 2026"
                    reviewerName="Dr. Rahul Sharma"
                    reviewerCredentials="B.A.M.S., M.D."
                />
            </div>

            {/* Info Section */}
            <div className="ayur-kidney-info-section" style={{ background: "linear-gradient(180deg, #f8f9fa 0%, #fff 100%)", padding: "60px 0 40px 0", borderRadius: "0 0 24px 24px", marginBottom: "40px" }}>
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-7 col-md-12 mb-4 mb-lg-0">
                            <h2 style={{ fontSize: "3rem", fontWeight: 800, color: "#00423b", marginBottom: "24px" }}>
                                What Are <span style={{ color: "#ffb300", fontSize: "larger" }}>Kidney Diseases?</span>
                            </h2>
                            <p style={{ fontSize: "1.25rem", color: "#18423b", marginBottom: "24px", maxWidth: "800px" }}>
                                Kidneys are vital organs responsible for eliminating waste and toxins from the body while maintaining a
                                proper <b>fluid</b> and <b>electrolyte</b> balance. They also regulate blood pressure and help produce red
                                blood cells...
                            </p>
                            <button className="btn" style={{ background: "#00423b", color: "#fff", fontSize: "1rem", fontWeight: 500, padding: "10px 32px", borderRadius: "32px" }}>Book Consultation</button>
                        </div>
                        <div className="col-lg-5 col-md-12 text-center">
                            <div style={{ background: "#fff", borderRadius: "24px", boxShadow: "0 8px 32px rgba(0,0,0,0.08)", padding: "16px 0 0 0", display: "inline-block" }}>
                                <img src="/assets/images/chronic-kidney.webp" alt="Kidney" style={{ maxWidth: "100%", borderRadius: "16px", boxShadow: "0 4px 24px rgba(255,179,0,0.15)" }} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Treatments List */}
            <div className="ayur-kidney-treatments-section" style={{ background: "linear-gradient(180deg, #f8f9fa 0%, #fff 100%)", padding: "60px 0 40px 0", borderRadius: "0 0 24px 24px", marginBottom: "40px" }}>
                <div className="container">
                    <h2 style={{ fontSize: "3rem", fontWeight: 800, color: "#00423b", marginBottom: "32px", textAlign: "center" }}>
                        Ayurvedic Kidney Treatments <span style={{ color: "#ffb300", fontSize: "larger" }}>We Offer</span>
                    </h2>
                    <div className="row" style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "32px 0" }}>
                        <div className="col-12">
                            <div className="treatments-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "32px" }}>
                                {treatments.map((t, i) => (
                                    <div className="treatment-box" key={i}>
                                        <img src={`/assets/images/${t.img}`} alt={t.name} />
                                        <span>{t.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
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
        .treatments-grid .treatment-box img {
          max-width: 90px;
          margin-bottom: 18px;
          border-radius: 50%;
          box-shadow: 0 4px 24px rgba(255, 179, 0, 0.15);
          background: #fff;
          padding: 8px;
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
