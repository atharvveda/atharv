import Image from "next/image";
import Link from "next/link";
import MedicalDisclaimer from "@/components/MedicalDisclaimer";
import AuthorCredentials from "@/components/AuthorCredentials";
import { personSchema } from "@/lib/schema/person";

export const metadata = {
  title: "Dr. Rahul Sharma | Ayurvedic Kidney Care Specialist | Atharva Veda",
  description:
    "Dr. Rahul Sharma is an Ayurvedic physician specializing in kidney health and chronic disease support. View qualifications, certifications, and medical expertise.",
  alternates: {
    canonical: "/dr-rahul-sharma",
  },
};

export default function DoctorPage() {
  const schema = personSchema({
    name: "Dr. Rahul Sharma",
    url: "https://atharvveda.us/dr-rahul-sharma",
    jobTitle: "Ayurvedic Physician",
    worksFor: "Atharva Veda",
    specialty: "Kidney Health & Chronic Disease Support",
  });

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <div className="container py-5">
        <h1 className="mb-3">Dr. Rahul Sharma</h1>
        <p className="text-muted">
          Ayurvedic Physician | Kidney Health Specialist
        </p>

        <div className="row mt-4">
          <div className="col-md-4">
            <Image
              src="/assets/images/profile-img.png"
              alt="Dr Rahul Sharma Ayurvedic Doctor"
              width={400}
              height={450}
              className="img-fluid rounded"
            />
          </div>

          <div className="col-md-8">
            <h2>Professional Overview</h2>
            <p>
              Dr. Rahul Sharma is an Ayurvedic physician focused on holistic
              kidney health and chronic disease management. His approach
              combines classical Ayurvedic principles, diet and lifestyle
              correction, and integrative wellness strategies to support
              patients living with kidney-related disorders.
            </p>

            <h3>Areas of Focus</h3>
            <ul>
              <li>Chronic Kidney Disease (CKD) support</li>
              <li>Ayurvedic dietary and lifestyle guidance</li>
              <li>Herbal wellness protocols</li>
              <li>Integrative chronic disease management</li>
            </ul>

            <p>
              Dr. Sharma reviews and contributes to medical education content
              on Atharva Veda to ensure accuracy and responsible health
              information.
            </p>

            <p>
              🔗 Related:{" "}
              <Link href="/chronic-kidney-disease">
                Chronic Kidney Disease Guide
              </Link>
            </p>
          </div>
        </div>

        {/* Credentials Section */}
        <div className="mt-5">
          <h2>Medical Credentials & Certifications</h2>
          <AuthorCredentials
            name="Dr. Rahul Sharma"
            credentials="B.A.M.S., M.D. (Ayurveda)"
            imageUrl="/assets/images/profile-img.png"
            bio="Specialist in Ayurvedic Kidney Care and Chronic Disease Management. Dedicated to providing holistic healing through ancient Vedic wisdom."
          />

          <div className="row mt-4">
            <div className="col-md-4">
              <Image
                src="/DoctorCredentials/BAMS_Degree_dr_Rahul_Sharma.jpeg"
                alt="Dr Rahul Sharma BAMS Degree Certificate"
                width={400}
                height={500}
                className="img-fluid"
              />
            </div>
            <div className="col-md-4">
              <Image
                src="/DoctorCredentials/dr_Rahul_Sharma_registration_certificate.jpeg"
                alt="Dr Rahul Sharma Medical Registration Certificate"
                width={400}
                height={500}
                className="img-fluid"
              />
            </div>
            <div className="col-md-4">
              <Image
                src="/DoctorCredentials/certificate_of_management_in_diarrhoea_and_pnemonia.jpeg"
                alt="Dr Rahul Sharma Medical Training Certificate"
                width={400}
                height={500}
                className="img-fluid"
              />
            </div>
          </div>
        </div>

        <div className="mt-5">
          <MedicalDisclaimer
            lastReviewed="February 2026"
            reviewerName="Dr. Rahul Sharma"
            reviewerCredentials="B.A.M.S., M.D."
          />
        </div>
      </div>
    </>
  );
}
