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
  title: "Ayurvedic Treatment for Kidney Disease | Natural Support",
  description: "Explore Ayurvedic supportive care for kidney diseases. Learn about herbs like Punarnava, Panchakarma therapies, and diet plans to support renal function.",
  keywords: ["Ayurveda for Kidney", "Natural Kidney Treatment", "Punarnava for Kidney", "Panchakarma Kidney", "Renal Diet Ayurveda"],
  alternates: {
    canonical: "/ayurvedic-treatment-of-kidney-diseases",
  },
};

const faqs = [
  {
    question: "How does Ayurveda support kidney health?",
    answer: "Ayurveda approaches kidney health by aiming to balance the body's doshas (energies), improving digestion, and removing toxins (Ama). Herbs like Punarnava and Gokshura are traditionally used to support urine flow and reduce inflammation."
  },
  {
    question: "Can Ayurveda replace dialysis?",
    answer: "Ayurveda is a supportive and complementary system. While many patients seek it to delay dialysis or improve quality of life, it should never replace emergency medical procedures like dialysis in critical stages (Stage 5) without expert medical supervision."
  },
  {
    question: "What is the best Ayurvedic herb for kidneys?",
    answer: "Punarnava (Boerhavia diffusa) is widely regarded as a premier herb for kidney health, known for its diuretic and anti-inflammatory properties. Gokshura and Varuna are also commonly used."
  },
  {
    question: "Is Panchakarma safe for kidney patients?",
    answer: "Certain Panchakarma therapies like Basti (medicated enema) can be beneficial for specific kidney conditions, but they must be administered with extreme caution and only by qualified Ayurvedic doctors, as fluid and electrolyte balance is critical."
  },
  {
    question: "What diet does Ayurveda recommend for kidney failure?",
    answer: "Ayurveda generally recommends a light, easily digestible diet. For kidney issues, this often means limiting salt, avoiding heavy proteins (like red meat), and consuming cooked vegetables like bottle gourd and pumpkin. Potassium levels must be monitored."
  }
];

