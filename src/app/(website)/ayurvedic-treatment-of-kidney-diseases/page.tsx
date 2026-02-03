import { Metadata } from "next";
import Breadcrumb from "@/components/Breadcrumb";
import MedicalDisclaimer from "@/components/MedicalDisclaimer";
import { generateKidneyPageSchemas } from "@/lib/schema/kidneySchemas";
import { kidneyFAQs } from "@/data/faqs";
import React from "react";

export const metadata: Metadata = {
  title:
    "Chronic Kidney Disease: Herbal & Ayurvedic Treatment Guide",
  description:
    "Comprehensive US-focused guide on chronic kidney disease (CKD), including herbal and Ayurvedic treatment approaches, kidney-friendly diet, lifestyle care, and limitations. Reviewed by qualified Ayurvedic physician.",
  keywords: [
    "chronic kidney disease",
    "herbal treatment of kidney disease",
    "natural kidney treatment",
    "ayurvedic treatment for kidney disease",
    "chronic kidney disease treatment",
    "kidney disease herbal medicine",
    "reduce creatinine naturally",
    "ayurveda for ckd"
  ],
  alternates: {
    canonical:
      "https://atharvveda.us/ayurvedic-treatment-of-kidney-diseases",
  },
  openGraph: {
    title:
      "Chronic Kidney Disease – Herbal & Ayurvedic Treatment Guide",
    description:
      "Learn about chronic kidney disease stages, herbal treatment options, Ayurvedic diet, and lifestyle support for kidney health.",
    url: "https://atharvveda.us/ayurvedic-treatment-of-kidney-diseases",
    type: "article",
  },
};

