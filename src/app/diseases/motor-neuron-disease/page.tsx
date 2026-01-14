import React from "react";
import Breadcrumb from "@/components/Breadcrumb";
import EnquiryFormSide from "@/components/EnquiryFormSide";

export default function MotorNeuronDiseasePage() {
    return (
        <main>
            <Breadcrumb title="Motor Neuron Disease" />

            {/* Hero Section */}
            <div className="ayur-kidney-section" style={{ background: "#071818", padding: "60px 0 40px 0" }}>
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-7 col-md-12 mb-4 mb-lg-0">
                            <div className="text-white" style={{ maxWidth: "600px" }}>
                                <h1 style={{ fontSize: "3rem", fontWeight: 800 }}>
                                    Ayurvedic <span style={{ color: "#ffb300", fontSize: "larger" }}>Motor Neuron Disease</span><br />
                                    Treatment
                                </h1>
                                <div style={{ margin: "32px 0 24px 0" }}>
                                    <span style={{ background: "#ff5722", color: "#fff", fontSize: "2.5rem", fontWeight: 700, padding: "10px 32px", borderRadius: "4px", display: "inline-block" }}>ATHARVEDA</span>
                                </div>
                                <div style={{ fontSize: "2rem", color: "#fff", fontWeight: 400 }}>100% Ayurvedic Treatment</div>
                                <div style={{ marginTop: "40px" }}>
                                    <img src="/assets/images/motor-neuron.webp" alt="MND" style={{ maxWidth: "180px", display: "block" }} />
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-5 col-md-12">
                            <EnquiryFormSide disease="Motor Neuron Disease" />
                        </div>
                    </div>
                </div>
            </div>

            {/* What is MND */}
            <div className="ayur-kidney-info-section" style={{ background: "linear-gradient(180deg, #f8f9fa 0%, #fff 100%)", padding: "60px 0 40px 0", borderRadius: "0 0 24px 24px", marginBottom: "40px" }}>
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-7 col-md-12 mb-4 mb-lg-0">
                            <h2 style={{ fontSize: "3rem", fontWeight: 800, color: "#00423b", marginBottom: "24px" }}>
                                What Is <span style={{ color: "#ffb300", fontSize: "larger" }}>MND?</span>
                            </h2>
                            <p style={{ fontSize: "1.25rem", color: "#18423b", marginBottom: "24px", maxWidth: "800px" }}>
                                <b>Motor Neuron Disease (MND)</b> is a serious neurological condition that affects the motor neurons—the nerves responsible for controlling muscles. These neurons are found in the brain and spinal cord. When they become damaged, the communication between the brain and muscles breaks down. As a result, muscles become <b>weak</b>, <b>stiff</b>, and eventually <b>shrink</b> or <b>waste away.</b>
                            </p>
                            <button className="btn" style={{ background: "#00423b", color: "#fff", fontSize: "1rem", fontWeight: 500, padding: "10px 32px", borderRadius: "32px" }}>Book Consultation</button>
                        </div>
                        <div className="col-lg-5 col-md-12 text-center">
                            <div style={{ background: "#fff", borderRadius: "24px", boxShadow: "0 8px 32px rgba(0,0,0,0.08)", padding: "16px 0 0 0", display: "inline-block" }}>
                                <img src="/assets/images/motor-neuron.webp" alt="MND" style={{ maxWidth: "100%", borderRadius: "16px", boxShadow: "0 4px 24px rgba(255,179,0,0.15)" }} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Causes */}
            <div className="ayur-kidney-treatment-info-section" style={{ background: "linear-gradient(90deg, #f8f9fa 60%, #fffbe7 100%)", padding: "60px 0 40px 0", marginBottom: "40px", borderRadius: "24px" }}>
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-5 col-md-12 mb-4 mb-lg-0 text-center">
                            <img src="/assets/images/motor-neuron.webp" alt="MND" style={{ maxWidth: "340px", borderRadius: "16px", boxShadow: "0 8px 32px rgba(0,0,0,0.10)", background: "#fff", padding: "16px" }} />
                        </div>
                        <div className="col-lg-7 col-md-12">
                            <h2 style={{ fontSize: "2.8rem", fontWeight: 800, color: "#00423b", marginBottom: "18px" }}>
                                What Causes <span style={{ color: "#ffb300", fontSize: "larger" }}>MND?</span>
                            </h2>
                            <ul style={{ fontSize: "1.15rem", color: "#18423b", marginBottom: "18px", listStyleType: "disc", paddingLeft: "24px" }}>
                                <li>Exposure to viruses and toxins</li>
                                <li>Genetic and inherited conditions</li>
                                <li>Inflammation and immune system issues</li>
                                <li>Stress (mental and physical)</li>
                                <li>Damage to nerve growth factors</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* Types */}
            <div className="ayur-mnd-types-section" style={{ background: "linear-gradient(90deg, #fffbe7 60%, #f8f9fa 100%)", padding: "60px 0 40px 0", marginBottom: "40px", borderRadius: "24px" }}>
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-7 col-md-12 mb-4 mb-lg-0">
                            <h2 style={{ fontSize: "2.5rem", fontWeight: 800, color: "#00423b", marginBottom: "18px" }}>
                                Types of <span style={{ color: "#ffb300", fontSize: "larger" }}>MND</span>
                            </h2>
                            <div className="mb-3">
                                <h4 style={{ fontWeight: 700 }}>ALS (Amyotrophic Lateral Sclerosis)</h4>
                                <p>Most common form, affects upper and lower motor neurons.</p>
                            </div>
                            <div className="mb-3">
                                <h4 style={{ fontWeight: 700 }}>PBP (Progressive Bulbar Palsy)</h4>
                                <p>Affects muscles used for speaking and swallowing.</p>
                            </div>
                            <div className="mb-3">
                                <h4 style={{ fontWeight: 700 }}>PLS (Primary Lateral Sclerosis)</h4>
                                <p>Rare, affects only upper motor neurons. Progresses slowly.</p>
                            </div>
                            <div className="mb-3">
                                <h4 style={{ fontWeight: 700 }}>PMA (Progressive Muscular Atrophy)</h4>
                                <p>Targets only lower motor neurons, advances slowly.</p>
                            </div>
                        </div>
                        <div className="col-lg-5 col-md-12">
                            <div style={{ background: "#fff", borderRadius: "16px", boxShadow: "0 8px 32px rgba(0,0,0,0.08)", padding: "28px 24px", marginBottom: "24px" }}>
                                <h3 style={{ fontSize: "1.3rem", color: "#ff5722", fontWeight: 700, marginBottom: "12px" }}>Complications</h3>
                                <ul style={{ fontSize: "1.05rem", color: "#18423b", marginBottom: "0", listStyleType: "disc", paddingLeft: "24px" }}>
                                    <li>Paralysis on both sides</li>
                                    <li>Difficulty in communication</li>
                                    <li>Severe muscle weakness</li>
                                    <li>Breathing problems</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
