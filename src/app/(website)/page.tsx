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
    canonical: "https://atharvveda.us",
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
    "telephone": "+13029669159",
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

      {/* Hero Section - No extra spacing needed as it tops the page */}
      <Banner />

      {/* Social Proof - Increased spacing for authority breathability */}
      <div style={{ padding: "60px 0" }}>
        <AchievementSection />
      </div>

      {/* Funnel - Disease Hubs - Clear separation */}
      <div style={{ padding: "80px 0", background: "#fdfdfd" }}>
        <CareSlider />
      </div>

      {/* Institutional Definition & About - Premium feel */}
      <div style={{ padding: "100px 0" }}>
        <AboutSection />
      </div>

      {/* Value Proposition - Differentiator */}
      <div style={{ padding: "80px 0", background: "#fff" }}>
        <WhySection />
      </div>

      {/* Authority - Real Doctors */}
      <div style={{ padding: "80px 0" }}>
        <TeamSection />
      </div>

      {/* Safety / Verification Section (New YMYL Trust Signal) */}
      <section style={{ background: "#e0f2f1", padding: "60px 0" }}>
        <div className="container">
          <div className="row justify-content-center text-center">
            <div className="col-lg-8">
              <h3 style={{ color: "#00695c", fontWeight: 700, fontSize: "1.5rem" }}>When to See a Doctor?</h3>
              <p style={{ fontSize: "1.1rem", color: "#333", marginTop: "15px" }}>
                Early detection of kidney issues is critical. If you notice persistent fatigue, swelling in ankles,
                or changes in urination, consult a specialist immediately. Our Ayurvedic approach works best when integrated early
                alongside your standard medical care monitoring.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof - Testimonials */}
      <div style={{ padding: "100px 0" }}>
        <TestimonialSection />
      </div>

      {/* NEW: Blog Preview - Content Authority */}
      <HomeBlogSection />

      {/* Authority - FAQ Schema */}
      <HomeFAQ />

      {/* Conversion - Bottom Form - Final Destination */}
      <div style={{ marginTop: "0" }}>
        <EnquiryForm />
      </div>

    </main>
  );
}
