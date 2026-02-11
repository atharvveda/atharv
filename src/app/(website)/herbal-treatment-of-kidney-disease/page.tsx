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
  title: "Herbal Remedies for Kidney Health | Safety & Efficacy",
  description: "Guide to herbal supplements for kidney health. Understand therapeutic potential and safety precautions of herbs like Dandelion, Nettle, and Punarnava.",
  keywords: ["Herbal kidney remedies", "Kidney detox herbs", "Safety of kidney herbs", "Natural diuretics"],
  alternates: {
    canonical: "/herbal-treatment-of-kidney-disease",
  },
};

const faqs = [
  {
    question: "Are herbal remedies safe for kidney patients?",
    answer: "Not all herbs are safe. Some herbs can interact with medications or accumulate in the body if kidney function is low. Always consult a specialist before starting any herbal supplement."
  },
  {
    question: "What herbs help lower creatinine?",
    answer: "Herbs like Punarnava, nettle leaf, and chamomile are sometimes discussed for their potential to support filtration. However, 'lowering creatinine' requires treating the underlying kidney stress, not just the number."
  },
  {
    question: "Is turmeric good for kidneys?",
    answer: "Turmeric (Curcumin) has anti-inflammatory properties that may be beneficial, but it should be used cautiously as high doses can be risky for those with kidney stones (due to oxalates). Balance is key."
  },
  {
    question: "Can I drink green tea with kidney disease?",
    answer: "Generally, green tea is considered safe and beneficial due to antioxidants. However, if you are on fluid restrictions or have specific mineral imbalances, aim for moderation."
  },
  {
    question: "How do I take these herbs?",
    answer: "Ayurvedic and herbal preparations come in powders (churnas), tablets, or decoctions (kashayams). The dosage and form must be personalized to your constitution and disease stage."
  }
];

export default function HerbalTreatmentPage() {
  const pageSchema = generateMedicalWebPageSchema({
    title: "Herbal Treatment of Kidney Disease",
    description: "Overview of herbal support for kidneys.",
    url: "https://atharvveda.us/herbal-treatment-of-kidney-disease",
    datePublished: "2024-01-25",
    dateModified: "2026-02-11",
    conditionName: "Kidney Disease",
    conditionDescription: "Use of herbal remedies for kidney support.",
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

      <Breadcrumb title="Herbal Treatment of Kidney Disease" />

      <div className="container py-5">
        <div className="row">
          <div className="col-lg-8">
            <article>
              <h1 style={{ fontSize: "2.5rem", fontWeight: 800, color: "#00423b", marginBottom: "20px" }}>
                <span style={{ color: "#ffb300" }}>Herbal Treatment</span> Options for Kidney Health
              </h1>

              <KeyDefinition
                term="Herbal Renal Support"
                definition="Herbal renal support involves using plant-based medicines to promote kidney function, reduce inflammation, and act as mild diuretics. These remedies are often part of a broader holistic treatment plan."
              />

              <QuickFacts
                facts={[
                  { icon: "🛡️", text: "Generally lower side effects than synthetic drugs." },
                  { icon: "⚠️", text: "Must be used under medical supervision." },
                  { icon: "💊", text: "Can interact with blood pressure meds." },
                  { icon: "⚖️", text: "Quality and dosage are critical." }
                ]}
              />

              <h2 style={{ color: "#00423b", marginTop: "30px", fontWeight: 700 }}>Overview of Kidney-Friendly Herbs</h2>
              <p style={{ fontSize: "1.1rem", lineHeight: "1.7", color: "#333" }}>
                Nature offers a pharmacy of plants that have been used for centuries to support the urinary system. In modern integrative medicine, these herbs are valued for their potential antioxidant and anti-inflammatory effects.
              </p>

              <div style={{ margin: "30px 0" }}>
                <h3 style={{ fontSize: "1.4rem", color: "#2e7d32", fontWeight: 700 }}>1. Punarnava (Boerhavia diffusa)</h3>
                <p>Literally meaning "renewer", this herb is famous in Ayurveda for revitalizing organs. It aids in flushing out excess fluids (edema) without straining the kidneys.</p>
              </div>

              <div style={{ margin: "30px 0" }}>
                <h3 style={{ fontSize: "1.4rem", color: "#2e7d32", fontWeight: 700 }}>2. Gokshura (Tribulus terrestris)</h3>
                <p>Used to enhance strength and support the urinary tract lining. It may help in soothing dysuria (painful urination).</p>
              </div>

              <div style={{ margin: "30px 0" }}>
                <h3 style={{ fontSize: "1.4rem", color: "#2e7d32", fontWeight: 700 }}>3. Palash (Butea monosperma)</h3>
                <p>Known as the 'Flame of the Forest', its flowers and seeds are sometimes used to manage blood sugar levels, an important factor in kidney health.</p>
              </div>

              <div style={{ margin: "30px 0" }}>
                <h3 style={{ fontSize: "1.4rem", color: "#2e7d32", fontWeight: 700 }}>4. Chandan (Sandalwood)</h3>
                <p>Often used for its cooling properties (Sheeta virya), helping to pacify Pitta aggravations like burning sensations in urine.</p>
              </div>

              <h2 style={{ color: "#00423b", marginTop: "30px", fontWeight: 700 }}>Safety First: A Critical Warning</h2>
              <p style={{ fontSize: "1.1rem", lineHeight: "1.7", color: "#333" }}>
                While "natural" implies safety, herbs are potent. Patients with Chronic Kidney Disease (CKD) must be careful because compromised kidneys cannot filter out certain compounds efficiently.
              </p>
              <p style={{ fontSize: "1.1rem", lineHeight: "1.7", color: "#333" }}>
                <strong>Avoid:</strong> Herbs that are high in potassium or phosphorus if your doctor has restricted them. Be wary of supplements with unknown purity.
              </p>

              <div style={{ background: "#e0f2f1", padding: "24px", borderRadius: "12px", marginTop: "40px", marginBottom: "40px" }}>
                <h3 style={{ color: "#00695c", fontWeight: 700, marginTop: 0 }}>🚨 When to See a Doctor</h3>
                <p style={{ marginBottom: "16px" }}>
                  If you are taking herbal supplements, stop and consult a doctor if:
                </p>
                <ul style={{ marginBottom: 0 }}>
                  <li>You experience an allergic reaction (rash, breathlessness).</li>
                  <li>There is a sudden change in blood pressure.</li>
                  <li>You feel dizzy or unusually weak.</li>
                </ul>
              </div>

              <MedicalDisclaimer
                lastReviewed="February 11, 2026"
                reviewerName="Dr. Rahul Sharma"
                reviewerCredentials="B.A.M.S., M.D."
              />

              <h2 style={{ color: "#00423b", marginTop: "40px", fontWeight: 700, textAlign: "center", marginBottom: "30px" }}>Frequently Asked Questions</h2>
              <div className="accordion" id="herbalFaqAccordion">
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
                  Check Herbal Safety
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
