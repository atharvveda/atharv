"use client";
import React from "react";
import FAQItem from "@/components/FAQItem";
import { generateFaqSchema } from "@/lib/schema/faq";

const HomeFAQ = () => {
    const faqs = [
        {
            question: "How does an online Ayurvedic consultation work?",
            answer: "Our online consultations are secure video or phone calls with qualified Ayurvedic doctors. They will assess your medical history, symptoms, and lifestyle to create a personalized treatment plan including diet, herbs, and lifestyle changes."
        },
        {
            question: "Can Ayurveda treat Chronic Kidney Disease?",
            answer: "Ayurveda offers supportive management for CKD by focusing on preserving remaining kidney function, managing symptoms, and addressing root causes like diabetes or hypertension. We work alongside your conventional care."
        },
        {
            question: "Are your herbal medicines safe?",
            answer: "Yes, we prioritize safety. However, all herbal supplements should be taken under the guidance of a qualified practitioner, especially if you have pre-existing kidney or liver conditions."
        },
        {
            question: "Do you provide diet charts for kidney patients?",
            answer: "Absolutely. Diet is a critical part of our treatment. We provide detailed, kidney-friendly diet plans (low potassium, low sodium, protein-managed) tailored to your specific stage of CKD."
        },
        {
            question: "Where is Atharv Veda based?",
            answer: "Atharv Veda operates globally with a focus on patients in the United States, providing accessible, high-quality Ayurvedic care and US-based customer support."
        }
    ];

    const faqSchema = generateFaqSchema(faqs);

    return (
        <section className="py-5" style={{ background: "#f8f9fa" }}>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-10">
                        <div className="text-center mb-5">
                            <h5 style={{ color: "#ff5722", letterSpacing: "2px", textTransform: "uppercase", fontWeight: 700 }}>Common Questions</h5>
                            <h2 style={{ fontSize: "2.5rem", fontWeight: 800, color: "#00423b" }}>Your Questions, Answered.</h2>
                        </div>
                        <div className="accordion" id="homeFaqAccordion">
                            {faqs.map((faq, index) => (
                                <FAQItem key={index} faq={faq} index={index} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HomeFAQ;
