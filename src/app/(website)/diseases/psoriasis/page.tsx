import React from "react";
import Breadcrumb from "@/components/Breadcrumb";
import EnquiryFormSide from "@/components/EnquiryFormSide";

export default function PsoriasisPage() {
  return (
    <main>
      <Breadcrumb title="Psoriasis" />

      {/* Hero Section */}
      <div
        className="ayur-kidney-section"
        style={{ background: "#071818", padding: "60px 0 40px 0" }}
      >
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-7 col-md-12 mb-4 mb-lg-0">
              <div className="text-white" style={{ maxWidth: "600px" }}>
                <h1 style={{ fontSize: "3rem", fontWeight: 800 }}>
                  Ayurvedic{" "}
                  <span style={{ color: "#ffb300", fontSize: "larger" }}>
                    Psoriasis
                  </span>
                  <br />
                  Treatment
                </h1>

                <div style={{ margin: "32px 0 24px 0" }}>
                  <span
                    style={{
                      background: "#ff5722",
                      color: "#fff",
                      fontSize: "2.5rem",
                      fontWeight: 700,
                      padding: "10px 32px",
                      borderRadius: "4px",
                      display: "inline-block",
                    }}
                  >
                    ATHARVEDA
                  </span>
                </div>

                <div
                  style={{
                    fontSize: "2rem",
                    color: "#fff",
                    fontWeight: 400,
                  }}
                >
                  100% Ayurvedic Treatment
                </div>

                <div style={{ marginTop: "40px" }}>
                  <img
                    src="/assets/images/psoriasis.webp"
                    alt="Psoriasis"
                    style={{ maxWidth: "180px", display: "block" }}
                  />
                </div>
              </div>
            </div>

            <div className="col-lg-5 col-md-12">
              <EnquiryFormSide disease="Psoriasis" />
            </div>
          </div>
        </div>
      </div>

      {/* What is it */}
      <div
        className="ayur-kidney-info-section"
        style={{
          background: "linear-gradient(180deg, #f8f9fa 0%, #fff 100%)",
          padding: "60px 0 40px 0",
          borderRadius: "0 0 24px 24px",
          marginBottom: "40px",
        }}
      >
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-7 col-md-12 mb-4 mb-lg-0">
              <h2
                style={{
                  fontSize: "2.5rem",
                  fontWeight: 800,
                  color: "#00423b",
                  marginBottom: "24px",
                }}
              >
                What is{" "}
                <span style={{ color: "#ffb300", fontSize: "larger" }}>
                  Psoriasis?
                </span>
              </h2>

              <p
                style={{
                  fontSize: "1.25rem",
                  color: "#18423b",
                  marginBottom: "24px",
                  maxWidth: "800px",
                }}
              >
                Psoriasis is a common skin disorder that causes red, itchy, and
                scaly patches on the skin. It is an autoimmune condition where
                the immune system mistakenly attacks healthy skin cells.
              </p>
            </div>

            <div className="col-lg-5 col-md-12 text-center">
              <div
                style={{
                  background: "#fff",
                  borderRadius: "24px",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
                  padding: "16px 0 0 0",
                  display: "inline-block",
                }}
              >
                <img
                  src="/assets/images/psoriasis.webp"
                  alt="Psoriasis"
                  style={{
                    maxWidth: "100%",
                    borderRadius: "16px",
                    boxShadow: "0 4px 24px rgba(255,179,0,0.15)",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Grid Section */}
      <div className="container" style={{ marginBottom: "40px" }}>
        <div className="row">
          {/* Types */}
          <div className="col-lg-4 col-md-6 mb-4">
            <div
              style={{
                background: "#0b3c3c",
                borderRadius: "16px",
                color: "#ffe0a3",
                padding: "32px 24px",
                height: "100%",
              }}
            >
              <h3
                style={{
                  color: "#ffb300",
                  fontWeight: 700,
                  fontSize: "1.5rem",
                  marginBottom: "18px",
                }}
              >
                Types
              </h3>
              <ul
                style={{
                  paddingLeft: "18px",
                  fontSize: "1.1rem",
                  listStyle: "none",
                }}
              >
                <li>Plaque Psoriasis</li>
                <li>Guttate Psoriasis</li>
                <li>Inverse Psoriasis</li>
                <li>Scalp Psoriasis</li>
              </ul>
            </div>
          </div>

          {/* Causes */}
          <div className="col-lg-4 col-md-6 mb-4">
            <div
              style={{
                background: "#0b3c3c",
                borderRadius: "16px",
                color: "#ffe0a3",
                padding: "32px 24px",
                height: "100%",
              }}
            >
              <h3
                style={{
                  color: "#ffb300",
                  fontWeight: 700,
                  fontSize: "1.5rem",
                  marginBottom: "18px",
                }}
              >
                Causes
              </h3>
              <ul
                style={{
                  paddingLeft: "18px",
                  fontSize: "1.1rem",
                  listStyle: "none",
                }}
              >
                <li>Genetic factors</li>
                <li>Stress and anxiety</li>
                <li>Skin injuries</li>
                <li>Infections</li>
              </ul>
            </div>
          </div>

          {/* Symptoms */}
          <div className="col-lg-4 col-md-12 mb-4">
            <div
              style={{
                background: "#0b3c3c",
                borderRadius: "16px",
                color: "#ffe0a3",
                padding: "32px 24px",
                height: "100%",
              }}
            >
              <h3
                style={{
                  color: "#ffb300",
                  fontWeight: 700,
                  fontSize: "1.5rem",
                  marginBottom: "18px",
                }}
              >
                Symptoms
              </h3>
              <ul
                style={{
                  paddingLeft: "18px",
                  fontSize: "1.1rem",
                  listStyle: "none",
                }}
              >
                <li>Red, raised patches</li>
                <li>Silvery-white scales</li>
                <li>Dry, cracked skin</li>
                <li>Itching or soreness</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Treatment Approach */}
      <div
        className="ayur-kidney-treatment-info-section"
        style={{
          background: "linear-gradient(90deg, #f8f9fa 60%, #fffbe7 100%)",
          padding: "60px 0 40px 0",
          marginBottom: "40px",
          borderRadius: "24px",
        }}
      >
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-5 col-md-12 mb-4 mb-lg-0 text-center">
              <img
                src="/assets/images/psoriasis.webp"
                alt="Psoriasis"
                style={{
                  maxWidth: "340px",
                  borderRadius: "16px",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.10)",
                  background: "#fff",
                  padding: "16px",
                }}
              />
            </div>

            <div className="col-lg-7 col-md-12">
              <h2
                style={{
                  fontSize: "2.2rem",
                  fontWeight: 800,
                  color: "#00423b",
                  marginBottom: "18px",
                }}
              >
                Ayurvedic{" "}
                <span style={{ color: "#ffb300", fontSize: "larger" }}>
                  Treatment Approach
                </span>
              </h2>

              <p
                style={{
                  fontSize: "1.15rem",
                  color: "#18423b",
                  marginBottom: "18px",
                }}
              >
                Focuses on calming the immune system, reducing inflammation, and
                detoxifying the body using herbs like Neem, Manjistha, and
                Turmeric.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
