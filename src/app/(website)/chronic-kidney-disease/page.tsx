import React from "react";
import { Metadata } from "next";
import Breadcrumb from "@/components/Breadcrumb";
import Link from "next/link";
import Image from "next/image";
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
  title: "Chronic Kidney Disease (CKD): Stages, Symptoms & Ayurvedic Management",
  description: "Understand Chronic Kidney Disease (CKD) stages, causes, and symptoms. Learn how Ayurveda offers supportive management for kidney health.",
  keywords: ["Chronic Kidney Disease", "CKD Stages", "Kidney Failure Symptoms", "Ayurvedic Treatment for CKD", "Creatinine Levels"],
  alternates: {
    canonical: "https://atharvveda.us/chronic-kidney-disease",
  },
};

const faqs = [
  {
    question: "Can Chronic Kidney Disease be reversed?",
    answer: "Chronic Kidney Disease is generally considered irreversible in modern medicine, meaning lost kidney function cannot typically be restored. However, early detection and management—including lifestyle changes, diet, and potentially Ayurvedic support—can help slow its progression and preserve remaining kidney function."
  },
  {
    question: "What are the first signs of bad kidneys?",
    answer: "Early signs of kidney distress can be subtle and may include fatigue, trouble sleeping, dry and itchy skin, needing to urinate more often (especially at night), blood in urine, or foamy urine. Swelling in feet and ankles is also common."
  },
  {
    question: "How does Ayurveda view Chronic Kidney Disease?",
    answer: "In Ayurveda, kidney issues are often linked to an imbalance in the Mutravaha Srotas (urinary channels). Treatment focuses on balancing the doshas (Vata, Pitta, Kapha), detoxifying the body (Ama removal), and rejuvenating kidney tissues (Rasayana) using herbs like Punarnava and Gokshura."
  },
  {
    question: "What foods should I avoid with CKD?",
    answer: "A kidney-friendly diet typically limits sodium, potassium, and phosphorus. You may need to avoid processed foods, canned soups, bananas, oranges, potatoes, and high-protein foods depending on your stage of CKD. Always consult a dietitian."
  },
  {
    question: "When should I see a doctor for kidney concerns?",
    answer: "You should see a doctor if you experience persistent swelling, changes in urination frequency or color, unexplained fatigue, nausea, or high blood pressure that is difficult to control. Regular screening is vital if you have diabetes or hypertension."
  }
];