export default function PillarKidneyPage() {
  const pageSchemas = generateKidneyPageSchemas({
    articleProps: {
      title: "Chronic Kidney Disease: Herbal & Ayurvedic Treatment Guide",
      description:
        "Educational guide covering chronic kidney disease, herbal and Ayurvedic treatment approaches, diet, lifestyle, and medical limitations.",
      url: "https://atharvveda.us/ayurvedic-treatment-of-kidney-diseases",
      imageUrl:
        "https://atharvveda.us/assets/uploads/chronic-kidney-disease-hero.webp",
      datePublished: "2024-01-01",
      dateModified: "2026-02-03",
      authorName: "Dr. Rahul Sharma",
    },
    medicalProps: {
      title: "Chronic Kidney Disease (CKD)",
      description:
        "Chronic kidney disease is a long-term condition affecting kidney function and waste removal.",
      url: "https://atharvveda.us/ayurvedic-treatment-of-kidney-diseases",
      datePublished: "2024-01-01",
      dateModified: "2026-02-03",
      conditionName: "Chronic Kidney Disease",
      conditionDescription:
        "A progressive condition where kidneys gradually lose their ability to filter waste and regulate fluids.",
      reviewerName: "Dr. Rahul Sharma",
      reviewerCredentials: "B.A.M.S., M.D.",
    },
    faqs: kidneyFAQs,
    breadcrumbs: [
      { name: "Home", url: "/" },
      {
        name: "Chronic Kidney Disease",
        url: "/ayurvedic-treatment-of-kidney-diseases",
      },
    ],
  });

  return (
    <main className="container" style={{ padding: "40px 0" }}>
      {pageSchemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <Breadcrumb title="Chronic Kidney Disease Treatment Guide" />

      <article style={{ maxWidth: "900px", margin: "0 auto" }}>
        {/* HERO IMAGE */}
        <img
          src="/assets/uploads/chronic-kidney-disease-hero.webp"
          alt="Chronic kidney disease overview with educational medical illustration"
          width="900"
          height="500"
          loading="eager"
        />

        <h1>Chronic Kidney Disease: Herbal & Ayurvedic Treatment Guide</h1>

        <p>
          Chronic kidney disease (CKD) is a long-term condition in which the
          kidneys gradually lose their ability to filter waste, regulate
          fluids, and maintain electrolyte balance. CKD affects millions of
          people in the United States and is commonly linked to diabetes,
          high blood pressure, autoimmune disorders, infections, and long-term
          medication use.
        </p>

        <h2>Understanding Kidney Function</h2>

        <img
          src="/assets/uploads/kidney-function-diagram.webp"
          alt="Kidney function diagram showing blood filtration and waste removal"
          width="800"
          height="450"
          loading="lazy"
        />

        <p>
          The kidneys filter toxins from the blood, regulate blood pressure,
          balance minerals, and help produce red blood cells. When kidney
          function declines, waste products such as creatinine and excess
          fluids may accumulate in the body.
        </p>

        <h2>Stages of Chronic Kidney Disease</h2>

        <img
          src="/assets/uploads/stages-of-chronic-kidney-disease.webp"
          alt="Stages of chronic kidney disease from stage 1 to stage 5"
          width="800"
          height="450"
          loading="lazy"
        />

        <table>
          <thead>
            <tr>
              <th>Stage</th>
              <th>GFR (mL/min)</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Stage 1</td>
              <td>90+</td>
              <td>Mild kidney damage</td>
            </tr>
            <tr>
              <td>Stage 2</td>
              <td>60–89</td>
              <td>Early loss of kidney function</td>
            </tr>
            <tr>
              <td>Stage 3</td>
              <td>30–59</td>
              <td>Moderate kidney damage</td>
            </tr>
            <tr>
              <td>Stage 4</td>
              <td>15–29</td>
              <td>Severe kidney damage</td>
            </tr>
            <tr>
              <td>Stage 5</td>
              <td>&lt;15</td>
              <td>Kidney failure</td>
            </tr>
          </tbody>
        </table>

        <h2>Herbal Treatment of Chronic Kidney Disease</h2>

        <img
          src="/assets/uploads/herbal-treatment-of-kidney-disease.webp"
          alt="Herbal treatment of kidney disease shown as educational infographic"
          width="800"
          height="450"
          loading="lazy"
        />

        <p>
          Herbal treatment of kidney disease focuses on plant-based
          formulations traditionally used to support urinary health,
          digestion, and metabolic balance. In chronic kidney disease,
          herbal treatment is used as supportive care and should not replace
          medical treatment prescribed by a nephrologist.
        </p>

        <h2>Important Ayurvedic Herbs for Kidney Health</h2>

        <img
          src="/assets/uploads/ayurvedic-herbs-for-kidney-health.webp"
          alt="Ayurvedic herbs traditionally used for kidney health support"
          width="800"
          height="450"
          loading="lazy"
        />

        <h3>Punarnava (Boerhavia diffusa)</h3>
        <p>
          Traditionally used in Ayurveda for supporting urinary function and
          reducing fluid retention.
        </p>

        <h3>Gokshura (Tribulus terrestris)</h3>
        <p>
          Known in classical Ayurveda for maintaining urinary tract health.
        </p>

        <h3>Varuna (Crataeva nurvala)</h3>
        <p>
          Traditionally used for supporting bladder and kidney function.
        </p>

        <h2>Ayurvedic Diet for Kidney Disease</h2>

        <img
          src="/assets/uploads/ayurvedic-diet-for-kidney-disease.webp"
          alt="Ayurvedic diet for kidney disease with kidney friendly foods"
          width="800"
          height="450"
          loading="lazy"
        />

        <p>
          A kidney-supportive diet emphasizes easily digestible foods,
          controlled salt intake, proper hydration, and avoidance of heavily
          processed foods.
        </p>

        <h2>Lifestyle Support for Kidney Health</h2>

        <img
          src="/assets/uploads/lifestyle-support-for-kidney-health.webp"
          alt="Lifestyle support for kidney health including stress management and routine"
          width="800"
          height="450"
          loading="lazy"
        />

        <p>
          Gentle activity, stress management, proper sleep, and daily routine
          (Dinacharya) help reduce strain on the kidneys.
        </p>

        <h2>Safety, Limitations, and Medical Care</h2>

        <img
          src="/assets/uploads/ayurveda-and-modern-kidney-care.webp"
          alt="Integration of ayurveda and modern care for kidney disease management"
          width="800"
          height="450"
          loading="lazy"
        />

        <p>
          Herbal and Ayurvedic treatment should not be considered a cure for
          chronic kidney disease. Patients in the United States should always
          consult a licensed healthcare provider or nephrologist and continue
          regular medical monitoring.
        </p>

        <p>
          For clinical consultation and personalized evaluation, visit our{" "}
          <a href="/diseases/kidney">
            Ayurvedic kidney treatment options
          </a>.
        </p>
      </article>

      <MedicalDisclaimer
        lastReviewed="February 3, 2026"
        reviewerName="Dr. Rahul Sharma"
        reviewerCredentials="B.A.M.S., M.D."
      />
    </main>
  );
}
