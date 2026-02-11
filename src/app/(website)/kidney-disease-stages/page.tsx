import React from "react";
import { Metadata } from "next";
import Breadcrumb from "@/components/Breadcrumb";
import Link from "next/link";
import MedicalDisclaimer from "@/components/MedicalDisclaimer";
import ReviewerProfile from "@/components/ReviewerProfile";
import KeyDefinition from "@/components/KeyDefinition";
import KidneyNav from "@/components/KidneyNav";
import ReferencesSection from "@/components/ReferencesSection";
import QuickFacts from "@/components/QuickFacts";
import FAQItem from "@/components/FAQItem";
import { generateMedicalWebPageSchema } from "@/lib/schema/medical-webpage";
import { generateFaqSchema } from "@/lib/schema/faq";

export const metadata: Metadata = {
  title: "Stages of Kidney Disease (1 to 5) | GFR & Management",
  description: "Learn about the 5 stages of Chronic Kidney Disease (CKD), from mild damage (Stage 1) to kidney failure (Stage 5), and how to manage each stage.",
  keywords: ["Stages of Kidney Disease", "Stage 3 CKD Life Expectancy", "CKD Stage 4 Symptoms", "GFR Levels", "Kidney Failure Stages"],
  alternates: {
    canonical: "/kidney-disease-stages",
  },
};

const faqs = [
  {
    question: "How do I know what stage of kidney disease I have?",
    answer: "Your stage is determined primarily by your GFR (Glomerular Filtration Rate) number, found via a blood test. Your doctor considers your GFR along with urine albumin levels and the cause of your kidney disease."
  },
  {
    question: "Can I stop CKD from moving to the next stage?",
    answer: "While you cannot always stop progression completely, managing risk factors like blood sugar (diabetes) and blood pressure aggressively can significantly slow the decline. Diet and lifestyle changes are critical."
  },
  {
    question: "What is a normal GFR?",
    answer: "In general, a GFR of 60 or higher is considered normal if there is no other evidence of kidney damage. A GFR below 60 may indicate kidney disease. A GFR below 15 indicates kidney failure."
  },
  {
    question: "Is Stage 3 kidney disease serious?",
    answer: "Stage 3 is moderate kidney damage. It is serious because without management, it can progress to Stage 4 or 5. However, many people live for a long time with Stage 3 CKD without ever needing dialysis if they manage their health well."
  },
  {
    question: "Can Ayurveda help in Stage 4 or 5?",
    answer: "In advanced stages, Ayurvedic support focuses on palliative care—improving quality of life, managing symptoms like appetite loss and fatigue, and attempting to stabilize creatinine levels through diet and herbal support alongside conventional monitoring."
  }
];