export default function CKDPage() {
  const pageSchema = generateMedicalWebPageSchema({
    title: "Chronic Kidney Disease (CKD): Stages & Management",
    description: "Comprehensive guide to Chronic Kidney Disease stages, symptoms, and holistic management.",
    url: "https://atharvveda.us/chronic-kidney-disease",
    datePublished: "2024-01-15",
    dateModified: "2026-02-11",
    conditionName: "Chronic Kidney Disease",
    conditionDescription: "A long-term condition where the kidneys do not work effectively.",
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

      <Breadcrumb title="Chronic Kidney Disease (CKD)" />

      <div className="container py-5">
        <div className="row">
          <div className="col-lg-8">
            <article>
              <h1 style={{ fontSize: "2.5rem", fontWeight: 800, color: "#00423b", marginBottom: "20px" }}>
                Understanding <span style={{ color: "#ffb300" }}>Chronic Kidney Disease (CKD)</span>
              </h1>

              <KeyDefinition
                term="Chronic Kidney Disease (CKD)"
                definition="Chronic Kidney Disease (CKD) is a progressive condition where the kidneys gradually lose their ability to filter natural waste and excess fluids from the blood. This decline happens over months or years, often going unnoticed until advanced stages."
              />

              <QuickFacts
                facts={[
                  { icon: "📉", text: "Progressive loss of function over time." },
                  { icon: "🩸", text: "Diabetes & High BP are top risk factors." },
                  { icon: "🩺", text: "Early detection can slow progression." },
                  { icon: "🌿", text: "Holistic care focuses on preservation." }
                ]}
              />

              <h2 style={{ color: "#00423b", marginTop: "30px", fontWeight: 700 }}>What causes Chronic Kidney Disease?</h2>
              <p style={{ fontSize: "1.1rem", lineHeight: "1.7", color: "#333" }}>
                Healthy kidneys act as the body's filtration system. When they are damaged, waste products and fluid build up in the body, leading to swelling, nausea, and weakness. CKD is often a result of other health conditions that strain the kidneys over time.
              </p>
              <p style={{ fontSize: "1.1rem", lineHeight: "1.7", color: "#333" }}>
                The two most common causes are <strong>Diabetes</strong> and <strong>High Blood Pressure</strong>, which together account for majority of cases. Other causes include glomerulonephritis (inflammation of kidney filtering units), interstitial nephritis, polycystic kidney disease, prolonged obstruction of the urinary tract, and recurrent kidney infections.
              </p>

              <h2 style={{ color: "#00423b", marginTop: "30px", fontWeight: 700 }}>What are the symptoms of CKD?</h2>
              <p style={{ fontSize: "1.1rem", lineHeight: "1.7", color: "#333" }}>
                CKD is often called a "silent disease" because noticeable symptoms may not appear until the kidneys are significantly damaged. As the disease advances, you might experience:
              </p>
              <ul style={{ fontSize: "1.1rem", lineHeight: "1.7", color: "#333", marginBottom: "20px" }}>
                <li><strong>Fatigue and weakness</strong> due to anemia or waste buildup.</li>
                <li><strong>Swelling (Edema)</strong> in feet, ankles, or hands relative to fluid retention.</li>
                <li><strong>Changes in urination</strong>, such as urinating more or less than usual, or foamy urine.</li>
                <li><strong>Dry, itchy skin</strong> caused by mineral and bone disease.</li>
                <li><strong>High blood pressure</strong> (Hypertension).</li>
                <li><strong>Loss of appetite</strong>, nausea, or vomiting.</li>
              </ul>

              <h2 style={{ color: "#00423b", marginTop: "30px", fontWeight: 700 }}>How is CKD Diagnosed?</h2>
              <p style={{ fontSize: "1.1rem", lineHeight: "1.7", color: "#333" }}>
                Diagnosis typically involves blood and urine tests. The <strong>Glomerular Filtration Rate (GFR)</strong> blood test estimates how much blood passes through the glomeruli each minute. A GFR below 60 for three months or more indicates CKD. Urine tests check for <strong>albumin</strong>, a protein that shouldn't be in urine if kidneys are healthy.
              </p>

              <h2 style={{ color: "#00423b", marginTop: "30px", fontWeight: 700 }}>Management and Supportive Care</h2>
              <p style={{ fontSize: "1.1rem", lineHeight: "1.7", color: "#333" }}>
                While advanced CKD damage is often irreversible, early management focuses on slowing progression. This includes controlling blood pressure, managing blood sugar levels, monitoring diet (less salt and protein), and avoiding medications that can harm kidneys (like NSAIDs).
              </p>
              <p style={{ fontSize: "1.1rem", lineHeight: "1.7", color: "#333" }}>
                <strong>Holistic & Ayurvedic Perspective:</strong> At Atharv Veda, we focus on supportive care that aims to balance bodily energies and support ongoing kidney function. Our approach involves personalized dietary guidance, lifestyle modifications, and the use of herbal formulations traditionally believed to support renal health.
              </p>

              <div style={{ background: "#e0f2f1", padding: "24px", borderRadius: "12px", marginTop: "40px", marginBottom: "40px" }}>
                <h3 style={{ color: "#00695c", fontWeight: 700, marginTop: 0 }}>🚨 When to See a Doctor</h3>
                <p style={{ marginBottom: "16px" }}>
                  Immediate medical attention is crucial if you experience sudden and severe symptoms. Consult a nephrologist if you have:
                </p>
                <ul style={{ marginBottom: 0 }}>
                  <li>Persistent, unexplained high blood pressure.</li>
                  <li>Frequent difficult or painful urination.</li>
                  <li>Blood in your urine.</li>
                  <li>Significant swelling in legs or face.</li>
                </ul>
              </div>

              <MedicalDisclaimer
                lastReviewed="February 11, 2026"
                reviewerName="Dr. Rahul Sharma"
                reviewerCredentials="B.A.M.S., M.D."
              />

              <h2 style={{ color: "#00423b", marginTop: "40px", fontWeight: 700, textAlign: "center", marginBottom: "30px" }}>Frequently Asked Questions</h2>
              <div className="accordion" id="ckdFaqAccordion">
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
                  Talk to a Kidney Expert
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

