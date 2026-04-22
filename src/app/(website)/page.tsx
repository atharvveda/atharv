import React from "react";
import { Metadata } from "next";
import Banner from "@/components/Banner";
import EnquiryForm from "@/components/EnquiryForm";
import CareSlider from "@/components/CareSlider";
import AboutSection from "@/components/AboutSection";
import AchievementSection from "@/components/AchievementSection";
import WhySection from "@/components/WhySection";
import TeamSection from "@/components/TeamSection";
import TestimonialSection from "@/components/TestimonialSection";
import HomeFAQ from "@/components/HomeFAQ";
import HomeBlogSection from "@/components/HomeBlogSection";

export const metadata: Metadata = {
  title: "Atharv Veda | Ayurvedic Kidney Care & Chronic Disease Management",
  description: "Specialized Ayurvedic consultation for Chronic Kidney Disease (CKD), Diabetes, and lifestyle disorders. Book a consultation with US-based support.",
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    "name": "Atharv Veda",
    "url": "https://atharvveda.us",
    "logo": "https://atharvveda.us/assets/images/logo.png",
    "description": "Specialized Ayurvedic clinic for Chronic Kidney Disease and lifestyle disorders.",
    "telephone": "+16466243465",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "USA"
    },
    "medicalSpecialty": "Ayurvedic Medicine",
    "sameAs": [
      "https://www.facebook.com/atharvveda",
      "https://www.instagram.com/atharvveda"
    ]
  };

  return (
    <main style={{ overflowX: "hidden" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />

      {/* Hero Section */}
      <Banner />

      {/* 1. Achievement Stats — Deep Forest Green */}
      <div style={{ background: "linear-gradient(135deg, #1A362D 0%, #254D3E 100%)" }}>
        <AchievementSection />
      </div>

      {/* 2. Care Slider — Warm Linen */}
      <div style={{ background: "#F5EFE6" }}>
        <CareSlider />
      </div>

      {/* 3. About Section — Pure White */}
      <div style={{ background: "#FFFFFF" }}>
        <AboutSection />
      </div>

      {/* 4. Why Us — Deep Teal */}
      <div style={{ background: "linear-gradient(160deg, #0D2B22 0%, #1A4035 100%)" }}>
        <WhySection />
      </div>

      {/* 5. Team Section — Soft Sage Cream */}
      <div style={{ background: "#EEF5F0" }}>
        <TeamSection />
      </div>

      {/* 6. Medical Guidance — Rich Copper gradient */}
      <section style={{ background: "linear-gradient(135deg, #7B3F2A 0%, #A0522D 100%)", padding: "80px 0" }}>
        <div className="container">
          <div className="row justify-content-center text-center">
            <div className="col-lg-8">
              <div style={{
                display: "inline-flex", alignItems: "center", justifyContent: "center",
                width: "70px", height: "70px", borderRadius: "50%",
                background: "rgba(255,255,255,0.15)", marginBottom: "25px",
                color: "#ffffff", boxShadow: "0 0 0 10px rgba(255,255,255,0.05)"
              }}>
                <svg width="32" height="32" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                  <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z"/>
                </svg>
              </div>
              <h3 style={{ color: "#FFFFFF", fontWeight: 800, fontSize: "2rem", letterSpacing: "-0.5px" }}>Medical Guidance</h3>
              <p style={{ fontSize: "1.1rem", color: "rgba(255,255,255,0.85)", marginTop: "20px", lineHeight: "1.9", maxWidth: "700px", margin: "20px auto 0" }}>
                Early detection is critical in chronic care. If you experience persistent fatigue, sudden swelling,
                or changes in urination, please consult a healthcare specialist immediately. Our Ayurvedic approach
                is most effective when integrated thoughtfully alongside standard medical monitoring.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Testimonials — Warm Parchment */}
      <div style={{ background: "#FAF6F1" }}>
        <TestimonialSection />
      </div>

      {/* 8. Blog — Mint Tint */}
      <div style={{ background: "#F0F4F0" }}>
        <HomeBlogSection />
      </div>

      {/* 9. FAQ — Clean White */}
      <div style={{ background: "#FFFFFF" }}>
        <HomeFAQ />
      </div>

      {/* 10. Enquiry Form — Forest Anchor Green */}
      <div style={{ background: "linear-gradient(180deg, #1A362D 0%, #0D2218 100%)" }}>
        <EnquiryForm />
      </div>

    </main>
  );
}