export default function KidneyStagesPage() {
  const pageSchema = generateMedicalWebPageSchema({
    title: "Stages of Chronic Kidney Disease Explained",
    description: "Detailed guide to the 5 stages of CKD based on GFR.",
    url: "https://atharvveda.us/kidney-disease-stages",
    datePublished: "2024-01-20",
    dateModified: "2026-02-11",
    conditionName: "Chronic Kidney Disease Stages",
    conditionDescription: "Staging system for kidney disease based on glomerular filtration rate.",
    reviewerName: "Dr. Rahul Sharma",
    reviewerCredentials: "B.A.M.S., M.D."
  });

  const faqSchema = generateFaqSchema(faqs);

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <Breadcrumb title="Kidney Disease Stages" />

      <div className="container py-5">
        <div className="row">
          <div className="col-lg-8">
            <article>
              <h1 style={{ fontSize: "2.5rem", fontWeight: 800, color: "#00423b", marginBottom: "20px" }}>
                The 5 Stages of <span style={{ color: "#ffb300" }}>Chronic Kidney Disease</span>
              </h1>

              <KeyDefinition
                term="Kidney Disease Staging"
                definition="Kidney disease staging classifies the severity of kidney damage into five stages based on the Glomerular Filtration Rate (GFR). Stage 1 represents mild damage with normal function, while Stage 5 indicates kidney failure."
              />

              <QuickFacts
                facts={[
                  { icon: "🔢", text: "There are 5 stages based on GFR." },
                  { icon: "📉", text: "GFR < 60 indicates kidney disease." },
                  { icon: "💊", text: "Early stages often require no meds but lifestyle changes." },
                  { icon: "🏥", text: "Stage 5 usually requires dialysis or transplant." }
                ]}
              />

              <p style={{ fontSize: "1.1rem", lineHeight: "1.7", color: "#333", marginBottom: "30px" }}>
                Understanding your stage is the first step in managing your condition. The stages are primarily determined by the <strong>eGFR (estimated Glomerular Filtration Rate)</strong>, which measures how well your kidneys filter waste from your blood.
              </p>

              <h2 style={{ color: "#00423b", marginTop: "30px", fontWeight: 700 }}>What are the stages of CKD?</h2>

              {/* Stage 1 */}
              <div className="stage-box" style={{ marginBottom: "24px", padding: "20px", background: "#f8f9fa", borderRadius: "8px", borderLeft: "4px solid #8bc34a" }}>
                <h3 style={{ color: "#2e7d32", fontWeight: 700, marginTop: 0 }}>Stage 1: Kidney Damage with Normal Function</h3>
                <p style={{ fontWeight: 600, color: "#555" }}>GFR: 90 or higher</p>
                <p>At this stage, kidneys work well, but there are signs of damage like protein in urine. Diagnosis is usually incidental.</p>
              </div>

              {/* Stage 2 */}
              <div className="stage-box" style={{ marginBottom: "24px", padding: "20px", background: "#f8f9fa", borderRadius: "8px", borderLeft: "4px solid #cddc39" }}>
                <h3 style={{ color: "#827717", fontWeight: 700, marginTop: 0 }}>Stage 2: Mild Loss of Function</h3>
                <p style={{ fontWeight: 600, color: "#555" }}>GFR: 60 to 89</p>
                <p>Kidney function is slightly reduced. Similar to Stage 1, symptoms are rare. Management focuses on controlling blood pressure and diabetes.</p>
              </div>

              {/* Stage 3 */}
              <div className="stage-box" style={{ marginBottom: "24px", padding: "20px", background: "#f8f9fa", borderRadius: "8px", borderLeft: "4px solid #ffeb3b" }}>
                <h3 style={{ color: "#fbc02d", fontWeight: 700, marginTop: 0 }}>Stage 3: Moderate Loss of Function</h3>
                <p style={{ fontWeight: 600, color: "#555" }}>GFR: 30 to 59</p>
                <p>This stage is split into 3a and 3b. Waste may begin to build up. Symptoms like fatigue or swelling might appear. Dietary changes become very important.</p>
              </div>

              {/* Stage 4 */}
              <div className="stage-box" style={{ marginBottom: "24px", padding: "20px", background: "#f8f9fa", borderRadius: "8px", borderLeft: "4px solid #ff9800" }}>
                <h3 style={{ color: "#e65100", fontWeight: 700, marginTop: 0 }}>Stage 4: Severe Loss of Function</h3>
                <p style={{ fontWeight: 600, color: "#555" }}>GFR: 15 to 29</p>
                <p>Kidneys are severely damaged. Preparing for dialysis or transplant is often discussed. Conservative management aims to delay failure.</p>
              </div>

              {/* Stage 5 */}
              <div className="stage-box" style={{ marginBottom: "24px", padding: "20px", background: "#fff3e0", borderRadius: "8px", borderLeft: "4px solid #f44336" }}>
                <h3 style={{ color: "#b71c1c", fontWeight: 700, marginTop: 0 }}>Stage 5: Kidney Failure</h3>
                <p style={{ fontWeight: 600, color: "#555" }}>GFR: Less than 15</p>
                <p>Also known as End-Stage Renal Disease (ESRD). Kidneys have lost nearly all their ability to function. Treatment involves dialysis, transplant, or palliative care.</p>
              </div>

              <h2 style={{ color: "#00423b", marginTop: "30px", fontWeight: 700 }}>How can I prevent progression?</h2>
              <p style={{ fontSize: "1.1rem", lineHeight: "1.7", color: "#333" }}>
                Regardless of your stage, certain steps can protect your kidneys:
              </p>
              <ul style={{ fontSize: "1.1rem", lineHeight: "1.7", color: "#333" }}>
                <li>Keep blood pressure below 140/90 (or as advised).</li>
                <li>Monitor blood sugar if you are diabetic.</li>
                <li>Follow a low-salt, healthy diet.</li>
                <li>Avoid smoking.</li>
                <li>Stay physically active.</li>
              </ul>

              <div style={{ background: "#e0f2f1", padding: "24px", borderRadius: "12px", marginTop: "40px", marginBottom: "40px" }}>
                <h3 style={{ color: "#00695c", fontWeight: 700, marginTop: 0 }}>🚨 When to See a Doctor</h3>
                <p style={{ marginBottom: "16px" }}>
                  If you have been diagnosed with an early stage of CKD, you should have regular check-ups. See a doctor immediately if you experience:
                </p>
                <ul style={{ marginBottom: 0 }}>
                  <li>Sudden drop in urine output.</li>
                  <li>Extreme fatigue or confusion.</li>
                  <li>Severe shortness of breath.</li>
                  <li>Chest pain.</li>
                </ul>
              </div>

              <MedicalDisclaimer
                lastReviewed="February 11, 2026"
                reviewerName="Dr. Rahul Sharma"
                reviewerCredentials="B.A.M.S., M.D."
              />

              <h2 style={{ color: "#00423b", marginTop: "40px", fontWeight: 700, textAlign: "center", marginBottom: "30px" }}>Frequently Asked Questions</h2>
              <div className="accordion" id="stagesFaqAccordion">
                {faqs.map((faq, index) => (
                  <FAQItem key={index} faq={faq} index={index} />
                ))}
              </div>

              <ReviewerProfile />
              <ReferencesSection />

            </article>
          </div>

          <div className="col-lg-4">
            <div style={{ position: "sticky", top: "100px" }}>
              <KidneyNav />
              <div style={{ marginTop: "30px" }}>
                <Link href="/contact" className="btn btn-warning w-100" style={{ fontWeight: 700, padding: "12px", color: "#fff", background: "#ff5722", border: "none" }}>
                  Consult an Expert
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