export default function AyurvedicTreatmentPage() {
  const pageSchema = generateMedicalWebPageSchema({
    title: "Ayurvedic Treatment of Kidney Diseases",
    description: "Holistic Ayurvedic approach to kidney disease management.",
    url: "https://atharvveda.us/ayurvedic-treatment-of-kidney-diseases",
    datePublished: "2024-01-10",
    dateModified: "2026-02-11",
    conditionName: "Kidney Disease",
    conditionDescription: "Ayurvedic perspective on managing chronic kidney conditions.",
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

      <Breadcrumb title="Ayurvedic Kidney Treatment" />

      <div className="container py-5">
        <div className="row">
          <div className="col-lg-8">
            <article>
              <h1 style={{ fontSize: "2.5rem", fontWeight: 800, color: "#00423b", marginBottom: "20px" }}>
                <span style={{ color: "#ffb300" }}>Ayurvedic Perspectives</span> on Kidney Healing
              </h1>

              <KeyDefinition
                term="Ayurvedic Renal Care"
                definition="Ayurvedic renal care focuses on restoring the balance of the Mutravaha Srotas (urinary channels). It utilizes herbal formulations, dietary restrictions (Pathya-Apathya), and detoxification therapies to reduce burden on the kidneys and support their natural function."
              />

              <QuickFacts
                facts={[
                  { icon: "🌿", text: "Treats the root cause, not just symptoms." },
                  { icon: "🍵", text: "Uses time-tested herbs like Punarnava." },
                  { icon: "🥗", text: "Emphasizes strict dietary discipline." },
                  { icon: "☯️", text: "Balances Vata, Pitta, and Kapha." }
                ]}
              />

              <h2 style={{ color: "#00423b", marginTop: "30px", fontWeight: 700 }}>How does Ayurveda view Kidney Disease?</h2>
              <p style={{ fontSize: "1.1rem", lineHeight: "1.7", color: "#333" }}>
                In Ayurveda, the kidneys are termed <strong>Vrikka</strong>. They are the roots of the <em>Medovaha Srotas</em> (fat tissue channels). Kidney diseases are often classified under <em>Mutravaha Srotas Roga</em> (disorders of urinary channels).
              </p>
              <p style={{ fontSize: "1.1rem", lineHeight: "1.7", color: "#333" }}>
                The imbalance usually begins with the vitiation of <strong>Vata</strong> and <strong>Pitta</strong> doshas, leading to the accumulation of <em>Ama</em> (toxins) which blocks the micro-channels (Srotas) of the kidney, hampering its function. This entails a treatment plan that clears these blockages and repairs the tissue.
              </p>

              <h2 style={{ color: "#00423b", marginTop: "30px", fontWeight: 700 }}>What are the common Ayurvedic treatments?</h2>

              <h3 style={{ fontSize: "1.3rem", color: "#2e7d32", fontWeight: 700, marginTop: "20px" }}>1. Herbal Formulations (Aushadhi)</h3>
              <p style={{ fontSize: "1.1rem", lineHeight: "1.7", color: "#333" }}>
                Several herbs are clinically observed to support kidney function:
              </p>
              <ul style={{ fontSize: "1.1rem", lineHeight: "1.7", color: "#333" }}>
                <li><strong>Punarnava (Boerhavia diffusa):</strong> Known for rejuvenating the kidneys and reducing swelling.</li>
                <li><strong>Gokshura (Tribulus terrestris):</strong> Supports urinary flow and helps in cooling the tract.</li>
                <li><strong>Varuna (Crateva nurvala):</strong> Often used for urinary stones and infections.</li>
                <li><strong>Kaasni (Chicory):</strong> Helps in reducing inflammation.</li>
              </ul>

              <h3 style={{ fontSize: "1.3rem", color: "#2e7d32", fontWeight: 700, marginTop: "20px" }}>2. Detoxification (Panchakarma)</h3>
              <p style={{ fontSize: "1.1rem", lineHeight: "1.7", color: "#333" }}>
                Depending on the patient's strength (Bala), mild cleansing procedures like <strong>Basti</strong> (medicated enema) using kidney-protective oils/decoctions may be administered to balance Vata.
              </p>

              <h3 style={{ fontSize: "1.3rem", color: "#2e7d32", fontWeight: 700, marginTop: "20px" }}>3. Diet & Lifestyle (Pathya-Apathya)</h3>
              <p style={{ fontSize: "1.1rem", lineHeight: "1.7", color: "#333" }}>
                Diet is considered medicine. A kidney-friendly Ayurvedic diet typically involves:
              </p>
              <ul style={{ fontSize: "1.1rem", lineHeight: "1.7", color: "#333" }}>
                <li>Drinking boiled and cooled water.</li>
                <li>Consuming low-sodium and low-potassium vegetables like bottle gourd, ridge gourd, and pumpkin.</li>
                <li>Avoiding heavy, fermented, and processed foods.</li>
              </ul>

              <div style={{ background: "#e0f2f1", padding: "24px", borderRadius: "12px", marginTop: "40px", marginBottom: "40px" }}>
                <h3 style={{ color: "#00695c", fontWeight: 700, marginTop: 0 }}>🚨 When to See a Doctor</h3>
                <p style={{ marginBottom: "16px" }}>
                  Ayurvedic treatment should involve professional monitoring. See a specialist if:
                </p>
                <ul style={{ marginBottom: 0 }}>
                  <li>You notice rapid weight gain from swelling.</li>
                  <li>Your creatinine levels spike suddenly.</li>
                  <li>You experience severe nausea or vomiting.</li>
                </ul>
              </div>

              <MedicalDisclaimer
                lastReviewed="February 11, 2026"
                reviewerName="Dr. Rahul Sharma"
                reviewerCredentials="B.A.M.S., M.D."
              />

              <h2 style={{ color: "#00423b", marginTop: "40px", fontWeight: 700, textAlign: "center", marginBottom: "30px" }}>Frequently Asked Questions</h2>
              <div className="accordion" id="ayurFaqAccordion">
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
                  Get a Custom Diet Plan
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
